from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=200, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=50)
    role = models.CharField(max_length=150)

    def __str__(self):
        return self.username

class Issue(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=100)
    status = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reported_issues')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='assigned_issues')

    def __str__(self):
        return self.title

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    message = models.TextField()
    status = models.CharField(max_length=20)

    def __str__(self):
        return f'Notification for {self.user.username}'

class Comment(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username}"

class Attachment(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE)
    file = models.FileField(upload_to='attachments/')
    upload_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attachment for {self.issue.title}"