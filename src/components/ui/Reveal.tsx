import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

import { cn } from '../../lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Délai en secondes avant l'apparition. */
  delay?: number
  y?: number
  once?: boolean
  as?: 'div' | 'section' | 'li' | 'article' | 'header'
}

/**
 * Apparition au défilement — désactivée automatiquement si l'utilisateur a
 * demandé moins d'animations.
 */
export function Reveal({ children, className, delay = 0, y = 18, once = true, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as]

  if (reduceMotion) {
    return <MotionTag className={className}>{children}</MotionTag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export function StaggerGroup({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol' | 'section'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article' | 'ol'
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag className={cn(className)} variants={staggerChild}>
      {children}
    </MotionTag>
  )
}
