from datetime import timezone
from .models import UserProfile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .serializers import ProfileSerializer, UserSerializer
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_current_user_id(request):
    user_id = request.user.id
    user_name = request.user.first_name + " " + request.user.last_name
    return Response({"user_id": user_id, "user_name": user_name})
        
class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            user_profile = UserProfile.objects.create(user=serializer.instance)
            return Response({'message': 'User creation successful'}, status=status.HTTP_201_CREATED)
        
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)

        if user:
            # use authentication token stuff???
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")

            if refresh_token is None:
                return Response({'error': 'Refresh token must be provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        except Exception as e:
            if str(e) == 'Token is blacklisted':
                return Response({'error': 'User is not logged in'}, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class ProfileCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ProfileSerializer(data=request.data)

        if serializer.is_valid():
            user_profile = UserProfile.objects.create(user=request.user, **serializer.validated_data)
            return Response({'message': 'Profile creation successful'}, status=status.HTTP_201_CREATED)
        
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        serializer = ProfileSerializer(user_profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile update successful'}, status=status.HTTP_200_OK)
        
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileView(APIView):
    def get(self, request, user_id=None):
        try:
            if user_id:
                user_profile = UserProfile.objects.get(user_id=user_id)
            else:
                user_profile = UserProfile.objects.get(user=request.user)
            serializer = ProfileSerializer(user_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)
    
class ProfileDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        user_profile = UserProfile.objects.get(user=request.user)
        user_profile.delete()
        return Response({'message': 'Profile deletion successful'}, status=status.HTTP_200_OK)

