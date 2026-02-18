import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import '../nav-panel.css';

const Layout = () => {
  const { t, lang, setLang } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/cases', label: t.nav.cases },
    { path: '/about', label: t.nav.about },
    { path: '/contacts', label: t.nav.contacts },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Panels for logo, nav, and color switcher */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="nav-panel-border" style={{ marginRight: 8, minWidth: 120, height: 40, borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link
              to="/"
              className="text-xl font-bold tracking-tight"
            >
              VANTA <span className="text-accent">LAB</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <div
                key={link.path}
                className={`nav-panel${isActive(link.path) ? ' active' : ''}`}
                style={{ marginRight: 8 }}
              >
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    isActive(link.path) ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-xs border border-border rounded-lg overflow-hidden">
              {(['ru', 'en', 'uz'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1.5 transition-colors ${
                    lang === l
                      ? 'bg-accent text-accent-foreground font-bold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="nav-panel-border md:flex hidden" style={{ minWidth: 112, height: 40, borderRadius: 9999, alignItems: 'center', justifyContent: 'center', padding: 0 }}>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Toggle theme"
                style={{ width: '100%', height: '100%', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, background: 'transparent', border: 'none' }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground md:hidden nav-panel-border"
              aria-label="Toggle theme"
              style={{ marginLeft: 0 }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-muted-foreground nav-panel-border"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

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
                      isActive(link.path) ? 'text-foreground' : 'text-muted-foreground'
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
              <p className="text-sm text-muted-foreground mt-1">{t.footer.tagline}</p>
            </div>
            <p className="text-sm text-muted-foreground">{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
