from django.contrib.auth.models import User
from rest_framework import serializers
from .models import User, Issue, Notification
from django.contrib.auth.hashers import make_password

class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'username', 'email', 
            'password', 'confirm_password', 'role', 
            'student_number', 'course_name', 'college', 
            'lecture_number', 'subject_taught', 'department'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})

        role = data.get('role')

        if role == 'student':
            if not all([data.get('student_number'), data.get('course_name'), data.get('college')]):
                raise serializers.ValidationError(
                    {"student_info": "Students must provide student number, course name, and college."}
                )

        elif role == 'lecturer':
            if not all([data.get('lecture_number'), data.get('subject_taught'), data.get('department')]):
                raise serializers.ValidationError(
                    {"lecturer_info": "Lecturers must provide lecturer number, subjects taught, and department."}
                )

        elif role == 'academic_registrar':
            if not data.get('college'):
                raise serializers.ValidationError(
                    {"academic_registrar_info": "Academic Registrars must belong to a college."}
                )

        elif role == 'admin':
            if not data.get('college'):
                raise serializers.ValidationError(
                    {"admin_info": "Administrators must be assigned to a college or the university."}
                )

        return data

    def create(self, validated_data):
        """Create user & hash password properly"""
        validated_data.pop('confirm_password', None)  # Avoid KeyError

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            role=validated_data.get('role', 'student'),
            student_number=validated_data.get('student_number'),
            course_name=validated_data.get('course_name'),
            college=validated_data.get('college'),
            lecture_number=validated_data.get('lecture_number'),
            subject_taught=validated_data.get('subject_taught'),
            department=validated_data.get('department')
        )

        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'college', 'department']

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
