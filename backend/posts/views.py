from django.shortcuts import render
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post, Click, StoreSuggestedPost
from .serializers import PostSerializer, ClickSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.db.models import Count, Max, Min, F, ExpressionWrapper, FloatField, Case, When, Value
from django.http import JsonResponse, HttpResponse
import json, googlemaps, math, datetime
from django.utils import timezone
from rest_framework import status
from django.db.models.functions import Cast
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

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
    


class PostListByOffer(APIView):
    def get(self, request, offer, show, format=None):
        if show == "false" and offer:
            posts = Post.objects.filter(offer__istartswith=offer)
        elif show == "true" and offer:
            posts = Post.objects.filter(offer__istartswith=offer).exclude(author_id=request.user.id)
        else:
            posts = None

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class PostListByNeed(APIView):
    def get(self, request, format=None):
        need = request.query_params.get("need", "")

        if need:
            posts = Post.objects.filter(need__iexact=need)
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

    def get(self, request, pk, pk_list, offer_list, loc_coords, format=None):

        offers = json.loads(offer_list)

        post_ids =[]

        distance_wanted = float(pk)  

        location = loc_coords.split(",")
        source_latitude = location[0]
        source_longitude = location[1]
        source = f"{source_latitude},{source_longitude}"

        postList = json.loads(pk_list)

        print("this is the post list", postList)
        for post in postList:
            curr_post = Post.objects.filter(id=post["id"])
            if request.user and (request.user.username != str(curr_post[0].author_id)):
                #lat = post.latitude
                #long = post.longitude
                destination = curr_post[0].location
                #destination = f"{lat},{long}"
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
            posts = Post.objects.filter(id__in=post_ids, need__in=offers)
        else:
             posts = Post.objects.filter(id__in=post_ids)

        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)


class RecordPostClick(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, post_id):
        post = Post.objects.get(id=post_id)

        click, created = Click.objects.get_or_create(user=request.user, post=post)
        if not created:
            click.timestamp = timezone.now()
            click.save()
        return Response({'message': 'Click recorded'}, status=status.HTTP_201_CREATED)




class PostSuggestions(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):


        user_post_needs = []
        user_post_offers = []

        #store key words from User's current posts

        user_posts = Post.objects.filter(author_id=request.user.id)

        for post in user_posts:
            user_post_needs.append(post.need)
            user_post_offers.append(post.offer)

        # post not by current User
        posts_not_by_user = Post.objects.exclude(author_id=request.user.id)
        
        #hard coded currently 
        user_offerings = ["Software engineer", "Plumber","Graphic Design"]
        # user_offerings = 

        # post id's of posts clicked by current user
        clicked_posts_ids = Click.objects.filter(user_id=request.user.id).values_list('post_id', flat=True)

        # posts clicked by user
        posts_clicked_by_user = posts_not_by_user.filter(id__in=clicked_posts_ids)

        user_clicked_posts_need = []
        user_clicked_posts_offer = []

        for post in posts_clicked_by_user:
            user_clicked_posts_need.append(post.need)
            user_clicked_posts_offer.append(post.offer)
            print("CLICKED POST post they need:", post.need, "then they are", post.offer)

        # get posts that are not clicked by user 
        posts_not_clicked_by_user = posts_not_by_user.exclude(id__in=clicked_posts_ids)

        score = posts_not_clicked_by_user.annotate(
            # user offerings 
            offering_match_score=Case(
                *[When(need__icontains=offering, then=Value(1.0)) for offering in user_offerings],
                default=Value(0.0),
                output_field=FloatField()
            ),
            match_user_posts_need_score=Case(
                *[When(need__icontains=offering, then=Value(0.5)) for offering in user_post_offers],
                default=Value(0.0),
                output_field=FloatField()
            ),
            match_user_posts_offer_score=Case(
                *[When(offer__icontains=need, then=Value(0.5)) for need in user_post_needs],
                default=Value(0.0),
                output_field=FloatField()
            ),
            match_user_clicked_posts_offer_score=Case(
                *[When(offer__icontains=offer, then=Value(0.5)) for offer in user_clicked_posts_offer],
                default=Value(0.0),
                output_field=FloatField()
            ),
            match_user_clicked_posts_need_score=Case(
                *[When(need__icontains=need, then=Value(0.5)) for need in user_clicked_posts_need],
                default=Value(0.0),
                output_field=FloatField()
            ),
            combined_score=ExpressionWrapper(
                (F('offering_match_score') + F('match_user_posts_need_score') + F('match_user_posts_offer_score') +
                F('match_user_clicked_posts_offer_score') + F('match_user_clicked_posts_need_score') ) / 3,
                output_field = FloatField()
            )

        )

        for i in score:
            print("they need", i.need,"they are", i.offer, i.offering_match_score, i.match_user_posts_need_score, i.match_user_posts_offer_score, 
            i.match_user_clicked_posts_offer_score, i.match_user_clicked_posts_need_score, i.combined_score)

        max_click_count = -1 
        # get posts by num of clicks 
        if len(Click.objects.all()) > 0:
            posts_with_click_counts =  score.annotate(click_count=Count('click')) 
            max_click_count = posts_with_click_counts.aggregate(max_click=Max('click_count'))['max_click']
        else:
            posts_with_click_counts = score

        # Calculate the time range
        max_age = timezone.now() - datetime.timedelta(days=30)

        if max_click_count > -1:

            # Sort posts based on newer posts vs older posts and by the freq of clicks
            posts_weighted = posts_with_click_counts.annotate(
                age_days=ExpressionWrapper(
                    (timezone.now() - F('published')) / timezone.timedelta(days=1),
                    output_field=FloatField()
                ),
                recency_score=ExpressionWrapper(
                    (30.0 - F('age_days')) / 30.0,
                    output_field= FloatField()
                ),
                popularity_score=ExpressionWrapper(
                    F('click_count') / float(max_click_count),
                    output_field= FloatField()
                ),
                combined_score2=ExpressionWrapper(
                    (F('recency_score') + F('popularity_score')) / 2,
                    output_field = FloatField()
                ),
                total_score = ExpressionWrapper(
                    (F('combined_score2') + F('combined_score'))/2,
                    output_field = FloatField())
            ).filter(published__gte=max_age)

            posts_sorted = posts_weighted.order_by('-total_score', '-published')

        else: 
            posts_weighted = score.filter(published__gte=max_age)
            posts_sorted = posts_weighted.order_by('-combined_score', '-published')

        # for post in posts_weighted:
            # print(f"Post ID: {post.id}, {post.age_days}, Recency Score: {post.recency_score}, Popularity Score: {post.popularity_score}, Combined Score: {post.combined_score2}, Combined score: {post.combined_score}, total_score {post.total_score}")

        

        print("posts sorted", len(posts_sorted))
        
        store_suggested_post, created = StoreSuggestedPost.objects.get_or_create(user=request.user, email=str(request.user.email))
        store_suggested_post.suggested_posts.set(posts_sorted[:10])
        store_suggested_post.save()
        print("posts sorted", store_suggested_post.email)
        


        serializer = PostSerializer(posts_sorted[:10], many=True)
                
        return JsonResponse(serializer.data, safe=False)


    



