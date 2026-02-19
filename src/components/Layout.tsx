import { useState, useEffect } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { useLanguage } from '@/lib/i18n'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import '../nav-panel.css'

const Layout = () => {
  const { t, lang, setLang } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/cases', label: t.nav.cases },
    { path: '/about', label: t.nav.about },
    { path: '/contacts', label: t.nav.contacts },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">

          {/* LEFT — LOGO */}
          <div className="flex items-center">
            <div className="nav-panel-border nav-item p-0 overflow-hidden">
              <Link to="/" className="w-full h-full flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="VANTA LAB Logo"
                  className="h-full w-auto object-contain"
                />
              </Link>
            </div>
          </div>

          {/* CENTER — NAVIGATION */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map(link => (
              <div
                key={link.path}
                className={`nav-panel nav-item ${isActive(link.path) ? 'active' : ''}`}
              >
                <Link
                  to={link.path}
                  className={`w-full text-center text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* RIGHT — LANGUAGE + THEME + BURGER */}
          <div className="flex items-center gap-3">

            {/* Language Switcher */}
            <div className="nav-panel-border lang-switcher nav-item px-0">
              {(['ru', 'en', 'uz'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={lang === l ? 'active' : ''}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Theme Toggle (desktop) */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="nav-icon-button hidden md:flex"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Theme Toggle (mobile) */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="nav-icon-button md:hidden"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-icon-button md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </nav>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border overflow-hidden bg-background"
            >
              <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`text-sm font-medium py-2 ${
                      isActive(link.path)
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="border-t border-border py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-xl font-bold">
                VANTA <span className="text-accent">LAB</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {t.footer.tagline}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout