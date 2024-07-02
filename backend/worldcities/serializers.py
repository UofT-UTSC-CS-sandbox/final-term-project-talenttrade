from rest_framework import serializers
from .models import WorldCity

class WorldCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = WorldCity
        fields = ['name', 'lat', 'lng']
