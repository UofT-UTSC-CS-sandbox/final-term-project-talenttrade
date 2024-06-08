from django.db import models
#from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    # TODO add foreign key for the authour and delete temp version
   # author  = models.ForeignKey(User, on_delete=models.CASCADE)
    author_id = models.IntegerField(default=0)  
    author_name = models.CharField(max_length=30, default="DEFAULT NAME")  
    need = models.CharField(max_length=30)
    offer = models.CharField(max_length=30)
    description = models.TextField()
    location = models.CharField(max_length=30)
    published = models.DateTimeField(auto_now_add=True)
    applicants = models.PositiveIntegerField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.need+" "+self.offer+" "+self.published
