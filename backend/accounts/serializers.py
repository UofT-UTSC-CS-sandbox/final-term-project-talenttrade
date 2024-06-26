from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name',  'last_name', 'password')
        extra_kwargs = {
            'first_name': {'required': True, 'allow_blank': False},
            'last_name': {'required': True,'allow_blank': False},
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def validate_password(self, value):
        validate_password(value)
        return value

class ProfileSerializer(serializers.Serializer):
    bio = serializers.CharField(required=False)
    location_name = serializers.CharField(required=False)
    location_coords = serializers.CharField(required=False)
    date_of_birth = serializers.DateField(required=False)
    profile_picture = serializers.ImageField(required=False)

    def validate_location_coords(self, value):
        if value:
            try:
                lat, lon = value.split(',')
                lat = float(lat)
                lon = float(lon)
            except ValueError:
                raise ValidationError('Invalid location coordinates')
        return value

    def validate_profile_picture(self, value):
        if value:
            if value.size > 2 * 1024 * 1024:
                raise ValidationError('Profile picture is too large')
        return value
    