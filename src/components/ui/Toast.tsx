import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'

import { cn } from '../../lib/utils'

export type ToastTone = 'success' | 'error' | 'info' | 'warning'

interface ToastItem {
  id: number
  title: string
  description?: string
  tone: ToastTone
  duration: number
}

interface ToastContextValue {
  toast: (input: { title: string; description?: string; tone?: ToastTone; duration?: number }) => void
  success: (title: string, description?: string) => void
  error: (title: string, description?: string) => void
  info: (title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const TONE_STYLES: Record<ToastTone, { icon: ReactNode; ring: string; iconColor: string }> = {
  success: { icon: <CheckCircle2 className="size-5" />, ring: 'border-success/30', iconColor: 'text-success' },
  error: { icon: <XCircle className="size-5" />, ring: 'border-danger/30', iconColor: 'text-danger' },
  info: { icon: <Info className="size-5" />, ring: 'border-info/30', iconColor: 'text-info' },
  warning: { icon: <AlertTriangle className="size-5" />, ring: 'border-warning/30', iconColor: 'text-warning' },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const counter = useRef(0)
  const reduceMotion = useReducedMotion()

  const dismiss = useCallback((id: number) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const toast = useCallback<ToastContextValue['toast']>(
    ({ title, description, tone = 'info', duration = 4500 }) => {
      counter.current += 1
      const id = counter.current
      setItems((current) => [...current.slice(-3), { id, title, description, tone, duration }])
      window.setTimeout(() => dismiss(id), duration)
    },
    [dismiss],
  )

  const value = useMemo<ToastContextValue>(
    () => ({
      toast,
      success: (title, description) => toast({ title, description, tone: 'success' }),
      error: (title, description) => toast({ title, description, tone: 'error' }),
      info: (title, description) => toast({ title, description, tone: 'info' }),
    }),
    [toast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-200 flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-0 sm:bottom-0 sm:items-end"
      >
        <AnimatePresence initial={false}>
          {items.map((item) => {
            const tone = TONE_STYLES[item.tone]
            return (
              <motion.div
                key={item.id}
                layout={!reduceMotion}
                role="status"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24, scale: 0.96 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'pointer-events-auto flex w-full max-w-sm items-start gap-3 overflow-hidden rounded-2xl border bg-surface p-3.5 pr-2 shadow-lift',
                  tone.ring,
                )}
              >
                <span className={cn('mt-0.5 shrink-0', tone.iconColor)}>{tone.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  {item.description && <p className="mt-0.5 text-[13px] text-ink-muted">{item.description}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(item.id)}
                  aria-label="Fermer la notification"
                  className="grid size-8 shrink-0 place-items-center rounded-full text-ink-subtle transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast doit être utilisé à l’intérieur de <ToastProvider>')
  return context
}
