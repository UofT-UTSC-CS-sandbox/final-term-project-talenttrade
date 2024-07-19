from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .models import Message
from accounts.models import UserProfile
from .serializers import MessageSerializer
from django.db.models import Subquery, Q, OuterRef

# Create your views here.
class GetMessages(generics.ListAPIView):
  serializer_class = MessageSerializer

  def get_queryset(self):
    senderId = self.kwargs['senderId']
    recieverId = self.kwargs['recieverId']
    messages = Message.objects.filter(
      sender__in=[senderId, recieverId], reciever__in=[senderId, recieverId]
    )
    return messages
  
class SendMessage(generics.CreateAPIView):
  serializer_class = MessageSerializer

class AllMessages(generics.ListAPIView):
  queryset = Message.objects.all()
  serializer_class = MessageSerializer

class RetrieveUpdateDestroyMessage(generics.RetrieveUpdateDestroyAPIView):
  queryset = Message.objects.all()
  serializer_class = MessageSerializer
  lookup_field = "pk"


#get the last message sent by or to the user for everyone they've messaged
#doesnt work
class Inbox(generics.ListAPIView):
  serializer_class = MessageSerializer

  def get_queryset(self):
    userId = self.kwargs['userId']

    messages = Message.objects.filter(
      id__in = Subquery(
        UserProfile.objects.all(
          # Q(sender__reciever=userId) |
          # Q(reciever__sender=userId)
        ).distinct().annotate(
          last = Subquery(
            Message.objects.filter(
              Q(sender=OuterRef('id'), reciever=userId) |
              Q(reciever=OuterRef('id'), sender=userId)
            ).order_by('-id')[:1].values_list('id', flat=True)
          )
        ).values_list('last', flat=True).order_by('-id')
      )
    ).order_by('-id')
    # messages = Message.objects.filter(
    #   Q(sender=userId) | Q(reciever=userId)
    # ).order_by('-date').exclude(sender=userId)

    return messages