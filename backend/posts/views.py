from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post
from .serializers import PostSerializer
from django.contrib.auth.models import User
from django.db.models import Count
from django.http import JsonResponse


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
    def get(self, request, format=None):
        need = request.GET.get('need', None)
        offers = request.GET.getlist('offer[]', [])
        print(need, offers)
        
        if need and offers:
            posts = Post.objects.filter(need__iexact=need, offer__in=offers)
        elif need:
            posts = Post.objects.filter(need__iexact=need)
        else:
            posts = Post.objects.all()

        serializer = PostSerializer(posts, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)