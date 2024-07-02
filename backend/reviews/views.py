from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .models import Review
from .serializers import ReviewSerializer
from django.http import JsonResponse
from django.core.paginator import Paginator


# Create your views here.
class ReviewListCreate(generics.ListCreateAPIView):
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer

class RatingRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer
  lookup_field = "pk"

# get all reviews for given user
def GetAll(request):
  receiver = request.GET.get("receiver", "")
  page = request.GET.get("page", "")
  if receiver:
    reviews = Review.objects.filter(receiver=receiver).order_by('-published')
    paginator = Paginator(reviews, 5)
    if (int(page) > paginator.num_pages):
      return JsonResponse([], safe=False, status=204)
    response_data = [{'review': item.review, 'published': item.published, 'pages': paginator.num_pages} for item in paginator.page(page)]
  else:
    response_data = []
  return JsonResponse(response_data, safe=False)