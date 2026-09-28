import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

import { cn } from '../../lib/utils'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  hint?: string
  error?: string
  icon?: ReactNode
  trailing?: ReactNode
  /** Masque visuellement le libellé (accessibilité conservée). */
  hideLabel?: boolean
  inputSize?: 'sm' | 'md' | 'lg'
  containerClassName?: string
}

const SIZES = {
  sm: 'h-9 text-[13px] rounded-lg',
  md: 'h-11 text-sm rounded-xl',
  lg: 'h-12.5 text-[15px] rounded-xl',
}

/** Champ de formulaire : libellé, aide, message d'erreur reliés par aria. */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, icon, trailing, hideLabel, className, containerClassName, id, inputSize = 'md', ...props },
  ref,
) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const hintId = `${fieldId}-hint`
  const errorId = `${fieldId}-error`

  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label
          htmlFor={fieldId}
          className={cn('mb-1.5 block text-[13px] font-semibold text-ink', hideLabel && 'sr-only')}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          'relative flex items-center border bg-surface transition-colors duration-200',
          SIZES[inputSize],
          error ? 'border-danger focus-within:border-danger' : 'border-line focus-within:border-brand',
          'focus-within:ring-4 focus-within:ring-[var(--ring)]',
          props.disabled && 'opacity-60',
        )}
      >
        {icon && <span className="pointer-events-none absolute left-3.5 text-ink-subtle">{icon}</span>}
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={Boolean(error)}
          aria-describedby={cn(hint && hintId, error && errorId) || undefined}
          className={cn(
            'w-full min-w-0 bg-transparent font-medium text-ink outline-none placeholder:font-normal placeholder:text-ink-subtle',
            icon ? 'pl-10' : 'pl-3.5',
            trailing ? 'pr-10' : 'pr-3.5',
            className,
          )}
          {...props}
        />
        {trailing && <span className="absolute right-2.5 flex items-center">{trailing}</span>}
      </div>

      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-[12px] font-medium text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1.5 text-[12px] text-ink-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  )
})

interface SelectFieldProps {
  label?: string
  options: { value: string; label: string }[]
  defaultValue?: string
  hint?: string
  id?: string
  className?: string
}

export function SelectField({ label, options, defaultValue, hint, id, className }: SelectFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-[13px] font-semibold text-ink">
          {label}
        </label>
      )}
      <select
        id={fieldId}
        defaultValue={defaultValue}
        className="h-11 w-full rounded-xl border border-line bg-surface px-3.5 text-sm font-medium text-ink outline-none transition-colors focus:border-brand focus:ring-4 focus:ring-[var(--ring)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1.5 text-[12px] text-ink-subtle">{hint}</p>}
    </div>
  )
}
