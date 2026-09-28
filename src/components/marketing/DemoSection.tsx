import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, CreditCard, MousePointerClick, Smartphone } from 'lucide-react'
import { useState } from 'react'

import { useI18n } from '../../i18n/I18nProvider'
import { AgendaMock } from '../mock/AgendaMock'
import { AppWindow } from '../mock/AppWindow'
import { BookingMock } from '../mock/BookingMock'
import { PaymentMock } from '../mock/PaymentMock'
import { Section, SectionHeading } from '../ui/Section'
import { cn } from '../../lib/utils'

type DemoTab = 'agenda' | 'booking' | 'payment'

/** Cadre de téléphone pour la maquette du parcours client. */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[19rem]">
      <div className="relative rounded-[2.2rem] border border-line-strong bg-surface p-1.5 shadow-lift">
        <div className="relative overflow-hidden rounded-[1.8rem] bg-surface">
          <div className="absolute inset-x-0 top-0 z-10 flex h-6 items-center justify-center">
            <span className="h-1.5 w-16 rounded-full bg-line-strong" aria-hidden />
          </div>
          <div className="h-[32rem] pt-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

export function DemoSection({ className }: { className?: string }) {
  const { m, locale } = useI18n()
  const reduceMotion = useReducedMotion()
  const [tab, setTab] = useState<DemoTab>('agenda')

  const tabs: { id: DemoTab; label: string; icon: typeof CalendarDays }[] = [
    { id: 'agenda', label: m.demo.tabAgenda, icon: CalendarDays },
    { id: 'booking', label: m.demo.tabBooking, icon: Smartphone },
    { id: 'payment', label: m.demo.tabPayment, icon: CreditCard },
  ]

  const descriptions: Record<DemoTab, { title: string; points: string[] }> = {
    agenda: {
      title: locale === 'fr' ? 'Un agenda qui se lit en un coup d’œil' : 'A calendar you can read at a glance',
      points: [
        locale === 'fr' ? 'Un code couleur par service et par praticien' : 'One colour per service and practitioner',
        locale === 'fr' ? 'Glisser-déposer, pauses et congés en deux clics' : 'Drag and drop, breaks and leave in two clicks',
        locale === 'fr' ? 'Encaissements et acomptes visibles sur la ligne' : 'Payments and deposits visible on the row',
      ],
    },
    booking: {
      title: locale === 'fr' ? 'Réserver, c’est choisir — pas remplir un formulaire' : 'Booking means choosing, not filling a form',
      points: [
        locale === 'fr' ? '4 écrans, de grosses cibles, zéro compte à créer' : '4 screens, large targets, no account to create',
        locale === 'fr' ? 'Créneaux réels : impossible de double-réserver' : 'Real slots: double booking is impossible',
        locale === 'fr' ? 'Confirmation SMS + lien WhatsApp instantané' : 'Instant SMS confirmation + WhatsApp link',
      ],
    },
    payment: {
      title: locale === 'fr' ? 'Encaisser en Mobile Money, sans commission cachée' : 'Collect via Mobile Money, no hidden fee',
      points: [
        locale === 'fr' ? 'MTN MoMo et Orange Money pris en charge' : 'MTN MoMo and Orange Money supported',
        locale === 'fr' ? 'Acompte ou paiement total, au choix du patient' : 'Deposit or full payment, the customer chooses',
        locale === 'fr' ? 'Reçu en FCFA envoyé automatiquement' : 'Receipt in FCFA sent automatically',
      ],
    },
  }

  return (
    <Section id="demo" className={className} background="none">
      <SectionHeading eyebrow={m.demo.eyebrow} title={m.demo.title} subtitle={m.demo.subtitle} />

      {/* Sélecteur d'onglets */}
      <div className="mt-10 flex justify-center">
        <div
          role="tablist"
          aria-label={m.demo.eyebrow}
          className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-surface-2 p-1"
        >
          {tabs.map((item) => {
            const isActive = item.id === tab
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTab(item.id)}
                className={cn(
                  'relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13.5px] font-semibold transition-colors duration-200',
                  isActive ? 'text-on-brand' : 'text-ink-muted hover:text-ink',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="demo-tab-pill"
                    className="absolute inset-0 rounded-full bg-brand"
                    transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <item.icon className="relative z-10 size-4" />
                <span className="relative z-10">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === 'agenda' && (
              <AppWindow url="app.rdvpro.cm/agenda" bodyClassName="h-[27rem]">
                <AgendaMock className="h-full" />
              </AppWindow>
            )}
            {tab === 'booking' && (
              <PhoneFrame>
                <BookingMock className="h-full" />
              </PhoneFrame>
            )}
            {tab === 'payment' && (
              <AppWindow url="rdvpro.cm/paiement" bodyClassName="h-[26rem]">
                <PaymentMock className="h-full" />
              </AppWindow>
            )}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${tab}-copy`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="order-first lg:order-none"
          >
            <h3 className="text-2xl font-extrabold text-balance text-ink sm:text-3xl">
              {descriptions[tab].title}
            </h3>
            <ul className="mt-6 space-y-3.5">
              {descriptions[tab].points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                    <MousePointerClick className="size-3.5" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink-muted">{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 inline-flex items-center gap-2 rounded-xl border border-dashed border-line-strong bg-surface-2 px-3.5 py-2 text-[12.5px] font-semibold text-ink-muted">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              {tab === 'agenda' ? m.demo.agendaCaption : tab === 'booking' ? m.demo.bookingCaption : m.demo.paymentCaption}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  )
}
