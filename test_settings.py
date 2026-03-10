import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'christ_like_missionaries.settings')
django.setup()

from django.apps import apps
print("All installed apps:")
for app in apps.get_app_configs():
    print(f"  - {app.name}")

print("\nINSTALLED_APPS from settings:")
from christ_like_missionaries import settings as dj_settings
print(dj_settings.INSTALLED_APPS)
