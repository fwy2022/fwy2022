import type { EventColor } from '../../data/demo'

export const colorStyles: Record<
  EventColor,
  { dot: string; bar: string; soft: string; text: string; border: string }
> = {
  teal: {
    dot: 'bg-brand',
    bar: 'bg-brand',
    soft: 'bg-brand-soft',
    text: 'text-brand',
    border: 'border-brand/25',
  },
  coral: {
    dot: 'bg-accent',
    bar: 'bg-accent',
    soft: 'bg-accent-soft',
    text: 'text-accent',
    border: 'border-accent/25',
  },
  gold: {
    dot: 'bg-gold',
    bar: 'bg-gold',
    soft: 'bg-gold-soft',
    text: 'text-gold',
    border: 'border-gold/25',
  },
  indigo: {
    dot: 'bg-indigo-500',
    bar: 'bg-indigo-500',
    soft: 'bg-indigo-500/10',
    text: 'text-indigo-500',
    border: 'border-indigo-500/25',
  },
  mint: {
    dot: 'bg-emerald-500',
    bar: 'bg-emerald-500',
    soft: 'bg-emerald-500/10',
    text: 'text-emerald-500',
    border: 'border-emerald-500/25',
  },
}
