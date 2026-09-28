import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '../../lib/utils'

export type CardVariant = 'solid' | 'soft' | 'glass' | 'outline'
export type CardPadding = 'none' | 'sm' | 'md' | 'lg'
export type CardHover = 'none' | 'lift' | 'glow' | 'border'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: CardPadding
  hover?: CardHover
  children?: ReactNode
}

const VARIANTS: Record<CardVariant, string> = {
  solid: 'bg-surface border border-line shadow-soft',
  soft: 'bg-surface-2 border border-line/70',
  glass: 'glass border border-line',
  outline: 'border border-line bg-transparent',
}

const PADDINGS: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-5 sm:p-6',
  lg: 'p-6 sm:p-8',
}

const HOVERS: Record<CardHover, string> = {
  none: '',
  lift: 'transition-[transform,box-shadow] duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-lift',
  glow: 'transition-[box-shadow,border-color] duration-200 ease-[var(--ease-out-expo)] hover:border-brand/40 hover:shadow-glow',
  border: 'transition-colors duration-200 ease-[var(--ease-out-expo)] hover:border-brand/50',
}

export function Card({
  variant = 'solid',
  padding = 'md',
  hover = 'none',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div className={cn('rounded-2xl', VARIANTS[variant], PADDINGS[padding], HOVERS[hover], className)} {...props}>
      {children}
    </div>
  )
}

/** Halo décoratif teal/coral utilisé derrière les cartes mise en avant. */
export function CardGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-brand/25 via-transparent to-accent/20 opacity-0 blur-md transition-opacity duration-300',
        className,
      )}
    />
  )
}
