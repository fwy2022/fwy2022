import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, BadgeCheck, PlayCircle, ShieldCheck, Star, Wallet, WifiOff } from 'lucide-react'

import { useI18n } from '../../i18n/I18nProvider'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { AgendaMock } from '../mock/AgendaMock'
import { AppWindow } from '../mock/AppWindow'
import { paymentDemo } from '../../data/demo'
import { formatFCFA } from '../../lib/format'

export function Hero() {
  const { m, locale } = useI18n()
  const reduceMotion = useReducedMotion()

  const stats = [
    { value: m.hero.stat1Value, label: m.hero.stat1Label },
    { value: m.hero.stat2Value, label: m.hero.stat2Label },
    { value: m.hero.stat3Value, label: m.hero.stat3Label },
  ]

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40">
      {/* Décor */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute -top-40 -left-32 size-[32rem] rounded-full bg-brand/18 blur-[110px]" />
        <div className="absolute -top-24 -right-24 size-[28rem] rounded-full bg-accent/16 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          {/* Colonne texte */}
          <div className="max-w-xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] font-semibold text-ink-muted shadow-soft">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-2 animate-ping rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand" />
                </span>
                {m.hero.badge}
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-5 text-[2.1rem] leading-[1.08] font-extrabold text-balance text-ink sm:text-5xl lg:text-[3.65rem]">
                {m.hero.titleLead}{' '}
                <span className="relative inline-block">
                  <span className="text-gradient-brand">{m.hero.titleHighlight}</span>
                  <svg
                    aria-hidden
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1 left-0 h-2.5 w-full text-accent/50"
                  >
                    <path
                      d="M2 8.5C58 3 122 2 180 4.5c38 1.6 76 4 118 1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                {m.hero.titleTail}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 text-[15.5px] leading-relaxed text-pretty text-ink-muted sm:text-lg">
                {m.hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink to="/inscription" size="lg" className="group shadow-lift">
                  {m.hero.ctaPrimary}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </ButtonLink>
                <ButtonLink to="/tarifs#demo" variant="secondary" size="lg" className="group">
                  <PlayCircle className="size-4.5 text-brand" />
                  {m.hero.ctaSecondary}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-medium text-ink-muted">
                <li className="inline-flex items-center gap-1.5">
                  <BadgeCheck className="size-4 text-success" />
                  {locale === 'fr' ? 'Sans carte bancaire' : 'No credit card'}
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <Wallet className="size-4 text-brand" />
                  MTN MoMo · Orange Money
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <WifiOff className="size-4 text-ink-subtle" />
                  {locale === 'fr' ? 'Marche en 3G' : 'Works on 3G'}
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-9 flex items-center gap-3 rounded-2xl border border-line bg-surface/70 p-3.5 shadow-soft backdrop-blur-sm">
                <div className="flex -space-x-2.5">
                  {['Nadège Ekwalla', 'Samuel Tchoumi', 'Fatoumata Bello', 'Arsène Mbarga'].map((name, index) => (
                    <span
                      key={name}
                      className="grid size-9 place-items-center rounded-full border-2 border-surface bg-gradient-to-br from-brand to-brand-active text-[11px] font-bold text-white"
                      style={{ zIndex: 4 - index }}
                      title={name}
                    >
                      {name
                        .split(' ')
                        .slice(-1)
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  ))}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="size-3.5 fill-gold text-gold" />
                    ))}
                    <span className="ml-1 text-[12.5px] font-bold text-ink">4,9/5</span>
                  </div>
                  <p className="mt-0.5 truncate text-[12px] text-ink-muted">
                    {locale === 'fr'
                      ? 'Noté par 180 établissements camerounais'
                      : 'Rated by 180 Cameroonian businesses'}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Colonne visuelle */}
          <Reveal delay={0.15} y={26} className="relative">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-brand/20 via-transparent to-accent/20 blur-2xl"
              />

              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <AppWindow url="app.rdvpro.cm/agenda" bodyClassName="h-[26rem] sm:h-[29rem]">
                  <AgendaMock className="h-full" />
                </AppWindow>
              </motion.div>

              {/* Carte flottante : confirmation */}
              <motion.div
                initial={{ opacity: 0, x: -16, y: 8 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: [0, -6, 0] }}
                transition={{ opacity: { delay: 0.5 }, y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' } }}
                className="absolute -bottom-5 -left-2 flex max-w-[15rem] items-center gap-2.5 rounded-2xl border border-line bg-surface p-3 shadow-lift sm:-left-6"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-success-soft text-success">
                  <BadgeCheck className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-bold text-ink">
                    {locale === 'fr' ? 'Rendez-vous confirmé' : 'Booking confirmed'}
                  </p>
                  <p className="truncate text-[11px] text-ink-muted">
                    {locale === 'fr' ? 'SMS + lien WhatsApp envoyés' : 'SMS + WhatsApp link sent'}
                  </p>
                </div>
              </motion.div>

              {/* Carte flottante : paiement */}
              <motion.div
                initial={{ opacity: 0, x: 16, y: -8 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: [0, 6, 0] }}
                transition={{ opacity: { delay: 0.7 }, y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
                className="absolute -top-4 -right-1 flex items-center gap-2.5 rounded-2xl border border-line bg-surface p-2.5 pr-3.5 shadow-lift sm:-right-4"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#ffcc00] text-[10px] font-black text-[#4a3200]">
                  MoMo
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-extrabold text-ink tabular-nums">
                    {formatFCFA(paymentDemo.amount, { locale })}
                  </p>
                  <p className="flex items-center gap-1 truncate text-[11px] text-ink-muted">
                    <ShieldCheck className="size-3 text-success" />
                    {locale === 'fr' ? 'Acompte encaissé' : 'Deposit collected'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Bandeau réassurance */}
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="text-xl font-extrabold text-ink tabular-nums sm:text-2xl">{stat.value}</p>
                  <p className="mt-0.5 text-[11.5px] leading-tight text-ink-muted sm:text-[12.5px]">{stat.label}</p>
                </div>
              ))}
            </div>

          </Reveal>
        </div>
      </div>
    </section>
  )
}
