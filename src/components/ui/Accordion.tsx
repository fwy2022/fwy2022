import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'

import { cn } from '../../lib/utils'

export interface AccordionItemData {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItemData[]
  className?: string
  /** Plusieurs panneaux ouverts simultanément. */
  allowMultiple?: boolean
  defaultOpenId?: string
}

export function Accordion({ items, className, allowMultiple = true, defaultOpenId }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : [])
  const reduceMotion = useReducedMotion()
  const baseId = useId()

  const toggle = (id: string) => {
    setOpenIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id)
      return allowMultiple ? [...current, id] : [id]
    })
  }

  return (
    <div className={cn('divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={`${baseId}-${item.id}-trigger`}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-${item.id}-panel`}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-surface-2 sm:px-6"
              >
                <span className="flex-1 text-[15px] leading-snug font-semibold text-ink">{item.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    'grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-200',
                    isOpen ? 'border-brand bg-brand text-on-brand' : 'border-line text-ink-muted',
                  )}
                >
                  <Plus className="size-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  id={`${baseId}-${item.id}-panel`}
                  role="region"
                  aria-labelledby={`${baseId}-${item.id}-trigger`}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-ink-muted sm:px-6 sm:pr-14">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
