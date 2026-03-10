with open('christ_like_missionaries/settings.py', 'r') as f:
    content = f.read()
    
# Find INSTALLED_APPS
import_idx = content.find('INSTALLED_APPS = [')
bracket_end = content.find(']', import_idx)
installed_apps_str = content[import_idx:bracket_end+1]
print("Found in file:")
print(installed_apps_str)
print("\n\n")

# Also try to import
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'christ_like_missionaries.settings')

# Force fresh import
import importlib
if 'django.conf' in __import__('sys').modules:
    del __import__('sys').modules['django.conf']

django.setup()

from django.conf import settings
print("INSTALLED_APPS from django.conf:")
print(settings.INSTALLED_APPS)
