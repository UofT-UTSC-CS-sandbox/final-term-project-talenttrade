from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from rest_framework.views import APIView

# Create your views here.
class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def delete(self, request, *args, **kwargs):
        Post.objects.all().delete()
        return Response(status=status.HTTP_203_NO_CONTENT)

class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = "pk"

class PostListByAuthour(APIView):
    def get(self, request, format=None):
        authour_id = request.query_params.get("authour_id", "")

        if authour_id:
            posts = Post.objects.filter(authour_id__exact=authour_id)
        else:
            posts = Post.objects.all()

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)