# React Frontend for Christ-Like Missionaries

This is the React frontend for the Christ-Like Missionaries platform.

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build

```bash
npm run build
```

## Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:8000/api
```

## Project Structure

- **src/pages/** - Page components (Home, About, Missions, Contact, Dashboard, Login, Register)
- **src/services/** - API service functions (api.js)
- **src/stores/** - Zustand state management (authStore.js)
- **src/App.jsx** - Main app component with routing

## Features

- User authentication (registration and login)
- Dashboard for authenticated users
- Browse active and completed missions
- Donation tracking
- Responsive design with Tailwind CSS
