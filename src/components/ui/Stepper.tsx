import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'

import { cn } from '../../lib/utils'

export interface StepperStep {
  id: string
  label: string
  description?: string
}

interface StepperProps {
  steps: StepperStep[]
  current: number
  onSelect?: (index: number) => void
  className?: string
  size?: 'sm' | 'md'
  /** Version compacte pour les écrans étroits (libellés masqués). */
  compactBelowSm?: boolean
}

/**
 * Stepper du parcours de réservation — lisible au pouce, compatible lecteurs
 * d'écran (liste d'étapes avec `aria-current`).
 */
export function Stepper({
  steps,
  current,
  onSelect,
  className,
  size = 'md',
  compactBelowSm = true,
}: StepperProps) {
  const reduceMotion = useReducedMotion()
  const dotSize = size === 'sm' ? 'size-6 text-[11px]' : 'size-8 text-xs'

  return (
    <ol className={cn('flex w-full items-start', className)} aria-label="Étapes de la réservation">
      {steps.map((step, index) => {
        const isDone = index < current
        const isCurrent = index === current
        const isClickable = Boolean(onSelect) && index <= current

        return (
          <li key={step.id} className={cn('flex min-w-0 flex-1 items-start', index === steps.length - 1 && 'flex-none')}>
            <div className="flex min-w-0 flex-col items-center gap-1.5">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onSelect?.(index)}
                aria-current={isCurrent ? 'step' : undefined}
                className={cn(
                  'relative grid shrink-0 place-items-center rounded-full border-2 font-bold transition-colors duration-200',
                  dotSize,
                  isDone && 'border-brand bg-brand text-on-brand',
                  isCurrent && 'border-brand bg-surface text-brand shadow-[0_0_0_4px_var(--brand-soft)]',
                  !isDone && !isCurrent && 'border-line bg-surface text-ink-subtle',
                  isClickable && 'cursor-pointer',
                  !isClickable && 'cursor-default',
                )}
              >
                {isDone ? <Check className="size-3.5" strokeWidth={3} /> : index + 1}
                {isCurrent && !reduceMotion && (
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-brand"
                    animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
              </button>
              <span
                className={cn(
                  'hidden max-w-[7rem] truncate text-center text-[11px] font-semibold sm:block',
                  compactBelowSm && 'sm:max-w-[7.5rem]',
                  isCurrent ? 'text-brand' : isDone ? 'text-ink-muted' : 'text-ink-subtle',
                )}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <span className="mt-3 mx-1 h-0.5 flex-1 overflow-hidden rounded-full bg-line">
                <motion.span
                  className="block h-full rounded-full bg-brand"
                  initial={false}
                  animate={{ width: isDone || isCurrent ? '100%' : '0%' }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
