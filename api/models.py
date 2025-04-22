from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.
class User (AbstractUser):
    ROLE_CHOICES= [
        ('student', 'Student'),
        ('lecturer', 'Lecturer'),
        ('academic_registrar', 'Academic Registrar'),
        ('admin', 'Administrator'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="student")
    
    
    student_number = models.CharField(max_length=20, blank=True, null= True)
    course_name = models.CharField(max_length=100, blank=True, null=True)
    college = models.CharField(max_length=100, blank=True, null=True)
    
    lecturer_number = models.CharField(max_length=20, blank=True, null=True)
    subject_taught = models.TextField(blank=True, null=True)
    department = models.CharField(max_length=50, blank=True, null=True)
    
    groups = models.ManyToManyField("auth.Group", related_name="custom_user_groups", blank=True)
    user_permissions = models.ManyToManyField("auth.Permission", related_name="custom_user_permissions", blank=True)     
    
    def save(self, *args, **kwargs):
       if self.role == 'student':
         if not self.student_number or not self.course_name or not self.college:
            raise ValueError("Student-specific fields must be filled.")
      
         self.lecturer_number = None
         self.subject_taught= None
         self.department = None
           
       elif self.role =="lecturer":  
         if not self.lecturer_number or not self.subject_taught or not self.department:
           raise ValueError("Lecturer-specific fileds must be filled.")
         
         self.student_number = None
         self.course_name = None
         self.college = None
         
       elif self.role in ['academic_registrar', 'admin']:
         self.student_number = None
         self.course_name = None
         self.lecturer_number = None
         self.subject_taught = None

       super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.username} ({self.role})"
    
class Notification(models.Model):
        user = models.ForeignKey(User, on_delete=models.CASCADE)
        message = models.TextField()
        status = models.BooleanField(default=False)
        created_at = models.DateTimeField(auto_now_add=True)

        def __str__(self):
           return f"Notification for {self.user.username}"
           
        
class Issue(models.Model):
    STATUS_CHOICE =[
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]
    
    category = models.CharField(max_length=120)
    date_of_issue = models.DateField()
    course_unit = models.CharField(max_length=200)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, limit_choices_to = {'role': 'lecturer'})
    description = models.TextField()
    attachment = models.FileField(upload_to='issue_attachment/', null=True, blank=True)
    year_of_study = models.CharField(max_length=50)
    semester = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICE, default='open')
    created_by = models.ForeignKey(User, related_name='created_issues', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
       return f"{self.category} - {self.status}"
       
    
class Comment(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
class Attachment(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to='attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
        
    
     
    
    
    
          
        
        
    
    
    


    
    
    
