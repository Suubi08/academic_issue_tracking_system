from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# User model.
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

#creating abstract user with rolse based access
class User(AbstractUser):
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('lecturer', 'Lecturer'),
        ('academic_registrar', 'Academic Registrar'),
        ('admin', 'Administrator'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="student")

    # Student-specific fields
    student_number = models.CharField(max_length=20, blank=True, null=True)
    course_name = models.CharField(max_length=100, blank=True, null=True)
    college = models.CharField(max_length=100, blank=True, null=True)

    # Lecturer-specific fields
    lecture_number = models.CharField(max_length=20, blank=True, null=True)
    subject_taught = models.TextField(blank=True, null=True)
    
    #shared field
    department = models.CharField(max_length=100, blank=True, null=True) 

    # Fix groups and user_permissions
    groups = models.ManyToManyField("auth.Group", related_name="custom_user_groups", blank=True)
    user_permissions = models.ManyToManyField("auth.Permission", related_name="custom_user_permissions", blank=True)

    def save(self, *args, **kwargs):
        """Ensure only role-specific fields are filled for the right roles"""
        if self.role == 'student':
            self.lecture_number = None
            self.subject_taught = None
            self.department = None

        elif self.role == 'lecturer':
            self.student_number = None
            self.course_name = None
            self.college = None

        elif self.role in ['academic_registrar', 'admin']:
            self.student_number = None
            self.course_name = None
            self.lecture_number = None
            self.subject_taught = None

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.role})"
    
# Issues model
class Issue(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]

    #type of the issue to be submitted
    category = models.CharField(max_length=100)
    #date when issue is experienced
    date_of_issue = models.DateField()
    course_unit = models.CharField(max_length=200)
    assigned_to = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        limit_choices_to={'role': 'lecturer'}
    )  # Only lecturers can be assigned
    description = models.TextField()
    attachment = models.FileField(upload_to='issue_attachments/', null=True, blank=True)
    year_of_study = models.CharField(max_length=50)
    semester = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_by = models.ForeignKey(User, related_name='created_issues', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.category} - {self.status}"

# Notifications model
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    def _str_(self):
        return f"Notification for {self.user.username}"

# Comments model
class Comments(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Comment by {self.user.username} on {self.issue}"

# Attachment model
class Attachment(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to='attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"Attachment for issue {self.issue.id}"
