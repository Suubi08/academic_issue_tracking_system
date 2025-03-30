from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, LoginView, RefreshTokenView
from .views import UserListView, IssueListView, IssueDetailView, NotificationListView

# Listing all users
urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('issues/', IssueListView.as_view(), name='issue-list'),
    path('issues/<int:pk>/', IssueDetailView.as_view(), name='issue-detail'), #Endpoint for retrieving, updating, and deleting issue by a pk
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", RefreshTokenView.as_view(), name="token_refresh"),
]
