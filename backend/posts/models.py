from django.db import models

# Create your models here.
class Post(models.Model):
    # TODO add foreign key for the authour and delete temp version
    # authour_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    authour_id = models.IntegerField(default=0)
    authour_name = models.CharField(max_length=30, default="DEFAULT NAME")
    need = models.CharField(max_length=30)
    offer = models.CharField(max_length=30)
    description = models.TextField()
    location = models.CharField(max_length=30)
    published = models.DateTimeField(auto_now_add=True)
    applicants = models.PositiveIntegerField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.need+" "+self.offer+" "+self.published
