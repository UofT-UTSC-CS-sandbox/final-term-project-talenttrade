from django.db import models
from django.conf import settings

# Create your models here.
class UserProfile(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    location_name = models.CharField(max_length=100, blank=True, null=True)
    location_coords = models.CharField(max_length=100, blank=True, null=True)
    is_exact_location = models.BooleanField(default=False)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    offerings = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.user.username