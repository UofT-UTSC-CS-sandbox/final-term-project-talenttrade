from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Rating
from .serializers import RatingSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view

# Create your views here.
class RatingListCreate(generics.ListCreateAPIView):
  queryset = Rating.objects.all()
  serializer_class = RatingSerializer

class RatingRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
  queryset = Rating.objects.all()
  serializer_class = RatingSerializer
  lookup_field = "pk"

# get average ratings for given user
def GetAvgRating(request):
  receiver = request.GET.get("receiver", "")

  if receiver:
    ratings = Rating.objects.filter(receiver=receiver)
    num = 0.0
    tot = 0.0
    for rating in ratings:
      num += rating.rating
      tot += 1
    avg = num/tot
  else:
    avg = 0
  return JsonResponse({'average': avg})

# get the rating the current user gave to the given user
@api_view(('GET',))
def GetRating (request):
    rater = request.GET.get("rater")
    receiver = request.GET.get("receiver")
    
    if rater and receiver:
      rating = Rating.objects.filter(rater=rater, receiver=receiver)
    else:
      rating = None

    serializer = RatingSerializer(rating, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)