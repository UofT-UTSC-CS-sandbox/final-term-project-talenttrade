from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        # add authour_id
        fields = ["id", "author_id", "author_name", "need", "offer", "description", 
                  "location", "published", "applicants", "active"]

