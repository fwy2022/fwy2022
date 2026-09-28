import { motion, useReducedMotion } from 'framer-motion'
import { useId } from 'react'

import { cn } from '../../lib/utils'

export interface SegmentedOption<T extends string> {
  value: T
  label: string
  icon?: React.ReactNode
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
  size?: 'sm' | 'md'
  'aria-label'?: string
}

/** Contrôle segmenté avec pastille animée — utilisé pour Mensuel / Annuel. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  size = 'md',
  'aria-label': ariaLabel,
}: SegmentedControlProps<T>) {
  const layoutId = useId()
  const reduceMotion = useReducedMotion()

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-line bg-surface-2 p-1',
        className,
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors duration-200',
              size === 'sm' ? 'px-3.5 py-1.5 text-[13px]' : 'px-4 py-2 text-sm',
              isActive ? 'text-on-brand' : 'text-ink-muted hover:text-ink',
            )}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-brand"
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 420, damping: 34, mass: 0.7 }
                }
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-1.5">
              {option.icon}
              {option.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
  disabled?: boolean
  className?: string
}

export function Switch({ checked, onChange, label, description, disabled, className }: SwitchProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start justify-between gap-4 py-1',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {description && <span className="mt-0.5 block text-[13px] text-ink-muted">{description}</span>}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-200',
          checked ? 'bg-brand' : 'bg-line-strong',
        )}
      >
        <motion.span
          layout
          className="absolute top-0.5 size-5 rounded-full bg-white shadow-soft"
          animate={{ left: checked ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 520, damping: 34 }}
        />
      </button>
    </label>
  )
}
