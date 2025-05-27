from turtle import mode
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import User, Issue, Notification,Comments
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

    def create(self, validated_data):  # validating data input
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
        fields = [
            'id',
            'username',
            'email',
            'role',
            'first_name',
            'last_name',
            'student_number',
            'course_name',
            'college',
            'lecture_number',
            'subject_taught',
            'department',
        ]

class IssueSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role="lecturer"),
        required=False,
        allow_null=True
    )
    student_full_name = serializers.SerializerMethodField()
    student_number = serializers.SerializerMethodField()
    surname = serializers.SerializerMethodField()
    student_course = serializers.SerializerMethodField()
    lecturer_id = serializers.SerializerMethodField()
    assigned_to_name = serializers.SerializerMethodField()

    class Meta:
        model = Issue
        fields = '__all__'  # Includes all model fields
        extra_fields = [
            'student_full_name', 'student_number', 'surname',
            'student_course', 'lecturer_id', 'assigned_to_name'
        ]  # These are added on top of model fields

    def get_student_course(self, obj):
        return obj.created_by.college if hasattr(obj.created_by, "college") else ""

    def get_surname(self, obj):
        return obj.created_by.username

    def get_student_number(self, obj):
        return getattr(obj.created_by, "student_number", "")

    def get_lecturer_id(self, obj):
        return obj.assigned_to.id if obj.assigned_to else None

    def get_student_full_name(self, obj):
        if obj.created_by:
            return f"{obj.created_by.first_name} {obj.created_by.last_name}".strip()
        return ""

    def get_assigned_to_name(self, obj):
        if obj.assigned_to:
            return f"{obj.assigned_to.first_name} {obj.assigned_to.last_name}"
        return None


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'title', 'message', 'type', 'read', 'timestamp']


class CommentsSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # This shows the username instead of the user ID
    issue = serializers.PrimaryKeyRelatedField(queryset=Issue.objects.all())  # Shows the ID of the related issue

    class Meta:
        model = Comments
        fields = ['id', 'issue', 'user', 'message', 'created_at']
        read_only_fields = ['created_at']  # created_at should be read-only
