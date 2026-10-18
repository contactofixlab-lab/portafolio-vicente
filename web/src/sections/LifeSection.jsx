import { motion } from 'framer-motion'
import { life } from '../content'

export default function LifeSection() {
  const images = life.images.slice(0, 5)

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-8 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{life.title}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4 text-gray-600"
          >
            <p>{life.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 bg-gradient-to-br from-accent-50 to-primary-50 p-8 rounded-2xl border-2 border-accent-200"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{life.hobbiesTitle}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {life.hobbies.map((hobby, idx) => (
                <motion.div
                  key={`${hobby.name}-${idx}`}
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

        <div className="order-1 md:order-2">
          <div className="grid grid-cols-2 grid-rows-4 gap-4 h-full rounded-2xl overflow-hidden">
            {images.map((image, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer group hover:border-primary-300 transition-all bg-gray-100 ${
                  idx === 1 || idx === 3 || idx === 4 ? 'row-span-2' : 'row-span-1'
                }`}
              >
                {image.src ? (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl text-gray-400">🖼️</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
