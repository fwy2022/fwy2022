import type { ReactNode } from 'react'

import { cn } from '../../lib/utils'

interface AppWindowProps {
  children: ReactNode
  url?: string
  className?: string
  bodyClassName?: string
}

/** Fenêtre d'application stylisée — utilisé pour toutes les maquettes produit. */
export function AppWindow({ children, url = 'app.rdvpro.cm/agenda', className, bodyClassName }: AppWindowProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-line bg-surface shadow-lift sm:rounded-3xl',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-3.5 py-2.5 sm:px-4">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex max-w-[62%] items-center gap-2 rounded-md bg-surface px-2.5 py-1 text-[11px] text-ink-subtle">
          <span className="size-1.5 shrink-0 rounded-full bg-success" aria-hidden />
          <span className="truncate">{url}</span>
        </div>
      </div>
      <div className={cn('bg-surface', bodyClassName)}>{children}</div>
    </div>
  )
}
