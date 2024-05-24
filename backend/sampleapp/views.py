from django.shortcuts import render
from rest_framework.decorators import api_view  # Import the api_view decorator
from rest_framework.response import Response

from .models import *

# Create your views here.
@api_view(['POST'])
def increment_count(request):
    counter, created = Counter.objects.get_or_create()
    counter.count += 1
    counter.save()
    return Response({'count': counter.count})

@api_view(['POST'])
def reset_count(request):
    counter, created = Counter.objects.get_or_create()
    counter.count = 0
    counter.save()
    return Response({'count': counter.count})


@api_view(['GET'])
def get_count(request):
    counter, created = Counter.objects.get_or_create()
    return Response({'count': counter.count})