import type { ReactNode } from 'react'

import { cn } from '../../lib/utils'
import { Reveal } from './Reveal'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  containerClassName?: string
  /** Décoration d'arrière-plan : grille, halo, dégradé. */
  background?: 'none' | 'soft' | 'grid' | 'dots'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
}

const SPACING = {
  none: '',
  sm: 'py-14 sm:py-20',
  md: 'py-20 sm:py-28',
  lg: 'py-24 sm:py-32',
}

const BACKGROUNDS: Record<NonNullable<SectionProps['background']>, string> = {
  none: '',
  soft: 'bg-background-soft',
  grid: 'bg-grid',
  dots: 'bg-dots',
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  background = 'none',
  spacing = 'md',
}: SectionProps) {
  return (
    <section id={id} className={cn('relative isolate', SPACING[spacing], BACKGROUNDS[background], className)}>
      {background === 'grid' && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--background),transparent_60%)]"
        />
      )}
      <div className={cn('container-page', containerClassName)}>{children}</div>
    </section>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  as?: 'h1' | 'h2' | 'h3'
  children?: ReactNode
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
  as: Heading = 'h2',
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-bold tracking-wide text-brand uppercase">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Heading className={cn('text-3xl font-extrabold text-balance sm:text-4xl lg:text-[2.75rem]', titleClassName)}>
          {title}
        </Heading>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              'max-w-2xl text-base leading-relaxed text-pretty text-ink-muted sm:text-lg',
              align === 'center' && 'mx-auto',
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  )
}
