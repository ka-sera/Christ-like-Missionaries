import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'christ_like_missionaries.settings')
django.setup()

from django.contrib.auth.models import User

# Set password for admin user
admin = User.objects.get(username='admin')
admin.set_password('admin123')
admin.save()
print("Admin password set to: admin123")
