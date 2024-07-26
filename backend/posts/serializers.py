from rest_framework import serializers
from .models import Post
from .models import Click
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "author_id", "author_name", "need", "offer", "description", 
                  "location", "published", "applicants", "active", "photo"]

class ClickSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user.id')
    post_id = serializers.ReadOnlyField(source='post.id')
    class Meta:
        model = Click
        fields = ['user_id', 'post_id', 'times', 'timestamp']