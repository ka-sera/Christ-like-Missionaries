# Christ-Like Missionaries Platform

A full-stack web application for managing missionaries, missions, and donations built with Django and React.



### Backend (Django)

```bash
# Activate virtual environment
. .\venv\Scripts\Activate.ps1

# Run development server
python manage.py runserver

# Server runs at: http://localhost:8000
# Admin panel: http://localhost:8000/admin
# API docs: http://localhost:8000/api/
```

**Admin Credentials:**
- Username: `admin`
- Password: `admin123`

### Frontend (React)

```bash
# In a new terminal
cd frontend
npm install
npm run dev

# Frontend runs at: http://localhost:5173
```

---

## 📋 Project Overview

### Backend Stack

- **Framework:** Django 6.0.2
- **API:** Django REST Framework
- **Database:** SQLite (Development) / PostgreSQL (Production)
- **Authentication:** Token-based Auth
- **CORS:** django-cors-headers

### Frontend Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Routing:** React Router

---

## 📁 Project Structure

```
christ_like_missionaries/
├── backend/
│   ├── manage.py
│   ├── db.sqlite3
│   ├── christ_like_missionaries/
│   │   ├── settings.py          # Django configuration
│   │   ├── urls.py              # Main URL routing
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── mission/
│   │   ├── models.py            # Data models
│   │   ├── serializers.py       # REST serializers
│   │   ├── views.py             # API endpoints
│   │   ├── urls.py              # API routes
│   │   ├── admin.py             # Admin config
│   │   └── migrations/
│   ├── venv/                    # Virtual environment
│   └── requirements.txt         # Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── pages/               # React pages
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Missions.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js           # API client
│   │   ├── stores/
│   │   │   └── authStore.js     # Zustand store
│   │   ├── App.jsx              # Main component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
│
└── Documentation/
    ├── SETUP_AND_TESTING.md     # Complete setup guide
    ├── POSTGRESQL_SETUP.md      # DB configuration
    └── README.md                # This file
```

---

## 🔧 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register/` | Register new user |
| POST | `/api/api-token-auth/` | Get auth token |
| GET | `/api/users/me/` | Get current user |
| POST | `/api/users/change_password/` | Change password |

### Missionaries

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/missionaries/` | List all missionaries |
| POST | `/api/missionaries/` | Create missionary |
| GET | `/api/missionaries/{id}/` | Get missionary details |
| PUT | `/api/missionaries/{id}/` | Update missionary |
| DELETE | `/api/missionaries/{id}/` | Delete missionary |
| GET | `/api/missionaries/{id}/missions/` | Get missionary's missions |

### Missions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/missions/` | List all missions |
| POST | `/api/missions/` | Create mission |
| GET | `/api/missions/{id}/` | Get mission details |
| PUT | `/api/missions/{id}/` | Update mission |
| DELETE | `/api/missions/{id}/` | Delete mission |
| GET | `/api/missions/active/` | Get active missions |
| GET | `/api/missions/completed/` | Get completed missions |
| GET | `/api/missions/{id}/donations/` | Get mission donations |
| GET | `/api/missions/{id}/statistics/` | Get mission stats |

### Donations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/donations/` | List donations |
| POST | `/api/donations/` | Create donation |
| GET | `/api/donations/{id}/` | Get donation details |
| POST | `/api/donations/my_donations/` | Get user's donations |
| GET | `/api/donations/statistics/` | Get donation stats |

---

## 📊 Data Models

### UserProfile
```python
{
  "user": User,
  "role": "admin|missionary|supporter",
  "bio": "Text",
  "phone": "String",
  "photo": "Image",
  "created_at": "DateTime",
  "updated_at": "DateTime"
}
```

### Missionary
```python
{
  "user": User (optional),
  "name": "String",
  "email": "Email",
  "phone": "String",
  "bio": "Text",
  "photo": "Image",
  "location": "String",
  "specialization": "String",
  "is_active": Boolean,
  "created_at": "DateTime"
}
```

### Mission
```python
{
  "title": "String",
  "description": "Text",
  "missionary": Missionary,
  "start_date": "Date",
  "end_date": "Date",
  "status": "planning|active|completed|paused",
  "location": "String",
  "target_amount": "Decimal",
  "image": "Image",
  "created_at": "DateTime"
}
```

### Donation
```python
{
  "mission": Mission,
  "supporter": User (optional),
  "supporter_name": "String",
  "supporter_email": "Email",
  "amount": "Decimal",
  "message": "Text",
  "transaction_id": "String",
  "is_anonymous": Boolean,
  "created_at": "DateTime"
}
```

---

## 🔐 Authentication

The API uses token-based authentication with Django REST Framework.

### Getting a Token

```bash
# Register
curl -X POST http://localhost:8000/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securepass123"
  }'

# Login
curl -X POST http://localhost:8000/api/api-token-auth/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "securepass123"
  }'
```

