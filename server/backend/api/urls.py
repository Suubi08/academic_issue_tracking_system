from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, LoginView, RefreshTokenView
from .views import UserListView, IssueListView, LecturerListView, IssueDetailView, NotificationListView

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('issues/', IssueListView.as_view(), name='issue-list'),
    path('issues/<int:pk>/', IssueDetailView.as_view(), name='issue-detail'),
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", RefreshTokenView.as_view(), name="token_refresh"),
    path("users/lecturer/", LecturerListView.as_view(), name="lecturer-list"),
]
