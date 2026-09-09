import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useLanguage } from '@/lib/i18n';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LanguageSwitch } from '@/components/LanguageSwitch';
import '../nav-panel.css';

const menuBackdropTransition = { duration: 0.28, ease: [0.16, 1, 0.3, 1] as const };
const menuPanelTransition = { type: 'spring' as const, damping: 30, stiffness: 320, mass: 0.8 };

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
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
    <div className="vanta-app-bg min-h-dvh text-[#F4F5F7] flex flex-col selection:bg-white/20 selection:text-white">
      <header className="sticky top-0 z-[100] border-b border-white/[0.08] bg-[#06070A]/85 backdrop-blur-xl">
        <nav
          className="container flex items-center justify-between h-[var(--vanta-header-h)]"
          aria-label="Primary"
        >
          <div className="flex items-center shrink-0">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg py-1 px-1.5"
              aria-label="VANTA LAB home"
            >
              <span className="font-heading font-extrabold text-sm sm:text-base tracking-tight text-[#F4F5F7]">
                VANTA LAB
              </span>
            </Link>
          </div>

          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
            <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-[#0D0F13]/90 p-1 backdrop-blur-md">
              {navLinks.map(link => {
                const active = isActive(link.path);
                return (
                  <div key={link.path} className="relative">
                    {active && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/10"
                        transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                      />
                    )}
                    <Link
                      to={link.path}
                      className={`relative z-10 block px-3.5 py-1.5 text-xs font-medium transition-colors rounded-full ${
                        active ? 'text-[#F4F5F7] font-semibold' : 'text-[#8B8F98] hover:text-[#F4F5F7]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2.5 md:gap-3 min-w-0 justify-end shrink-0 ml-auto">
            <Button
              variant="vanta"
              size="sm"
              className="hidden sm:inline-flex h-9 px-4 text-xs font-semibold rounded-full"
              asChild
            >
              <Link to="/contact">{t.nav.startProject}</Link>
            </Button>

            <LayoutGroup id="vanta-lang">
              <LanguageSwitch className="shrink-0" />
            </LayoutGroup>

            <button
              type="button"
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-full border border-white/[0.08] bg-[#0D0F13] text-[#F4F5F7] hover:bg-white/[0.05] transition-colors focus-visible:ring-2 focus-visible:ring-white/40 ml-1"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="nav-backdrop"
              className="fixed inset-0 z-[85] md:hidden bg-black/70 backdrop-blur-sm"
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
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={menuPanelTransition}
            >
              <div
                className="pointer-events-auto mx-4 mt-2 p-4 rounded-2xl border border-white/[0.08] bg-[#0D0F13] shadow-2xl flex flex-col gap-2"
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
              >
                {navLinks.map(link => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        active
                          ? 'bg-white/[0.08] text-[#F4F5F7] font-semibold border border-white/10'
                          : 'text-[#8B8F98] hover:text-[#F4F5F7] hover:bg-white/[0.03]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-2 border-t border-white/[0.08] mt-1">
                  <Button variant="vanta" className="w-full h-11 text-xs font-semibold rounded-xl" asChild>
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>
                      {t.nav.startProject}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full min-w-0 relative z-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Outlet />
      </main>

      <footer className="border-t border-white/[0.08] py-10 sm:py-12 md:py-16 bg-[#06070A]">
        <div className="container min-w-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-heading font-extrabold text-base tracking-tight text-[#F4F5F7]">
              VANTA LAB
            </p>
            <p className="mt-1.5 max-w-sm text-xs text-[#8B8F98] leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6" aria-label="Footer">
            <Link
              to="/services"
              className="text-xs text-[#8B8F98] transition-colors hover:text-[#F4F5F7]"
            >
              {t.nav.services}
            </Link>
            <Link
              to="/portfolio"
              className="text-xs text-[#8B8F98] transition-colors hover:text-[#F4F5F7]"
            >
              {t.nav.portfolio}
            </Link>
            <Link
              to="/contact"
              className="text-xs text-[#8B8F98] transition-colors hover:text-[#F4F5F7]"
            >
              {t.nav.contact}
            </Link>
          </nav>

          <p className="text-[11px] text-[#8B8F98]/70">
            {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
