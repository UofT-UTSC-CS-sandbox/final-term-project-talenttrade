from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .models import Message
from accounts.models import UserProfile
from .serializers import MessageSerializer
from django.db.models import Subquery, Q, OuterRef
from django.contrib.auth.models import User
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import send_mail
from django.conf import settings


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

# send an email notification
def sendEmail(message):
  email = User.objects.filter(username=message.reciever).first().email
  subject = 'New Message'
  html_message = render_to_string('new_message.html', {'message': message})
  plain_message = strip_tags(html_message)

  try:
    send_mail(
      subject,
      plain_message,
      settings.EMAIL_HOST_USER,
      [email],
      html_message=html_message
    )
    print(f'Email sent to {email}')
  except Exception as e:
    print(f'Failed to send email to {email}: {e}')


class SendMessage(generics.CreateAPIView):
  serializer_class = MessageSerializer

  def perform_create(self, serializer):
        message = serializer.save()
        messages = Message.objects.filter(
            Q(sender=message.sender, reciever=message.reciever) | 
            Q(sender=message.reciever, reciever=message.sender) 
        ).exclude(id=message.id).order_by('date')

        # no messages/first message being sent
        if (messages.count() == 0):
          sendEmail(message)
        
        # message has been sent before
        else:
          recent = messages[messages.count() - 1] # negative indexing not supported???
          
          # check if a day has past since last message
          # swap to recent.date - message.date if testing needs a day, results in negative day
          if "day" in str(message.date - recent.date):
            sendEmail(message)


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