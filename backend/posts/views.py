from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User

# Create your views here.
class PostListCreate(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    def delete(self, request, *args, **kwargs):
        Post.objects.all().delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = "pk"

class PostListByAuthor(APIView):
    def get(self, request, format=None):
        authour_id = request.query_params.get("authour_id", "")

        if authour_id:
            posts = Post.objects.filter(author_id__exact=authour_id)
        else:
            posts = Post.objects.all()

        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
		
class AnnotatedPostList(APIView):
    def get(self, request):
        annotated_posts = Post.objects.values('need').annotate(need_count=Count('need')).order_by('-need_count')
        serializer = AnnotatedPostSerializer(annotated_posts, many=True)
        return Response(serializer.data)