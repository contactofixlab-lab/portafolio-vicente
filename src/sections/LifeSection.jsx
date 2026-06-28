import { motion } from 'framer-motion'
import { hobbies } from '../data/hobbies'

export default function LifeSection() {
  const images = [
    { id: 1, src: '/foto.png', alt: 'Vida fuera del código 1' },
    { id: 2, src: '/Developer.png', alt: 'Vida fuera del código 2' },
    { id: 3, src: '/Code.png', alt: 'Vida fuera del código 3' },
    { id: 4, src: '/poketask-hero.png', alt: 'Vida fuera del código 4' },
    { id: 5, src: '/analytics-logo.png', alt: 'Vida fuera del código 5' }
  ]

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Texto - Izquierda */}
        <div className="space-y-8 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Más allá del código
            </h2>
          </motion.div>

          {/* Descripción detallada */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4 text-gray-600"
          >
            <p>
              Mi vida me ha llevado a distintos lugares como el norte de Chile y Montevideo, Uruguay.
              Esto me ha dado una perspectiva distinta acerca de algunos aspectos de la vida.
              Cuando no estoy optimizando sistemas o creando dashboards o reportes, disfruto de los amigos,
              familia, música, videojuegos y series. Además me gusta dar largos paseos con mi perro.
            </p>
          </motion.div>

          {/* Hobbies */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 bg-gradient-to-br from-accent-50 to-primary-50 p-8 rounded-2xl border-2 border-accent-200"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">✨ Mis Pasiones</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {hobbies.map((hobby, idx) => (
                <motion.div
                  key={hobby.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="flex items-center justify-center"
                >
                  <div className="w-full bg-white rounded-xl p-4 border-2 border-accent-300 hover:border-primary-400 shadow-md hover:shadow-lg transition-all text-center">
                    <div className="text-4xl mb-2">{hobby.icon}</div>
                    <p className="text-sm font-semibold text-gray-800">{hobby.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Masonry Grid - Derecha */}
        <div className="order-1 md:order-2">
          <div className="grid grid-cols-2 grid-rows-4 gap-4 h-full rounded-2xl overflow-hidden">
            {/* Imagen 1 - Top Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0 * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-1 row-span-1 border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer group hover:border-primary-300 transition-all bg-gray-100"
            >
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="w-full h-full object-cover group-hover:brightness-110 transition-all"
              />
            </motion.div>

            {/* Imagen 2 - Top Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-1 row-span-2 border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer group hover:border-primary-300 transition-all bg-gray-100"
            >
              <img
                src={images[1].src}
                alt={images[1].alt}
                className="w-full h-full object-cover group-hover:brightness-110 transition-all"
              />
            </motion.div>

            {/* Imagen 3 - Middle Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2 * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-1 row-span-1 border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer group hover:border-primary-300 transition-all bg-gray-100"
            >
              <img
                src={images[2].src}
                alt={images[2].alt}
                className="w-full h-full object-cover group-hover:brightness-110 transition-all"
              />
            </motion.div>

            {/* Imagen 4 - Bottom Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 3 * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-1 row-span-2 border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer group hover:border-primary-300 transition-all bg-gray-100"
            >
              <img
                src={images[3].src}
                alt={images[3].alt}
                className="w-full h-full object-cover group-hover:brightness-110 transition-all"
              />
            </motion.div>

            {/* Imagen 5 - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 4 * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-1 row-span-2 border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer group hover:border-primary-300 transition-all bg-gray-100"
            >
              <img
                src={images[4].src}
                alt={images[4].alt}
                className="w-full h-full object-cover group-hover:brightness-110 transition-all"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
