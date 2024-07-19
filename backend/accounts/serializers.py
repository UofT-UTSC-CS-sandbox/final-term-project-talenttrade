from .models import UserProfile
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
        validated_data['first_name'] = validated_data['first_name'].capitalize()
        validated_data['last_name'] = validated_data['last_name'].capitalize()
        return User.objects.create_user(**validated_data)

    def validate_password(self, value):
        validate_password(value)
        return value

class ProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['bio', 'location_name', 'location_coords', 'is_exact_location', 'date_of_birth', 'profile_picture', 'offerings', 'full_name']

    def get_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    
    def update(self, instance, validated_data):
        instance.bio = validated_data.get('bio', instance.bio)
        instance.location_name = validated_data.get('location_name', instance.location_name)
        instance.location_coords = validated_data.get('location_coords', instance.location_coords)
        instance.is_exact_location = validated_data.get('is_exact_location', instance.is_exact_location)
        instance.date_of_birth = validated_data.get('date_of_birth', instance.date_of_birth)
        if 'profile_picture' in validated_data:
            instance.profile_picture = validated_data['profile_picture']
        instance.offerings = validated_data.get('offerings', instance.offerings)
        instance.save()
        return instance

    
    # def validate_location_coords(self, value):
    #     if value:
    #         try:
    #             lat, lon = value.split(',')
    #             lat = float(lat)
    #             lon = float(lon)
    #         except ValueError:
    #             raise ValidationError('Invalid location coordinates')
    #     return value

    # def validate_profile_picture(self, value):
    #     if value:
    #         if value.size > 2 * 1024 * 1024:
    #             raise ValidationError('Profile picture is too large')
    #     return value

