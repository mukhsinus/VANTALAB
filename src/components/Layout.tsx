import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LanguageSwitch } from '@/components/LanguageSwitch';
import '../nav-panel.css';

const menuBackdropTransition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };
const menuPanelTransition = { type: 'spring' as const, damping: 34, stiffness: 300, mass: 0.88 };

const pageTransition = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
};

const Layout = () => {
  const { t } = useLanguage();
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
    <div className="vanta-app-bg min-h-dvh text-foreground flex flex-col">
      <header className="sticky top-0 z-[100] border-b border-white/[0.06] bg-[#0A0A0A]/72 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0A0A0A]/52">
        <nav
          className="container flex items-center justify-between h-[var(--vanta-header-h)] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]"
          aria-label="Primary"
        >
          <div className="flex items-center shrink-0">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
              <Link
                to="/"
                className="logo-mark shrink-0 min-h-[40px] inline-flex rounded-full"
                aria-label="VANTA LAB home"
              >
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-white whitespace-nowrap">
                  VANTA<span className="text-white/40 mx-0.5 sm:mx-1">·</span>
                  <span className="text-[#6C5CE7]">LAB</span>
                </span>
              </Link>
            </motion.div>
          </div>

          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
            <div className="flex gap-2 items-center justify-center relative">
              {navLinks.map(link => (
                <motion.div key={link.path} whileHover={{ y: -1 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }}>
                  <div className={`nav-item nav-panel relative ${isActive(link.path) ? 'active' : ''}`}>
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="nav-active-bg"
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#6C5CE7] border border-[#6C5CE7]/50 -z-10"
                        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                      />
                    )}
                    <Link
                      to={link.path}
                      className={`w-full text-center text-[13px] font-medium transition-colors px-1 relative z-10 ${
                        isActive(link.path) ? 'text-white' : 'text-white/55 hover:text-white/90'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 min-w-0 justify-end shrink-0 ml-auto">
            <div className="hidden md:block h-7 w-px bg-white/10 mx-1" />
            

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 450, damping: 28 }}>
              <Button
                variant="vanta"
                size="sm"
                className="hidden sm:inline-flex h-11 px-6 text-[13px] rounded-full shrink-0 shadow-lg shadow-[#6C5CE7]/20"
                asChild
              >
                <Link to="/contact">{t.nav.startProject}</Link>
              </Button>
            </motion.div>

            <LayoutGroup id="vanta-lang">
              <LanguageSwitch className="shrink-0" />
            </LayoutGroup>
          </div>

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
                <div className="p-4 sm:p-5 flex flex-col gap-2.5 items-center w-full">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.06 + i * 0.05,
                        duration: 0.42,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="w-full"
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={`w-full block rounded-full border px-4 py-3.5 text-[15px] font-medium transition-colors min-h-[48px] flex items-center justify-center ${
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
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full"
                  >
                    <Button variant="vanta" className="w-full h-12 rounded-full mt-1 text-[15px]" asChild>
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
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
            className="w-full min-w-0"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-white/[0.06] py-8 sm:py-10 md:py-14">
          <div className="mx-auto flex max-w-lg flex-col items-center text-center">
            <p className="text-base sm:text-lg font-semibold tracking-tight text-white">
              VANTA<span className="text-white/35 mx-1.5">·</span>
              <span className="text-[#6C5CE7]">LAB</span>
            </p>
            <p className="mt-3 max-w-md text-xs sm:text-sm text-white/45 leading-relaxed text-balance">
              {t.footer.tagline}
            </p>

            <nav
              className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-2 border-t border-white/[0.06]w-full max-w-md"
              aria-label="Footer"
            >
              <Link
                to="/services"
                className="text-sm text-white/45 transition-colors hover:text-white min-h-[44px] inline-flex items-center"
              >
                {t.nav.services}
              </Link>
              <Link
                to="/portfolio"
                className="text-sm text-white/45 transition-colors hover:text-white min-h-[44px] inline-flex items-center"
              >
                {t.nav.portfolio}
              </Link>
              <Link
                to="/contact"
                className="text-sm text-white/45 transition-colors hover:text-white min-h-[44px] inline-flex items-center"
              >
                {t.nav.contact}
              </Link>
            </nav>

            <p className="mt-10 max-w-sm text-[11px] sm:text-xs leading-relaxed text-white/30 text-balance">
              {t.footer.rights}
            </p>
          </div>
      </footer>
    </div>
  );
};

export default Layout;
