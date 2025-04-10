from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, LoginView, RefreshTokenView
from .views import UserListView, IssueListView, LecturerListView, IssueDetailView, NotificationListView

