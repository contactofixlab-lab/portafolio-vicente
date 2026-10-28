/**
 * Analítica anónima del sitio: visitas, clics (con posición y elemento) y tiempo/scroll al salir de cada página.
 * No usa cookies ni guarda datos personales: solo un identificador aleatorio por sesión y por navegador.
 * Los datos se ven en la consola de administración → Analítica.
 */

const ENDPOINT = import.meta.env.VITE_ANALYTICS_URL || 'https://portafolio-admin-eta.vercel.app/api/track'

const SECTION_NAMES = {
  vida: 'Más allá del código',
  'proyectos-destacados': 'Proyectos destacados',
  'trayectoria-inicio': 'Trayectoria (inicio)',
  'habilidades-inicio': 'Habilidades (inicio)',
  certificados: 'Certificados',
  contacto: 'Contacto (inicio)'
}

const INTERACTIVE = 'a,button,[role="button"],[role="tab"],input,select,textarea,summary,label'

const safe = (fn, fallback) => {
  try {
    return fn()
  } catch {
    return fallback
  }
}

const rand = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)

function store(kind, key) {
  return safe(() => {
    const s = kind === 'local' ? window.localStorage : window.sessionStorage
    let v = s.getItem(key)
    if (!v) {
      v = rand()
      s.setItem(key, v)
    }
    return v
  }, rand())
}

function currentPage() {
  const h = (window.location.hash || '#home').slice(1)
  if (h.startsWith('proyecto/')) return 'proyecto/' + h.split('/')[1]
  return h === '' || h === 'home' ? 'inicio' : h
}

function deviceOf() {
  const w = window.innerWidth
  if (w < 768) return 'mobile'
  if (w < 1100) return 'tablet'
  return 'desktop'
}

function headingOf(section) {
  if (section.querySelector('h1')) return 'Cabecera de página'
  const h = section.querySelector('h2')
  return h ? h.textContent.replace(/\s+/g, ' ').trim().slice(0, 40) : 'Contenido principal'
}

function sectionOf(el) {
  if (el.closest('nav[aria-label="Navegación principal"], header[role="banner"]')) return 'Menú'
  if (el.closest('footer')) return 'Footer'
  const fixed = el.closest('[class*="fixed"]')
  if (fixed) return 'Botón flotante'
  const section = el.closest('section')
  if (section) return section.id ? SECTION_NAMES[section.id] || section.id : headingOf(section)
  return 'Página'
}

function isFixed(el) {
  let node = el
  for (let i = 0; node && node !== document.body && i < 10; i += 1) {
    if (window.getComputedStyle(node).position === 'fixed') return true
    node = node.parentElement
  }
  return false
}

