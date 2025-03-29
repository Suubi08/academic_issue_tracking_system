from django.db.models.signals import post_save
from django.contrib.auth.models import Group
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import User, Issue, Notification

# @receiver(post_save, sender=User)
# def assign_user_group(sender, instance, created, **kwargs):
#     if created: #Only assign groups when a new user is created
#         if instance.role == "student":
#             group, _ = Group.objects.get_or_create(name='Student')
#         elif instance.role == "lecturer":
#             group, _ = Group.objects.get_or_create(name="Lecturer")
#         elif instance.role == "academic_registrar":
#             group, _ = Group.objects.get_or_create(name="Academic Registrar")
#         elif instance.role == "admin":
#             group, _ = Group.objects.get_or_create(name="Adminstrator")
#         else:
#             return   #Skip if no valid role

#             instance.groups.add(group) #Assign the user to the correct group


@receiver(post_save, sender=Issue)
def send_assignment_email(sender, instance, created, **kwargs):
    """
    Code to send an email notification when an issue is assigned to a user.
    """
    if instance.assigned_to: # Check if an issue is assigned
        subject = f"New Issue Assigned: {instance.title}"
        message = f"""
        Hello {instance.assigned_to.first_name},

        A new issue has been assigned to you on the Academic Issue Tracking System.

        **Title:** {instance.title}
        **Description:** {instance.description}
        **Priority:** {instance.priority.capitalize()}
        **Status:** {instance.status.capitalize()}
        **Created By:** {instance.created_by.username}

        Please log into your dashboard to take action.

        Regards,
        AITS Team
        """
        recipient_email = instance.assigned_to.email

        #Send the email
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [recipient_email])

        #Create a Notification for the user (Dashboard alert)
        Notification.objects.create(
            user=instance.assigned_to, 
            message=f"You have been assigned a new issue: {instance.title}"
        )
