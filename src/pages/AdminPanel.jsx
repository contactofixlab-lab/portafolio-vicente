import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { projects } from '../data/projects'
import { experiences } from '../data/experiences'
import { skillsCategories } from '../data/skills'

export default function AdminPanel() {
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentTab, setCurrentTab] = useState('proyectos')
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({})
  const [allData, setAllData] = useState({
    proyectos: [],
    trayectoria: [],
    habilidades: [],
    certificados: []
  })

  // Cargar datos del localStorage o usar defaults
  useEffect(() => {
    if (isLoggedIn) {
      const proyectos = JSON.parse(localStorage.getItem('portafolio_projects')) || projects
      const trayectoria = JSON.parse(localStorage.getItem('portafolio_experiences')) || experiences
      const habilidades = JSON.parse(localStorage.getItem('portafolio_skills')) ||
        skillsCategories.flatMap(cat => cat.skills.map((s, idx) => ({
          id: `${cat.id}-${idx}`,
          name: s.name,
          category: cat.name,
          image: s.image
        })))
      const certificados = JSON.parse(localStorage.getItem('portafolio_certificates')) || []

      setAllData({ proyectos, trayectoria, habilidades, certificados })
    }
  }, [isLoggedIn])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'vincente2026') {
      setIsLoggedIn(true)
      sessionStorage.setItem('adminLoggedIn', 'true')
    } else {
      alert('Contraseña incorrecta')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    sessionStorage.removeItem('adminLoggedIn')
    setPassword('')
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 shadow-2xl p-8 md:p-12">
              {/* Decorative Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-accent-400"></div>

              <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🔐 Admin Panel</h1>
                  <p className="text-gray-600 dark:text-gray-400">Consola Privada</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingresa la contraseña"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Entrar
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    )
  }

  // Dashboard View
  const tabs = [
    { id: 'proyectos', label: '🎨 Proyectos', count: allData.proyectos.length },
    { id: 'trayectoria', label: '📍 Trayectoria', count: allData.trayectoria.length },
    { id: 'habilidades', label: '💻 Habilidades', count: allData.habilidades.length },
    { id: 'certificados', label: '🎓 Certificados', count: allData.certificados.length }
  ]

  const renderContent = () => {
    let items = []
    let getItemContent = () => {}

    if (currentTab === 'proyectos') {
      items = allData.proyectos
      getItemContent = (item) => (
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{item.company}</p>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">{item.type}</span>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${
              item.status === 'Terminado'
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                : 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300'
            }`}>{item.status}</span>
          </div>
        </div>
      )
    } else if (currentTab === 'trayectoria') {
      items = allData.trayectoria
      getItemContent = (item) => (
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{item.company}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">{item.startDate} - {item.endDate || 'Actual'}</p>
          <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">{item.badge}</span>
        </div>
      )
    } else if (currentTab === 'habilidades') {
      items = allData.habilidades
      getItemContent = (item) => (
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{item.category}</p>
          {item.image && <img src={item.image} alt={item.name} className="h-10 w-10 object-contain" />}
        </div>
      )
    } else if (currentTab === 'certificados') {
      items = allData.certificados
      getItemContent = (item) => (
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{item.issuer}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">Año: {item.year}</p>
        </div>
      )
    }

    if (items.length === 0) {
      return (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No hay items aún 📭</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-400 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6"
          >
            {/* Decorative Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-accent-400"></div>

            <div className="space-y-4 pt-2">
              {getItemContent(item)}

              <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex-1 px-3 py-2 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-semibold text-sm hover:bg-primary-200 dark:hover:bg-primary-800 transition">
                  ✏️ Editar
                </button>
                <button className="flex-1 px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 font-semibold text-sm hover:bg-red-200 dark:hover:bg-red-800 transition">
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                🔧 Admin Panel
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">Consola de Administración Privada</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 font-semibold hover:bg-red-200 dark:hover:bg-red-800 transition"
            >
              Salir
            </button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentTab === tab.id
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg scale-105'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label} <span className="ml-2 opacity-75">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Content Grid */}
          {renderContent()}
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
