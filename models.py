from django.contrib.auth.models import AbstractUser
from django.db import models

# Abstract Base Model
class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True  # This makes it an abstract base model

# Custom User Model using AbstractUser
class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('lecturer', 'Lecturer'),
        ('student', 'Student'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    # Fix related name conflict for groups and user_permissions
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="custom_user_groups",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="custom_user_permissions",
        blank=True
    )

# Issue Model
class Issue(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    status = models.CharField(max_length=50)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='student_issues')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='assigned_issues')

# Comment Model
class Comment(BaseModel):
    message = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='comments')

# Notification Model
class Notification(BaseModel):
    message = models.TextField()
    status = models.CharField(max_length=20)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

# Attachment Model
class Attachment(BaseModel):
    file = models.FileField(upload_to='attachments/')
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='attachments')

