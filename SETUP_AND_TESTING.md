# Christ-Like Missionaries - Complete Setup & Testing Guide

## Overview

This is a full-stack Django + React application with REST API for managing missionaries, missions, and donations.

### Architecture

```
Backend: Django 6.0.2 + Django REST Framework
Frontend: React 18 + Vite + Tailwind CSS
Database: SQLite (development) / PostgreSQL (production ready)
Authentication: Token-based (Django REST Framework)
```

---

## Part 1: Backend Setup

### Prerequisites

- Python 3.8+
- PostgreSQL 12+ (optional, SQLite used by default)

### Step 1: Activate Virtual Environment

```bash
cd c:\Users\user\Documents\christ_like_missionaries

# Windows PowerShell
. .\venv\Scripts\Activate.ps1

# Windows CMD
venv\Scripts\activate.bat
```

### Step 2: Database Setup (Already Done)

**Current configuration uses SQLite.** To switch to PostgreSQL:

Edit `christ_like_missionaries/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'christ_like_missionaries',
        'USER': 'your_postgres_user',
        'PASSWORD': 'your_postgres_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

Create PostgreSQL database:
```sql
CREATE DATABASE christ_like_missionaries;
```

### Step 3: Run Migrations (Already Done)

```bash
python manage.py migrate
```

Expected output: All migrations applied successfully.

### Step 4: Create Admin User (Already Done)

Admin credentials:
- **Username:** admin
- **Password:** admin123

To create another admin:
```bash
python manage.py createsuperuser
```

### Step 5: Start Backend Server

```bash
python manage.py runserver
```

Server runs at: **http://localhost:8000**

---

## Part 2: API Endpoints Testing

### Authentication

#### Register User
```bash
curl -X POST http://localhost:8000/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepass123"
  }'
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  },
  "token": "9944b09199c62bcf9418ad846dd0e4bbea6f3fab"
}
```

#### Login
```bash
curl -X POST http://localhost:8000/api/api-token-auth/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securepass123"
  }'
```

**Response:**
```json
{
  "token": "9944b09199c62bcf9418ad846dd0e4bbea6f3fab"
}
```

### Missionaries

#### List All Missionaries
```bash
curl http://localhost:8000/api/missionaries/
```

#### Create Missionary (Admin Only)
```bash
curl -X POST http://localhost:8000/api/missionaries/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "555-1234",
    "bio": "Dedicated missionary with 10 years of experience",
    "location": "Kenya",
    "specialization": "Education"
  }'
```

#### Get Missionary Details
```bash
curl http://localhost:8000/api/missionaries/1/
```

#### Get Missionary's Missions
```bash
curl http://localhost:8000/api/missionaries/1/missions/
```

### Missions

#### List All Missions
```bash
curl http://localhost:8000/api/missions/
```

#### Get Active Missions Only
```bash
curl http://localhost:8000/api/missions/active/
```

#### Get Completed Missions
```bash
curl http://localhost:8000/api/missions/completed/
```

#### Get Mission Details with Donations
```bash
curl http://localhost:8000/api/missions/1/
```

#### Get Mission Statistics
```bash
curl http://localhost:8000/api/missions/1/statistics/
```

**Response:**
```json
{
  "mission_id": 1,
  "mission_title": "Water Well Project",
  "total_donations": 45,
  "total_amount": "12500.00",
  "target_amount": "20000.00",
  "progress_percentage": 62.5,
  "average_donation": "277.78",
  "largest_donation": "5000.00"
}
```

#### Create Mission
```bash
curl -X POST http://localhost:8000/api/missions/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "School Building Project",
    "description": "Building a new school in rural area",
    "missionary": 1,
    "start_date": "2026-03-01",
    "end_date": "2026-12-31",
    "status": "planning",
    "location": "Tanzania",
    "target_amount": "50000.00"
  }'
```

### Donations

#### Create Donation
```bash
curl -X POST http://localhost:8000/api/donations/ \
  -H "Content-Type: application/json" \
  -d '{
    "mission": 1,
    "supporter_name": "Sarah Johnson",
    "supporter_email": "sarah@example.com",
    "amount": "500.00",
    "transaction_id": "TXN_20260209_001",
    "message": "Great work, keep it up!",
    "is_anonymous": false
  }'
