import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import '../nav-panel.css';

const menuBackdropTransition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };
const menuPanelTransition = { type: 'spring' as const, damping: 34, stiffness: 300, mass: 0.88 };

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

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

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
    <div className="vanta-app-bg min-h-dvh text-foreground flex flex-col">
      <header className="sticky top-0 z-[100] border-b border-white/[0.06] bg-[#0A0A0A]/72 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0A0A0A]/52">
        <nav
          className="container flex items-center h-[var(--vanta-header-h)] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]"
          aria-label="Primary"
        >
          {/* Left: Logo */}
          <div className="flex items-center min-w-[120px]">
            <Link
              to="/"
              className="logo-mark shrink-0 min-h-[40px] min-w-0"
              aria-label="VANTA LAB home"
            >
              <span className="text-xs sm:text-sm font-semibold tracking-tight text-white whitespace-nowrap">
                VANTA<span className="text-white/40 mx-0.5 sm:mx-1">·</span>
                <span className="text-[#6C5CE7]">LAB</span>
              </span>
            </Link>
          </div>

          {/* Center: Navigation Items */}
          <div className="hidden md:flex flex-1 items-center justify-center relative">
            <div className="flex gap-2 px-4 bg-transparent rounded-full">
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
          </div>

          {/* Right: Language Switcher & CTA */}
          <div className="flex items-center gap-2 md:gap-3 min-w-[220px] justify-end">
            {/* Divider */}
            <div className="hidden md:block h-7 w-px bg-white/10 mx-2" />
            <div className="nav-panel-border lang-switcher lang-switcher--nav-bar flex p-0 shrink-0">
              {(['en', 'ru', 'uz'] as const).map(l => (
                <button key={l} type="button" onClick={() => setLang(l)} className={lang === l ? 'active' : ''}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <Button
              variant="vanta"
              size="sm"
              className="hidden sm:inline-flex h-11 px-6 text-[13px] rounded-full shrink-0 shadow-lg shadow-[#6C5CE7]/20 transition-transform hover:scale-[1.045] focus:scale-[1.045]"
              asChild
            >
              <Link to="/contact">{t.nav.startProject}</Link>
            </Button>
          </div>

          {/* Burger button: always far right on mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen(o => !o)}
            className="nav-icon-button md:hidden shrink-0 min-h-[44px] min-w-[44px] ml-2"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="nav-backdrop"
              className="fixed left-0 right-0 bottom-0 z-[85] md:hidden bg-[#050508]/72 backdrop-blur-md"
              style={{ top: 'var(--vanta-header-h)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={menuBackdropTransition}
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <motion.div
              key="nav-panel"
              className="fixed left-0 right-0 z-[90] md:hidden pointer-events-none"
              style={{ top: 'var(--vanta-header-h)' }}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={menuPanelTransition}
            >
              <div
                className="pointer-events-auto mx-3 xs:mx-4 mt-2 mb-[max(0.75rem,env(safe-area-inset-bottom))] max-h-[min(calc(100dvh-var(--vanta-header-h)-1rem),520px)] overflow-y-auto overscroll-contain rounded-[1.35rem] border border-white/[0.1] bg-[#0e0e12]/92 backdrop-blur-2xl shadow-[0_28px_90px_-24px_rgba(0,0,0,0.88),0_0_0_1px_rgba(108,92,231,0.06)_inset]"
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
              >
                <div className="p-4 sm:p-5 flex flex-col gap-2.5">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.05 + i * 0.045,
                        duration: 0.38,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={`block rounded-2xl border px-4 py-3.5 text-[15px] font-medium transition-colors min-h-[48px] flex items-center ${
                          isActive(link.path)
                            ? 'border-[#6C5CE7]/45 bg-[#6C5CE7]/12 text-white'
                            : 'border-white/[0.09] text-white/75 hover:border-white/16 hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Button variant="vanta" className="w-full h-12 rounded-2xl mt-1 text-[15px]" asChild>
                      <Link to="/contact" onClick={() => setMenuOpen(false)}>
                        {t.nav.startProject}
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full min-w-0 relative z-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Outlet />
      </main>

      <footer className="border-t border-white/[0.06] mt-16 sm:mt-24 md:mt-32">
        <div className="container py-12 sm:py-14 md:py-20 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-md min-w-0">
              <p className="text-base sm:text-lg font-semibold tracking-tight text-white">
                VANTA<span className="text-white/35 mx-1.5">·</span>
                <span className="text-[#6C5CE7]">LAB</span>
              </p>
              <p className="mt-3 text-xs sm:text-sm text-white/45 leading-relaxed">{t.footer.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/45">
              <Link to="/services" className="hover:text-white transition-colors min-h-[44px] flex items-center">
                {t.nav.services}
              </Link>
              <Link to="/portfolio" className="hover:text-white transition-colors min-h-[44px] flex items-center">
                {t.nav.portfolio}
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors min-h-[44px] flex items-center">
                {t.nav.contact}
              </Link>
            </div>
            <p className="text-[11px] sm:text-xs text-white/35 lg:text-right max-w-xs leading-relaxed min-w-0">
              {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