function ownText(el) {
  return [...el.childNodes]
    .filter((n) => n.nodeType === 3)
    .map((n) => n.textContent)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function describe(target) {
  const interactiveEl = target.closest(INTERACTIVE)
  const el = interactiveEl || target
  const tag = el.tagName.toLowerCase()

  let label = (el.getAttribute('aria-label') || '').trim()
  if (!label && interactiveEl) {
    const heading = el.querySelector('h1,h2,h3,h4')
    label = ((heading && heading.textContent) || el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim()
  }
  if (!label && !interactiveEl) {
    label = /^(h[1-6]|p|span|li|strong|em|b|small|blockquote)$/.test(tag) ? (el.innerText || '').replace(/\s+/g, ' ').trim() : ownText(el)
  }
  if (!label) label = el.getAttribute('title') || el.getAttribute('alt') || el.querySelector?.('img')?.getAttribute('alt') || ''
  label = label.trim().slice(0, 60)
  if (!label) {
    const cls = (el.getAttribute('class') || '').split(/\s+/).find((c) => c && !/^(w-|h-|p[xytblr]?-|m[xytblr]?-|flex|grid|relative|absolute|text-|bg-|rounded|gap-|items-|justify-|overflow|font-|shadow|border)/.test(c))
    label = `<${tag}${cls ? '.' + cls.slice(0, 18) : ''}>`
  }

  const a = el.closest('a')
  const href = (a && a.getAttribute('href')) || ''
  let kind = 'otro'
  if (/^mailto:/i.test(href)) kind = 'correo'
  else if (/^tel:/i.test(href)) kind = 'telefono'
  else if (/wa\.me|whatsapp/i.test(href) || /whatsapp/i.test(label)) kind = 'whatsapp'
  else if (/\bcv\b|curr[ií]culum/i.test(label) || /\/CV_|curriculum/i.test(href)) kind = 'cv'
  else if (/github\.com/i.test(href)) kind = 'github'
  else if (/linkedin\.com/i.test(href)) kind = 'linkedin'
  else if (/^https?:/i.test(href)) kind = 'enlace externo'
  else if (href.startsWith('#')) kind = 'navegación'
  else if (a) kind = 'enlace'
  else if (tag === 'button' || el.closest('button')) kind = 'botón'
  else if (tag === 'img') kind = 'imagen'
  else if (['input', 'select', 'textarea'].includes(tag)) kind = 'campo'

  return { label, kind, href: href.split('?')[0].slice(0, 200), interactive: Boolean(interactiveEl), section: sectionOf(el) }
}

export function initAnalytics() {
  if (typeof window === 'undefined' || window.__pvTracker) return
  window.__pvTracker = true

  const params = new URLSearchParams(window.location.search)
  if (params.has('heatmap')) {
    document.documentElement.classList.add('heatmap-mode')
    return
  }
  if (params.has('notrack')) {
    safe(() => (params.get('notrack') === '0' ? window.localStorage.removeItem('pv_notrack') : window.localStorage.setItem('pv_notrack', '1')))
    params.delete('notrack')
    const search = params.toString()
    safe(() => window.history.replaceState(null, '', window.location.pathname + (search ? '?' + search : '') + window.location.hash))
  }
  if (safe(() => window.localStorage.getItem('pv_notrack') === '1', false)) return
  if (navigator.doNotTrack === '1') return

  // El desarrollo local nunca se rastrea: la analítica muestra solo visitas reales
  if (/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)) return
  const url = ENDPOINT
  const sid = store('session', 'pv_sid')
  const vid = store('local', 'pv_vid')

  let queue = []
  let page = null
  let state = null
  let recent = []

  const docWidth = () => Math.max(document.documentElement.scrollWidth, window.innerWidth, 1)
  const docHeight = () => Math.max(document.documentElement.scrollHeight, document.body ? document.body.scrollHeight : 0, 1)

  const push = (event) => {
    queue.push({ ...event, _t: Date.now() })
    if (queue.length >= 12) flush()
  }

  function flush() {
    if (!queue.length) return
    const now = Date.now()
    const referrerSent = safe(() => window.sessionStorage.getItem('pv_ref') === '1', false)
    let referrer = ''
    if (!referrerSent) {
      const r = document.referrer || ''
      referrer = safe(() => (new URL(r).host !== window.location.host ? r : ''), '')
      safe(() => window.sessionStorage.setItem('pv_ref', '1'))
    }
    const events = queue.map(({ _t, ...rest }) => ({ ...rest, ago: now - _t }))
    queue = []
    const body = JSON.stringify({ sid, vid, host: window.location.hostname, device: deviceOf(), vw: window.innerWidth, vh: window.innerHeight, referrer, events })
    const sent = safe(() => navigator.sendBeacon && navigator.sendBeacon(url, new Blob([body], { type: 'text/plain;charset=UTF-8' })), false)
    if (!sent) safe(() => fetch(url, { method: 'POST', body, keepalive: true, mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=UTF-8' } }).catch(() => {}))
  }

  function startPage() {
    page = currentPage()
    state = { page, active: 0, since: document.visibilityState === 'visible' ? Date.now() : null, maxScroll: 0, left: false }
    measureScroll()
    push({ type: 'pageview', page })
  }

  function activeMs() {
    return state.active + (state.since ? Date.now() - state.since : 0)
  }

  function measureScroll() {
    if (!state) return
    const total = docHeight()
    const seen = ((window.scrollY + window.innerHeight) / total) * 100
    state.maxScroll = Math.max(state.maxScroll, Math.min(100, seen))
  }

  function leavePage() {
    if (!state || state.left) return
    state.left = true
    measureScroll()
    push({ type: 'leave', page: state.page, value: Math.round(state.maxScroll), docH: docHeight(), meta: { sec: Math.round(activeMs() / 1000) } })
  }

  let lastScrollCheck = 0
  window.addEventListener(
    'scroll',
    () => {
      const now = Date.now()
      if (now - lastScrollCheck > 250) {
        lastScrollCheck = now
        measureScroll()
      }
    },
    { passive: true }
  )

  window.addEventListener('hashchange', () => {
    if (currentPage() === page) return
    leavePage()
    startPage()
  })

  document.addEventListener('visibilitychange', () => {
    if (!state) return
    if (document.visibilityState === 'hidden') {
      if (state.since) {
        state.active += Date.now() - state.since
        state.since = null
      }
      leavePage()
      flush()
    } else if (!state.since) {
      state.since = Date.now()
    }
  })
  window.addEventListener('pagehide', () => {
    leavePage()
    flush()
  })

  document.addEventListener(
    'click',
    (e) => {
      safe(() => {
        const target = e.target instanceof Element ? e.target : null
        if (!target || !state) return
        const info = describe(target)
        const fixed = isFixed(target)
        const x = (e.pageX / docWidth()) * 100
        const y = fixed ? e.clientY : e.pageY

        const now = Date.now()
        recent = recent.filter((r) => now - r.t < 1200)
        const rage = recent.filter((r) => Math.abs(r.x - e.pageX) < 50 && Math.abs(r.y - e.pageY) < 50).length >= 2
        recent.push({ t: now, x: e.pageX, y: e.pageY })

        const meta = {}
        if (fixed) meta.f = 1
        if (rage) meta.rage = 1
        push({
          type: 'click',
          page: state.page,
          section: info.section,
          label: info.label,
          kind: info.kind,
          href: info.href,
          interactive: info.interactive,
          x: Math.round(x * 10) / 10,
          y: Math.round(y),
          docH: docHeight(),
          meta: Object.keys(meta).length ? meta : undefined
        })
      })
    },
    true
  )

  // El formulario avisa cuando un mensaje se envió con éxito
  window.addEventListener('pv:conversion', (e) => {
    safe(() => {
      if (!state) return
      const d = (e && e.detail) || {}
      push({ type: 'click', page: state.page, section: 'Formulario de contacto', label: d.label || 'Mensaje enviado', kind: d.kind || 'mensaje', interactive: true, docH: docHeight() })
    })
  })

  window.setInterval(() => flush(), 5000)
  startPage()
}
