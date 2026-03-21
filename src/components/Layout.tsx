import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import '../nav-panel.css';

const Layout = () => {
  const { t, lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/services', label: t.nav.services },
    { path: '/portfolio', label: t.nav.portfolio },
    { path: '/contact', label: t.nav.contact },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-foreground">
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0A0A0A]/75 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0A0A0A]/55">
        <nav className="container mx-auto px-6 h-[4.25rem] flex items-center justify-between gap-4">
          <Link to="/" className="logo-mark shrink-0" aria-label="VANTA LAB home">
            <span className="text-sm font-semibold tracking-tight text-white">
              VANTA<span className="text-white/40 mx-1">·</span>
              <span className="text-[#6C5CE7]">LAB</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1 gap-2 max-w-xl">
            {navLinks.map(link => (
              <div
                key={link.path}
                className={`nav-item nav-panel ${isActive(link.path) ? 'active' : ''}`}
              >
                <Link
                  to={link.path}
                  className={`w-full text-center text-[13px] font-medium transition-colors px-1 ${
                    isActive(link.path) ? 'text-white' : 'text-white/55 hover:text-white/90'
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="nav-panel-border lang-switcher hidden sm:flex p-0">
              {(['en', 'ru', 'uz'] as const).map(l => (
                <button key={l} type="button" onClick={() => setLang(l)} className={lang === l ? 'active' : ''}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <Button variant="vanta" size="sm" className="hidden sm:inline-flex h-10 px-5 text-[13px] rounded-full" asChild>
              <Link to="/contact">{t.nav.startProject}</Link>
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-icon-button md:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="md:hidden overflow-hidden border-t border-white/[0.06] bg-[#0A0A0A]/95 backdrop-blur-xl"
            >
              <div className="container mx-auto px-6 py-6 flex flex-col gap-3">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`rounded-2xl border px-4 py-3.5 text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'border-[#6C5CE7]/40 bg-[#6C5CE7]/10 text-white'
                        : 'border-white/10 text-white/70 hover:border-white/16 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex gap-2 pt-2">
                  {(['en', 'ru', 'uz'] as const).map(l => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLang(l)}
                      className={`flex-1 rounded-xl border py-2 text-xs font-semibold tracking-wide ${
                        lang === l
                          ? 'border-[#6C5CE7]/45 bg-[#6C5CE7]/15 text-white'
                          : 'border-white/10 text-white/55'
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
                <Button variant="vanta" className="w-full h-12 rounded-2xl mt-1" asChild>
                  <Link to="/contact">{t.nav.startProject}</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-white/[0.06] mt-24 md:mt-32">
        <div className="container mx-auto px-6 py-14 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-md">
              <p className="text-lg font-semibold tracking-tight text-white">
                VANTA<span className="text-white/35 mx-1.5">·</span>
                <span className="text-[#6C5CE7]">LAB</span>
              </p>
              <p className="mt-3 text-sm text-white/45 leading-relaxed">{t.footer.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-8 text-sm text-white/45">
              <Link to="/services" className="hover:text-white transition-colors">
                {t.nav.services}
              </Link>
              <Link to="/portfolio" className="hover:text-white transition-colors">
                {t.nav.portfolio}
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                {t.nav.contact}
              </Link>
            </div>
            <p className="text-xs text-white/35 lg:text-right max-w-xs leading-relaxed">{t.footer.rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
