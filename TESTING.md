# 🧪 Plan de Testing - Portfolio Vicente

## Testing Responsivo

### Breakpoints a Verificar
- **Mobile:** 320px (iPhone SE), 375px (iPhone 12), 480px (Galaxy S21)
- **Tablet:** 768px (iPad), 1024px (iPad Pro)
- **Desktop:** 1280px, 1920px, 2560px (ultrawide)

### Checklist Mobile (320px - 480px)
- [ ] Header: Drawer aparece, botón hamburguesa funciona
- [ ] HeroSection: Stack vertical, imagen redimensionada, badges visibles
- [ ] LifeSection: Grid 1x1 en móvil (stackeado)
- [ ] ProjectsSection: Grid 1 columna, cards legibles
- [ ] ExperienceSection: Timeline vertical sin zigzag
- [ ] SkillsSection: Skills apilados verticalmente
- [ ] ContactSection: Cards stacked
- [ ] Footer: Links legibles, sin overflow

### Checklist Tablet (768px - 1024px)
- [ ] Header: Navegación visible (sin drawer necesario)
- [ ] HeroSection: Grid 1-2 columnas flexible
- [ ] LifeSection: Grid 2x2 correcto
- [ ] ProjectsSection: Grid 2 columnas parcial
- [ ] ExperienceSection: Timeline zigzag funciona
- [ ] Buttons: Tamaño apropiado para touch (44px min)

### Checklist Desktop (1280px+)
- [ ] Header: Navegación completa + badges
- [ ] HeroSection: Grid 2 columnas perfecto
- [ ] LifeSection: Grid 2x2 con hover effects
- [ ] ProjectsSection: Bento grid completo
- [ ] ExperienceSection: Zigzag alternado
- [ ] SkillsSection: Grids apropiados (4, 2, flex)
- [ ] Animaciones: Todas activas sin lag
- [ ] Footer: Layout 3 columnas

---

## Testing de Accesibilidad

### Navegación por Teclado
- [ ] Tab: Navegar por todos los elementos interactivos
- [ ] Enter: Activar botones y links
- [ ] Escape: Cerrar drawer móvil
- [ ] Focus visible: Siempre visible (outline amarillo/naranja)
- [ ] Order: Orden lógico (left-to-right, top-to-bottom)

### Screen Readers (NVDA, JAWS, VoiceOver)
- [ ] Headings: h1 existe y es único
- [ ] Headings: Estructura correcta (h1 → h2 → h3, sin saltos)
- [ ] Links: Texto descriptivo ("Ver proyectos" no "Click aquí")
- [ ] Buttons: Anunciados como botones
- [ ] Images: Alt text descriptivo
- [ ] Icons: Accessible names (aria-label)
- [ ] Form inputs: Labels asociados

### Contraste y Color
- [ ] Texto normal: 4.5:1 contrast ratio (WCAG AA)
- [ ] Texto grande (18pt+): 3:1 contrast ratio
- [ ] UI components: 3:1 contrast
- [ ] No depender solo de color (usar iconos + color)

### ARIA Labels Verificados
- [ ] `role="banner"` en Header
- [ ] `aria-label="Navegación principal"` en nav
- [ ] `aria-label="Menú"` en hamburger button
- [ ] `aria-expanded` en drawer toggle
- [ ] `role="img"` en iconos decorativos con aria-label
- [ ] `role="region"` en secciones principales

---

## Testing de Performance

### Lighthouse Audit
- [ ] Performance: >90
- [ ] Accessibility: >90
- [ ] Best Practices: >90
- [ ] SEO: >90

### Core Web Vitals
- [ ] **LCP** (Largest Contentful Paint): <2.5s
- [ ] **FID** (First Input Delay): <100ms
- [ ] **CLS** (Cumulative Layout Shift): <0.1

### Bundle Size
- [ ] JS inicial: <100KB
- [ ] CSS: <50KB
- [ ] Imágenes: Optimizadas (<50KB cada una)
- [ ] Fonts: Preload DM Sans

