# worldcities/views.py

from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import WorldCity
from .serializers import WorldCitySerializer

class CitySearchView(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', '')
        if not query:
            return Response({"error": "No query provided"}, status=status.HTTP_400_BAD_REQUEST)

        # First, get cities that start with the query
        cities_start_with = WorldCity.objects.filter(name__istartswith=query)[:5]
        
        # If less than 5 results, get more cities that contain the query as a substring
        if len(cities_start_with) < 5:
            remaining_count = 5 - len(cities_start_with)
            cities_contain = WorldCity.objects.filter(
                Q(name__icontains=query) & ~Q(name__istartswith=query)
            )[:remaining_count]
            cities = list(cities_start_with) + list(cities_contain)
        else:
            cities = cities_start_with
        
        serializer = WorldCitySerializer(cities, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
