from django.db.models.signals import post_save
from django.contrib.auth.models import Group
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import User, Issue, Notification

@receiver(post_save, sender=User)
def assign_user_group(sender, instance, created, **kwargs):
    if created:  # Only assign groups when a new user is created
        if instance.role == "student":
            group, _ = Group.objects.get_or_create(name='Student')
        elif instance.role == "lecturer":
            group, _ = Group.objects.get_or_create(name="Lecturer")
        elif instance.role == "academic_registrar":
            group, _ = Group.objects.get_or_create(name="Academic Registrar")
        elif instance.role == "admin":
            group, _ = Group.objects.get_or_create(name="Administrator")
        else:
            return   # Skip if no valid role

        instance.groups.add(group)  # Assign the user to the correct group

@receiver(post_save, sender=Issue)
def issue_notification(sender, instance, created, **kwargs):
    """
    Handles notifications and emails when an issue is created or assigned.
    """
    # Notify on issue creation
    if created:
        # Notify all admins and registrars
        for user in User.objects.filter(role__in=['admin', 'academic_registrar']):
            Notification.objects.create(
                user=user,
                title="New Issue Submitted",
                message=f"A new issue has been submitted: {instance.description}",
                type="info"
            )

    # Notify and email on assignment (only if assigned_to is set)
    if instance.assigned_to:
        # Send assignment email
        subject = f"New Issue Assigned: {instance.description}"
        message = f"""
        Hello {instance.assigned_to.first_name},

        A new issue has been assigned to you on the Academic Issue Tracking System.

        *Title:* 
        *Description:* {instance.description}
        *Status:* {instance.status.capitalize()}
        *Created By:* {instance.created_by.username}

        Please log into your dashboard to take action.

        Regards,
        AITS Team
        """
        recipient_email = instance.assigned_to.email
        send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [recipient_email])

        # Create a Notification for the assigned user (Dashboard alert)
        Notification.objects.create(
            user=instance.assigned_to,
            title="New Issue Assigned",
            message=f"You have been assigned a new issue: {instance.description}",
            type="info"
        )

