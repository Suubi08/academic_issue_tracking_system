from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, LoginView, RefreshTokenView
from .views import UserListView, IssueListView, IssueDetailView, NotificationListView

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('issues/', IssueListView.as_view(), name='issue-list'),
    path('issues/<int:pk>/', IssueDetailView.as_view(), name='issue-detail'),
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
