from django.shortcuts import render, redirect
from django.contrib.auth.models import update_last_login
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from .models import User, Issue, Notification, Comments
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserSerializer, IssueSerializer, NotificationSerializer, RegisterSerializer, CommentsSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
import json  # Ensure JSON is imported for json.loads(request.body)
from .models import User, Issue
from .serializers import IssueSerializer
from rest_framework.generics import RetrieveAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.generics import RetrieveAPIView

# from rest_framework import generics, status

# Register User
class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        print("Incoming Data from React:", request.data)
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            # Save the user
            user = serializer.save()

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access = str(refresh.access_token)

            # Prepare response data
            response_data = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "role": user.role,
                "course":user.course_name,
                "username": user.username,
                "student_number": user.student_number,
                "id":user.id,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Login and get JWT Token
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            update_last_login(None, user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "role": user.role,
                "course":user.course_name,
                "username": user.username,
                "student_number": user.student_number,
                "id":user.id,
            }, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
  
# Refresh Token View
class RefreshTokenView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh")
        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                return Response({"access": str(refresh.access_token)})
            except Exception:
                return Response({"error": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)

class IssueCreateView(generics.CreateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def perform_create(self, serializer):
        # Get the logged-in user and set it as the creator of the issue
        serializer.save(created_by=self.request.user)

    def create(self, request, *args, **kwargs):
        # Manually process the request data before passing it to the serializer
        data = json.loads(request.body)

        # Set the logged-in user as the creator of the issue
        data["created_by"] = request.user.id

        # Handle assigned_to (convert username to user ID if necessary)
        if "assigned_to" in data and data["assigned_to"]:
            try:
                lecturer = User.objects.get(username=data["assigned_to"])
                data["assigned_to"] = lecturer.id  # Replace username with user ID
            except User.DoesNotExist:
                return JsonResponse({"assigned_to": ["Lecturer not found."]}, status=400)

        # Ensure all required fields are present
        required_fields = ["category", "date_of_issue", "course_unit", "description", "year_of_study", "semester"]
        for field in required_fields:
            if field not in data:
                return JsonResponse({field: ["This field is required."]}, status=400)

        # Now validate the updated data with the serializer
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

class LecturerListView(ListAPIView):
    serializer_class = UserSerializer
    filter_backends = [SearchFilter]
    search_fields = ['first_name', 'last_name']

    def get_queryset(self):
        return User.objects.filter(role="lecturer")  # Ensure only lecturers are returned

class UserListView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class IssueListView(ListCreateAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='Lecturer').exists():
            return Issue.objects.filter(assigned_to=user)
        elif user.groups.filter(name='Student').exists():
            return Issue.objects.filter(created_by=user)
        else:
            return Issue.objects.all()
        
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class IssueDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='Lecturer').exists():
            return Issue.objects.filter(assigned_to=user)
        elif user.groups.filter(name='Student').exists():
            return Issue.objects.filter(created_by=user)
        else:
            return Issue.objects.all()

    def get_object(self):
        obj = super().get_object()
        user = self.request.user

        if user.groups.filter(name='Lecturer').exists() and obj.assigned_to != user:
            raise PermissionDenied("You are not assigned to this issue.")
        elif user.groups.filter(name='Student').exists() and obj.created_by != user:
            raise PermissionDenied("You did not create this issue.")
        return obj

class NotificationListView(ListCreateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access

    def get_queryset(self):
        # Ensure the user is authenticated
        if not self.request.user.is_authenticated:
            return Notification.objects.none()  # Return no notifications if the user is not authenticated

        return Notification.objects.filter(user=self.request.user).order_by('-timestamp')

@login_required
def create_issue(request):
    if request.method == "POST":
        data = json.loads(request.body)
        
        # Get the logged-in user
        data["created_by"] = request.user.id

        # Convert lecturer username to user ID if necessary
        if "assigned_to" in data:
            try:
                lecturer = User.objects.get(username=data["assigned_to"])
                data["assigned_to"] = lecturer.id
            except User.DoesNotExist:
                return JsonResponse({"assigned_to": ["Lecturer not found."]}, status=400)

        serializer = IssueSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

from django.shortcuts import get_object_or_404

class CommentListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Retrieve all comments, or filter by issue ID.
        """
        issue_id = request.query_params.get('issue', None)
        if (issue_id is not None):
            comments = Comments.objects.filter(issue_id=issue_id)
        else:
            comments = Comments.objects.all()
        
        serializer = CommentsSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Create a new comment.
        """
        serializer = CommentsSerializer(data=request.data)
        if serializer.is_valid():
            # Add the user who created the comment
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentRetrieveUpdateDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        """
        Helper method to retrieve a comment by its primary key.
        """
        return get_object_or_404(Comments, pk=pk)

    def get(self, request, pk):
        """
        Retrieve a specific comment by its ID.
        """
        comment = self.get_object(pk)
        serializer = CommentsSerializer(comment)
        return Response(serializer.data)

    def put(self, request, pk):
        """
        Update an existing comment.
        """
        comment = self.get_object(pk)
        if comment.user != request.user:
            return Response({"detail": "You do not have permission to edit this comment."}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = CommentsSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Delete a comment.
        """
        comment = self.get_object(pk)
        if comment.user != request.user:
            return Response({"detail": "You do not have permission to delete this comment."}, status=status.HTTP_403_FORBIDDEN)

        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class IssueStatusUpdateView(generics.UpdateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def update(self, request, *args, **kwargs):
        issue = self.get_object()
        data = request.data

        # Check if 'status' is in the request data
        if 'status' in data:
            # Update the status field
            issue.status = data['status']
            issue.save()

            # Return the updated issue details
            return Response(IssueSerializer(issue).data, status=200)

        # If 'status' isn't provided in the data
        return Response({"status": ["This field is required."]}, status=400)

class NotificationDetailView(RetrieveUpdateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only allow users to access their own notifications
        return Notification.objects.filter(user=self.request.user)

class LecturerDetailView(RetrieveAPIView):
    queryset = User.objects.filter(role="lecturer")
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class RegistrarDetailView(RetrieveAPIView):
    queryset = User.objects.filter(role="academic_registrar")
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class StudentDetailView(generics.RetrieveAPIView):
    queryset = User.objects.filter(role='student')
    serializer_class = UserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def lecturer_issue_counts(request, lecturer_id):
    from .models import Issue
    pending = Issue.objects.filter(assigned_to_id=lecturer_id, status="pending").count()
    resolved = Issue.objects.filter(assigned_to_id=lecturer_id, status="resolved").count()
    total = Issue.objects.filter(assigned_to_id=lecturer_id).count()
    return Response({
        "pending": pending,
        "resolved": resolved,
        "total": total,
    })

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_issue_status(request, issue_id):
    """
    Update the status of an issue.
    """
    issue = get_object_or_404(Issue, id=issue_id)

    # Check if the request user is the one assigned to the issue
    if issue.assigned_to != request.user:
        return Response({"detail": "You do not have permission to update this issue."}, status=status.HTTP_403_FORBIDDEN)

    serializer = IssueSerializer(issue, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)