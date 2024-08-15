from django.db import models
from django.conf import settings
from accounts.models import UserProfile

# Create your models here.
class Message(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='%(class)s_user')
  sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='%(class)s_sender')
  reciever = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='%(class)s_reciever')
  message = models.TextField()
  is_read = models.BooleanField(default=False)
  date = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ['date']

  def __str__(self):
    return f"{self.sender} to {self.reciever}"
  
  @property
  def sender_profile(self):
      sender_profile = UserProfile.objects.get(user=self.sender)
      return sender_profile
  
  @property
  def reciever_profile(self):
      reciever_profile = UserProfile.objects.get(user=self.reciever)
      return reciever_profile