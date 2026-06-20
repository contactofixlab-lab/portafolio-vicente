# Plan de Trabajo — Portfolio Vicente Rabanales

**Propósito:** Crear un portafolio web profesional que combine experiencia laboral, proyectos personales y vida personal. Diseño moderno con animaciones fluidas, responsivo y optimizado.

**Stack:** React 18 + Tailwind CSS + Framer Motion + Vite

**Contacto:** vrabanales@rcapcorp.cl

---

## 📋 Índice del Plan

1. [Infraestructura Base](#infraestructura-base)
2. [Estructura de Carpetas](#estructura-de-carpetas)
3. [Rutas y Navegación](#rutas-y-navegación)
4. [Componentes Globales](#componentes-globales)
5. [Página Home](#página-home)
6. [Página Proyectos](#página-proyectos)
7. [Página Login/Register](#página-loginregister)
8. [Sistema de Animaciones](#sistema-de-animaciones)
9. [Base de Datos (opcional)](#base-de-datos-opcional)
10. [Checklist de Implementación](#checklist-de-implementación)

---

## 🏗️ Infraestructura Base

### Setup Inicial
- [ ] Crear proyecto React con Vite: `npm create vite@latest . -- --template react`
- [ ] Instalar dependencias principales:
  ```bash
  npm install tailwindcss postcss autoprefixer framer-motion lucide-react axios
  npm install -D tailwindcss postcss autoprefixer
  ```
- [ ] Configurar Tailwind CSS:
  - [ ] `tailwind.config.js` con tokens customizados
  - [ ] `postcss.config.js`
  - [ ] `globals.css` con fuentes

### Fuentes y Estilos
- [ ] Importar **DM Sans** desde Google Fonts en `index.html` o `globals.css`
- [ ] Configurar colores warm (naranja/ámbar primario) en `tailwind.config.js`:
  ```js
  colors: {
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12'
    },
    warm: '#f97316',
    accent: '#fbbf24'
  }
  ```
- [ ] Tipografía: `fontFamily: { sans: ['DM Sans', 'sans-serif'] }`

### Estructura de Carpetas

```
portafolio-vicente/
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Envuelve todas las páginas
│   │   ├── Header.jsx          # Navegación + Logo
│   │   ├── Footer.jsx          # Enlaces + Redes sociales
│   │   ├── AnimatedElement.jsx # Wrapper de animaciones
│   │   └── ui/
│   │       ├── Badge.jsx       # Insignias animadas
│   │       ├── Card.jsx        # Tarjetas base
│   │       └── Button.jsx      # Botones customizados
│   ├── pages/
│   │   ├── Home.jsx            # Página principal
│   │   ├── Proyectos.jsx       # Galería de proyectos
│   │   ├── Login.jsx           # Página de login
│   │   └── Register.jsx        # Página de registro
│   ├── sections/               # Componentes de secciones reutilizables
│   │   ├── HeroSection.jsx
│   │   ├── LifeSection.jsx
│   │   ├── ProjectsSection.jsx (Bento Grid)
│   │   ├── ExperienceSection.jsx
│   │   ├── SkillsSection.jsx
│   │   └── ContactSection.jsx
│   ├── hooks/
│   │   ├── useIntersectionObserver.js
│   │   └── useScrollDirection.js
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── svgs/
│   ├── styles/
│   │   ├── globals.css
│   │   └── animations.css
│   ├── data/
│   │   ├── projects.js
│   │   ├── experiences.js
│   │   ├── skills.js
│   │   └── hobbies.js
│   ├── utils/
│   │   ├── cn.js              # classnames helper
│   │   └── animations.js      # Variantes de Framer Motion
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── PLAN.md
├── README.md
└── .gitignore
```

---

## 🛣️ Rutas y Navegación

### Rutas Principales
```javascript
// App.jsx
const routes = [
  { path: '/', component: Home, label: 'Inicio' },
  { path: '/proyectos', component: Proyectos, label: 'Proyectos' },
  { path: '/login', component: Login, label: 'Login' },
  { path: '/register', component: Register, label: 'Register' }
];
```

### Header - Navegación Responsive
- [ ] Logo/Nombre en esquina izquierda
- [ ] Menu items: Inicio | Proyectos | Contacto
- [ ] Drawer en mobile (hamburger icon)
- [ ] Badge "Disponible para trabajar" animado
- [ ] Efecto scroll suave (fade on scroll)
- [ ] Auth buttons (Login/Register) o User menu si está logueado

### Footer
- [ ] Enlaces: Home, Proyectos, Contacto
- [ ] Redes sociales: GitHub, LinkedIn, Email
- [ ] Créditos
- [ ] Año de actualización

---

## 🧩 Componentes Globales

### Layout.jsx
```jsx
// Envuelve toda la app
<Layout>
  <Header />
  <main>{children}</main>
  <Footer />
</Layout>
```

### Header.jsx
- [ ] Responsive navigation
- [ ] Logo + brand name
- [ ] Navigation links (hover effects)
- [ ] Drawer mobile (useMediaQuery)
- [ ] Auth badge

### Footer.jsx
- [ ] 3 columnas: Links, Contacto, Social
- [ ] Email, teléfono, ubicación
- [ ] Icons from lucide-react

### UI Components
- **Badge.jsx:** Insignias con fondo, borde, animación pulse
- **Card.jsx:** Tarjeta base con hover effects
- **Button.jsx:** Primary/Secondary con gradiente

---

## 🏠 Página Home (pages/Home.jsx)

### 1. HeroSection
**Layout:** Grid 2 columnas (texto | imagen)

**Columna izquierda (Texto):**
- [ ] Badge animado: "🟢 Disponible para trabajar" (pulse animation)
- [ ] Heading h1: "Hola, soy Vicente Rabanales"
  - Gradiente animado (warm colors)
  - Font weight: bold (font-bold)
- [ ] Subtítulo: "Ingeniero en Informática | Innovación & Desarrollo"
- [ ] Párrafo: Descripción breve (2-3 líneas)
- [ ] Botones:
  - "Ver mis proyectos" → scroll o link a /proyectos
  - "Descargar CV" → descarga PDF

**Columna derecha (Imagen):**
- [ ] Foto de perfil (circular o con rounded border)
- [ ] Insignias flotantes alrededor:
  - Code2 icon (JavaScript/Frontend)
  - CPU icon (Backend/Infraestructura)
  - Database icon (Data/SQL)
  - Cada una con hover rotate (15°) y scale (1.15)

### 2. LifeSection
**Título:** "Más allá del código"

**Contenido:**
- [ ] Texto descriptivo: vida en norte de Chile y Montevideo, Uruguay
- [ ] Grid 2x2 de imágenes con:
  - [ ] Hover scale (1.05)
  - [ ] Overlay con título/descripción
  - [ ] Border radius: lg
  - [ ] Imágenes de: familia, perro, viajes, naturaleza
- [ ] Insignias de aficiones (badges):
  - 🎵 Música
  - 🎮 Videojuegos
  - 📺 Series
  - 👨‍👩‍👦 Familia
  - 🐕 Paseos con perro
  - Cada badge con hover scale

### 3. ProjectsSection (Bento Grid)
**Estructura:** Layout responsivo 3 columnas (desktop), 1 (mobile)

**Cards del Bento:**
1. **ArcadeHub** (2 cols × 2 rows - card grande destacada)
   - Shimmer animation fondo
   - Título + descripción
   - Stack: React, Node, Database
   - Íconos con whileHover rotate
   - Bullets pulsantes

2. **Sistema de Análisis Empresarial** (col 3, row 1)
   - Card mediana
   - Descripción corta
   - Badge: "Terminado ✓"

3. **Plataforma de Streaming** (col 3, row 2)
   - Card mediana
   - Descripción corta
   - Badge: "En Desarrollo ⏱"

4. **Puertas del Sol** (col 1, row 3)
   - Card mediana
   - Descripción corta
   - Badge con estado

5. **Sistema de Análisis** (col 2, row 3)
   - Card mediana (repeat de #2 o proyecto diferente)

6. **Panel Innovación** (col 3, rows 3-4 - tall card)
   - Título: "Soluciones de Innovación"
   - Bullet list con 3 items:
     - ☁️ Sistema de Respaldos 24/7 (con animate opacity: [1, 0.5, 1])
     - 📄 Digitalización Empresarial
     - 🔍 Gestión Documental OCR
   - Cada bullet con scale animation: [1, 1.3, 1]

**Animaciones:**
- [ ] Entrada desde direcciones distintas: left, right, bottom
- [ ] Shimmer en ArcadeHub (gradiente deslizante)
- [ ] Íconos rotate (15°) on hover
- [ ] Bullets pulse (scale)
- [ ] "24/7" fade in-out

### 4. ExperienceSection
**Estructura:** Timeline zigzag (desktop: alternado L-R, mobile: vertical)

**Experiencias:** (en orden cronológico)
1. **Atención al Cliente** (2020-2021)
   - Empresa: [Nombre]
   - Descripción: gestión clientes, soporte
   - Color badge: gris/azul

2. **Prácticas Profesionales** (2021-2022)
   - Empresa: [Nombre]
   - Descripción: desarrollo, buenas prácticas
   - Color badge: naranja claro

3. **Jefe de Informática** (2022-2023)
   - Empresa: [Nombre]
   - Descripción: liderazgo equipo, infraestructura
   - Color badge: naranja

4. **Jefe de Innovación** (2023-2024)
   - Empresa: [Nombre]
   - Descripción: innovación, proyectos estratégicos
   - Color badge: naranja oscuro

5. **Actual: Ingeniero en Innovación** (2024-presente)
   - Descripción: proyectos actuales, innovación continua

**Elementos:**
- [ ] Card con fecha, rol, empresa, descripción
- [ ] Conectores SVG curvos (bezier curves)
- [ ] Línea punteada entre cards
- [ ] Responsive: desktop zigzag, mobile línea vertical

### 5. SkillsSection
**Estructura:** 5 sub-secciones con grillas diferentes

**A) Lenguajes** (4 cards en grid 2x2)
- [ ] JavaScript: card con imagen
- [ ] SQL: card con imagen
- [ ] Java: card con imagen
- [ ] Python: card con imagen
- Cada card: imagen prominente + nombre + hover effect

**B) Business Intelligence** (2 cards grandes)
- [ ] Power BI: tarjeta grande con descripción
- [ ] Microsoft 365: tarjeta grande con descripción

**C) Gestión** (3 badges/pills)
- [ ] MobySuite
- [ ] Transbank
- [ ] GoFirmex

**D) Colaboración** (4 badges/pills)
- [ ] Trello
- [ ] GitHub
- [ ] ClickUp
- [ ] Miro

**E) IA y Modernas** (4 badges con fondo diferente)
- [ ] V0.dev
- [ ] ChatGPT
- [ ] Google Adsense
- [ ] Bizagi

**F) Certificaciones** (badges rojos/destacados)
- [ ] Listar certificaciones con fecha
- [ ] Background rojo/naranja oscuro
- [ ] Bold font

### 6. ContactSection
**Estructura:** 3 tarjetas horizontales

**Card 1: Email**
- [ ] Icon: Mail
- [ ] vrabanales@rcapcorp.cl
- [ ] Link: mailto:
- [ ] Hover: scale + shadow

**Card 2: Teléfono**
- [ ] Icon: Phone
- [ ] Número (si deseas compartir)
- [ ] Link: tel:
- [ ] Hover: scale + shadow

**Card 3: Ubicación**
- [ ] Icon: MapPin
- [ ] "Chile / Uruguay"
- [ ] Hover: scale + shadow

---

## 📄 Página Proyectos (pages/Proyectos.jsx)

### Hero Sección Pequeña
- [ ] Badge: "Mi Portafolio"
- [ ] Título: "Proyectos Personales"
- [ ] Descripción: "Aquí están los proyectos que he desarrollado..."

### Timeline Projects
**Estructura:** Zigzag timeline (igual a ExperienceSection)

**6 Proyectos:**
1. **ArcadeHub**
   - Imagen hero
   - Descripción completa
   - Stack: React, Node, MongoDB
   - Status: "✓ Terminado"
   - Link a GitHub/Demo
   - Tags: #react #gaming

2. **Sistema de Análisis Empresarial**
   - Imagen
   - Descripción
   - Stack: React, Python, PostgreSQL
   - Status: "✓ Terminado"
   - Tags: #analytics #business

3. **Plataforma de Streaming**
   - Imagen
   - Descripción
   - Stack: React, Node, Video.js
   - Status: "⏱ En Desarrollo"
   - Tags: #streaming #video

4. **Puertas del Sol**
   - Imagen
   - Descripción
   - Stack: React, Tailwind
   - Status: "✓ Terminado"
   - Tags: #design #real-estate

5. **Yencinas Bodega**
   - Imagen
   - Descripción (inventario, asignación)
   - Stack: React, Node, PostgreSQL
   - Status: "✓ Terminado"
   - Tags: #inventory #business

6. **Boulevard Santa Rosa Web**
   - Imagen
   - Descripción
   - Stack: React, Tailwind, Framer Motion
   - Status: "✓ Terminado"
   - Tags: #design #architecture

**Elementos:**
- [ ] Cards con imagen prominente (hover zoom)
- [ ] Conectores SVG curvos (mismo que Experience)
- [ ] AnimatedElement con IntersectionObserver para entrada progresiva
- [ ] Mobile: stack vertical con línea central

---

## 🎬 Sistema de Animaciones

### Usando Framer Motion

**1. Bento Grid Cards (Home)**
```javascript
motion.div con:
- initial: { opacity: 0, y: 20 }
- whileInView: { opacity: 1, y: 0 }
- transition: { duration: 0.6, staggerChildren: 0.1 }
- viewport: { once: true, amount: 0.3 }
```

**Direcciones distintas por card:**
- ArcadeHub: entrada desde left
- Sistema Análisis 1: entrada desde top
- Streaming: entrada desde right
- Puertas Sol: entrada desde bottom
- etc.

**2. Shimmer en ArcadeHub**
```javascript
motion.div con:
- backgroundImage: linear-gradient(90deg, ...)
- animate: { backgroundPosition: ['0%', '100%'] }
- transition: { duration: 2, repeat: Infinity }
```

**3. Íconos con Hover**
```javascript
motion.div (lucide icons) con:
- whileHover: { rotate: 15, scale: 1.15 }
- transition: { type: 'spring', stiffness: 300 }
```

**4. Bullets Pulsantes**
```javascript
motion.li con:
- animate: { scale: [1, 1.3, 1] }
- transition: { duration: 0.6, repeat: Infinity, delay: index * 0.1 }
```

**5. "24/7" Parpadeante**
```javascript
motion.span con:
- animate: { opacity: [1, 0.5, 1] }
- transition: { duration: 1.5, repeat: Infinity }
```

**6. Badge Pulse**
```javascript
motion.div con:
- animate: { scale: [1, 1.05, 1] }
- transition: { duration: 2, repeat: Infinity }
```

**7. Timeline Conectores**
- SVG path con animate opacity o pathLength
- Aparecer cuando se scrollea (useInView)

---

## 🗄️ Base de Datos (Opcional)

Si se implementa autenticación/admin:

### Entidades (Supabase/Firebase)
1. **Projects**
   - id, title, description, image_url, stack[], status, github_link, demo_link, created_at
   - RLS: solo admin puede CRUD

2. **Experiences**
   - id, title, company, description, start_date, end_date, badges[], created_at
   - RLS: solo admin puede CRUD

3. **Skills**
   - id, category, name, image_url, level, created_at
   - RLS: solo admin puede CRUD

3. **Users** (para Login/Register)
   - id, email, password_hash, role, created_at
   - Rol: 'admin' o 'user'

---

## ✅ Checklist de Implementación

### Fase 1: Setup Base
- [x] Crear estructura carpetas
- [x] Instalar dependencias (React, Tailwind, Framer Motion)
- [x] Configurar tailwind.config.js (colores, fuentes)
- [x] Importar Google Fonts (DM Sans)
- [x] Crear globals.css con reset y fuentes

### Fase 2: Componentes Base
- [x] Layout.jsx
- [x] Header.jsx (navegación responsiva)
- [x] Footer.jsx
- [x] Badge.jsx (componente UI)
- [x] Card.jsx (componente UI)
- [x] Button.jsx (componente UI)

### Fase 3: Página Home
- [x] HeroSection (grid, foto, badges) ✅ Con badges flotantes animados
- [x] LifeSection (grid imágenes + aficiones) ✅ Grid 2x2 + 5 badges
- [x] ProjectsSection (Bento Grid con 6 cards) ✅ Layout responsivo
- [x] ExperienceSection (timeline zigzag) ✅ 5 experiencias profesionales
- [x] SkillsSection (5 sub-secciones) ✅ Lenguajes, BI, Tools, IA, Certificaciones
- [x] ContactSection (3 tarjetas) ✅ Email, Ubicación, CTA

### Fase 4: Página Proyectos
- [x] Hero sección ✅ Con badge "Mi Portafolio"
- [x] Timeline con 6 proyectos ✅ Zigzag alternado con descripción larga
- [x] Conectores SVG ✅ Línea punteada animada + dots pulsantes
- [x] Router implementado ✅ Hash-based navigation (#home, #proyectos)
- [x] Pages creadas ✅ Home.jsx, Proyectos.jsx

### Fase 5: Autenticación (opcional)
- [ ] Login page
- [ ] Register page
- [ ] Integración con Supabase/Firebase
- [ ] Protected routes

### Fase 6: Animaciones Avanzadas
- [ ] Shimmer en ArcadeHub
- [ ] Hover effects en íconos
- [ ] Pulse en badges
- [ ] Fade en "24/7"
- [ ] Scale en bullets
- [ ] Timeline conectores

### Fase 7: Testing y Optimización
- [x] Testing responsive (mobile, tablet, desktop) ✅ Plan documentado en TESTING.md
- [x] Performance: lazy loading imágenes ✅ Utils performance.js
- [x] SEO: meta tags, open graph ✅ index.html completo
- [x] Accesibilidad: ARIA labels, contrast ✅ Accessibility.js + Header ARIA
- [x] Vite build optimization ✅ Code splitting, minify, terser config
- [x] TESTING.md ✅ Checklist completo responsivo, a11y, performance, SEO

### Fase 8: Deployment
- [ ] Build: `npm run build`
- [ ] Deploy a Vercel/Netlify
- [ ] Testing en producción
- [ ] Actualizar README

---

## 📝 Data Files

### src/data/projects.js
```javascript
export const projects = [
  {
    id: 1,
    title: 'ArcadeHub',
    description: '...',
    image: '...',
    stack: ['React', 'Node', 'MongoDB'],
    status: 'Terminado',
    github: '...',
    demo: '...'
  },
  // ... más proyectos
];
```

### src/data/experiences.js
```javascript
export const experiences = [
  {
    id: 1,
    title: 'Atención al Cliente',
    company: '...',
    description: '...',
    startDate: '2020-01',
    endDate: '2021-12',
    badges: ['customer-service', 'communication']
  },
  // ... más experiencias
];
```

### src/data/skills.js
```javascript
export const skills = {
  languages: [
    { name: 'JavaScript', image: '...' },
    { name: 'SQL', image: '...' },
    // ...
  ],
  bi: [
    { name: 'Power BI', description: '...' },
    // ...
  ],
  // ... más categorías
};
```

---

## 🚀 Próximos Pasos

1. **Confirmar estructura** con usuario
2. **Comenzar Fase 1:** Setup base del proyecto
3. **Iteración por secciones:** Completar cada página
4. **QA continuo:** Testing en cada fase
5. **Deployment:** Vercel/Netlify

---

**Estado:** Fase 7 Completada ✓ — Listo para Deployment
**Última actualización:** 2026-06-17
**Responsable:** Claude Code + Vicente Rabanales
