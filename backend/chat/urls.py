from django.urls import path
from . import views

urlpatterns = [
  path("inbox/<userId>/", views.Inbox.as_view(), name="inbox"),
  path("messages/<senderId>/<recieverId>/", views.GetMessages.as_view(), name="messages"),
  path("send/", views.SendMessage.as_view(), name="send"),
  path("all/", views.AllMessages.as_view(), name="all"),
]