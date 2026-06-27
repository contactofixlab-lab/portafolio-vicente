export const projects = [
  {
    id: 1,
    title: 'Iencinas Analytics',
    description: 'Dashboard de BI para análisis de datos empresariales con reportes interactivos',
    longDescription: 'Sistema completo de business intelligence con visualizaciones, reportes automáticos y análisis predictivos. Diseño moderno con framer-motion y glassmorphism.',
    image: '/powerbi-logo.png',
    stack: ['React', 'Python', 'PostgreSQL', 'Power BI', 'Framer Motion', 'Tailwind'],
    status: 'En Desarrollo',
    tags: ['analytics', 'business', 'dashboard'],
    github: 'https://github.com',
    demo: 'https://iencinas-analytics.vercel.app',

    // Información detallada
    startDate: '2024-01-15',
    endDate: null,
    reason: 'Necesidad de consolidar datos empresariales dispersos en múltiples fuentes para tomar decisiones basadas en datos en tiempo real.',

    whatWasDone: [
      'Dashboard interactivo con múltiples visualizaciones (gráficos, tablas, mapas)',
      'Sistema de reportes automáticos que se generan diariamente',
      'Integración con 5 fuentes de datos diferentes',
      'Análisis predictivos usando modelos de Machine Learning',
      'Sistema de alertas para métricas críticas',
      'Exportación de reportes en PDF y Excel'
    ],

    problems: [
      'Datos distribuidos en múltiples sistemas sin integración',
      'Falta de visibilidad en tiempo real de métricas clave',
      'Reportes manuales que tomaban 4-6 horas diarias',
      'Inconsistencias en los datos entre departamentos'
    ],

    solutions: [
      'ETL automático que sincroniza datos cada 30 minutos',
      'Base de datos centralizada en PostgreSQL',
      'API REST para consultas en tiempo real',
      'Validación de datos con reglas de negocio'
    ],

    architecture: {
      frontend: 'React 18 con Vite, Framer Motion para animaciones, Tailwind CSS',
      backend: 'Python con FastAPI, procesamiento de datos con Pandas/NumPy',
      database: 'PostgreSQL con triggers para auditoría',
      external: 'Power BI para reportes avanzados, API de terceros para datos'
    },

    features: [
      'Dashboard personalizable (widgets drag-drop)',
      'Filtros dinámicos por fecha, región, producto',
      'Gráficos interactivos con drill-down',
      'KPI en tiempo real',
      'Comparativas período vs período',
      'Presupuesto vs Real',
      'Proyecciones',
      'Exportación automática de reportes'
    ],

    phases: [
      {
        name: 'Fase 1: Diseño & Prototipo',
        duration: '2 semanas',
        description: 'Definición de KPIs, diseño de UI/UX, prototipo interactivo'
      },
      {
        name: 'Fase 2: Backend & Integración',
        duration: '4 semanas',
        description: 'Desarrollo de APIs, ETL, conexión a fuentes de datos'
      },
      {
        name: 'Fase 3: Frontend',
        duration: '3 semanas',
        description: 'Desarrollo de componentes, integración con backend'
      },
      {
        name: 'Fase 4: Testing & Optimización',
        duration: '2 semanas',
        description: 'Testing exhaustivo, optimización de performance'
      }
    ],

    results: 'Reducción de 80% en tiempo de generación de reportes, mejora en toma de decisiones, visibilidad en tiempo real de métricas clave.',

    imagenes: []
  },

  {
    id: 2,
    title: 'Iencinas Bodega',
    description: 'Sistema de gestión de inventario y asignación de insumos para bodega',
    longDescription: 'Aplicación de control de inventario con seguimiento de activos, historial de movimientos y reportes. Interfaz intuitiva para gestión eficiente.',
    image: '/java logo.png',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Express', 'Tailwind'],
    status: 'Últimas Fases',
    tags: ['inventory', 'business', 'management'],
    github: 'https://github.com',
    demo: 'https://iencinas-analytics.vercel.app',

    // Información detallada
    startDate: '2024-02-01',
    endDate: '2024-06-15',
    reason: 'Sistema manual de inventario causaba pérdidas, errores y falta de visibilidad. Necesidad de automatizar y digitalizar el proceso.',

    whatWasDone: [
      'Módulo de entrada y salida de inventario',
      'Asignación de insumos por proyecto/usuario',
      'Seguimiento de activos con códigos QR',
      'Historial de movimientos con auditoría',
      'Reportes de inventario por categoría',
      'Alertas de stock bajo',
      'Panel de control para gerente',
      'Sistema de permisos y roles'
    ],

    problems: [
      'Control manual en hojas de Excel',
      'Pérdida de insumos por falta de registro',
      'Imposibilidad de trackear ubicación de activos',
      'Reportes manuales inexactos',
      'Conflictos por asignación de recursos'
    ],

    solutions: [
      'Sistema centralizado con base de datos',
      'Códigos QR para tracking automático',
      'Validación de permisos para cada operación',
      'Auditoría completa de movimientos',
      'Reportes generados automáticamente'
    ],

    architecture: {
      frontend: 'React con componentes reutilizables, formularios dinámicos',
      backend: 'Node.js/Express con autenticación JWT',
      database: 'PostgreSQL con relaciones normalizadas',
      extras: 'QR code generator, PDF export, Email notifications'
    },

    features: [
      'Registro de entrada/salida de inventario',
      'Asignación de insumos a proyectos',
      'Búsqueda por código QR',
      'Historial de movimientos',
      'Reportes por período',
      'Stock mínimo y máximo configurables',
      'Alertas por email',
      'Dashboard de gerente con KPIs'
    ],

    phases: [
      {
        name: 'Fase 1: Análisis & Diseño',
        duration: '1.5 semanas',
        description: 'Entrevistas con usuarios, mapeo de procesos actuales'
      },
      {
        name: 'Fase 2: Desarrollo Backend',
        duration: '2.5 semanas',
        description: 'APIs CRUD, autenticación, lógica de negocio'
      },
      {
        name: 'Fase 3: Desarrollo Frontend',
        duration: '2 semanas',
        description: 'Interfaz de usuario, formularios, listados'
      },
      {
        name: 'Fase 4: Testing & Deploy',
        duration: '2 semanas',
        description: 'QA, correcciones, capacitación a usuarios'
      }
    ],

    results: 'Implementación exitosa, reducción de pérdidas en 90%, inventario actualizado en tiempo real, reportes precisos.',

    imagenes: []
  },

  {
    id: 3,
    title: 'Boulevard Santa Rosa',
    description: 'Sitio web de proyecto inmobiliario con diseño moderno e interactivo',
    longDescription: 'Página de marketing para proyecto inmobiliario con mapas interactivos, galería de renders optimizada y cotizaciones en línea. Deployed en Vercel.',
    image: '/github-logo.png',
    stack: ['React', 'Tailwind', 'Framer Motion', 'Next.js', 'Vercel', 'Mapbox'],
    status: 'Terminado',
    tags: ['real-estate', 'marketing', 'design'],
    github: 'https://github.com',
    demo: 'https://iencinas-analytics.vercel.app',

    // Información detallada
    startDate: '2024-03-10',
    endDate: '2024-05-20',
    reason: 'Necesidad de un sitio web profesional para promocionar proyecto inmobiliario, atraer inversores y facilitar consultas.',

    whatWasDone: [
      'Diseño landing page con hero section impactante',
      'Galería de renders 3D optimizada con lazy loading',
      'Mapa interactivo de ubicación con Mapbox',
      'Características de unidades (áreas, precios, planos)',
      'Sistema de cotizaciones interactivo',
      'Formulario de contacto integrado con email',
      'Timeline del proyecto',
      'Sección de amenidades'
    ],

    problems: [
      'Competencia con otros proyectos en el mercado',
      'Necesidad de visualizar proyecto antes de construcción',
      'Falta de plataforma para consultas de inversores',
      'Imagen poco profesional online'
    ],

    solutions: [
      'Diseño moderno y atractivo con Framer Motion',
      'Renders 3D de alta calidad',
      'Interactividad para mejorar engagement',
      'Optimización SEO para visibilidad',
      'Sistema de seguimiento de leads'
    ],

    architecture: {
      frontend: 'Next.js para SSR y performance',
      styling: 'Tailwind CSS con tema personalizado',
      animations: 'Framer Motion para scroll effects',
      maps: 'Mapbox GL para mapa interactivo',
      hosting: 'Vercel con auto-deploy desde GitHub'
    },

    features: [
      'Landing page responsivo',
      'Galería de renders con lightbox',
      'Mapa interactivo de ubicación',
      'Cotizador de precios dinámico',
      'Timeline del proyecto',
      'Formulario de contacto',
      'Sección de amenidades',
      'Responsive design móvil'
    ],

    phases: [
      {
        name: 'Fase 1: Diseño UI/UX',
        duration: '1 semana',
        description: 'Mockups en Figma, aprobación del cliente'
      },
      {
        name: 'Fase 2: Desarrollo',
        duration: '2.5 semanas',
        description: 'Codificación frontend, integración de APIs'
      },
      {
        name: 'Fase 3: Optimización',
        duration: '1 semana',
        description: 'SEO, performance, testing'
      },
      {
        name: 'Fase 4: Deploy & Mantenimiento',
        duration: 'Ongoing',
        description: 'Deploy a Vercel, soporte'
      }
    ],

    results: 'Sitio web profesional que aumentó leads en 150%, reducción de inquietudes por email, mejor presencia online.',

    imagenes: []
  },

  {
    id: 4,
    title: 'Puertas del Sol',
    description: 'Sitio web de arquitectura y bienes raíces con galería de renders optimizada',
    longDescription: 'Portafolio arquitectónico con galería de proyectos, descripciones detalladas y contacto directo. Diseño responsivo y optimizado.',
    image: '/trello-logo.png',
    stack: ['React', 'Tailwind', 'Framer Motion', 'Webpack'],
    status: 'En Desarrollo',
    tags: ['design', 'real-estate', 'portfolio'],
    github: 'https://github.com',
    demo: 'https://iencinas-analytics.vercel.app',

    // Información detallada
    startDate: '2024-04-01',
    endDate: null,
    reason: 'Firma de arquitectura necesitaba plataforma online para mostrar portafolio y atraer nuevos clientes.',

    whatWasDone: [
      'Galería de proyectos con categorización',
      'Fichas técnicas de cada proyecto',
      'Galería de imágenes con antes/después',
      'Información del equipo',
      'Blog de artículos de arquitectura',
      'Formulario de consulta de proyectos',
      'Portfolio PDF descargable',
      'Integración con redes sociales'
    ],

    problems: [
      'Portafolio anticuado sin presencia online',
      'Dificultad para mostrar proyectos terminados',
      'Falta de contacto directo con potenciales clientes',
      'Competencia con otros despachos online'
    ],

    solutions: [
      'Sitio moderno con galería impresionante',
      'Optimización de imágenes para carga rápida',
      'SEO para visibilidad en búsquedas locales',
      'Sistema de contacto automático'
    ],

    architecture: {
      frontend: 'React con componentes de galería',
      styling: 'Tailwind CSS con diseño minimalista',
      animations: 'Framer Motion para transiciones suaves',
      optimization: 'Image lazy loading, compression'
    },

    features: [
      'Galería de proyectos por categoría',
      'Modal de proyecto con detalles',
      'Filtros por tipo de proyecto',
      'Blog integrado',
      'Formulario de contacto',
      'Mapa de ubicación',
      'Testimonios de clientes',
      'Portfolio PDF downloadable'
    ],

    phases: [
      {
        name: 'Fase 1: Estructura & Contenido',
        duration: '2 semanas',
        description: 'Organización de contenido, fotografías, descripciones'
      },
      {
        name: 'Fase 2: Diseño & Frontend',
        duration: '2 semanas',
        description: 'Desarrollo de componentes, galería'
      },
      {
        name: 'Fase 3: Funcionalidades',
        duration: '1.5 semanas',
        description: 'Blog, contacto, SEO'
      },
      {
        name: 'Fase 4: Testing & Publicación',
        duration: '1 semana',
        description: 'QA, ajustes, publicación'
      }
    ],

    results: 'Portafolio online profesional, aumento en inquietudes de nuevos proyectos, mejor visibilidad en Google.',

    imagenes: []
  },

  {
    id: 5,
    title: 'PokeTask',
    description: 'App de tareas con gamificación usando Pokémon',
    longDescription: 'Aplicación de gestión de tareas con sistema de gamificación. Incluye bot de Telegram, XP dinámico, dashboard con gráficos y progresión de personajes.',
    image: '/poketask-hero.png',
    stack: ['React', 'Node.js', 'MongoDB', 'Telegram Bot', 'Chart.js', 'Socket.io'],
    status: 'En Desarrollo',
    tags: ['productivity', 'gamification', 'personal-project'],
    github: 'https://github.com',
    demo: 'https://iencinas-analytics.vercel.app',

    // Información detallada
    startDate: '2024-05-01',
    endDate: null,
    reason: 'Proyecto personal para mejorar productividad personal integrando gamificación con elementos de Pokémon.',

    whatWasDone: [
      'Sistema de tareas con prioridades',
      'Gamificación: XP por completar tareas',
      'Sistema de Pokémon que crece con XP',
      'Bot de Telegram para crear tareas',
      'Dashboard con estadísticas y gráficos',
      'Ranking de usuarios',
      'Sistema de logros',
      'Notificaciones en tiempo real'
    ],

    problems: [
      'Dificultad para mantener productividad en tareas',
      'Falta de motivación para completar tareas',
      'Imposibilidad de trackear progreso personal'
    ],

    solutions: [
      'Gamificación con sistema de XP y niveles',
      'Personaje Pokémon que crece con progreso',
      'Integración con Telegram para facilidad de uso',
      'Dashboard visual para motivación'
    ],

    architecture: {
      frontend: 'React con Canvas para visualización',
      backend: 'Node.js/Express con WebSockets',
      database: 'MongoDB para flexibilidad',
      bot: 'Telegram Bot API',
      charts: 'Chart.js para estadísticas'
    },

    features: [
      'Crear tareas con prioridad y fecha',
      'Bot Telegram para crear tareas rápido',
      'Sistema XP por completar tareas',
      'Pokémon que crece con nivel',
      'Dashboard con estadísticas',
      'Gráfico de productividad',
      'Ranking con otros usuarios',
      'Logros desbloqueables'
    ],

    phases: [
      {
        name: 'Fase 1: Diseño & Concepto',
        duration: '1 semana',
        description: 'Definición de mecánicas, wireframes'
      },
      {
        name: 'Fase 2: Backend & Bot',
        duration: '2 semanas',
        description: 'APIs, Telegram Bot, sistema XP'
      },
      {
        name: 'Fase 3: Frontend',
        duration: '2 semanas',
        description: 'Dashboard, componentes, gráficos'
      },
      {
        name: 'Fase 4: Gamificación',
        duration: '1.5 semanas',
        description: 'Sistema Pokémon, logros, ranking'
      }
    ],

    results: 'App funcional con comunidad de usuarios, mejora en productividad personal, prototipo para posible monetización.',

    imagenes: []
  },

  {
    id: 6,
    title: 'Vortex',
    description: 'Sitio web de descargas con diseño glassmorphism cyberpunk',
    longDescription: 'Plataforma de descargas de series, películas y anime. Diseño cyberpunk futurista con integración de múltiples servidores (OneDrive, GDrive, Mega).',
    image: '/miro logo.png',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Glassmorphism CSS'],
    status: 'En Desarrollo',
    tags: ['downloads', 'entertainment', 'design'],
    github: 'https://github.com',
    demo: 'https://iencinas-analytics.vercel.app',

    // Información detallada
    startDate: '2024-04-15',
    endDate: null,
    reason: 'Proyecto personal para centralizar acceso a contenido multimedia distribuido en múltiples plataformas.',

    whatWasDone: [
      'Diseño cyberpunk con glassmorphism',
      'Búsqueda de contenido por título/género',
      'Enlaces de descarga de múltiples servidores',
      'Sistema de categorización (series, películas, anime)',
      'Integración con servidores OneDrive, Google Drive, Mega',
      'Sistema de favoritos',
      'Historial de descargas',
      'Notificaciones de nuevo contenido'
    ],

    problems: [
      'Contenido esparcido en múltiples plataformas',
      'Interfaz poco intuitiva para encontrar archivos',
      'Necesidad de un hub centralizado'
    ],

    solutions: [
      'Interfaz moderna y centralizada',
      'Búsqueda inteligente',
      'Enlaces dinámicos a múltiples servidores',
      'Actualización automática de catálogo'
    ],

    architecture: {
      frontend: 'React con Glassmorphism CSS',
      styling: 'CSS3 con efectos blur y gradientes',
      backend: 'Node.js para scraping y APIs',
      database: 'MongoDB para catálogo dinámico',
      integration: 'APIs de OneDrive, Google Drive, Mega'
    },

    features: [
      'Búsqueda por título/género',
      'Filtros por tipo de contenido',
      'Enlaces de descarga directa',
      'Múltiples opciones de servidor',
      'Sistema de favoritos',
      'Historial personal',
      'Notificaciones de nuevos estrenos',
      'Interfaz cyberpunk futurista'
    ],

    phases: [
      {
        name: 'Fase 1: Diseño Cyberpunk',
        duration: '1 semana',
        description: 'Creación de tema glassmorphism, animaciones'
      },
      {
        name: 'Fase 2: Backend & Scraping',
        duration: '2 semanas',
        description: 'APIs de scraping, integración de servidores'
      },
      {
        name: 'Fase 3: Frontend',
        duration: '1.5 semanas',
        description: 'Interfaz de usuario, búsqueda'
      },
      {
        name: 'Fase 4: Features Adicionales',
        duration: 'Ongoing',
        description: 'Favoritos, historial, notificaciones'
      }
    ],

    results: 'Plataforma funcional con diseño impactante, acceso centralizado a contenido, base para expansión futura.',

    imagenes: []
  }
]
