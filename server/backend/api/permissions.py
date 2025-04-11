# permissions.py
from rest_framework.permissions import BasePermission

class IsLecturerUser(BasePermission):
    """
    Allows access only to users in the 'Lecturer' group.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.groups.filter(name="Lecturer").exists()


