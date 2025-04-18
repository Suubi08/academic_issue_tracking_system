from django.shortcuts import render, redirect
from django.contrib.auth.models import update_last_login
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from rest_framework import filters
from rest_framework import status as http_status
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from .models import User, Issue, Notification
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserSerializer, IssueStatusUpdateSerializer, IssueSerializer, NotificationSerializer, RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from .permissions import IsLecturerUser
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
import json  # Ensure JSON is imported for `json.loads(request.body)`

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
                "username": user.username,
                "role": user.role,
                "id": user.id,
                "course": user.course_name,
                "student_number": user.student_number,
                "access": access,
                "refresh": str(refresh),
                "message": "User registered successfully",
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
                "username": user.username,  # Include this field
                "role": user.role,
                "course":user.course_name,
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
    parser_classes = (MultiPartParser, FormParser)  # Support file uploads

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
  # Set the user automatically

class IssueStatusUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsLecturerUser]

    def put(self, request, pk):
        try:
            issue = Issue.objects.get(pk=pk)
        except Issue.DoesNotExist:
            return Response({"detail": "Issue not found."}, status=http_status.HTTP_404_NOT_FOUND)

        serializer = IssueStatusUpdateSerializer(issue, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=http_status.HTTP_200_OK)
        return Response(serializer.errors, status=http_status.HTTP_400_BAD_REQUEST)

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
    filter_backends = [filters.SearchFilter]
    permission_classes = [IsAuthenticated]
    search_fields = ['category', 'course_unit', 'description']

    def get_queryset(self):
        user = self.request.user
        return Issue.objects.filter(created_by=user)


class IssueDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

class NotificationListView(ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer


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

