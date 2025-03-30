from django.shortcuts import render
from django.shortcuts import render
from django.contrib.auth.models import update_last_login
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView
from .models import User, Issue, Notification
from rest_framework import generics, status
from .serializers import UserSerializer, IssueSerializer, NotificationSerializer, RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

    
class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        print("Incoming Data from React:", request.data) 
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered succefully"}, status=status.HTTP_201_CREATED)
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



# Create your views here.
