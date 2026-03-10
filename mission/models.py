from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from datetime import datetime

# User Role Choices
ROLE_CHOICES = [
    ('admin', 'Administrator'),
    ('missionary', 'Missionary'),
    ('supporter', 'Supporter'),
]

# Mission Status Choices
MISSION_STATUS_CHOICES = [
    ('planning', 'Planning'),
    ('active', 'Active'),
    ('completed', 'Completed'),
    ('paused', 'Paused'),
]


class UserProfile(models.Model):
    """Extended user profile with role support"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='supporter')
    bio = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    photo = models.ImageField(upload_to='user_photos/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username} ({self.role})"


class Missionary(models.Model):
    """Missionary model with detailed information"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='missionary', null=True, blank=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    bio = models.TextField()
    photo = models.ImageField(upload_to='missionary_photos/', blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    specialization = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Missionary'
        verbose_name_plural = 'Missionaries'
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class Mission(models.Model):
    """Mission model for organizing missionary work"""
    title = models.CharField(max_length=255)
    description = models.TextField()
    missionary = models.ForeignKey(Missionary, on_delete=models.CASCADE, related_name='missions')
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=MISSION_STATUS_CHOICES,
        default='planning'
    )
    location = models.CharField(max_length=255)
    target_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        default=0
    )
    image = models.ImageField(upload_to='mission_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Mission'
        verbose_name_plural = 'Missions'
        ordering = ['-start_date']

    def __str__(self):
        return self.title

    def total_donated(self):
        """Calculate total donations for this mission"""
        return self.donations.aggregate(models.Sum('amount'))['amount__sum'] or 0

    def progress_percentage(self):
        """Calculate donation progress percentage"""
        if self.target_amount == 0:
            return 0
        return min((self.total_donated() / self.target_amount) * 100, 100)


class Donation(models.Model):
    """Donation model for tracking supporter contributions"""
    mission = models.ForeignKey(Mission, on_delete=models.CASCADE, related_name='donations')
    supporter = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='donations'
    )
    supporter_name = models.CharField(max_length=255)
    supporter_email = models.EmailField()
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.01)]
    )
    message = models.TextField(blank=True, null=True)
    transaction_id = models.CharField(max_length=255, unique=True)
    is_anonymous = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Donation'
        verbose_name_plural = 'Donations'
        ordering = ['-created_at']

    def __str__(self):
        donor = "Anonymous" if self.is_anonymous else self.supporter_name
        return f"${self.amount} donation to {self.mission.title} by {donor}"
