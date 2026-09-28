import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import { useI18n } from '../../i18n/I18nProvider'
import { cn } from '../../lib/utils'
import { ButtonLink } from '../ui/Button'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { Logo } from '../ui/Logo'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Header() {
  const { m } = useI18n()
  const location = useLocation()
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const { scrollY } = useScroll()
  const borderOpacity = useTransform(scrollY, [0, 40], [0, 1])

  const links = [
    { href: '/#fonctionnalites', label: m.nav.features },
    { href: '/#fonctionnement', label: m.nav.howItWorks },
    { href: '/tarifs', label: m.nav.pricing },
    { href: '/#temoignages', label: m.nav.testimonials },
    { href: '/#faq', label: m.nav.faq },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fermeture du tiroir lors d'un retour navigateur (les clics passent par goTo).
  useEffect(() => {
    const closeMenu = () => setOpen(false)
    window.addEventListener('popstate', closeMenu)
    return () => window.removeEventListener('popstate', closeMenu)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const goTo = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      if (location.pathname !== '/') {
        navigate(`/#${id}`)
        return
      }
      window.history.replaceState(null, '', `#${id}`)
      document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    } else {
      navigate(href)
    }
    setOpen(false)
  }

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-200 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-brand"
      >
        Aller au contenu principal
      </a>

      <header className="fixed inset-x-0 top-0 z-90">
        <motion.div className="absolute inset-0 glass border-b border-line" style={{ opacity: scrolled ? 1 : 0 }} />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-line"
          style={{ opacity: borderOpacity, scaleX: scrolled ? 1 : 0 }}
          aria-hidden
        />

        <div className="container-page relative flex h-16 items-center justify-between gap-4 sm:h-18">
          <Link to="/" aria-label="RDVPro — accueil" className="shrink-0 rounded-xl">
            <Logo size={34} />
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {links.map((link) =>
              link.href === '/tarifs' ? (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200',
                      isActive ? 'text-brand' : 'text-ink-muted hover:text-ink',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ) : (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => goTo(link.href)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-ink-muted transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                </button>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <ButtonLink to="/connexion" variant="ghost" size="sm">
              {m.nav.login}
            </ButtonLink>
            <ButtonLink to="/inscription" size="sm" className="ml-1">
              {m.nav.startTrial}
              <ArrowRight className="size-4" />
            </ButtonLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? m.nav.close : m.nav.menu}
              className="grid size-9.5 place-items-center rounded-full border border-line bg-surface-2 text-ink transition-colors hover:text-brand"
            >
              {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-89 bg-background/97 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container-page flex h-full flex-col pt-20 pb-8">
              <nav aria-label="Navigation mobile" className="flex flex-1 flex-col gap-1">
                {links.map((link, index) => (
                  <motion.button
                    key={link.href}
                    type="button"
                    onClick={() => goTo(link.href)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.25 }}
                    className="flex items-center justify-between rounded-xl px-2 py-3.5 text-left text-lg font-bold text-ink transition-colors hover:text-brand"
                  >
                    {link.label}
                    <ArrowRight className="size-4 text-ink-subtle" />
                  </motion.button>
                ))}
              </nav>

              <div className="space-y-3 border-t border-line pt-5">
                <LanguageSwitcher className="w-full justify-center" />
                <ButtonLink to="/inscription" size="lg" fullWidth onClick={() => setOpen(false)}>
                  {m.nav.startTrial}
                  <ArrowRight className="size-4" />
                </ButtonLink>
                <ButtonLink to="/connexion" variant="secondary" size="lg" fullWidth onClick={() => setOpen(false)}>
                  {m.nav.login}
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/** Barre d'annonceau discrète, utilisée pour les communiqués produit. */
export function AnnouncementBar() {
  const { m } = useI18n()
  return (
    <div className="relative z-90 bg-brand text-on-brand">
      <div className="container-page flex h-9 items-center justify-center text-center text-[12px] font-semibold sm:text-[13px]">
        <span className="truncate">{m.hero.badge}</span>
      </div>
    </div>
  )
}
