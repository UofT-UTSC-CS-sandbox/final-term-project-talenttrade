from rest_framework import serializers
from .models import Message
from accounts.serializers import ProfileSerializer

class MessageSerializer(serializers.ModelSerializer):
    reciever_profile = ProfileSerializer(read_only=True)
    sender_profile = ProfileSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'user', 'sender', 'reciever', 'sender_profile', 'reciever_profile', 'message', 'is_read', 'date']