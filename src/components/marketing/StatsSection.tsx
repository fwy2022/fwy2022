import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Activity, TrendingUp, UserCheck, Wallet } from 'lucide-react'
import { useRef } from 'react'

import { useI18n } from '../../i18n/I18nProvider'
import { kpis } from '../../data/demo'
import { formatFCFA } from '../../lib/format'
import { AnimatedNumber } from '../ui/AnimatedNumber'
import { Reveal } from '../ui/Reveal'

/** Mini-courbe du chiffre d'affaires sur 12 semaines. */
function Sparkline({ values }: { values: number[] }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()

  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100
      const y = 34 - ((value - min) / range) * 28
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg ref={ref} viewBox="0 0 100 40" preserveAspectRatio="none" className="h-16 w-full" aria-hidden>
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,40 ${points} 100,40`} fill="url(#spark-fill)" />
      <motion.polyline
        points={points}
        fill="none"
        stroke="var(--brand)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: reduceMotion ? 0 : 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}

export function StatsSection() {
  const { m, locale } = useI18n()

  const cards = [
    {
      icon: Wallet,
      label: locale === 'fr' ? 'Chiffre d’affaires moyen' : 'Average revenue',
      value: <AnimatedNumber value={kpis.monthlyRevenue} format={(v) => formatFCFA(v, { locale, compact: true })} />,
      sub: `+${kpis.revenueDelta} % ${locale === 'fr' ? 'sur 6 mois' : 'over 6 months'}`,
      tone: 'text-brand',
    },
    {
      icon: Activity,
      label: locale === 'fr' ? 'Taux de remplissage' : 'Fill rate',
      value: <AnimatedNumber value={kpis.fillRate * 100} format={(v) => `${Math.round(v)} %`} />,
      sub: locale === 'fr' ? 'moyenne sur 6 mois' : '6-month average',
      tone: 'text-accent',
    },
    {
      icon: UserCheck,
      label: locale === 'fr' ? 'Rendez-vous non honorés' : 'No-shows',
      value: <AnimatedNumber value={kpis.noShowRate * 100} format={(v) => `${v.toFixed(1).replace('.', ',')} %`} />,
      sub: locale === 'fr' ? 'contre 19 % avant RDVPro' : 'vs 19% before RDVPro',
      tone: 'text-success',
    },
    {
      icon: TrendingUp,
      label: locale === 'fr' ? 'Réservations en ligne' : 'Online bookings',
      value: <AnimatedNumber value={kpis.appointmentsToday} />,
      sub: locale === 'fr' ? 'par jour et par établissement' : 'per day, per business',
      tone: 'text-gold',
    },
  ]

  return (
    <div className="container-page">
      <div className="surface-card overflow-hidden rounded-3xl">
        <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
          <div>
            <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
              {locale === 'fr'
                ? 'Les chiffres que regardent nos clients chaque matin'
                : 'The numbers our customers check every morning'}
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-ink-muted">
              {locale === 'fr'
                ? 'Moyennes constatées sur les établissements usando RDVPro depuis plus de 3 mois. Données de démonstration.'
                : 'Averages across businesses using RDVPro for more than 3 months. Demo data.'}
            </p>
            <div className="mt-5">
              <Sparkline values={kpis.sparkline} />
              <div className="mt-1 flex items-center justify-between text-[11.5px] font-semibold text-ink-subtle">
                <span>{locale === 'fr' ? 'Semaine 1' : 'Week 1'}</span>
                <span>{locale === 'fr' ? 'Semaine 12' : 'Week 12'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {cards.map((card, index) => (
              <Reveal key={card.label} delay={index * 0.06}>
                <div className="rounded-2xl border border-line bg-surface-2 p-4">
                  <card.icon className={`size-4.5 ${card.tone}`} strokeWidth={2.2} />
                  <p className="mt-3 text-[11.5px] leading-tight font-semibold text-ink-muted">{card.label}</p>
                  <p className="mt-1 text-xl font-extrabold text-ink tabular-nums sm:text-2xl">{card.value}</p>
                  <p className="mt-0.5 text-[11px] text-ink-subtle">{card.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-[12px] text-ink-subtle">{m.common.demoBadge}</p>
    </div>
  )
}
