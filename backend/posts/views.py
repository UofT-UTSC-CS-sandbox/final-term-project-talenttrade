from django.shortcuts import render
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post
from .serializers import PostSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Count
from django.http import JsonResponse
import json, googlemaps, math, datetime
from django.utils import timezone

api_key = "AIzaSyAgfAWhb_ZqvR_DkfqqQeJ_wW9adqrTmH0" 

gmap_client = googlemaps.Client(key=api_key)


# Create your views here.
class PostListCreate(generics.ListCreateAPIView):
    def get_queryset(self):
      user = self.request.user.id
      return Post.objects.filter(author_id=user)
    serializer_class = PostSerializer
    def delete(self, request, *args, **kwargs):
        Post.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = "pk"

class ListPopular(APIView):
    def get_most_popular(self, title):
        if title=="trade":
            popular = (
                Post.objects
                .values('offer', 'need')
                .annotate(count=Count('id'))
                .order_by('-count')
            )
        else:
            popular = (
                Post.objects
                .values(title)
                .annotate(count=Count(title))
                .order_by('-count')
            )
        return popular

class MostPopularNeed(ListPopular):
    def get(self, request):
        most_popular_need = self.get_most_popular("need")
        response_data = [{'need': item['need'], 'count': item['count']} for item in most_popular_need]
        return JsonResponse(response_data, safe=False)

class MostPopularOffer(ListPopular):
    def get(self, request):
        most_popular_offer = self.get_most_popular("offer")
        response_data = [{'offer': item['offer'], 'count': item['count']} for item in most_popular_offer]
        return JsonResponse(response_data, safe=False)

class MostPopularTrade(ListPopular):
    def get(self, request):
        most_popular_trade = self.get_most_popular("trade")
        response_data = [{'offer': item['offer'], 'need': item['need'], 'count': item['count']} for item in most_popular_trade]
        return JsonResponse(response_data, safe=False)
    


class PostListByNeed(APIView):
    def get(self, request, format=None):
        need = request.query_params.get("need", "")

        if need:
            posts = Post.objects.filter(need__iexact=need)
        else:
            posts = None

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class PostListByOffer(APIView):
    def get(self, request, format=None):
        offer = request.query_params.get("offer", "")

        if offer:
            posts = Post.objects.filter(offer__iexact=offer)
        else:
            posts = None

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PostListByTrade(APIView):
    def get(self, request, format=None):
        offer = request.query_params.get("offer", "")
        need = request.query_params.get("need", "")

        if offer and need:
            posts = Post.objects.filter(offer__iexact=offer, need__iexact=need)
        else:
            posts = None

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class FilterPosts(APIView):
    permission_classes =[permissions.IsAuthenticated]

    def get(self, request, pk, pk_list, offer_list, format=None):

        offers = json.loads(offer_list)

        post_ids =[]

        distance_wanted = float(pk)  
        #print(distance_wanted)

        #source = self.user.location 

        #source_latitude = "43.6629"
        #source_longitude = "-79.3957"
        #source = f"{source_latitude},{source_longitude}"
        source = "Toronto"

        postList = json.loads(pk_list)

        for post in postList:
            curr_post = Post.objects.filter(id=post["id"])
            if request.user and (request.user.username != str(curr_post[0].author_id)):
                #lat = post.latitude
                #long = post.longitude
                destination = curr_post[0].location
                print(destination)
                #destination = f"{lat},{long}"
                #print(destination)
                if(distance_wanted == -1):
                    post_ids.append(curr_post[0].id)
                else:
                    try:
                        departure_time = timezone.now()
                        result = gmap_client.directions(source, destination, mode="driving", departure_time=departure_time)

                        if result:
                            distance_meters = result[0]['legs'][0]['distance']['value']
                            distance_km = distance_meters / 1000
                            print("distance", distance_km)
                            if math.floor(distance_km) <= distance_wanted and distance_km > 0:
                                post_ids.append(curr_post[0].id)


                            print(f"Distance: {distance_km} km")
                        else:
                            print("No results found")
                    
                    except Exception as e:
                        print(f"Error fetching directions: {str(e)}")

        if (len(offers)> 0):
            posts = Post.objects.filter(id__in=post_ids, offer__in=offers)
        else:
             posts = Post.objects.filter(id__in=post_ids)

        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)

# Correcting the coordinates format
#source = "43.6629,-79.3957"
#destination = "43.5483,-79.6636"

