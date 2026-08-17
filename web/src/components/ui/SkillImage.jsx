import { useState } from 'react'

// Mapeo de tecnologías a nombres de archivos
const logoMap = {
  'JavaScript': 'JavaScript-logo.png',
  'SQL': 'Logo Sql Developer.png',
  'Java': 'java logo.png',
  'Python': 'python logo.png',
  'Power BI': 'power bi logo.png',
  'Microsoft 365': 'microsoft 365 logo.jpg',
  'MobySuite': 'mobysuite logo.png',
  'Transbank': 'Transbank.png',
  'GoFirmex': 'gofirmex logo.png',
  'Trello': 'trello logo.png',
  'GitHub': 'github logo.png',
  'ClickUp': 'clickup logo.jfif',
  'Miro': 'miro logo.png',
  'V0.dev': 'vo.dev logo.png',
  'ChatGPT': 'chatgpt logo.jpg',
  'Google Adsense': 'google adsense logo.jpg',
  'Bizagi': 'bizagi modeler.png',
  'Claude': 'claud logo.png',
  'Oracle': 'oracle logo.jpg'
}

// Emojis de fallback
const emojiMap = {
  'JavaScript': '🟨',
  'SQL': '🗄️',
  'Java': '☕',
  'Python': '🐍',
  'Power BI': '📊',
  'Microsoft 365': '☁️',
  'MobySuite': '📦',
  'Transbank': '💳',
  'GoFirmex': '📑',
  'Trello': '📋',
  'GitHub': '🐙',
  'ClickUp': '✅',
  'Miro': '🎨',
  'V0.dev': '⚡',
  'ChatGPT': '🤖',
  'Google Adsense': '📈',
  'Bizagi': '🔧',
  'Claude': '🧠',
  'Oracle': '🗄️',
  'React': '⚛️',
  'Node.js': '🟢',
  'Express': '⚡',
  'PostgreSQL': '🐘',
  'MongoDB': '🍃',
  'Tailwind': '🎨',
  'Framer Motion': '✨',
  'Next.js': '▲',
  'Vercel': '▲',
  'Vite': '⚡',
  'Chrome': '🌐',
  'Firefox': '🔥',
  'Safari': '🧭',
  'VS Code': '💻',
  'Git': '📚',
  'Docker': '🐳',
  'Kubernetes': '⚙️',
  'AWS': '☁️',
  'Azure': '☁️',
  'GCP': '☁️',
  'Jenkins': '🔄'
}

export default function SkillImage({ name, size = 'md', showFallback = true }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const logoFile = logoMap[name]
  const emoji = emojiMap[name] || '🛠️'

  // Tamaños
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24'
  }

  const sizeClass = sizeClasses[size] || sizeClasses.md

  // Si no hay logo mapeado o hubo error, mostrar emoji
  if (!logoFile || imageError) {
    if (showFallback) {
      return (
        <span className={`inline-flex items-center justify-center text-${size}`} title={name}>
          {emoji}
        </span>
      )
    }
    return null
  }

  return (
    <div className={`inline-flex items-center justify-center ${sizeClass}`} title={name}>
      <img
        src={`/${logoFile}`}
        alt={name}
        className={`${sizeClass} object-contain`}
        onError={() => setImageError(true)}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  )
}
