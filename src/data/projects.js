export const projects = [
  {
    id: 1,
    title: 'Iencinas Analytics',
    description: 'Dashboard de BI para análisis de datos empresariales con reportes interactivos',
    longDescription: 'Sistema completo de business intelligence con visualizaciones, reportes automáticos y análisis predictivos. Diseño moderno con framer-motion y glassmorphism.',
    image: '/projects/analytics-logo.png',
    type: 'App',
    stack: ['React', 'Python', 'PostgreSQL', 'Power BI', 'Framer Motion', 'Tailwind'],
    status: 'Terminado',
    tags: ['analytics', 'business', 'dashboard'],
    github: 'https://github.com/contactofixlab-lab/iencinas-analytics',
    demo: 'https://iencinas-analytics.vercel.app',
    startDate: '2024-01-15',
    endDate: '2024-06-20',
    reason: 'Consolidar datos empresariales dispersos para tomar decisiones basadas en datos',
    whatWasDone: ['Dashboard interactivo', 'Reportes automáticos', 'Integración de datos', 'Análisis predictivos', 'Sistema de alertas', 'Exportación PDF/Excel'],
    problems: ['Datos distribuidos', 'Sin visibilidad real-time', 'Reportes manuales largos', 'Inconsistencias de datos'],
    solutions: ['ETL automático', 'BD centralizada', 'API REST', 'Validación de datos'],
    architecture: {
      frontend: 'React 18 + Vite + Framer Motion + Tailwind',
      backend: 'Python FastAPI + Pandas/NumPy',
      database: 'PostgreSQL con triggers',
      external: 'Power BI, APIs de terceros'
    },
    features: ['Dashboard personalizable', 'Reportes automáticos', 'Análisis real-time', 'Alertas', 'Exportación', 'Auditoría'],
    phases: [
      { name: 'Discovery', duration: '2 semanas', description: 'Análisis de fuentes' },
      { name: 'Backend', duration: '6 semanas', description: 'ETL y API' },
      { name: 'Frontend', duration: '5 semanas', description: 'Dashboard' },
      { name: 'QA y Deploy', duration: '2 semanas', description: 'Testing y lanzamiento' }
    ]
  },
  {
    id: 2,
    title: 'Yencinas Bodega',
    description: 'Sistema de gestión de inventario y asignación de insumos de oficina',
    longDescription: 'App de inventario completa para control de insumos, asignación a empleados, reporte de stocks y compras automáticas.',
    image: '/projects/java-logo.png',
    type: 'App',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Neon', 'Tailwind', 'Express'],
    status: 'Terminado',
    tags: ['inventory', 'management', 'warehouse'],
    github: 'https://github.com/contactofixlab-lab/yencinas-bodega',
    demo: 'https://yencinas-bodega.vercel.app',
    startDate: '2024-03-01',
    endDate: '2024-06-18',
    reason: 'Automatizar la gestión de insumos de oficina y evitar desabastecimiento',
    whatWasDone: ['CRUD de inventario', 'Asignación de insumos', 'Reportes automáticos', 'Alertas de stock', 'Integración con proveedores', 'Migración a Neon'],
    problems: ['Control manual', 'Desabastecimiento', 'Pérdida de recursos', 'Sin visibilidad'],
    solutions: ['Tracking automático', 'Alertas de reorden', 'Auditoría', 'Integración de proveedores'],
    architecture: {
      frontend: 'React + Tailwind + Framer Motion',
      backend: 'Node.js Express',
      database: 'Neon PostgreSQL',
      external: 'APIs de proveedores'
    },
    features: ['Gestión de inventario', 'Asignación', 'Reportes', 'Alertas', 'Auditoría', 'Exportación'],
    phases: [
      { name: 'Setup', duration: '1 semana', description: 'Configuración' },
      { name: 'Backend', duration: '3 semanas', description: 'APIs' },
      { name: 'Frontend', duration: '3 semanas', description: 'UI' },
      { name: 'Deploy', duration: '1 semana', description: 'QA y lanzamiento' }
    ]
  },
  {
    id: 3,
    title: 'TRAZA',
    description: 'Sistema de control documental y firmas digitales para resiliencias',
    longDescription: 'Plataforma interna para gestión de documentos, firmas digitales, auditoría y reportería con diseño glassmorphism moderno.',
    image: '/projects/traza-logo.png',
    type: 'App',
    stack: ['React', 'Node.js', 'Neon', 'PostgreSQL', 'Tailwind', 'Framer Motion'],
    status: 'En Desarrollo',
    tags: ['documents', 'signatures', 'audit'],
    github: 'https://github.com/contactofixlab-lab/traza',
    demo: 'https://traza-app.vercel.app',
    startDate: '2024-04-10',
    endDate: null,
    reason: 'Implementar control de documentos y firmas digitales para cumplimiento regulatorio',
    whatWasDone: ['Gestión de documentos', 'Firmas digitales', 'Flujos de aprobación', 'Dashboard', 'Reportes', 'Interface 3D'],
    problems: ['Documentos dispersos', 'Sin auditoría', 'Firmas inseguras', 'Incumplimiento regulatorio'],
    solutions: ['Centralización', 'Blockchain', 'Auditoría automática', 'Cumplimiento normativo'],
    architecture: {
      frontend: 'React + Glassmorphism + 3D',
      backend: 'Node.js con JWT',
      database: 'Neon PostgreSQL',
      external: 'Blockchain, APIs de compliance'
    },
    features: ['Gestión documental', 'Firmas digitales', 'Flujos de aprobación', 'Auditoría', 'Reportería', 'SAML'],
    phases: [
      { name: 'Fase 1', duration: '3 semanas', description: 'Core documental' },
      { name: 'Fase 2', duration: '3 semanas', description: 'Firmas y seguridad' },
      { name: 'Fase 3', duration: '2 semanas', description: 'Reportería' }
    ]
  },
  {
    id: 4,
    title: 'Constructora PDS',
    description: 'Sitio corporativo para constructora con información de proyectos y equipo',
    longDescription: 'Landing page moderna para constructora con portafolio de proyectos, información de equipo y contacto. Diseño profesional con animaciones.',
    image: '/projects/constructora-pds-logo.png',
    type: 'Web',
    stack: ['Next.js', 'React', 'Tailwind', 'Framer Motion', 'TypeScript'],
    status: 'Terminado',
    tags: ['website', 'construction', 'corporate'],
    github: 'https://github.com/contactofixlab-lab/constructora-pds',
    demo: 'https://constructora-pds.vercel.app',
    startDate: '2024-05-01',
    endDate: '2024-06-24',
    reason: 'Crear presencia digital profesional para atraer clientes',
    whatWasDone: ['Landing page', 'Galería de proyectos', 'Info de equipo', 'Formulario de contacto', 'SEO', 'Deploy Vercel'],
    problems: ['Sin presencia digital', 'Dificultad mostrar proyectos', 'Contactos dispersos'],
    solutions: ['Sitio profesional', 'Galería visual', 'Formulario centralizado'],
    architecture: {
      frontend: 'Next.js 16 + React + TypeScript',
      backend: 'Next.js API routes',
      database: 'None',
      external: 'Vercel deploy'
    },
    features: ['Landing', 'Portfolio', 'Team info', 'Contact form', 'SEO', 'Responsive'],
    phases: [
      { name: 'Design', duration: '1 semana', description: 'Diseño visual' },
      { name: 'Development', duration: '2 semanas', description: 'Frontend' },
      { name: 'Launch', duration: '3 días', description: 'Deploy' }
    ]
  },
  {
    id: 5,
    title: 'PokeTask',
    description: 'App de tareas con temática Pokémon y sistema de gamificación',
    longDescription: 'Aplicación de productividad con tema Pokémon que convierte tareas en aventuras, con recompensas y badges de logro.',
    image: '/projects/poketask-hero.png',
    type: 'App',
    stack: ['React', 'Firebase', 'Tailwind', 'Framer Motion', 'TypeScript'],
    status: 'En Desarrollo',
    tags: ['productivity', 'gamification', 'tasks'],
    github: 'https://github.com/contactofixlab-lab/poketask',
    demo: 'https://poketask.vercel.app',
    startDate: '2024-02-15',
    endDate: null,
    reason: 'Hacer que la gestión de tareas sea divertida y motivante',
    whatWasDone: ['Sistema de tareas', 'Pokémon personalizados', 'Recompensas', 'Logros', 'Sincronización real-time', 'Gamificación'],
    problems: ['Tareas aburridas', 'Falta de motivación', 'Procrastinación'],
    solutions: ['Gamificación', 'Sistema de recompensas', 'Avatares evolucionables', 'Competencia amigable'],
    architecture: {
      frontend: 'React + Tailwind + Framer Motion',
      backend: 'Firebase Real-time DB',
      database: 'Firestore',
      external: 'Firebase Auth'
    },
    features: ['Task management', 'Gamification', 'Pokémon avatars', 'Rewards', 'Social', 'Analytics'],
    phases: [
      { name: 'Core', duration: '4 semanas', description: 'Tareas básicas' },
      { name: 'Gamificación', duration: '3 semanas', description: 'Pokémon y rewards' },
      { name: 'Social', duration: '2 semanas', description: 'Competencia' }
    ]
  },
  {
    id: 6,
    title: 'Vortex',
    description: 'Sitio web de descargas con estilo glassmorphism 3D cyberpunk',
    longDescription: 'Plataforma de descargas para películas, series y anime con diseño futurista, visor 3D interactivo y admin panel integrado.',
    image: '/projects/vortex-logo.png',
    type: 'Web',
    stack: ['Next.js', 'React Three Fiber', 'Neon', 'PostgreSQL', 'Tailwind', 'TypeScript'],
    status: 'Terminado',
    tags: ['downloads', 'multimedia', 'streaming'],
    github: 'https://github.com/contactofixlab-lab/vortex',
    demo: 'https://vortex-downloads.vercel.app',
    startDate: '2024-04-01',
    endDate: '2024-06-30',
    reason: 'Crear plataforma moderna de descargas con diseño 3D inmersivo',
    whatWasDone: ['Landing 3D cyberpunk', 'Sistema de descargas', 'Visor 3D', 'Admin panel', 'Carrusel interactivo', 'Estados de seguimiento'],
    problems: ['Interfaces aburridas', 'Sin estadísticas', 'Admin no intuitivo'],
    solutions: ['Diseño 3D moderno', 'Dashboard de admin', 'Tracking de descargas', 'Experiencia inmersiva'],
    architecture: {
      frontend: 'Next.js + React Three Fiber + Tailwind',
      backend: 'Next.js API + Node.js',
      database: 'Neon PostgreSQL',
      external: 'Vercel deploy'
    },
    features: ['3D viewer', 'Download manager', 'Admin panel', 'Search', 'Watch tracking', 'Comments'],
    phases: [
      { name: 'Design 3D', duration: '3 semanas', description: 'Modelado' },
      { name: 'Frontend', duration: '4 semanas', description: 'Interface' },
      { name: 'Backend', duration: '2 semanas', description: 'API y admin' }
    ]
  },
  {
    id: 7,
    title: 'FamilyColab',
    description: 'App familiar con tareas, inventario, cocina y menú 3D flotante',
    longDescription: 'Aplicación completa para familias: gestión de tareas, inventario del hogar, recetas, planificación de menú y menú 3D interactivo flotante.',
    image: '/projects/familycolab-logo.png',
    type: 'App',
    stack: ['React', 'Firebase', 'Tailwind', 'Framer Motion', 'Three.js'],
    status: 'En Desarrollo',
    tags: ['family', 'productivity', 'household'],
    github: 'https://github.com/contactofixlab-lab/familycolab',
    demo: 'https://familycolab.vercel.app',
    startDate: '2024-03-15',
    endDate: null,
    reason: 'Centralizar gestión familiar en una única app intuitiva',
    whatWasDone: ['Sistema de tareas', 'Gestor de inventario', 'Recetas', 'Planificación de menú', 'Menú 3D flotante', 'Sincronización'],
    problems: ['Tareas sin coordinar', 'Inventario disperso', 'Planificación caótica'],
    solutions: ['Centralización', 'Inventario compartido', 'Planificación automática'],
    architecture: {
      frontend: 'React + Three.js + Tailwind',
      backend: 'Firebase Real-time DB',
      database: 'Firestore',
      external: 'Firebase Auth'
    },
    features: ['Task manager', 'Inventory', 'Recipes', 'Menu planner', '3D menu', 'Family roles'],
    phases: [
      { name: 'Core', duration: '3 semanas', description: 'Tareas e inventario' },
      { name: 'Cocina', duration: '2 semanas', description: 'Recetas y menú' },
      { name: '3D Menu', duration: '2 semanas', description: 'Menú flotante' }
    ]
  },
  {
    id: 8,
    title: 'NEXORA',
    description: 'Sitio web AAA para hero shooter estilo Paladins con 10 héroes únicos',
    longDescription: 'Landing page de videojuego shooter competitivo con 10 héroes únicos, visor 3D interactivo, facciones y landing pages por héroe.',
    image: '/projects/nexora-logo.png',
    type: 'Web',
    stack: ['Next.js', 'React Three Fiber', 'Tailwind', 'Framer Motion', 'TypeScript'],
    status: 'Terminado',
    tags: ['gaming', 'esports', 'hero-shooter'],
    github: 'https://github.com/contactofixlab-lab/nexora',
    demo: 'https://nexora-game.vercel.app',
    startDate: '2024-05-20',
    endDate: '2024-07-16',
    reason: 'Crear presencia digital de videojuego competitivo con diseño AAA',
    whatWasDone: ['Landing page hero', '10 héroes', 'Visor 3D', 'Páginas de facciones', 'Sistema de habilidades', 'Deploy Vercel'],
    problems: ['Sin presencia digital', 'Presentación plana', 'Sin experiencia inmersiva'],
    solutions: ['Landing AAA quality', 'Visor 3D', 'Diseño profesional'],
    architecture: {
      frontend: 'Next.js + React Three Fiber',
      backend: 'Next.js static',
      database: 'None',
      external: 'Vercel deploy'
    },
    features: ['Hero showcase', '3D viewer', 'Abilities', 'Faction pages', 'Video backgrounds', 'Responsive'],
    phases: [
      { name: 'Design', duration: '2 semanas', description: 'Diseño AAA' },
      { name: 'Development', duration: '3 semanas', description: 'Frontend y 3D' },
      { name: 'Launch', duration: '1 semana', description: 'Deploy' }
    ]
  },
  {
    id: 9,
    title: 'Plataforma Videojuegos',
    description: 'Plataforma de distribución y gestión de videojuegos independientes',
    longDescription: 'Plataforma para desarrolladores indies para publicar, vender y gestionar sus videojuegos con analytics y monetización integrada.',
    image: '/projects/plataforma-games-logo.png',
    type: 'Web',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind'],
    status: 'En Desarrollo',
    tags: ['gaming', 'marketplace', 'indie'],
    github: 'https://github.com/contactofixlab-lab/plataforma-videojuegos',
    demo: 'https://plataforma-games.vercel.app',
    startDate: '2024-06-01',
    endDate: null,
    reason: 'Democratizar la distribución de videojuegos indie',
    whatWasDone: ['Gestión de juegos', 'Tienda', 'Pagos Stripe', 'Analytics', 'Valoraciones', 'Descargas'],
    problems: ['Plataformas con altas comisiones', 'Sin herramientas para indies', 'Sin datos de ventas'],
    solutions: ['Comisiones bajas', 'Dashboard de analytics', 'Herramientas de marketing'],
    architecture: {
      frontend: 'React + Tailwind',
      backend: 'Node.js Express',
      database: 'PostgreSQL',
      external: 'Stripe API, AWS S3'
    },
    features: ['Game store', 'Developer dashboard', 'Payment processing', 'Analytics', 'Reviews', 'Download manager'],
    phases: [
      { name: 'Marketplace', duration: '4 semanas', description: 'Tienda y catálogo' },
      { name: 'Developer Tools', duration: '3 semanas', description: 'Dashboard y analytics' },
      { name: 'Monetización', duration: '2 semanas', description: 'Pagos' }
    ]
  },
  {
    id: 10,
    title: 'RecipeHub',
    description: 'Sitio web de recetas monetizable con AdSense, primero en la red de proyectos',
    longDescription: 'Plataforma especializada en recetas del mundo con SEO optimizado, AdSense integrado y estructura para monetización. Primer proyecto en la red de sitios web.',
    image: '/projects/recipehub-logo.png',
    type: 'Web',
    stack: ['Next.js', 'React', 'PostgreSQL', 'Tailwind', 'MDX'],
    status: 'En Desarrollo',
    tags: ['recipes', 'food', 'seo'],
    github: 'https://github.com/contactofixlab-lab/recipe-hub',
    demo: 'https://mundo-al-plato.vercel.app',
    startDate: '2024-04-15',
    endDate: null,
    reason: 'Crear primer sitio monetizable de la red de proyectos',
    whatWasDone: ['Catálogo de recetas', 'SEO optimizado', 'AdSense integrado', 'Búsqueda avanzada', 'Recetas por ingredientes', 'Guías de cocina'],
    problems: ['Recetas dispersas', 'Sin monetización', 'Sin estructura de red'],
    solutions: ['Centralización', 'Monetización con AdSense', 'Red de sitios temáticos'],
    architecture: {
      frontend: 'Next.js 16 + React',
      backend: 'Next.js API routes',
      database: 'PostgreSQL',
      external: 'AdSense, Google Analytics'
    },
    features: ['Recipe catalog', 'Search', 'Ingredient filter', 'AdSense', 'SEO optimized', 'Comments'],
    phases: [
      { name: 'Setup', duration: '1 semana', description: 'Estructura y tema' },
      { name: 'Content', duration: '4 semanas', description: 'Recetas y SEO' },
      { name: 'Monetización', duration: '1 semana', description: 'AdSense y analytics' }
    ]
  }
]