```

#### Get Donation Statistics
```bash
curl http://localhost:8000/api/donations/statistics/
```

**Response:**
```json
{
  "total_donations": 120,
  "total_amount": "45320.50",
  "average_donation": "377.67",
  "largest_donation": "5000.00",
  "unique_donors": 85
}
```

#### Get My Donations (Authenticated)
```bash
curl -X POST http://localhost:8000/api/donations/my_donations/ \
  -H "Authorization: Token YOUR_TOKEN"
```

---

## Part 3: Admin Dashboard

Access Django admin at: **http://localhost:8000/admin**

**Login credentials:**
- Username: `admin`
- Password: `admin123`

### Available Management Pages

1. **Users** - Manage user accounts
2. **Profiles** - User roles and permissions
3. **Missionaries** - Add/edit missionaries
4. **Missions** - Create and manage missions
5. **Donations** - Track donations

---

## Part 4: Frontend Setup

### Prerequisites

- Node.js 16+ and npm

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure API URL (Optional)

Create `.env` file in frontend directory:

```
VITE_API_URL=http://localhost:8000/api
```

### Step 4: Start Development Server

```bash
npm run dev
```

Frontend runs at: **http://localhost:5173**

### Step 5: Build for Production

```bash
npm run build
```

Output in `dist/` directory.

---

## Part 5: Testing Workflow

### Complete User Journey Test

1. **Open Frontend:**
   ```
   http://localhost:5173
   ```

2. **Register New Account:**
   - Click "Register"
   - Fill in details
   - Submit

3. **Login:**
   - Click "Login"
   - Enter credentials
   - Redirected to Dashboard

4. **View Missions:**
   - Click "Missions" in navigation
   - See list of active missions
   - Click to view details

5. **Make Donation:**
   - On mission detail page
   - Enter donation details
   - Submit

6. **View Dashboard:**
   - See profile info
   - View donation history

---

## Part 6: API Documentation

### Authentication Header

All protected endpoints require:
```
Authorization: Token <your_token>
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

### Search & Filtering

List endpoints support filtering:

```bash
# Search missionaries by name
curl "http://localhost:8000/api/missionaries/?search=john"

# Filter missions by status
curl "http://localhost:8000/api/missions/?search=active"

# Order by field
curl "http://localhost:8000/api/missions/?ordering=-created_at"
```

---

## Part 7: Deployment Checklist

### Before Production:

- [ ] Change `DEBUG = False` in settings.py
- [ ] Set secure `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Use PostgreSQL instead of SQLite
- [ ] Set up HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set up environment variables
- [ ] Run `python manage.py collectstatic`
- [ ] Set up proper logging
- [ ] Test all API endpoints
- [ ] Build and test React frontend

### Deployment Options:

1. **Heroku**
2. **AWS (EC2 + RDS)**
3. **DigitalOcean**
4. **Azure App Service**
5. **Self-hosted VPS**

---

## Part 8: Troubleshooting

### Backend Issues

**"No module named 'psycopg2'"**
```bash
pip install psycopg2-binary
```

**"Module psycopg2 not available"**
Switch to SQLite temporarily in settings.py

**"CORS errors"**
Ensure `corsheaders` is in INSTALLED_APPS and MIDDLEWARE

### Frontend Issues

**"API not responding"**
Check backend is running on port 8000
Check VITE_API_URL is correct

**"Token not persisting**
Check localStorage is enabled
Check token is being saved in authStore

---

## Part 9: Project Structure

```
christ_like_missionaries/
├── manage.py
├── db.sqlite3
├── christ_like_missionaries/
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── mission/
│   ├── models.py          # All data models
│   ├── serializers.py     # REST API serializers
│   ├── views.py           # API views (ViewSets)
│   ├── urls.py            # API routing
│   ├── admin.py           # Admin configuration
│   └── migrations/
├── frontend/
│   ├── src/
│   │   ├── pages/         # React pages
│   │   ├── services/      # API client
│   │   ├── stores/        # State management
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── venv/
```

---

## Quick Start Commands

```bash
# Backend
. .\venv\Scripts\Activate.ps1
python manage.py runserver

# Frontend (in new terminal)
cd frontend
npm install
npm run dev
```

Access:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000/api
- **Admin:** http://localhost:8000/admin
- **API Docs:** http://localhost:8000/api/

---

## Support & Next Steps

1. Customize models in `mission/models.py`
2. Add more API endpoints in `mission/views.py`
3. Create additional React pages in `frontend/src/pages/`
4. Add payment integration (Stripe, PayPal)
5. Implement email notifications
6. Add analytics and reporting

---

## License

MIT License - Feel free to use and modify
