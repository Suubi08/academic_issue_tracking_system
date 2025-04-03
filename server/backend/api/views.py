from django.shortcuts import render, redirect
from django.contrib.auth.models import update_last_login
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from rest_framework.filters import SearchFilter
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from .models import User, Issue, Notification
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import UserSerializer, IssueSerializer, NotificationSerializer, RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
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
                "access": access,
                "refresh": str(refresh),
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Login and get JWT Token
class LoginView(APIView):
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
                "role": user.role
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
        serializer.save(created_by=self.request.user)  # Set the user automatically

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
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

class IssueDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

class NotificationListView(ListCreateAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