### Caching
- [ ] Static assets: Cache-Control: max-age=31536000
- [ ] HTML: Cache-Control: max-age=3600
- [ ] Service Worker: Implementar en build

---

## Testing de SEO

### Meta Tags
- [ ] `<title>`: Presente, <60 caracteres
- [ ] `<meta name="description">`: Presente, 120-160 caracteres
- [ ] `<meta name="keywords">`: Relevantes
- [ ] Open Graph tags: `og:title`, `og:description`, `og:image`
- [ ] Twitter Card: `twitter:card`, `twitter:title`

### Estructura
- [ ] `<h1>`: Único en página
- [ ] `<h2>` - `<h6>`: Estructura jerárquica
- [ ] Links: Descriptivos, no genéricos ("Click aquí")
- [ ] Images: Alt text relevante

### Robots & Crawl
- [ ] `robots.txt`: Presente
- [ ] `sitemap.xml`: Presente (cuando haya más páginas)
- [ ] Canonical URL: Presente
- [ ] Internal links: Correctos

### Performance SEO
- [ ] Mobile-first: Diseño responsive
- [ ] Page speed: <3s load time
- [ ] Structured data: JSON-LD (opcional)

---

## Testing de Navegación

### Rutas
- [ ] `#home` → Home page carga
- [ ] `#proyectos` → Projects page carga
- [ ] `#contacto` → Scroll a sección contacto
- [ ] Links internos: Funcionan sin refresh
- [ ] Back/Forward: Navegación browser funciona

### Links Externos
- [ ] GitHub links: Abren en nueva pestaña
- [ ] Demo links: Abren en nueva pestaña
- [ ] Email link: Abre cliente de correo

---

## Testing de Animaciones

### Framer Motion
- [ ] Fade-in: Suave, <600ms
- [ ] Scale: Sin jitter, spring smooth
- [ ] Stagger: Delay correcto entre items
- [ ] WhileInView: Trigger al scroll visible
- [ ] Hover: Responsivo, <100ms

### Performance
- [ ] GPU acceleration: Usar transform/opacity
- [ ] No reflow: Evitar layout thrashing
- [ ] 60fps: Sin drops en desktop potente

---

## Testing de Compatibilidad

### Navegadores
- [ ] Chrome/Chromium: Versión actual
- [ ] Firefox: Versión actual
- [ ] Safari: Versión actual (15+)
- [ ] Edge: Versión actual

### Dispositivos
- [ ] iPhone: iOS 14+
- [ ] Android: Android 10+
- [ ] iPad: iPadOS 14+
- [ ] Samsung Galaxy: Android 11+

---

## Checklist Final Antes de Deploy

- [ ] Todos los tests de responsiveness completados
- [ ] Lighthouse score >90 en todas categorías
- [ ] No console errors o warnings
- [ ] Keyboard navigation funciona
- [ ] Screen reader testing completado
- [ ] Contraste verificado
- [ ] Performance optimizado
- [ ] Build: `npm run build` sin errores
- [ ] Build preview: `npm run preview` funciona
- [ ] README actualizado con instrucciones
- [ ] Git: Cambios committed y pusheados

---

## Estado de Testing

**Fecha:** 2026-06-17  
**Responsable:** Vicente Rabanales / Claude Code  
**Status:** 🟡 Pendiente (Empezar testing después de Fase 7)

### Tests Completados
- [ ] Responsivo mobile (pendiente)
- [ ] Responsivo tablet (pendiente)
- [ ] Responsivo desktop (pendiente)
- [ ] Accesibilidad (pendiente)
- [ ] Performance (pendiente)
- [ ] SEO (pendiente)

### Próximos Pasos
1. Ejecutar Lighthouse audit
2. Testing manual en diferentes dispositivos
3. Testing con screen reader
4. Optimizar imágenes
5. Implementar lazy loading
6. Deploy a Vercel
