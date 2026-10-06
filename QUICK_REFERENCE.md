# Quick Reference Card

## 🚀 Start Both Servers

### Terminal 1 (Backend)
```powershell
cd C:\Users\user\Documents\christ_like_missionaries
. .\venv\Scripts\Activate.ps1
python manage.py runserver
```
**URL:** http://localhost:8000

### Terminal 2 (Frontend)
```powershell
cd C:\Users\user\Documents\christ_like_missionaries\frontend
npm run dev
```
**URL:** http://localhost:5173

---

## 📍 Important URLs

| Purpose | URL | Credentials |
|---------|-----|-------------|
| Frontend App | http://localhost:5173 | - |
| API Root | http://localhost:8000/api/ | - |
| Admin Panel | http://localhost:8000/admin | admin / admin123 |
| API Docs | http://localhost:8000/api/ | - |

---

## 🔑 Default Admin Credentials

- **Username:** admin
- **Password:** admin123

---

## 📝 Key Files

| File | Purpose |
|------|---------|
| `mission/models.py` | All data models |
| `mission/serializers.py` | API serializers |
| `mission/views.py` | API endpoints |
| `mission/urls.py` | API routing |
| `mission/admin.py` | Admin interface |
| `frontend/src/App.jsx` | Main React app |
| `frontend/src/services/api.js` | API client |

---

## 🧪 Test the API

### 1. Register User
```bash
curl -X POST http://localhost:8000/api/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:8000/api/api-token-auth/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

### 3. Get Missionaries (No Auth Needed)
```bash
curl http://localhost:8000/api/missionaries/
```

### 4. Create Mission (Requires Auth)
```bash
curl -X POST http://localhost:8000/api/missions/ \
  -H "Authorization: Token YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Mission",
    "description": "Test description",
    "missionary": 1,
    "start_date": "2026-03-01",
    "end_date": "2026-12-31",
    "status": "planning",
    "location": "Kenya",
    "target_amount": "10000.00"
  }'
```

---

## 🎯 Main API Endpoints

```
Authentication:
  POST /api/users/register/
  POST /api/api-token-auth/
  GET  /api/users/me/

Missionaries:
  GET  /api/missionaries/
  POST /api/missionaries/
  GET  /api/missionaries/{id}/

Missions:
  GET  /api/missions/
  POST /api/missions/
  GET  /api/missions/{id}/
  GET  /api/missions/active/
  GET  /api/missions/{id}/statistics/

Donations:
  GET  /api/donations/
  POST /api/donations/
  GET  /api/donations/statistics/
```

---

## 🐛 Quick Troubleshooting

### Backend Won't Start
```bash
# Clear cache
Get-ChildItem -Path . -Include "__pycache__" -Recurse -Directory | Remove-Item -Recurse -Force

# Check migrations
python manage.py migrate

# Restart server
python manage.py runserver
```

### Frontend Won't Load
```bash
# Clear node modules cache
rm -r node_modules package-lock.json

# Reinstall
npm install

# Start dev server
npm run dev
```

### CORS Errors
- Check backend is running
- Check VITE_API_URL is correct
- Check CORS_ALLOWED_ORIGINS in settings.py

### Auth Issues
- Clear localStorage: `localStorage.clear()`
- Check token in browser console
- Verify token format in API calls

---

## 📦 Created Models

### UserProfile
- User (FK)
- Role (admin/missionary/supporter)
- Bio, Phone, Photo
- Timestamps

### Missionary
- Name, Email, Phone
- Bio, Location, Specialization
- Photo, Active Status
- Timestamps

### Mission
- Title, Description
- Missionary (FK)
- Start/End Dates, Status
- Location, Target Amount
- Progress Calculation Methods

### Donation
- Mission (FK)
- Supporter Details (Name, Email, User FK)
- Amount, Transaction ID
- Anonymous Flag
- Timestamps

---

## 🎨 Frontend Pages

| Page | Route | Status |
|------|-------|--------|
| Home | `/` | Public |
| About | `/about` | Public |
| Missions | `/missions` | Public |
| Contact | `/contact` | Public |
| Login | `/login` | Public |
| Register | `/register` | Public |
| Dashboard | `/dashboard` | Protected |

---

## 🔧 Common Commands

```bash
# Backend
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
python manage.py shell

# Frontend
npm install
npm run dev
npm run build
npm run lint
```

---

## 📚 Documentation Files

- `README.md` - Main documentation
- `SETUP_AND_TESTING.md` - Detailed setup guide
- `IMPLEMENTATION_SUMMARY.md` - What was built
- `POSTGRESQL_SETUP.md` - Database configuration
- `frontend/README.md` - Frontend specifics

---

## ✅ Status Check

```bash
# Backend Health
curl http://localhost:8000/api/

# Frontend Health
http://localhost:5173/

# Admin Access
http://localhost:8000/admin
```

All should return 200 OK / load successfully.

---

## 💡 Pro Tips

1. Use admin panel to create test data
2. Use Postman/Insomnia to test API endpoints
3. Check browser DevTools Network tab for API calls
4. Use `console.log()` in React for debugging
5. Use `print()` in Django views for backend debugging

---

## 🎓 Next Steps

1. Test the API endpoints
2. Create test data in admin panel
3. Explore the frontend UI
4. Customize as needed
5. Deploy to production

---

**Happy Coding! 🚀**
