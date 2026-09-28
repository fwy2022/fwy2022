import type { ReactNode } from 'react'

import { cn } from '../../lib/utils'

export type BadgeTone = 'brand' | 'accent' | 'gold' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

const TONES: Record<BadgeTone, string> = {
  brand: 'bg-brand-soft text-brand border-brand/20',
  accent: 'bg-accent-soft text-accent border-accent/25',
  gold: 'bg-gold-soft text-gold border-gold/25',
  success: 'bg-success-soft text-success border-success/25',
  warning: 'bg-warning-soft text-warning border-warning/25',
  danger: 'bg-danger-soft text-danger border-danger/25',
  info: 'bg-info-soft text-info border-info/25',
  neutral: 'bg-surface-2 text-ink-muted border-line',
}

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  className?: string
  icon?: ReactNode
  size?: 'sm' | 'md'
}

export function Badge({ children, tone = 'neutral', className, icon, size = 'md' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-semibold',
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        TONES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
