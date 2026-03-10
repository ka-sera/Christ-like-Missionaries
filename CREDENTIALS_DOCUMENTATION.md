# Christ-Like Missionaries - Credentials & Authentication Documentation

## Overview
This document contains all login credentials, API tokens, and security keys used in the Christ-Like Missionaries application.

⚠️ **SECURITY WARNING**: This is for development purposes only. Never commit credentials to version control in production environments.

---

## 1. Django Admin Panel

### Admin User Credentials
| Field | Value |
|-------|-------|
| **Username** | `admin` |
| **Password** | `admin123` |
| **Access URL** | http://localhost:8000/admin |

**Setup Method**: Credentials are set via the `set_admin_password.py` script which creates the admin user with these credentials.

---

## 2. Django Security Settings

### SECRET_KEY
```
django-insecure-((3-9k6!(rhtyn()nf^234-%^&q7p+zo9=b0y%$qhebbi7ubs@
```

**Location**: `christ_like_missionaries/settings.py` (Line 23)

**Warning**: This is marked as "insecure" because it contains "django-insecure-" prefix. For production, use environment variables and a secure secret key generator.

---

## 3. Database Configuration

### SQLite (Development)
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

**Database File**: `db.sqlite3` (in project root)

**No credentials required** for SQLite development database.

---

## 4. API Authentication

### Token-Based Authentication
The application uses Django REST Framework's Token Authentication.

**Authentication Endpoint**: 
```
POST /api-token-auth/
```

**Request Format**:
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**Response**:
```json
{
  "token": "your_authentication_token"
}
```

**Token Usage**: Include in request headers:
```
Authorization: Token your_authentication_token
```

---

## 5. User Account Creation

### Default Credentials (via Frontend Registration)
Users can register through the website at:
- **Registration Page**: http://localhost:5173/register

**Registration Requirements**:
- Username (unique)
- Email
- Password
- Password confirmation

Once registered, users can login at:
- **Login Page**: http://localhost:5173/login

---

## 6. CORS & Security Settings

### CORS Settings
```python
CORS_ALLOW_CREDENTIALS = True
```

**Allowed Origins**: 
- `http://localhost:5173` (Frontend development server)
- `http://localhost:3000` (Alternative frontend port)
- `http://127.0.0.1:5173`
- `http://127.0.0.1:3000`

---

## 7. Frontend API Configuration

### API Base URL
```javascript
const BASE_URL = 'http://localhost:8000'
```

**Location**: `frontend/src/services/api.js`

### API Endpoints
| Endpoint | Purpose |
|----------|---------|
| `POST /api-token-auth/` | User login |
| `POST /api/users/` | User registration |
| `POST /api/users/change_password/` | Change password |
| `GET /api/missions/` | List missions |
| `GET /api/missionaries/` | List missionaries |
| `GET /api/donations/` | List donations |
| `GET /api/profiles/` | List user profiles |

---

## 8. Environment Information

### Backend Server
- **URL**: http://localhost:8000
- **Framework**: Django 6.0.2
- **Port**: 8000
- **Debug Mode**: Enabled (Development)

### Frontend Server
- **URL**: http://localhost:5173
- **Framework**: React 18 + Vite
- **Port**: 5173
- **Build Tool**: Vite 5.4.21

---

## 9. Important Security Notes

### For Production Deployment:

1. **Change the SECRET_KEY**
   - Generate a new secure key
   - Store in environment variable
   - Never commit to version control

2. **Update Admin Credentials**
   - Change default `admin/admin123` password
   - Create a superuser with a strong password

3. **Database Security**
   - Switch from SQLite to PostgreSQL
   - Use strong database credentials
   - Never hardcode database passwords

4. **CORS Settings**
   - Remove localhost origins
   - Specify only production domains
   - Set `CORS_ALLOWED_ORIGINS` properly

5. **Environment Variables**
   - Create `.env.production` file
   - Store all credentials in environment variables
   - Use python-decouple or similar package

6. **Debug Mode**
   - Set `DEBUG = False` in production
   - Set `ALLOWED_HOSTS` to production domain

7. **API Tokens**
   - Token-based auth is secure for API
   - Consider adding token expiration
   - Use HTTPS in production (not HTTP)

8. **HTTPS/SSL**
   - Always use HTTPS in production
   - Obtain SSL certificate
   - Redirect HTTP to HTTPS

---

## 10. Password Reset Procedure

### For Admin User
If you forget the admin password, you can reset it by:

1. Running the `set_admin_password.py` script:
   ```bash
   python set_admin_password.py
   ```

2. This will set the password to `admin123`

3. For users, implement a password reset flow via email (currently not configured)

---

## 11. Test Accounts (Development)

You can create test accounts through the frontend registration form for testing purposes.

**Example Test Credentials**:
- **Username**: `testuser`
- **Email**: `test@example.com`
- **Password**: `TestPassword123!`

---

## 12. API Token Management

### Getting a Token
```bash
curl -X POST http://localhost:8000/api-token-auth/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Using a Token
```bash
curl -H "Authorization: Token <your_token>" \
  http://localhost:8000/api/missions/
```

---

## 13. Quick Reference Table

| Component | Credential | Value |
|-----------|-----------|-------|
| Admin Username | Username | `admin` |
| Admin Password | Password | `admin123` |
| Django Secret Key | Key | `django-insecure-((3-9k6!(rhtyn()nf^234-%^&q7p+zo9=b0y%$qhebbi7ubs@` |
| Database Type | DB Engine | SQLite (sqlite3) |
| Backend Server | URL | http://localhost:8000 |
| Frontend Server | URL | http://localhost:5173 |
| Auth Method | Type | Token-based (DRF) |
| API Auth Endpoint | Path | /api-token-auth/ |
| Admin Panel | URL | http://localhost:8000/admin |
| Frontend Login | URL | http://localhost:5173/login |
| Frontend Register | URL | http://localhost:5173/register |

---

## 14. File Locations

| Item | File Path |
|------|-----------|
| Django Settings | `christ_like_missionaries/settings.py` |
| Admin Setup Script | `set_admin_password.py` |
| Database File | `db.sqlite3` |
| API Configuration | `frontend/src/services/api.js` |
| Auth Store | `frontend/src/stores/authStore.js` |
| Login Page | `frontend/src/pages/Login.jsx` |
| Register Page | `frontend/src/pages/Register.jsx` |

---

## 15. Common Operations

### Reset Admin Password
```bash
. .\venv\Scripts\Activate.ps1
python set_admin_password.py
```

### Create New Superuser
```bash
python manage.py createsuperuser
```

### Run Django Development Server
```bash
python manage.py runserver
```

### Run Frontend Development Server
```bash
cd frontend
npm run dev
```

---

**Last Updated**: February 9, 2026

**⚠️ REMINDER**: Keep these credentials secure and never share them publicly or commit them to version control!
