# 🚗 Car Store

Fullstack car dealership management application built with Django (backend) and React (frontend).

## 📁 Project Structure

```
car-store/
├── backend/              # Django REST API
│   ├── backend/         # Project configuration
│   ├── core/           # Main app
│   ├── venv/           # Virtual environment (not included in git)
│   ├── manage.py
│   └── requirements.txt # Python dependencies
├── frontend/            # React application
│   ├── src/
│   ├── public/
│   ├── package.json    # Node.js dependencies
│   └── vite.config.js
├── .gitignore
└── README.md
```

## 🚀 Development Environment Setup

### Prerequisites

- **Python 3.8+** ([Download here](https://www.python.org/downloads/))
- **Node.js 16+** ([Download here](https://nodejs.org/))
- **Git** ([Download here](https://git-scm.com/))

### 🔄 Quick Setup (First Time)

```bash
# 1. Clone the repository
git clone <REPOSITORY_URL>
cd car-store

# 2. Setup Backend
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
python manage.py migrate

# 3. Setup Frontend (new terminal)
cd frontend
npm install

# 4. Run both servers
# Terminal 1 (Backend):
cd backend
venv\Scripts\activate
python manage.py runserver

# Terminal 2 (Frontend):
cd frontend
npm run dev
```

## 🐍 Detailed Backend Setup (Django)

### 1. Create and Activate Virtual Environment

```bash
# ⚠️ IMPORTANT: Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

**✅ Verify activation:** You should see `(venv)` at the beginning of your terminal.

### 2. Install Python Dependencies

```bash
# ⚠️ MAKE SURE the virtual environment is activated
# Update pip
python -m pip install --upgrade pip

# Install all project dependencies
pip install -r requirements.txt
```

**📋 Dependencies included in `requirements.txt`:**
- `Django==3.2.12` - Web framework
- `djangorestframework==3.14.0` - REST API
- `django-cors-headers==4.3.1` - CORS configuration

### 3. Setup Database

```bash
# Apply migrations (create tables)
python manage.py migrate
```

### 4. Run Backend Server

```bash
python manage.py runserver
```

**✅ Backend available at:** `http://localhost:8000`
**✅ Admin Panel at:** `http://localhost:8000/admin`

## ⚛️ Detailed Frontend Setup (React)

### 1. Navigate to Frontend Directory

```bash
# ⚠️ IMPORTANT: From project root, navigate to frontend
cd frontend
```

### 2. Verify Correct Location

```bash
# Verify that package.json exists in current directory
dir package.json  # Windows
# ls package.json  # macOS/Linux
```

**❌ Common error:** Running `npm install` from `car-store/` instead of `car-store/frontend/`

### 3. Install Node.js Dependencies

```bash
# Install all dependencies
npm install
```

**📋 Dependencies included automatically:**
- `react` - Frontend framework
- `react-dom` - DOM manipulation
- `vite` - Build tool and dev server
- `eslint` - Code linting

### 4. Run Frontend Server

```bash
npm run dev
```

**✅ Frontend available at:** `http://localhost:5173`

## 🔧 Daily Development Commands

### Backend (Django)

```bash
# ⚠️ Always activate virtual environment first
cd backend
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Main commands
python manage.py runserver          # Run server
python manage.py makemigrations     # Create migrations
python manage.py migrate            # Apply migrations
python manage.py test               # Run tests
python manage.py shell              # Django shell
python manage.py collectstatic      # Collect static files
```

### Frontend (React)

```bash
# ⚠️ Make sure you're in the frontend directory
cd frontend

# Main commands
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # Run linting
```

## 📦 Dependency Management

### Adding New Backend Dependencies

```bash
# With virtual environment activated
cd backend
venv\Scripts\activate

# Install new dependency
pip install <package-name>

# Update requirements.txt
pip freeze > requirements.txt
```

### Adding New Frontend Dependencies

```bash
cd frontend

# Production dependency
npm install <package-name>

# Development dependency
npm install -D <package-name>
```

## 🚨 Common Issues Troubleshooting

### ❌ Error: "python is not recognized as a command"
```bash
# Solutions:
python3 -m venv venv        # Use python3
py -m venv venv            # Use py launcher (Windows)
```

### ❌ Error: "No module named 'django'"
```bash
# Verify that virtual environment is activated
# You should see (venv) in your terminal
venv\Scripts\activate

# Reinstall dependencies
pip install -r requirements.txt
```

### ❌ Error: "Could not read package.json"
```bash
# Verify you're in the correct directory
cd frontend              # Navigate to frontend directory
dir package.json        # Verify file exists
npm install             # Should work now
```

## 🤝 Contributing to the Project

1. **Create branch:** `git checkout -b feature/new-feature`
2. **Make changes and commit:** `git commit -m "Description of change"`
3. **Push:** `git push origin feature/new-feature`
4. **Create Pull Request**

### Before committing:
```bash
# Backend - run tests
cd backend
venv\Scripts\activate
python manage.py test

# Frontend - verify linting
cd frontend
npm run lint
```

## 📚 Technology Stack

### Backend
- **Django 3.2.12** - Python web framework
- **Django REST Framework 3.14.0** - REST API creation
- **django-cors-headers 4.3.1** - CORS handling
- **SQLite** - Database (development)

### Frontend
- **React 19.1.0** - JavaScript framework
- **Vite 7.0.4** - Build tool and development server
- **ESLint** - Code linting

## ⚡ Quick Reference Commands

```bash
# Activate virtual environment (Backend)
cd backend && venv\Scripts\activate

# Run Django server
python manage.py runserver

# Run React server (new terminal)
cd frontend && npm run dev

# Install new Python dependency
pip install <package> && pip freeze > requirements.txt

# Install new Node.js dependency
npm install <package>
```