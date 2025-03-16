from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import User, Issue, Notification, Comment, Attachment
from .serializers import UserSerializer, IssueSerializer, NotificationSerializer, CommentSerializer, AttachmentSerializer

# User View - List & Create
class APIHomeView(APIView):
    def get(self, request):
        # Get the base URL (protocol + host)
        base_url = f"{request.scheme}://{request.get_host()}"

        # Return the full URLs for the API endpoints
        return Response([
            f"{base_url}/api/users/",
            f"{base_url}/api/issues/",
            f"{base_url}/api/notifications/",
            f"{base_url}/api/comments/",
            f"{base_url}/api/attachments/"
        ], status=status.HTTP_200_OK)

class UserListCreateAPIView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Issue View - List, Create, Retrieve, Update, Delete
class IssueListCreateAPIView(ListCreateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

class IssueRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

# Notification View - List & Create
class NotificationListCreateAPIView(ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

# Comment View - List & Create
class CommentListCreateAPIView(ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

# Attachment View - List & Create
class AttachmentListCreateAPIView(ListCreateAPIView):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer

# Optional: If you need API views for individual resources
class UserRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class NotificationRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class CommentRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class AttachmentRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer
