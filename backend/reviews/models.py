from django.db import models
from django.conf import settings

# Create your models here.
class Review(models.Model):
  reviewer = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_reviewer', on_delete=models.CASCADE)
  receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_receiver', on_delete=models.CASCADE)
  review = models.TextField()
  published = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.reviewer+" "+self.receiver+" "+self.published