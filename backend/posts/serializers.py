from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        # add authour_id
        fields = ["id", "authour_id", "authour_name", "need", "offer", "description", 
                  "location", "published", "applicants", "active"]
