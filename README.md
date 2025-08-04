# 🚗 Car Store

Aplicación fullstack para gestión de tienda de automóviles desarrollada con Django (backend) y React (frontend).

## 📁 Estructura del Proyecto

```
car-store/
├── backend/              # API Django REST
│   ├── backend/         # Configuración del proyecto
│   ├── core/           # App principal
│   ├── venv/           # Entorno virtual (no incluido en git)
│   ├── manage.py
│   └── requirements.txt # Dependencias de Python
├── frontend/            # Aplicación React
│   ├── src/
│   ├── public/
│   ├── package.json    # Dependencias de Node.js
│   └── vite.config.js
├── .gitignore
└── README.md
```

## 🚀 Configuración del Entorno de Desarrollo

### Prerrequisitos

- **Python 3.8+** ([Descargar aquí](https://www.python.org/downloads/))
- **Node.js 16+** ([Descargar aquí](https://nodejs.org/))
- **Git** ([Descargar aquí](https://git-scm.com/))

### 🔄 Setup Rápido (Primera Vez)

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd car-store

# 2. Configurar Backend
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
python manage.py migrate

# 3. Configurar Frontend (nueva terminal)
cd frontend
npm install

# 4. Ejecutar ambos servidores
# Terminal 1 (Backend):
cd backend
venv\Scripts\activate
python manage.py runserver

# Terminal 2 (Frontend):
cd frontend
npm run dev
```

## 🐍 Configuración Detallada del Backend (Django)

### 1. Crear y Activar Entorno Virtual

```bash
# ⚠️ IMPORTANTE: Navegar al directorio backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

**✅ Verificar activación:** Deberías ver `(venv)` al inicio de tu terminal.

### 2. Instalar Dependencias de Python

```bash
# ⚠️ ASEGÚRATE de que el entorno virtual esté activado
# Actualizar pip
python -m pip install --upgrade pip

# Instalar todas las dependencias del proyecto
pip install -r requirements.txt
```

**📋 Dependencias incluidas en `requirements.txt`:**
- `Django==3.2.12` - Framework web
- `djangorestframework==3.14.0` - API REST
- `django-cors-headers==4.3.1` - Configuración CORS

### 3. Configurar Base de Datos

```bash
# Aplicar migraciones (crear tablas)
python manage.py migrate
```

### 4. Ejecutar Servidor Backend

```bash
python manage.py runserver
```

**✅ Backend disponible en:** `http://localhost:8000`
**✅ Panel Admin en:** `http://localhost:8000/admin`

## ⚛️ Configuración Detallada del Frontend (React)

### 1. Navegar al Directorio Frontend

```bash
# ⚠️ IMPORTANTE: Desde la raíz del proyecto, navegar a frontend
cd frontend
```

### 2. Verificar Ubicación Correcta

```bash
# Verificar que existe package.json en el directorio actual
dir package.json  # Windows
# ls package.json  # macOS/Linux
```

**❌ Error común:** Ejecutar `npm install` desde `car-store/` en lugar de `car-store/frontend/`

### 3. Instalar Dependencias de Node.js

```bash
# Instalar todas las dependencias
npm install
```

**📋 Dependencias incluidas automáticamente:**
- `react` - Framework frontend
- `react-dom` - DOM manipulation
- `vite` - Build tool y dev server
- `eslint` - Code linting

### 4. Ejecutar Servidor Frontend

```bash
npm run dev
```

**✅ Frontend disponible en:** `http://localhost:5173`

## 🔧 Comandos de Desarrollo Diario

### Backend (Django)

```bash
# ⚠️ Siempre activar entorno virtual primero
cd backend
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Comandos principales
python manage.py runserver          # Ejecutar servidor
python manage.py makemigrations     # Crear migraciones
python manage.py migrate            # Aplicar migraciones
python manage.py test               # Ejecutar tests
python manage.py shell              # Shell de Django
python manage.py collectstatic      # Recopilar archivos estáticos
```

### Frontend (React)

```bash
# ⚠️ Asegúrate de estar en el directorio frontend
cd frontend

# Comandos principales
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Ejecutar linting
```

## 📦 Gestión de Dependencias

### Agregar Nuevas Dependencias al Backend

```bash
# Con entorno virtual activado
cd backend
venv\Scripts\activate

# Instalar nueva dependencia
pip install <nombre-del-paquete>

# Actualizar requirements.txt
pip freeze > requirements.txt
```

### Agregar Nuevas Dependencias al Frontend

```bash
cd frontend

# Dependencia de producción
npm install <nombre-del-paquete>

# Dependencia de desarrollo
npm install -D <nombre-del-paquete>
```

## 🚨 Solución de Problemas Comunes

### ❌ Error: "python no se reconoce como comando"
```bash
# Soluciones:
python3 -m venv venv        # Usar python3
py -m venv venv            # Usar py launcher (Windows)
```

### ❌ Error: "No module named 'django'"
```bash
# Verificar que el entorno virtual esté activado
# Deberías ver (venv) en tu terminal
venv\Scripts\activate

# Reinstalar dependencias
pip install -r requirements.txt
```

### ❌ Error: "Could not read package.json"
```bash
# Verificar que estás en el directorio correcto
cd frontend              # Navegar al directorio frontend
dir package.json        # Verificar que existe el archivo
npm install             # Ahora debería funcionar
```

## 🤝 Contribuir al Proyecto

1. **Crear rama:** `git checkout -b feature/nueva-funcionalidad`
2. **Hacer cambios y commit:** `git commit -m "Descripción del cambio"`
3. **Push:** `git push origin feature/nueva-funcionalidad`
4. **Crear Pull Request**

### Antes de hacer commit:
```bash
# Backend - ejecutar tests
cd backend
venv\Scripts\activate
python manage.py test

# Frontend - verificar linting
cd frontend
npm run lint
```

## 📚 Tecnologías del Stack

### Backend
- **Django 3.2.12** - Framework web de Python
- **Django REST Framework 3.14.0** - Creación de APIs REST
- **django-cors-headers 4.3.1** - Manejo de CORS
- **SQLite** - Base de datos (desarrollo)

### Frontend
- **React 19.1.0** - Framework de JavaScript
- **Vite 7.0.4** - Build tool y servidor de desarrollo
- **ESLint** - Linting de código

## ⚡ Comandos Rápidos de Referencia

```bash
# Activar entorno virtual (Backend)
cd backend && venv\Scripts\activate

# Ejecutar servidor Django
python manage.py runserver

# Ejecutar servidor React (nueva terminal)
cd frontend && npm run dev

# Instalar nueva dependencia Python
pip install <paquete> && pip freeze > requirements.txt

# Instalar nueva dependencia Node.js
npm install <paquete>
```