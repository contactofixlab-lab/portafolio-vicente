import { motion } from 'framer-motion'
import { hobbies } from '../data/hobbies'

export default function LifeSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        {/* Texto - Centrado */}
        <div className="space-y-8 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-center"
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
            className="space-y-4 text-gray-600 text-center"
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
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">✨ Mis Pasiones</h3>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl w-full">
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
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