### Using Token

Include the token in the `Authorization` header:

```bash
curl -H "Authorization: Token YOUR_TOKEN" \
  http://localhost:8000/api/profiles/my_profile/
```

---

## 🎨 Frontend Features

### Pages

1. **Home** - Welcome page with mission overview
2. **About** - Organization information
3. **Missions** - Browse and filter missions
4. **Contact** - Contact form
5. **Dashboard** - User profile and donations (authenticated)
6. **Login** - User authentication
7. **Register** - New user registration

### Components & Features

- ✅ Responsive design with Tailwind CSS
- ✅ User authentication with token storage
- ✅ Real-time API data fetching
- ✅ Mission filtering and search
- ✅ Donation tracking
- ✅ Protected routes for authenticated users
- ✅ State management with Zustand
- ✅ Modern UI with smooth transitions

---

## 🚀 Deployment

### Backend Deployment

**Option 1: Heroku**

```bash
# Create Procfile
web: gunicorn christ_like_missionaries.wsgi --log-file -

# Deploy
git push heroku main
```

**Option 2: AWS/DigitalOcean**
- Use Gunicorn + Nginx
- Configure PostgreSQL
- Set up SSL certificates

### Frontend Deployment

**Option 1: Vercel**

```bash
npm run build
# Deploy dist/ folder to Vercel
```

**Option 2: Netlify**

```bash
npm run build
# Drag and drop dist/ folder to Netlify
```

---

## 📚 Complete Testing Guide

See [SETUP_AND_TESTING.md](SETUP_AND_TESTING.md) for:

- Detailed setup instructions
- API endpoint examples
- Testing workflows
- Troubleshooting guide
- Deployment checklist

---

## 🛠️ Configuration

### Environment Variables

**Backend (.env)**
```
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:8000/api
```

### Database Setup

**Switch to PostgreSQL:**

1. Install psycopg2:
   ```bash
   pip install psycopg2-binary
   ```

2. Update settings.py:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'christ_like_missionaries',
           'USER': 'postgres_user',
           'PASSWORD': 'your_password',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```

3. Create database:
   ```sql
   CREATE DATABASE christ_like_missionaries;
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

---

## 📝 API Usage Examples

### Create a Mission

```bash
curl -X POST http://localhost:8000/api/missions/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "School Building",
    "description": "Building a school in rural area",
    "missionary": 1,
    "start_date": "2026-03-01",
    "end_date": "2026-12-31",
    "status": "planning",
    "location": "Kenya",
    "target_amount": "50000.00"
  }'
```

### Make a Donation

```bash
curl -X POST http://localhost:8000/api/donations/ \
  -H "Content-Type: application/json" \
  -d '{
    "mission": 1,
    "supporter_name": "Jane Smith",
    "supporter_email": "jane@example.com",
    "amount": "500.00",
    "transaction_id": "TXN_20260209_001",
    "message": "Great work!"
  }'
```

### Get Mission Statistics

```bash
curl http://localhost:8000/api/missions/1/statistics/
```

**Response:**
```json
{
  "mission_id": 1,
  "mission_title": "School Building",
  "total_donations": 45,
  "total_amount": "25000.00",
  "target_amount": "50000.00",
  "progress_percentage": 50.0,
  "average_donation": "555.56",
  "largest_donation": "5000.00"
}
```

---

## 🐛 Troubleshooting

### Backend Issues

**PostgreSQL Connection Error**
- Check PostgreSQL is running
- Verify credentials in settings.py
- Ensure database exists

**CORS Errors**
- Check CORS_ALLOWED_ORIGINS in settings.py
- Ensure corsheaders is in INSTALLED_APPS

**Permission Denied**
- Check user role/permissions
- Ensure token is valid

### Frontend Issues

**API Not Responding**
- Check backend is running on port 8000
- Check VITE_API_URL environment variable
- Check browser console for errors

**Authentication Issues**
- Clear localStorage: `localStorage.clear()`
- Log out and log back in
- Check token expiration

---

## 📞 Support & Contributing

### Getting Help

1. Check [SETUP_AND_TESTING.md](SETUP_AND_TESTING.md) for detailed guides
2. Review API documentation above
3. Check Django/React documentation

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - Feel free to use and modify

---

## 🎯 Next Steps

1. **Add Payment Integration** (Stripe, PayPal)
2. **Implement Email Notifications**
3. **Add Analytics Dashboard**
4. **Create Mobile App** (React Native)
5. **Setup CI/CD Pipeline**
6. **Add Advanced Search Filters**
7. **Implement User Roles & Permissions**
8. **Add File Upload Feature**

---

## 📞 Contact

For questions or support, contact: support@christlikemissionaries.org

---

**Last Updated:** February 9, 2026
