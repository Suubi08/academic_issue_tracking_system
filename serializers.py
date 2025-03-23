from rest_framework import serializers
from .models import User, Issue, Comment, Notification, Attachment

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

# Issue Serializer
class IssueSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)
    assigned_to = UserSerializer(read_only=True)

    class Meta:
        model = Issue
        fields = ['id', 'title', 'description', 'category', 'status', 'created_at', 'student', 'assigned_to']

# Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'message', 'created_at', 'user', 'issue']

# Notification Serializer
class NotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'message', 'status', 'created_at', 'user']

# Attachment Serializer
class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'file', 'upload_at', 'issue']

