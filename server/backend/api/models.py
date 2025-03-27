from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# User model.
class User(AbstractUser):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('lecturer', 'Lecture'),
        ('academic_registrar', 'Academic Registrar'),
        ('admin', 'Administrator'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    #Student-specific fields
    student_number = models.CharField(max_length=20, blank=True, null=True)
    course_name = models.CharField(max_length=100, blank=True, null=True)
    college = models.CharField(max_length=100, blank=True, null=True)

    # Lecture-Specific fields
    lecture_number = models.CharField(max_length=20, blank=True, null=True)
    subject_taught = models.TextField(blank=True, null=True)

    department = models.CharField(max_length=100, blank=True, null=True) 

    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_groups",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",
        blank=True
    )

    def save(self, *args, **kwargs):
        """Automatically handle department and college based on role"""
        if self.role in ['academic_registrar', 'admin']:
            self.department = None #Academic Registrar & Admins do not belong to a department
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.username} ({self.role})"

# Notifications model
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user.username}"

# Issues model
class Issue(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=[("open", "Open"), ("in_progress", "In Progress"), ("resolved", "Resolved")],
        default="open",
    )
    priority = models.CharField(
        max_length=10,
        choices=[("low", "Low"), ("medium", "Medium"), ("high", "High")],
        default="medium",
    )
    created_by = models.ForeignKey(User, related_name="created_issues", null=True, blank=True, on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(User, related_name="assigned_issues", on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

# Comments model
class Comments(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

# Attachment modle
class Attachment(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to='attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)