from django.urls import path
from . import views

urlpatterns = [
  path("", views.PostListCreate.as_view(), name="create-post"),
  path("<int:pk>/", views.PostRetrieveUpdateDestroy.as_view(), name="r-u-d-post"),
  path("posts/", views.PostListByAuthour.as_view(), name="post-by-authour"),
]