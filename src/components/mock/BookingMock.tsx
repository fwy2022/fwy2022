import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, Clock, Sparkles, UserRound } from 'lucide-react'
import { useState } from 'react'

import { bookingDemo } from '../../data/demo'
import { useI18n } from '../../i18n/I18nProvider'
import { addDays } from '../../lib/datetime'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Stepper } from '../ui/Stepper'

const STEP_KEYS = ['service', 'practitioner', 'slot', 'confirm'] as const

/**
 * Prototype interactif du parcours de réservation public (4 étapes).
 * Sert de référence visuelle pour la Phase 4 — mêmes principes : pouce,
 * gros cibles, un seul choix par écran.
 */
export function BookingMock({ className }: { className?: string }) {
  const { locale, fcfa, formatDate } = useI18n()
  const [step, setStep] = useState(0)
  const [serviceId, setServiceId] = useState(bookingDemo.services[0].id)
  const [practitionerId, setPractitionerId] = useState<string>('pb1')
  const [dayIndex, setDayIndex] = useState(1)
  const [slot, setSlot] = useState('09:30')
  const [done, setDone] = useState(false)

  const service = bookingDemo.services.find((item) => item.id === serviceId)!
  const practitioner = bookingDemo.practitioners.find((item) => item.id === practitionerId)!

  const [days] = useState(() => Array.from({ length: 5 }, (_, index) => addDays(new Date(), index + 1)))

  const steps = [
    { id: 'service', label: locale === 'fr' ? 'Service' : 'Service' },
    { id: 'practitioner', label: locale === 'fr' ? 'Praticien' : 'Practitioner' },
    { id: 'slot', label: locale === 'fr' ? 'Créneau' : 'Slot' },
    { id: 'confirm', label: locale === 'fr' ? 'Confirmation' : 'Confirm' },
  ]

  const goNext = () => setStep((current) => Math.min(current + 1, steps.length - 1))
  const goBack = () => {
    if (step === 0) return
    setStep((current) => current - 1)
  }

  return (
    <div className={cn('flex h-full flex-col', className)}>
      {/* En-tête « establishment » */}
      <div className="flex items-center gap-3 border-b border-line bg-gradient-to-br from-brand-soft to-surface px-4 py-3">
        <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-active text-sm font-black text-white">
          É
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-extrabold text-ink">{bookingDemo.salon.name}</p>
          <p className="truncate text-[11px] text-ink-muted">
            {bookingDemo.salon.tagline} · {bookingDemo.salon.city}
          </p>
        </div>
      </div>

      <div className="border-b border-line px-4 py-3">
        <Stepper steps={steps} current={done ? steps.length - 1 : step} onSelect={setStep} size="sm" />
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-4 py-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={done ? 'done' : STEP_KEYS[step]}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
          >
            {done ? (
              <SuccessPanel
                serviceName={service.name}
                practitionerName={practitioner.name}
                day={days[dayIndex]}
                slot={slot}
              />
            ) : step === 0 ? (
              <div className="space-y-2">
                {bookingDemo.services.map((item) => {
                  const isActive = item.id === serviceId
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setServiceId(item.id)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors duration-200',
                        isActive ? 'border-brand bg-brand-soft' : 'border-line hover:border-line-strong',
                      )}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] font-bold text-ink">
                          {locale === 'fr' ? item.name : item.nameEn}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-ink-muted">
                          <Clock className="mr-1 inline size-3" />
                          {item.duration} min
                        </span>
                      </span>
                      <span className="shrink-0 text-[13px] font-extrabold text-ink tabular-nums">
                        {fcfa(item.price, { currency: false })}
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : step === 1 ? (
              <div className="space-y-2">
                {bookingDemo.practitioners.map((item) => {
                  const isActive = item.id === practitionerId
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPractitionerId(item.id)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors duration-200',
                        isActive ? 'border-brand bg-brand-soft' : 'border-line hover:border-line-strong',
                      )}
                    >
                      <span
                        className={cn(
                          'grid size-9 shrink-0 place-items-center rounded-full text-[11px] font-black',
                          isActive ? 'bg-brand text-on-brand' : 'bg-surface-2 text-ink-muted',
                        )}
                      >
                        {item.id === 'pb3' ? <Sparkles className="size-4" /> : item.name.slice(0, 1)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] font-bold text-ink">{item.name}</span>
                        <span className="mt-0.5 block truncate text-[11px] text-ink-muted">
                          {locale === 'fr' ? item.role : item.id === 'pb3' ? 'First available' : item.role}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : step === 2 ? (
              <div>
                <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-3">
                  {days.map((day, index) => {
                    const isActive = index === dayIndex
                    return (
                      <button
                        key={day.toISOString()}
                        type="button"
                        onClick={() => setDayIndex(index)}
                        className={cn(
                          'flex min-w-[3.75rem] flex-col items-center gap-0.5 rounded-xl border px-2 py-2 transition-colors duration-200',
                          isActive ? 'border-brand bg-brand text-on-brand' : 'border-line text-ink-muted hover:border-line-strong',
                        )}
                      >
                        <span className="text-[10px] font-bold uppercase opacity-80">
                          {formatDate(day, { weekday: 'short' }).replace('.', '')}
                        </span>
                        <span className="text-base font-extrabold tabular-nums">{day.getDate()}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4">
                  {bookingDemo.slots.map((item) => {
                    const isActive = item.time === slot
                    return (
                      <button
                        key={item.time}
                        type="button"
                        disabled={!item.available}
                        onClick={() => setSlot(item.time)}
                        className={cn(
                          'rounded-lg border py-2 text-[12.5px] font-bold transition-colors duration-200',
                          !item.available && 'cursor-not-allowed border-line bg-surface-2 text-ink-subtle line-through',
                          item.available && isActive && 'border-brand bg-brand text-on-brand',
                          item.available && !isActive && 'border-line text-ink hover:border-brand hover:text-brand',
                        )}
                      >
                        {item.time}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-xl border border-line bg-surface-2 p-3.5">
                  <Row label={locale === 'fr' ? 'Service' : 'Service'} value={locale === 'fr' ? service.name : service.nameEn} />
                  <Row label={locale === 'fr' ? 'Praticien' : 'Practitioner'} value={practitioner.name} />
                  <Row
                    label={locale === 'fr' ? 'Date' : 'Date'}
                    value={formatDate(days[dayIndex], { weekday: 'long', day: 'numeric', month: 'long' })}
                  />
                  <Row label={locale === 'fr' ? 'Heure' : 'Time'} value={slot} last />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-brand-soft px-3.5 py-3">
                  <span className="text-[13px] font-bold text-brand">
                    {locale === 'fr' ? 'Total' : 'Total'}
                  </span>
                  <span className="text-base font-extrabold text-brand tabular-nums">{fcfa(service.price)}</span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-ink-muted">
                  {locale === 'fr'
                    ? 'Acompte de 5 000 FCFA demandé à la confirmation, payable par MTN MoMo ou Orange Money.'
                    : 'A 5,000 FCFA deposit is requested on confirmation, payable by MTN MoMo or Orange Money.'}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Barre d'action */}
      <div className="safe-bottom flex items-center gap-2 border-t border-line bg-surface px-4 py-3">
        <AnimatePresence initial={false} mode="popLayout">
          {!done && step > 0 && (
            <motion.button
              key="back"
              type="button"
              onClick={goBack}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              aria-label={locale === 'fr' ? 'Étape précédente' : 'Previous step'}
              className="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              <ChevronLeft className="size-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {!done ? (
          <Button fullWidth onClick={step === steps.length - 1 ? () => setDone(true) : goNext} className="group">
            {step === steps.length - 1
              ? locale === 'fr'
                ? 'Confirmer la réservation'
                : 'Confirm booking'
              : locale === 'fr'
                ? 'Continuer'
                : 'Continue'}
            {step < steps.length - 1 && (
              <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            )}
          </Button>
        ) : (
          <Button
            variant="secondary"
            fullWidth
            onClick={() => {
              setDone(false)
              setStep(0)
            }}
          >
            {locale === 'fr' ? 'Nouvelle réservation' : 'New booking'}
          </Button>
        )}
      </div>
    </div>
  )
}

function Row({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={cn('flex items-start justify-between gap-4 py-1.5', !last && 'border-b border-line')}>
      <span className="shrink-0 text-[12px] text-ink-muted">{label}</span>
      <span className="truncate text-right text-[12.5px] font-bold text-ink capitalize">{value}</span>
    </div>
  )
}

function SuccessPanel({
  serviceName,
  practitionerName,
  day,
  slot,
}: {
  serviceName: string
  practitionerName: string
  day: Date
  slot: string
}) {
  const { locale, formatDate } = useI18n()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex h-full flex-col items-center justify-center gap-3 py-4 text-center"
    >
      <motion.span
        initial={{ scale: 0.4, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 16, delay: 0.05 }}
        className="relative grid size-14 place-items-center rounded-full bg-success text-white"
      >
        <span className="absolute inset-0 rounded-full bg-success/30 animate-[pulse-ring_1.8s_ease-out_infinite]" aria-hidden />
        <Check className="size-7" strokeWidth={3} />
      </motion.span>
      <div>
        <p className="text-[15px] font-extrabold text-ink">
          {locale === 'fr' ? 'Rendez-vous confirmé !' : 'Booking confirmed!'}
        </p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink-muted">
          {serviceName} · {practitionerName}
          <br />
          {formatDate(day, { weekday: 'long', day: 'numeric', month: 'long' })} à {slot}
        </p>
      </div>
      <div className="mt-1 flex flex-wrap justify-center gap-1.5">
        <span className="rounded-full bg-success-soft px-2.5 py-1 text-[11px] font-bold text-success">
          {locale === 'fr' ? 'SMS envoyé' : 'SMS sent'}
        </span>
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-bold text-brand">
          WhatsApp {locale === 'fr' ? 'prêt' : 'ready'}
        </span>
      </div>
      <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-ink-subtle">
        <UserRound className="size-3.5" />
        {locale === 'fr' ? 'Client invité · aucun compte requis' : 'Guest customer · no account needed'}
      </span>
    </motion.div>
  )
}
