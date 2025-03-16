from django.urls import path
from .views import (
    APIHomeView,
    UserListCreateAPIView,
    IssueListCreateAPIView,
    IssueRetrieveUpdateDestroyAPIView,
    NotificationListCreateAPIView,
    CommentListCreateAPIView,
    AttachmentListCreateAPIView
)

urlpatterns = [
    path('', APIHomeView.as_view(), name='api-home'), 
    path('users/', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('issues/', IssueListCreateAPIView.as_view(), name='issue-list-create'),
    path('issues/<int:pk>/', IssueRetrieveUpdateDestroyAPIView.as_view(), name='issue-detail'),
    path('notifications/', NotificationListCreateAPIView.as_view(), name='notification-list-create'),
    path('comments/', CommentListCreateAPIView.as_view(), name='comment-list-create'),
    path('attachments/', AttachmentListCreateAPIView.as_view(), name='attachment-list-create'),
]
