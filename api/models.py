from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.
class user (AbstractUser):
    ROLE_CHOICES= [
        ('student', 'Student'),
        ('lecturer', 'Lecturer')
        ('admin', 'Administrator'),
             ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    
    # modifing custom model
    student = models.CharField(max_length=50, blank=True, Null= True)
    course_name = models.CharField(max_length=20, blank=True, null=True)
    college = models.CharField(max_length=100, blank=True, null=True)
    
    lecturer = models.CharField(max_length=50, blank=True, null=True)
    course_name = models.CharField(max_length=20, blank=True, null=True)
    college = models.CharField(max_length=50, blank=True, null=True)
    department = models.CharField(max_length=50, blank=True, null=True)
    
    group = models.ManyToManyField(
        Group, related_name="custom_user_groups", blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission, related_name="custom_user_permissions", blank=True
             
    )
    def save(self, *args, **kwargs):
        if self.role in ['academic_registrar', 'admin']:
            self.department =None
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.username} ({self.role})"
    
    class Notification(models.Model):
        user = models.ForeignKey(user, on_delete=models.CASCADE)
        message = models.TextField()
        status = models.BooleanField(default=False)
        created_at = models.DateTimeField(auto_bow_add=True)
class Issue(models.Model):
    STATUS_CHOICE =[
        ('pending', 'Pending'),
        ('in_progess', 'In Progress'),
        ('resolved', 'Resolved')
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    status = models.CharField(max_length=15, choices=STATUS_CHOICE, default='pending')
    student = models.ForeignKey(user, on_delete=models.CASCADE, related_name='issues')
    assigned_to = models.ForeignKey(user, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_issues')
    created_at = models.DateTimeField(auto_now_add=True)
    
class Comments(models.Model):
    Issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(user, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
class Attachments(models.Model):
    Issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='attachment')
    file = models.FileField(upload_to='attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
        
    
     
    
    
    
          
        
        
    
    
    


    
    
    