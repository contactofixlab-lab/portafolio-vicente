# Portfolio Vicente Rabanales 🚀

Un portafolio web profesional y personal que combina experiencia laboral, proyectos personales y vida cotidiana. Diseñado con tecnologías modernas, animaciones fluidas y enfoque en UX/UI.

## 🎯 Características Principales

- **Diseño Responsivo:** Mobile-first, optimizado para todos los dispositivos
- **Animaciones Suaves:** Usando Framer Motion para transiciones fluidas
- **Secciones Completas:** Hero, Vida, Proyectos, Experiencia, Habilidades, Contacto
- **Bento Grid:** Layout moderno para la galería de proyectos
- **Timeline Interactivo:** Experiencia profesional y proyectos en formato timeline
- **Color Scheme Warm:** Paleta de naranja/ámbar con tipografía DM Sans
- **Autenticación (opcional):** Login/Register para área admin

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Estilos:** Tailwind CSS 3
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **HTTP:** Axios
- **Deployment:** Vercel / Netlify (pendiente)

## 📁 Estructura del Proyecto

```
portafolio-vicente/
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── pages/            # Páginas principales
│   ├── sections/         # Componentes de secciones
│   ├── data/             # Datos estáticos (projects, skills, etc)
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Funciones de utilidad
│   ├── styles/           # CSS global
│   ├── assets/           # Imágenes, iconos, SVGs
│   └── App.jsx           # Componente raíz
├── PLAN.md               # Plan detallado del proyecto
└── README.md             # Este archivo
```

## 🚀 Instalación

```bash
# Clonar o navegar al directorio
cd "portafolio-vicente"

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview de build
npm run preview
```

## 📄 Plan de Trabajo

Para ver el plan detallado de implementación, consulta **[PLAN.md](./PLAN.md)**

El plan incluye:
- Infraestructura base y configuración
- Estructura de carpetas completa
- Especificaciones de cada componente
- Detalles de animaciones
- Checklist de implementación
- Data files structure

## 🎨 Diseño y Colores

### Paleta Principal
- **Naranja Primario:** `#f97316` (warm-500)
- **Naranja Oscuro:** `#ea580c` (warm-600)
- **Ámbar Acento:** `#fbbf24`
- **Fondos:** Blancos/Grises claros

### Tipografía
- **Fuente Principal:** DM Sans (Google Fonts)
- **Pesos:** Light (300), Regular (400), Medium (500), Bold (700)

## 📱 Páginas Principales

### 1. **Home** (`/`)
- Hero section con foto y badges
- Sección "Más allá del código" (vida personal)
- Bento Grid de proyectos personales
- Timeline de experiencia profesional
- Grid de habilidades y certificaciones
- Sección de contacto

### 2. **Proyectos** (`/proyectos`)
- Hero section
- Timeline detallado de 6 proyectos personales
- Conectores SVG
- Status badges (Terminado/En Desarrollo)

### 3. **Login** (`/login`)
- Formulario de autenticación (futuro)

### 4. **Register** (`/register`)
- Formulario de registro (futuro)

## ✨ Animaciones Destacadas

- **Shimmer Effect:** Efecto brillo en ArcadeHub
- **Pulse Animation:** Badges y números pulsantes
- **Scale on Hover:** Íconos que rotan y escalan
- **Fade In/Out:** Transiciones suaves en scroll
- **Staggered Animations:** Entrada escalonada de cards
- **Timeline Connectors:** Líneas punteadas animadas

## 🔐 Autenticación (Futuro)

Integración con Supabase o Firebase para:
- Login/Register de usuarios
- Panel admin para editar contenido
- Row Level Security (RLS) en base de datos
- Rol-based access control

## 📊 Data Management

Los datos de proyectos, experiencias y habilidades se encuentran en:
- `src/data/projects.js`
- `src/data/experiences.js`
- `src/data/skills.js`

Pueden ser actualizados sin tocar componentes React.

## 🎯 Checklist de Implementación

Consulta **[PLAN.md - Checklist](./PLAN.md#-checklist-de-implementación)** para el checklist completo.

## 📞 Contacto

**Email:** vrabanales@rcapcorp.cl  
**Ubicación:** Chile / Uruguay

## 📝 Notas de Desarrollo

- **QA Obligatorio:** Compilación, preview y testing manual en cada cambio
- **Git Workflow:** Commit + push automático tras QA exitoso
- **Documentación:** Actualizar README y PLAN.md tras cambios importantes
- **Performance:** Lazy loading en imágenes, optimización de bundle

## 🔄 Estado del Proyecto

**Fase Actual:** Planeamiento ✓  
**Próxima Fase:** Setup Base del Proyecto  
**Última Actualización:** 2026-06-17

---

**Desarrollado por:** Claude Code  
**Para:** Vicente Rabanales
