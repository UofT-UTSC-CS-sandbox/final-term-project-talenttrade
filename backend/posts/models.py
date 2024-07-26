from django.db import models
from django.conf import settings
from django.utils import timezone

from django.utils import timezone


# Create your models here.
class Post(models.Model):
    author_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    author_name = models.CharField(max_length=30, default="DEFAULT NAME")  
    need = models.CharField(max_length=30)
    offer = models.CharField(max_length=30)
    description = models.TextField()
    location = models.CharField(max_length=30)
    published = models.DateTimeField(auto_now_add=True)
    applicants = models.PositiveIntegerField()
    active = models.BooleanField(default=True)
    photo = models.ImageField(upload_to='post_photos/', blank=True, null=True)

    def __str__(self):
        return self.need+" "+self.offer


class Click(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = [['user', 'post']]

    def __str__(self):
        return f"{self.user.id} {self.post.author_id} {self.timestamp}"


class StoreSuggestedPost(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    suggested_posts = models.ManyToManyField(Post)
    email = models.CharField(max_length=30)
    def __str__(self):
        return f"{self.user.username} - {self.email}"
