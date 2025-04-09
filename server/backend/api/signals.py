from django.db.models.signals import post_save
from django.contrib.auth.models import Group
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import User, Issue, Notification




@receiver(post_save, sender=Issue)
def send_assignment_email(sender, instance, created, **kwargs):
    """
    Send an email when an issue is assigned to a user.
    """
    if instance.assigned_to:  # Only send if someone is assigned

        subject = "New Issue Assigned"

        message = f"""
        Hello {instance.assigned_to.first_name},

        A new issue has been assigned to you on the Academic Issue Tracking System.

        Category: {instance.category}
        Description: {instance.description}
        Status: {instance.status.capitalize()}
        Created By: {instance.created_by.username}

        Please log into your dashboard to take action.

        Regards,
        AITS Team
        """

        recipient_email = instance.assigned_to.email

        # Send the email notification
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [recipient_email])

        # Create a dashboard notification
        Notification.objects.create(
            user=instance.assigned_to,
            message=f"You have been assigned a new issue."
        )
