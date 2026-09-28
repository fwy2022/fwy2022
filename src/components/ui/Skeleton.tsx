import { cn } from '../../lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('skeleton rounded-lg', className)} />
}

/** Squelette de carte paysage, utilisé pendant le chargement des listes. */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('surface-card rounded-2xl p-5', className)}>
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="mt-4 h-2.5 w-full" />
      <Skeleton className="mt-2 h-2.5 w-4/5" />
    </div>
  )
}
