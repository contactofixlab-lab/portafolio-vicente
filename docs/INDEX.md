# 🗂️ Índice Rápido — Portfolio Vicente

**Última Actualización:** 2026-06-17  
**Estado:** Estructura Base Creada ✓

---

## 📂 Archivos de Documentación

| Archivo | Propósito | Lectura |
|---------|-----------|---------|
| `PLAN.md` | Plan detallado completo (infraestructura, componentes, animaciones) | 📖 Consulta para detalles |
| `README.md` | Overview del proyecto, instalación, features | 📖 Guía general |
| `INDEX.md` | Este archivo - referencia rápida | ⚡ Quick reference |

---

## 🎯 Fases de Implementación

### ✅ Fase 1: Setup Base (Próximo)
- [ ] `npm create vite@latest . -- --template react`
- [ ] `npm install tailwindcss postcss autoprefixer framer-motion lucide-react axios`
- [ ] Configurar `tailwind.config.js` (colores warm)
- [ ] Importar Google Fonts (DM Sans)
- [ ] Crear `globals.css`

### ⏳ Fase 2: Componentes Base (Después de Phase 1)
- [ ] `Layout.jsx` (wraps all pages)
- [ ] `Header.jsx` (nav responsive + drawer)
- [ ] `Footer.jsx` (links + social)
- [ ] UI components: `Badge.jsx`, `Card.jsx`, `Button.jsx`

### ⏳ Fase 3: Página Home (Después de Phase 2)
- [ ] `HeroSection.jsx`
- [ ] `LifeSection.jsx`
- [ ] `ProjectsSection.jsx` (Bento Grid)
- [ ] `ExperienceSection.jsx` (timeline)
- [ ] `SkillsSection.jsx`
- [ ] `ContactSection.jsx`

### ⏳ Fase 4: Página Proyectos (Paralelo)
- [ ] `pages/Proyectos.jsx`
- [ ] Timeline con 6 proyectos
- [ ] SVG conectores

### ⏳ Fase 5: Animaciones Avanzadas
- [ ] Shimmer en ArcadeHub
- [ ] Hover effects en íconos
- [ ] Pulse en badges
- [ ] Scale en bullets

### ⏳ Fase 6: Testing & Deploy
- [ ] Responsive testing
- [ ] Performance
- [ ] SEO
- [ ] Deploy a Vercel

---

## 📋 Componentes a Crear

### Globales
```
src/components/
├── Layout.jsx           ← Envoltura principal
├── Header.jsx           ← Nav + Logo
├── Footer.jsx           ← Links + Social
├── AnimatedElement.jsx  ← Wrapper Framer Motion
└── ui/
    ├── Badge.jsx        ← Insignias
    ├── Card.jsx         ← Tarjetas
    └── Button.jsx       ← Botones
```

### Secciones (Home)
```
src/sections/
├── HeroSection.jsx          ← Hero
├── LifeSection.jsx          ← Vida personal
├── ProjectsSection.jsx      ← Bento Grid
├── ExperienceSection.jsx    ← Timeline experiencia
├── SkillsSection.jsx        ← Habilidades
└── ContactSection.jsx       ← Contacto
```

### Páginas
```
src/pages/
├── Home.jsx             ← Usar todas las secciones
├── Proyectos.jsx        ← Timeline projects
├── Login.jsx            ← (Futuro)
└── Register.jsx         ← (Futuro)
```

### Data
```
src/data/
├── projects.js          ← 6 proyectos personales
├── experiences.js       ← 5 experiencias profesionales
├── skills.js            ← Lenguajes, BI, Tools, etc
└── hobbies.js           ← Aficiones para LifeSection
```

---

## 🎨 Paleta de Colores (Tailwind)

```js
// tailwind.config.js
colors: {
  primary: {
    50:   '#fff7ed',  // Lightest
    100:  '#ffedd5',
    200:  '#fed7aa',
    300:  '#fdba74',
    400:  '#fb923c',
    500:  '#f97316',  // Primary Warm
    600:  '#ea580c',  // Darker
    700:  '#c2410c',
    800:  '#9a3412',
    900:  '#7c2d12'   // Darkest
  },
  accent: '#fbbf24'
}
```

