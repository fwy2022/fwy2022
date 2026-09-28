import { cn } from '../../lib/utils'

interface LogoProps {
  className?: string
  size?: number
  showWordmark?: boolean
  /** Version monochrome pour les contexts inversés. */
  monochrome?: boolean
}

/**
 * Marque RDVPro : un bloc « agenda » avec une coche, en dégradé teal.
 * Vectoriel et léger (aucune image à télécharger).
 */
export function Logo({ className, size = 36, showWordmark = true, monochrome = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className="relative inline-grid place-items-center overflow-hidden rounded-[0.7em] shadow-[0_8px_18px_-10px_var(--brand)]"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden focusable="false">
          <defs>
            <linearGradient id="rdvpro-mark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={monochrome ? 'currentColor' : '#19b3a6'} />
              <stop offset="55%" stopColor={monochrome ? 'currentColor' : '#0f8a83'} />
              <stop offset="100%" stopColor={monochrome ? 'currentColor' : '#0b5c58'} />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="11" fill="url(#rdvpro-mark)" />
          <rect x="10" y="12" width="20" height="17" rx="4" fill="white" fillOpacity="0.94" />
          <rect x="15" y="9" width="2.6" height="6" rx="1.3" fill="white" />
          <rect x="22.4" y="9" width="2.6" height="6" rx="1.3" fill="white" />
          <rect x="10" y="17" width="20" height="2.4" fill="#0f8a83" fillOpacity="0.22" />
          <path
            d="M14.4 24.4l3.4 3.4 7.4-7.6"
            fill="none"
            stroke="#0b5c58"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showWordmark && (
        <span className="text-[1.35em] leading-none font-extrabold tracking-tight text-ink">
          RDV<span className="text-brand">Pro</span>
        </span>
      )}
    </span>
  )
}
