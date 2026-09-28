import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  /** Mise en forme appliquée à chaque frame. */
  format?: (value: number) => string
  duration?: number
  className?: string
}

/**
 * Compteur animé déclenché à l'entrée dans le viewport.
 * Respecte `prefers-reduced-motion` (affiche directement la valeur finale).
 */
export function AnimatedNumber({
  value,
  format = (current) => Math.round(current).toLocaleString('fr-FR'),
  duration = 1.4,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(() => (reduceMotion ? value : 0))

  useEffect(() => {
    if (!inView || reduceMotion) return

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    })
    return () => controls.stop()
  }, [inView, value, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {format(display)}
    </span>
  )
}
