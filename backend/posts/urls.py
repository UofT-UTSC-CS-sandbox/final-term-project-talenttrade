from django.urls import path
from . import views

urlpatterns = [
  path("", views.PostListCreate.as_view(), name="create-post"),
  path("<int:pk>/", views.PostRetrieveUpdateDestroy.as_view(), name="r-u-d-post"),

  path('need/', views.MostPopularNeed.as_view(), name='most_popular_need'),
  path('offer/', views.MostPopularOffer.as_view(), name='most_popular_offer'),
  path('trade/', views.MostPopularTrade.as_view(), name='most_popular_trade'),

  path('post-offer/<str:offer>/<str:show>', views.PostListByOffer.as_view(), name='post_list_by_offer'),
  path('post-need/<str:need>', views.PostListByNeed.as_view(), name='post_list_by_need'),
  path('post-trade/<str:need>/<str:offer>', views.PostListByTrade.as_view(), name='post_list_by_trade'),
  path('filter/<str:pk>/<str:pk_list>/<str:offer_list>/<str:loc_coords>/<str:user_list>', views.FilterPosts.as_view(), name="filter"),
  path('suggested-posts/', views.PostSuggestions.as_view(), name="post_list_by_suggestions"),
  path('record-click/<int:post_id>', views.RecordPostClick.as_view(), name="post_clicked_by_user"),
  path('post/<int:post_id>/', views.PostView.as_view(), name='post_view'),
  path('save-post/<int:post_id>', views.SavedPostView.as_view(), name="save_post_post_delete"),
  path('save-post/', views.SavedPostView.as_view(), name="save_post_get"),
]
