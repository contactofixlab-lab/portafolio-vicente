import site from './site-content.json'

/**
 * Textos de interfaz y SEO editables desde el admin (claves opcionales `ui` y `seo` del contenido).
 * Los valores por defecto viven aquí para que el sitio funcione aunque la base aún no tenga estas claves.
 */
const UI_DEFAULTS = {
  eyebrows: {
    life: 'Quién soy',
    projects: 'Portafolio',
    experience: 'Experiencia',
    skills: 'Stack',
    certificates: 'Credenciales',
    contact: 'Contacto',
    trajectoryPage: 'Experiencia',
    skillsPage: 'Stack completo'
  },
  hero: {
    statYears: 'Años de experiencia',
    statProjects: 'Proyectos',
    statCertificates: 'Certificaciones'
  },
  skills: {
    usedIn: 'Lo he usado en',
    levelAdvanced: 'Avanzado',
    levelIntermediate: 'Intermedio',
    levelBasic: 'Básico'
  },
  projects: {
    filterAll: 'Todos'
  },
  footer: {
    marquee: 'Hablemos',
    backToTop: 'Volver arriba'
  },
  form: {
    nameLabel: 'Nombre',
    emailLabel: 'Email',
    phoneLabel: 'Teléfono (opcional)',
    messageLabel: 'Mensaje',
    subjectLabel: '¿Sobre qué quieres hablar?',
    subjectError: 'Elige un tema para continuar.',
    sendingText: 'Enviando…',
    faqEyebrow: 'Dudas comunes',
    faqMoreText: '¿Sigues con dudas?'
  }
}

const SEO_DEFAULTS = {
  title: 'Vicente Rabanales - Ingeniero en Informática | Portafolio',
  description: 'Portafolio profesional de Vicente Rabanales. Ingeniero en Informática especializado en transformación digital, innovación y desarrollo de soluciones empresariales.',
  keywords: 'Ingeniero Informática, Portafolio, React, Node.js, Transformación Digital, Innovación'
}

const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v)

/** Mezcla en profundidad; un texto vacío en el contenido vuelve al valor por defecto. */
function merge(defaults, override) {
  const out = {}
  for (const key of Object.keys(defaults)) {
    const d = defaults[key]
    const o = override?.[key]
    if (isObj(d)) out[key] = merge(d, isObj(o) ? o : undefined)
    else out[key] = typeof o === 'string' && o.trim() !== '' ? o : d
  }
  return out
}

export const ui = merge(UI_DEFAULTS, site.ui)
export const seo = merge(SEO_DEFAULTS, site.seo)
