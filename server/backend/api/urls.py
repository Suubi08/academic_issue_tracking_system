from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, LoginView, RefreshTokenView, create_issue
from .views import UserListView, IssueListView, LecturerListView, IssueDetailView, NotificationListView,CommentListCreateAPIView, CommentRetrieveUpdateDeleteAPIView,IssueStatusUpdateView
from .views import NotificationDetailView,LecturerDetailView, lecturer_issue_counts, RegistrarDetailView, StudentDetailView

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('issues/', IssueListView.as_view(), name='issue-list'),
    path('issues/<int:pk>/', IssueDetailView.as_view(), name='issue-detail'),
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", RefreshTokenView.as_view(), name="token_refresh"),
    path("users/lecturer/", LecturerListView.as_view(), name="lecturer-list"),
    path('users/lecturer/<int:pk>/', LecturerDetailView.as_view(), name='lecturer-detail'),
    path('comments/', CommentListCreateAPIView.as_view(), name='comment-list-create'),
    path('comments/<int:pk>/', CommentRetrieveUpdateDeleteAPIView.as_view(), name='comment-retrieve-update-delete'),
    path('issues/<int:pk>/status/', IssueStatusUpdateView.as_view(), name='issue-status-update'),
    path('notifications/<int:pk>/', NotificationDetailView.as_view(), name='notification-detail'),
    path('issues/lecturer/<int:lecturer_id>/counts/', lecturer_issue_counts, name='lecturer-issue-counts'),
    path('users/registrar/<int:pk>/', RegistrarDetailView.as_view(), name='registrar-detail'),
    path('users/student/<int:pk>/', StudentDetailView.as_view(), name='student-detail'),

]