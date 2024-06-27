from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .models import Review
from .serializers import ReviewSerializer
from django.http import JsonResponse


# Create your views here.
class ReviewListCreate(generics.ListCreateAPIView):
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer

class RatingRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer
  lookup_field = "pk"

# get all reviews for given user (ordered newest to oldest?)
class GetReviews(APIView):
  def get(self, request):
    receiver = request.query_params.get("receiver", "")
    if receiver:
      reviews = Review.objects.filter(receiver=receiver).order_by('-published')
      response_data = [{'review': item.review, 'published': item.published} for item in reviews]
    else:
      response_data = [{'review': "", 'published': -1}]
    return JsonResponse(response_data, safe=False)