---

## 🎬 Animaciones Clave

| Animación | Ubicación | Librería |
|-----------|-----------|----------|
| **Shimmer** | ArcadeHub | Framer Motion |
| **Pulse** | Badges, "24/7" | Framer Motion animate |
| **Scale on Hover** | Íconos | whileHover |
| **Rotate on Hover** | Íconos (15°) | whileHover |
| **Stagger** | Bento Grid cards | transition staggerChildren |
| **WhileInView** | Todas las secciones | scrollTrigger style |
| **Timeline SVG** | Experience/Projects | SVG + animate |

---

## 📱 Responsive Breakpoints

```js
// tailwind.config.js default breakpoints
sm:   640px   // Mobile landscape
md:   768px   // Tablet
lg:   1024px  // Desktop
xl:   1280px  // Large desktop
2xl:  1536px  // Extra large
```

**Mobile-first approach:** Escribir para mobile, extender a desktop.

---

## 🔄 Git Workflow

```bash
# 1. Antes de empezar (una sola vez)
cd "portafolio Vicente"
git init
git add .
git commit -m "Initial commit: project structure and documentation"

# 2. Por cada feature/phase
# - Implementar cambios
# - npm run build (verificar)
# - npm run dev (preview en browser)
# - git add src/ (solo cambios)
# - git commit -m "feat: descripción"
# - Actualizar PLAN.md y memoria

# 3. Antes de push a GitHub
git status
git log --oneline
git push origin main
```

---

## ✨ Habilidades de Vicente (para Skills Section)

### Lenguajes
- JavaScript
- SQL
- Java
- Python

### Business Intelligence
- Power BI
- Microsoft 365

### Gestión
- MobySuite
- Transbank
- GoFirmex

### Colaboración
- Trello
- GitHub
- ClickUp
- Miro

### IA y Modernas
- V0.dev
- ChatGPT
- Google Adsense
- Bizagi

### Certificaciones
- [Agregar según corresponda]

---

## 👥 Experiencias Profesionales

1. **Atención al Cliente** (2020-2021)
2. **Prácticas Profesionales** (2021-2022)
3. **Jefe de Informática** (2022-2023)
4. **Jefe de Innovación** (2023-2024)
5. **Ingeniero en Innovación** (2024-actual)

---

## 🎮 Proyectos Personales (6 para Bento + Proyectos Page)

1. **ArcadeHub** - Plataforma gaming (grande en Bento)
2. **Sistema de Análisis Empresarial** - BI/Analytics
3. **Plataforma de Streaming** - Video on demand
4. **Puertas del Sol** - Real estate/arquitectura
5. **Yencinas Bodega** - Inventory management
6. **Boulevard Santa Rosa Web** - Web design

---

## 📊 Rutas de la App

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `Home.jsx` | Página principal (todas las secciones) |
| `/proyectos` | `Proyectos.jsx` | Galería detallada de 6 proyectos |
| `/login` | `Login.jsx` | (Futuro) Autenticación |
| `/register` | `Register.jsx` | (Futuro) Registro |

---

## 🚀 Comandos Rápidos

```bash
# Desarrollo
npm run dev          # Iniciar servidor (localhost:5173)

# Build
npm run build        # Producción
npm run preview      # Ver build en local

# Utils
npm install          # Instalar deps
npm update           # Update deps
npm audit            # Security check
```

---

## 📞 Contacto del Proyecto

**Email:** vrabanales@rcapcorp.cl  
**Desarrollador:** Claude Code  
**Stack:** React 18 + Tailwind + Framer Motion

---

## 🔗 Enlaces Útiles

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)

---

## ⚡ Next Steps

1. **Confirmar Plan** ← Tú apruebas
2. **Crear Proyecto Vite** ← Phase 1
3. **Instalar Dependencias** ← Phase 1
4. **Configurar Tailwind** ← Phase 1
5. **Crear Componentes Base** ← Phase 2
6. **Implementar Home** ← Phase 3
7. **Implementar Proyectos** ← Phase 4
8. **Animaciones** ← Phase 5
9. **Testing & QA** ← Phase 6
10. **Deploy** ← Phase 6

---

**¿Listo para comenzar Phase 1?** ✅
