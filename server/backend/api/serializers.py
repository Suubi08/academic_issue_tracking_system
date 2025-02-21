from django.contrib.auth.models import User
from rest_framework import serializers
from .models import User, Issue, Notification

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'confirm_password', 'role', 
                  'student_number', 'course_name', 'college', 
                  'lecture_number', 'subjects_taught', 'department']
        
        def validate(self, data):
            if data['password'] != data['confirm_password']:
                raise serializers.ValidationError("Passwords do not match!")
            return data
        
        def create(self, validated_data):
            validated_data.pop('confirm_password') # Remove confirm_password before saving the data
            user = User.objects.create_user(**validated_data)
            return user

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'confirm_password', 'role',
            'student_number', 'course_name', 'college',
            'lecture_number', 'subject_taught'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "passwords do not match."})
        
        role = data.get('role')
        if role == 'student' and not all([data.get('student_number'), data.get('course_name'), data.get('college')]):
            raise serializers.ValidationError({"student_info": "Student must provide student number, course name, and college."})
        
        if role == 'lecture' and not all([data.get('lecture_number'), data.get('subjects_taught')]):
            raise serializers.ValidationError({"lecturer_info": "Lecturers must provide lecture number and subjects taught."})
         
        return data

    def create(self, validate_data):
        validate_data.pop('confirm_password')  #Remove confirm_password before data is saved
        user = User.objects.create_user(**validate_data)
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
