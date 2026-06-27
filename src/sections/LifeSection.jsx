import { motion } from 'framer-motion'
import Badge from '../components/ui/Badge'
import { hobbies } from '../data/hobbies'
import { ImageIcon } from 'lucide-react'

export default function LifeSection() {
  const imagePlaceholders = [
    { id: 1, colSpan: 'col-span-1', rowSpan: 'row-span-1' },
    { id: 2, colSpan: 'col-span-1', rowSpan: 'row-span-2' },
    { id: 3, colSpan: 'col-span-1', rowSpan: 'row-span-1' },
    { id: 4, colSpan: 'col-span-1', rowSpan: 'row-span-2' },
    { id: 5, colSpan: 'col-span-1', rowSpan: 'row-span-2' }
  ]

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12 items-stretch"
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
            <p className="text-xl text-gray-600 leading-relaxed">
              Soy del norte de Chile y actualmente vivo en Montevideo, Uruguay.
              Mi vida está equilibrada entre la pasión por la tecnología y
              disfrutar de experiencias significativas con familia y amigos.
            </p>
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
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-900">Mis Pasiones</h3>
            <div className="flex flex-wrap gap-3">
              {hobbies.map((hobby, idx) => (
                <motion.div
                  key={hobby.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge variant="accent" className="text-base py-2 px-4 backdrop-blur-lg bg-gradient-to-r from-accent-100 to-accent-50">
                    <span className="text-lg mr-2">{hobby.icon}</span>
                    {hobby.name}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Masonry Grid - Derecha */}
        <div className="order-1 md:order-2">
          {/* Grid Masonry - altura total ocupando todo el espacio del texto */}
          <div className="grid grid-cols-2 grid-rows-4 gap-4 h-full rounded-2xl overflow-hidden">
            {/* Imagen 1 - Top Left (pequeña) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0 * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-1 row-span-1 bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200 rounded-lg flex items-center justify-center cursor-pointer group hover:from-primary-50 hover:to-primary-100 transition-all"
            >
              <div className="text-center flex flex-col items-center justify-center gap-2">
                <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-primary-400 transition-colors" />
                <p className="text-xs font-semibold text-gray-500 group-hover:text-primary-500 transition-colors">1</p>
              </div>
            </motion.div>

            {/* Imagen 2 - Top Right (alta, ocupa 2 filas) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-1 row-span-2 bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200 rounded-lg flex items-center justify-center cursor-pointer group hover:from-primary-50 hover:to-primary-100 transition-all"
            >
              <div className="text-center flex flex-col items-center justify-center gap-2">
                <ImageIcon className="w-10 h-10 text-gray-400 group-hover:text-primary-400 transition-colors" />
                <p className="text-xs font-semibold text-gray-500 group-hover:text-primary-500 transition-colors">2</p>
              </div>
            </motion.div>

            {/* Imagen 3 - Middle Left (pequeña) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2 * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-1 row-span-1 bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200 rounded-lg flex items-center justify-center cursor-pointer group hover:from-primary-50 hover:to-primary-100 transition-all"
            >
              <div className="text-center flex flex-col items-center justify-center gap-2">
                <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-primary-400 transition-colors" />
                <p className="text-xs font-semibold text-gray-500 group-hover:text-primary-500 transition-colors">3</p>
              </div>
            </motion.div>

            {/* Imagen 4 - Bottom (grande, ocupa 2 filas y casi todo el ancho) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 3 * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-1 row-span-2 bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200 rounded-lg flex items-center justify-center cursor-pointer group hover:from-primary-50 hover:to-primary-100 transition-all"
            >
              <div className="text-center flex flex-col items-center justify-center gap-2">
                <ImageIcon className="w-10 h-10 text-gray-400 group-hover:text-primary-400 transition-colors" />
                <p className="text-xs font-semibold text-gray-500 group-hover:text-primary-500 transition-colors">4</p>
              </div>
            </motion.div>

            {/* Imagen 5 - Bottom Right (pequeña, ocupa 2 filas) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 4 * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="col-span-1 row-span-2 bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200 rounded-lg flex items-center justify-center cursor-pointer group hover:from-primary-50 hover:to-primary-100 transition-all"
            >
              <div className="text-center flex flex-col items-center justify-center gap-2">
                <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-primary-400 transition-colors" />
                <p className="text-xs font-semibold text-gray-500 group-hover:text-primary-500 transition-colors">5</p>
              </div>
            </motion.div>
          </div>

          {/* Instrucción */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center"
          >
            <p className="text-blue-700 text-sm font-medium">
              📸 5 espacios listos para tus fotos
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
