import Header from './Header'
import Footer from './Footer'
import FloatingWhatsApp from './FloatingWhatsApp'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-primary-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
