from django.urls import path
from .views import *

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = 'accounts'

urlpatterns = [
    path('get-current-user-id/', get_current_user_id, name='get_current_user_id'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('search-user/<str:username>/', SearchByUser.as_view(), name='search_by_user'),
    path('profile/create/', ProfileCreateView.as_view(), name='profile_create'),
    path('profile/<int:user_id>/', ProfileView.as_view(), name='profile_view'),
    path('profile/', ProfileView.as_view(), name='profile_view_without_id'),
    path('profile/delete/', ProfileDeleteView.as_view(), name='profile_delete'),
]
