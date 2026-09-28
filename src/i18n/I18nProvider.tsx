import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { formatFCFA as formatFCFALib, type FormatFCFAOptions, type SupportedLocale } from '../lib/format'
import { formatDate, formatDateTime, formatTime, relativeTime, type DateInput } from '../lib/datetime'
import { en, fr, type Messages } from './messages'

const STORAGE_KEY = 'rdvpro.locale'
export const DEFAULT_LOCALE: SupportedLocale = 'fr'

interface I18nContextValue {
  locale: SupportedLocale
  setLocale: (locale: SupportedLocale) => void
  toggleLocale: () => void
  messages: Messages
  /** Messages de la locale courante, pratique dans les composants. */
  m: Messages
  /** Instance unique de formatFCFA liée à la locale courante. */
  fcfa: (amount: number, options?: Omit<FormatFCFAOptions, 'locale'>) => string
  formatDate: (input: DateInput, options?: Intl.DateTimeFormatOptions) => string
  formatTime: (input: DateInput, options?: Intl.DateTimeFormatOptions) => string
  formatDateTime: (input: DateInput) => string
  relativeTime: (input: DateInput) => string
  /** Chemin du site pour la locale courante (aide SEO + partage). */
  localePrefix: string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readStoredLocale(): SupportedLocale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'en' || stored === 'fr' ? stored : DEFAULT_LOCALE
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(readStoredLocale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((next: SupportedLocale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* mode privé : on garde la preference en mémoire seulement */
    }
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => {
      const next = current === 'fr' ? 'en' : 'fr'
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  const value = useMemo<I18nContextValue>(() => {
    const messages = locale === 'fr' ? fr : en
    return {
      locale,
      setLocale,
      toggleLocale,
      messages,
      m: messages,
      fcfa: (amount, options) => formatFCFALib(amount, { locale, ...options }),
      formatDate: (input, options = { weekday: 'long', day: 'numeric', month: 'long' }) =>
        formatDate(input, locale, options),
      formatTime: (input, options) => formatTime(input, locale, options),
      formatDateTime: (input) => formatDateTime(input, locale),
      relativeTime: (input) => relativeTime(input, locale),
      localePrefix: '',
    }
  }, [locale, setLocale, toggleLocale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n doit être utilisé à l’intérieur de <I18nProvider>')
  return context
}
