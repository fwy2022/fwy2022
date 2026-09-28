import { cn, initials } from '../../lib/utils'

const GRADIENTS = [
  'from-brand to-brand-active',
  'from-accent to-gold',
  'from-indigo-500 to-brand',
  'from-emerald-500 to-teal-600',
  'from-fuchsia-500 to-accent',
  'from-amber-500 to-accent',
]

interface AvatarProps {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  /** Optionnel : affiche un anneau de présence. */
  online?: boolean
}

const SIZES = {
  xs: 'size-7 text-[10px]',
  sm: 'size-9 text-xs',
  md: 'size-11 text-sm',
  lg: 'size-14 text-base',
  xl: 'size-20 text-xl',
}

export function Avatar({ name, size = 'md', className, online }: AvatarProps) {
  const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const gradient = GRADIENTS[seed % GRADIENTS.length]

  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      <span
        aria-hidden
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-gradient-to-br font-bold text-white shadow-soft select-none',
          gradient,
          SIZES[size],
        )}
      >
        {initials(name)}
      </span>
      <span className="sr-only">{name}</span>
      {online !== undefined && (
        <span
          className={cn(
            'absolute right-0 bottom-0 size-3 rounded-full border-2 border-surface',
            online ? 'bg-success' : 'bg-line-strong',
          )}
        />
      )}
    </span>
  )
}
