# PostgreSQL Setup Instructions for Windows

## Option 1: Using PostgreSQL installed locally

1. Open PostgreSQL command line (pgAdmin or psql):
   ```
   psql -U postgres
   ```

2. Create database and user:
   ```sql
   CREATE DATABASE christ_like_missionaries;
   CREATE USER django_user WITH PASSWORD 'django_password';
   ALTER ROLE django_user SET client_encoding TO 'utf8';
   ALTER ROLE django_user SET default_transaction_isolation TO 'read committed';
   ALTER ROLE django_user SET default_transaction_deferrable TO on;
   ALTER ROLE django_user SET timezone TO 'UTC';
   GRANT ALL PRIVILEGES ON DATABASE christ_like_missionaries TO django_user;
   \q
   ```

## Option 2: Using the default postgres user (simpler)

If you want to use 'postgres' user with 'postgres' password (as configured in settings.py):
   ```sql
   psql -U postgres -c "CREATE DATABASE christ_like_missionaries;"
   ```

## After database is created, run these commands:

```bash
# Activate virtual environment
. .\venv\Scripts\Activate.ps1

# Make migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

Server will be available at: http://localhost:8000
Admin dashboard: http://localhost:8000/admin
API root: http://localhost:8000/api/
