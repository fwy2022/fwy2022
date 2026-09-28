import { motion } from 'framer-motion'
import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock, MoreHorizontal, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'

import { useI18n } from '../../i18n/I18nProvider'
import { demoClinic, practitioners, services, weekEvents, type EventStatus } from '../../data/demo'
import { cn } from '../../lib/utils'
import { Avatar } from '../ui/Avatar'
import { SegmentedControl } from '../ui/SegmentedControl'
import { colorStyles } from './agendaStyles'

const STATUS_LABEL: Record<EventStatus, { fr: string; en: string; className: string }> = {
  'checked-in': { fr: 'Présent', en: 'Checked in', className: 'bg-success-soft text-success' },
  confirmed: { fr: 'Confirmé', en: 'Confirmed', className: 'bg-brand-soft text-brand' },
  pending: { fr: 'À confirmer', en: 'To confirm', className: 'bg-warning-soft text-warning' },
  paid: { fr: 'Payé', en: 'Paid', className: 'bg-info-soft text-info' },
}

const FREE_SLOTS = ['09:00', '11:30', '14:00', '16:00', '17:00']

/**
 * Maquette d'agenda — journée du praticien, lagère et lisible sur mobile.
 * Les créneaux libres sont cliquables : la carte flottante de confirmation
 * se met à jour (micro-interaction de la démo du hero).
 */
export function AgendaMock({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { locale, fcfa, formatDate } = useI18n()
  const [view, setView] = useState<'day' | 'week'>('day')
  const [selectedSlot, setSelectedSlot] = useState<string>('09:00')

  const events = useMemo(
    () =>
      weekEvents
        .filter((event) => event.dayOffset === 0)
        .sort((a, b) => a.start.localeCompare(b.start)),
    [],
  )

  const selectedEvent = events.find((event) => event.start === selectedSlot)
  const [today] = useState(() => new Date())

  return (
    <div className={cn('flex min-h-0 flex-col', className)}>
      {/* Barre d'outils */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line px-3.5 py-2.5 sm:px-4">
        <div className="flex items-center gap-1">
          <button type="button" aria-label="Jour précédent" className="grid size-7 place-items-center rounded-md text-ink-subtle hover:bg-surface-2 hover:text-ink">
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex items-center gap-1.5 px-1 text-[13px] font-bold text-ink">
            <CalendarDays className="size-4 text-brand" />
            <span className="capitalize">{formatDate(today, { weekday: 'short', day: 'numeric', month: 'short' })}</span>
          </div>
          <button type="button" aria-label="Jour suivant" className="grid size-7 place-items-center rounded-md text-ink-subtle hover:bg-surface-2 hover:text-ink">
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <SegmentedControl
            size="sm"
            aria-label="Vue de l’agenda"
            value={view}
            onChange={setView}
            options={[
              { value: 'day', label: locale === 'fr' ? 'Jour' : 'Day' },
              { value: 'week', label: locale === 'fr' ? 'Semaine' : 'Week' },
            ]}
          />
          <button type="button" aria-label="Plus d’options" className="hidden size-7 place-items-center rounded-md text-ink-subtle hover:bg-surface-2 hover:text-ink sm:grid">
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>

      {/* Praticiennes */}
      <div className="flex items-center gap-2 border-b border-line px-3.5 py-2.5 sm:px-4">
        <div className="flex -space-x-2">
          {practitioners.map((practitioner) => (
            <Avatar key={practitioner.id} name={practitioner.name} size="xs" className="ring-2 ring-surface" />
          ))}
        </div>
        <p className="truncate text-[12px] font-semibold text-ink-muted">{demoClinic.name}</p>
        <span className="ml-auto hidden shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-bold text-brand sm:inline">
          82 % remplissage
        </span>
      </div>

      {/* Liste des rendez-vous */}
      <div className="no-scrollbar max-h-[19rem] min-h-0 flex-1 overflow-y-auto px-2 py-2 sm:px-3">
        <div>
          {events.map((event) => {
            const status = STATUS_LABEL[event.status]
            const isSelected = selectedSlot === event.start
            return (
              <motion.button
                key={event.id}
                type="button"
                layout={!compact}
                onClick={() => setSelectedSlot(event.start)}
                className={cn(
                  'group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors duration-200 hover:bg-surface-2',
                  isSelected && 'bg-surface-2',
                )}
              >
                <span className={cn('absolute inset-y-2 left-0 w-1 rounded-full', colorStyles[event.color].bar)} aria-hidden />

                <span className="ml-1 flex w-11 shrink-0 flex-col text-[11px] leading-tight font-bold text-ink-muted tabular-nums">
                  {event.start}
                  <span className="text-[10px] font-medium text-ink-subtle">{event.duration}′</span>
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-[13.5px] font-bold text-ink">{event.patient}</span>
                    {event.paid && <Check className="size-3.5 shrink-0 text-success" strokeWidth={3} />}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 truncate text-[11.5px] text-ink-muted">
                    <span className="truncate">{event.service}</span>
                  </span>
                </span>

                <span className="hidden shrink-0 text-right sm:block">
                  <span className="block text-[12.5px] font-bold text-ink tabular-nums">
                    {fcfa(services.find((service) => service.name === event.service)?.price ?? 15_000, {
                      currency: false,
                    })}
                  </span>
                  <span className={cn('mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-bold', status.className)}>
                    {locale === 'fr' ? status.fr : status.en}
                  </span>
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Créneaux libres cliquables */}
        <div className="mt-1 flex flex-wrap gap-1.5 px-1.5 pt-1">
          {FREE_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedSlot(slot)}
              className={cn(
                'inline-flex items-center gap-1 rounded-lg border border-dashed px-2 py-1 text-[11.5px] font-semibold transition-colors duration-200',
                selectedSlot === slot
                  ? 'border-brand bg-brand text-on-brand'
                  : 'border-line-strong text-ink-muted hover:border-brand hover:text-brand',
              )}
            >
              <Clock className="size-3" />
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Résumé de la sélection */}
      <div className="border-t border-line bg-surface-2 px-3.5 py-2.5 sm:px-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-on-brand">
            {selectedEvent ? <UserRound className="size-4" /> : <Clock className="size-4" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-bold text-ink">
              {selectedEvent ? `${selectedEvent.patient} · ${selectedEvent.start}` : `${selectedSlot} · créneau libre`}
            </p>
            <p className="truncate text-[11px] text-ink-muted">
              {selectedEvent ? selectedEvent.service : 'Disponible pour une nouvelle réservation'}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-[11px] font-bold text-ink-muted">
            {events.length} RDV
          </span>
        </div>
      </div>
    </div>
  )
}
