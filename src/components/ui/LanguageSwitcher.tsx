import { Languages } from 'lucide-react'

import { useI18n } from '../../i18n/I18nProvider'
import type { SupportedLocale } from '../../lib/format'
import { cn } from '../../lib/utils'

const LANGUAGES: { code: SupportedLocale; short: string; label: string }[] = [
  { code: 'fr', short: 'FR', label: 'Français' },
  { code: 'en', short: 'EN', label: 'English' },
]

/** Sélecteur de langue — le Cameroun est bilingue, le français reste par défaut. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, m } = useI18n()

  return (
    <div
      role="group"
      aria-label={m.meta.switchLabel}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-line bg-surface-2 p-0.5',
        className,
      )}
    >
      <Languages className="mx-1.5 size-3.5 shrink-0 text-ink-subtle" aria-hidden />
      {LANGUAGES.map((language) => {
        const isActive = locale === language.code
        return (
          <button
            key={language.code}
            type="button"
            onClick={() => setLocale(language.code)}
            aria-pressed={isActive}
            title={language.label}
            className={cn(
              'rounded-full px-2 py-1 text-[11px] font-bold transition-colors duration-200',
              isActive ? 'bg-brand text-on-brand' : 'text-ink-muted hover:text-ink',
            )}
          >
            {language.short}
          </button>
        )
      })}
    </div>
  )
}
