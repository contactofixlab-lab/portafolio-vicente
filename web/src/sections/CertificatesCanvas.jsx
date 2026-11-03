import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Section from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import CertificateCard from '../components/CertificateCard'
import CertificateViewer from '../components/CertificateViewer'
import { certificates as c, ui } from '../content'

/** Carrusel con desplazamiento nativo: se desliza con el dedo, la rueda o arrastrando con el mouse. */
export default function CertificatesCanvas() {
  const certificates = c.items
  const total = certificates.length
  const trackRef = useRef(null)
  const drag = useRef({ active: false, x: 0, left: 0, moved: false })
  const [dragging, setDragging] = useState(false)
  const [view, setView] = useState({ current: 0, perView: 1, atStart: true, atEnd: true, thumbW: 100, thumbL: 0 })
  const [open, setOpen] = useState(null)
  const [direction, setDirection] = useState(1)

  const measure = useCallback(() => {
    const el = trackRef.current
    const first = el?.children[0]
    if (!el || !first) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const step = first.offsetWidth + gap
    const padding = parseFloat(getComputedStyle(el).paddingLeft) || 0
    const perView = Math.max(1, Math.round((el.clientWidth - padding * 2 + gap) / step))
    setView({
      current: Math.min(Math.round(el.scrollLeft / step), total - 1),
      perView,
      atStart: el.scrollLeft <= 4,
      atEnd: el.scrollLeft >= el.scrollWidth - el.clientWidth - 4,
      thumbW: Math.min(100, (el.clientWidth / el.scrollWidth) * 100),
      thumbL: (el.scrollLeft / el.scrollWidth) * 100
    })
  }, [total])

  useEffect(() => {
    measure()
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  const stepSize = () => {
    const el = trackRef.current
    const first = el.children[0]
    return first.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0)
  }

  const scrollToCard = (i) => trackRef.current?.scrollTo({ left: Math.max(0, i) * stepSize(), behavior: 'smooth' })

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    drag.current = { active: true, x: e.clientX, left: trackRef.current.scrollLeft, moved: false }
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.x
    const el = trackRef.current
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true
      // Mientras se arrastra se apagan el imán y el desplazamiento suave (directo en el elemento, sin esperar al render).
      el.style.scrollSnapType = 'none'
      el.style.scrollBehavior = 'auto'
      setDragging(true)
    }
    if (d.moved) el.scrollLeft = d.left - dx
  }
  const endDrag = () => {
    const d = drag.current
    if (!d.active) return
    d.active = false
    if (d.moved) {
      const el = trackRef.current
      const target = Math.max(0, Math.round(el.scrollLeft / stepSize()))
      el.style.scrollSnapType = ''
      el.style.scrollBehavior = ''
      setDragging(false)
      scrollToCard(target)
      setTimeout(() => {
        d.moved = false
      }, 0)
    }
  }

  const maxIndex = Math.max(0, total - view.perView)
  const lastVisible = Math.min(view.current + view.perView, total)

  return (
    <Section id="certificados" bg="peach" next="cream" wide>
      <SectionHeading eyebrow={ui.eyebrows.certificates} title={c.title} subtitle={c.subtitle} />

      <div className="relative">
        <div
          ref={trackRef}
          onScroll={measure}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={(e) => {
            if (drag.current.moved) {
              e.stopPropagation()
              e.preventDefault()
            }
          }}
          className={`-mx-4 flex gap-6 overflow-x-auto px-4 pb-10 pt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-px-4 ${dragging ? 'cursor-grabbing snap-none' : 'snap-x snap-mandatory scroll-smooth'}`}
        >
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: Math.min(i, 3) * 0.08 }}
              className="shrink-0 basis-[86%] snap-start sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
            >
              <CertificateCard
                certificate={cert}
                index={i}
                onOpen={() => {
                  setDirection(1)
                  setOpen(i)
                }}
              />
            </motion.div>
          ))}
        </div>

        <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-primary-100 to-transparent transition-opacity duration-300 ${view.atStart ? 'opacity-0' : 'opacity-100'}`} />
        <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-primary-100 to-transparent transition-opacity duration-300 ${view.atEnd ? 'opacity-0' : 'opacity-100'}`} />
      </div>

      <div className="mt-2 flex items-center justify-center gap-6 sm:gap-8">
        <motion.button
          type="button"
          whileHover={{ scale: view.atStart ? 1 : 1.12 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => scrollToCard(view.current - 1)}
          disabled={view.atStart}
          aria-label="Certificados anteriores"
          className={`grid h-14 w-14 place-items-center rounded-full transition-all ${view.atStart ? 'cursor-not-allowed bg-white/60 text-gray-400' : 'bg-white text-primary-600 shadow-glow'}`}
        >
          <ChevronLeft size={28} />
        </motion.button>

        <div className="min-w-40 text-center">
          <div className="font-display text-2xl font-extrabold text-ink">
            {view.current + 1} - {lastVisible}
          </div>
          <div className="text-sm font-semibold text-ink-soft">de {total} certificados</div>
        </div>

        <motion.button
          type="button"
          whileHover={{ scale: view.atEnd ? 1 : 1.12 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => scrollToCard(Math.min(view.current + 1, maxIndex))}
          disabled={view.atEnd}
          aria-label="Certificados siguientes"
          className={`grid h-14 w-14 place-items-center rounded-full transition-all ${view.atEnd ? 'cursor-not-allowed bg-white/60 text-gray-400' : 'bg-white text-primary-600 shadow-glow'}`}
        >
          <ChevronRight size={28} />
        </motion.button>
      </div>

      <div className="mx-auto mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-primary-300/60" aria-hidden="true">
        <div className="relative h-full rounded-full led-pill transition-[width,margin] duration-200" style={{ width: `${view.thumbW}%`, marginLeft: `${view.thumbL}%` }} />
      </div>

      <Reveal className="mt-8 text-center text-sm font-semibold text-ink-soft">{c.hint}</Reveal>

      <AnimatePresence>
        {open !== null && (
          <CertificateViewer
            items={certificates}
            index={open}
            direction={direction}
            onChange={(i, dir) => {
              setDirection(dir)
              setOpen(i)
            }}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  )
}
