from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Rating
from .serializers import RatingSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.db.models import Avg

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
    if num == 0.0:
      avg = 0
    else:
      avg = num/tot
  else:
    avg = 0
  return JsonResponse({'average': avg, 'numRatings': tot})

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

# get user IDs with average rating of specified value and above
class UsersWithRatingAbove(APIView):
    def get(self, request, min_rating):
        
        if min_rating is None:
            return Response({'error': 'Rating parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        min_rating = float(min_rating)
        print(min_rating)
        
        users_with_avg_rating = Rating.objects.values('receiver').annotate(avg_rating=Avg('rating')).filter(avg_rating__gte=min_rating)
        
        user_ids = [user['receiver'] for user in users_with_avg_rating]
        
        print(user_ids)

        return Response(user_ids, status=status.HTTP_200_OK)
