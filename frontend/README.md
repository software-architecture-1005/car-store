# AutoMatch - Plataforma Inteligente de Búsqueda de Vehículos

Una aplicación web moderna y elegante para encontrar el vehículo perfecto en Colombia. AutoMatch centraliza el inventario de concesionarios, ofrece filtros potentes y presenta comparativas detalladas basadas en datos objetivos y reseñas de profesionales.

## 🚀 Características Principales

### 🎨 Diseño Premium
- **Tema Oscuro**: Fondo negro profundo (#1A1A1A) con acentos rojo/naranja (#F24423)
- **Tipografía Moderna**: Inter font con jerarquía visual clara
- **Formas Geométricas**: Elementos con ángulos agudos y cortes diagonales
- **Animaciones Suaves**: Transiciones y efectos hover elegantes

### 🔍 Búsqueda Inteligente
- **Filtros Avanzados**: Por marca, modelo, precio, ubicación, tipo de vehículo, etc.
- **Búsqueda en Tiempo Real**: Resultados instantáneos al aplicar filtros
- **Ordenamiento**: Por precio, año, calificación y mejor coincidencia

### 📊 Dashboard Visual
- **Especificaciones Técnicas**: Motor, potencia, consumo, dimensiones
- **Calificaciones de Expertos**: Puntuaciones detalladas por categoría
- **Características Destacadas**: Lista de equipamiento y tecnologías
- **Información de Concesionarios**: Ubicación, stock y contacto

### ⚖️ Comparación de Vehículos
- **Hasta 3 Vehículos**: Comparación lado a lado
- **Tabla de Especificaciones**: Comparativa detallada de características
- **Gráficos de Calificaciones**: Visualización de puntuaciones de expertos
- **Análisis de Precios**: Comparación visual de costos

## 🛠️ Tecnologías Utilizadas

- **React 19.1.0**: Framework principal
- **Vite 7.0.4**: Herramienta de construcción
- **CSS3**: Estilos personalizados con variables CSS
- **JavaScript ES6+**: Funcionalidades modernas
- **Responsive Design**: Adaptable a todos los dispositivos

## 📱 Páginas y Componentes

### Páginas Principales
1. **Landing Page** (`/`)
   - Sección Hero con búsqueda central
   - Diferenciador con proceso de 3 pasos
   - Diseño impactante y moderno

2. **Resultados de Búsqueda** (`/search`)
   - Filtros laterales avanzados
   - Grid de tarjetas de vehículos
   - Paginación y ordenamiento

3. **Detalles del Vehículo** (`/details/:id`)
   - Dashboard visual con widgets
   - Pestañas de información detallada
   - Especificaciones técnicas completas

4. **Comparación** (`/comparison`)
   - Comparación de hasta 3 vehículos
   - Tablas de especificaciones
   - Gráficos de calificaciones

### Componentes Reutilizables
- **Header**: Navegación principal con logo y menú
- **Hero**: Sección principal con búsqueda
- **Differentiator**: Proceso de 3 pasos
- **SearchFilters**: Filtros laterales avanzados
- **VehicleCard**: Tarjeta de vehículo individual
- **VehicleDetails**: Página de detalles completa
- **VehicleComparison**: Comparación de vehículos

## 🎨 Paleta de Colores

```css
--primary-bg: #1A1A1A      /* Fondo principal */
--secondary-bg: #2A2A2A     /* Fondo secundario */
--accent-color: #F24423     /* Color de acento */
--accent-hover: #E03A1A     /* Hover del acento */
--text-primary: #FFFFFF     /* Texto principal */
--text-secondary: #B0B0B0   /* Texto secundario */
--text-muted: #808080       /* Texto atenuado */
--border-color: #333333     /* Color de bordes */
--card-bg: #242424          /* Fondo de tarjetas */
```

## 📱 Diseño Responsivo

- **Desktop**: Layout completo con sidebar y grid
- **Tablet**: Adaptación a 2 columnas
- **Mobile**: Layout de 1 columna optimizado
- **Breakpoints**: 1024px, 768px, 480px

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

### Scripts Disponibles
- `npm run dev`: Servidor de desarrollo
- `npm run build`: Construcción para producción
- `npm run preview`: Vista previa de la construcción
- `npm run lint`: Verificación de código

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Hero.jsx
│   │   ├── Hero.css
│   │   ├── Differentiator.jsx
│   │   ├── Differentiator.css
│   │   ├── SearchFilters.jsx
│   │   ├── SearchFilters.css
│   │   ├── VehicleCard.jsx
│   │   └── VehicleCard.css
│   ├── pages/               # Páginas principales
│   │   ├── SearchResults.jsx
│   │   ├── SearchResults.css
│   │   ├── VehicleDetails.jsx
│   │   ├── VehicleDetails.css
│   │   ├── VehicleComparison.jsx
│   │   └── VehicleComparison.css
│   ├── models/              # Modelos de datos
│   │   └── Car.js
│   ├── styles/              # Estilos globales
│   │   └── global.css
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos del app
│   ├── index.css            # Estilos globales
│   └── main.jsx             # Punto de entrada
├── public/                  # Archivos estáticos
├── package.json             # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
└── README.md               # Documentación
```

## 🎯 Características Destacadas

### UX/UI Premium
- Diseño inspirado en plataformas de lujo
- Animaciones fluidas y transiciones suaves
- Iconografía consistente y moderna
- Jerarquía visual clara

### Funcionalidad Avanzada
- Filtros en tiempo real
- Búsqueda inteligente
- Comparación visual
- Dashboard interactivo

### Performance
- Carga rápida con Vite
- Componentes optimizados
- Imágenes lazy loading
- CSS optimizado

## 🔮 Próximas Características

- [ ] Integración con API real
- [ ] Autenticación de usuarios
- [ ] Favoritos y listas personalizadas
- [ ] Notificaciones de precios
- [ ] Chat con concesionarios
- [ ] Calculadora de financiación
- [ ] Test drive virtual
- [ ] Integración con mapas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerir mejoras.

## 📞 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**AutoMatch** - Tu decisión más inteligente. Tu auto ideal. 🚗✨