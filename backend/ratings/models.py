from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Rating(models.Model):
  rater = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_rater', on_delete=models.CASCADE)
  receiver = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='%(class)s_receiver', on_delete=models.CASCADE)
  rating = models.IntegerField(
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )

  def __str__(self):
    return self.rater+" "+self.receiver+" "+self.rating