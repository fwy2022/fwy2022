import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCallback, useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { useI18n } from '../../i18n/I18nProvider'
import { cn } from '../../lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZES = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-3xl',
}

/**
 * Modale accessible : fermeture par Échap, clic extérieur, verrouillage du
 * scroll, piégeage du focus et restitution du focus à l'élément d'origine.
 * Sur mobile, elle se présente en feuille glissante depuis le bas.
 */
export function Modal({ open, onClose, title, description, children, footer, size = 'md', className }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const { m } = useI18n()

  useEffect(() => {
    if (!open) return

    restoreFocusRef.current = document.activeElement as HTMLElement | null
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>('[data-autofocus], button, a[href]')?.focus()
    }, 60)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      window.clearTimeout(focusTimer)
      restoreFocusRef.current?.focus?.()
    }
  }, [open, onClose])

  const handleBackdrop = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) onClose()
    },
    [onClose],
  )

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-100 flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-[#04201e]/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={typeof title === 'string' ? title : undefined}
            className={cn(
              'relative w-full overflow-hidden rounded-t-3xl border border-line bg-surface shadow-lift sm:rounded-3xl',
              SIZES[size],
              className,
            )}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleBackdrop}
          >
            {(title || description) && (
              <header className="flex items-start gap-4 px-6 pt-6 pb-2">
                <div className="flex-1">
                  {title && <h2 className="text-lg font-bold text-ink">{title}</h2>}
                  {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={m.common.close}
                  className="-mt-1 -mr-2 grid size-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <X className="size-4.5" />
                </button>
              </header>
            )}
            {children && <div className="px-6 py-4">{children}</div>}
            {footer && <footer className="safe-bottom border-t border-line bg-surface-2 px-6 py-4">{footer}</footer>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
