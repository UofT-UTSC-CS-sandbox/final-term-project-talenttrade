from django.urls import path
from . import views

urlpatterns = [
  path("post/", views.PostListCreate.as_view(), name="create-post"),
  path("post/<int:pk>/", views.PostRetrieveUpdateDestroy.as_view(), name="r-u-d-post"),
  path("posts/<int:author_id>", views.PostListByAuthor.as_view(), name="post-by-author"),
]