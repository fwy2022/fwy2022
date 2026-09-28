import type { SupportedLocale } from './format'

/**
 * Tout l'affichage horaire se fait en Africa/Douala (UTC+1, sans heure d'été),
 * quel que soit le fuseau du navigateur : un client à Yaoundé et un client à
 * Douala voient la même heure affichée.
 */
export const APP_TIME_ZONE = 'Africa/Douala'
export const APP_TIME_ZONE_OFFSET = '+01:00'
export const APP_TIME_ZONE_LABEL = 'Douala (UTC+1)'

function localeTag(locale: SupportedLocale): string {
  return locale === 'fr' ? 'fr-FR' : 'en-US'
}

export type DateInput = Date | number | string

export function formatDate(
  input: DateInput,
  locale: SupportedLocale = 'fr',
  options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' },
): string {
  return new Intl.DateTimeFormat(localeTag(locale), {
    ...options,
    timeZone: APP_TIME_ZONE,
  }).format(new Date(input))
}

export function formatTime(
  input: DateInput,
  locale: SupportedLocale = 'fr',
  options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' },
): string {
  return new Intl.DateTimeFormat(localeTag(locale), {
    ...options,
    timeZone: APP_TIME_ZONE,
    hour12: locale === 'en' ? true : false,
  })
    .format(new Date(input))
    .replace(/ /g, ' ')
}

export function formatDateTime(input: DateInput, locale: SupportedLocale = 'fr'): string {
  return `${formatDate(input, locale, { day: '2-digit', month: 'short' })} · ${formatTime(input, locale)}`
}

/** Clé de journée locale « 2026-09-28 » (indispensable pour l'agenda). */
export function dayKey(input: DateInput): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: APP_TIME_ZONE,
  }).format(new Date(input))
  return parts
}

/** Décale une date en jours, sur l'horloge locale affichée. */
export function addDays(input: DateInput, days: number): Date {
  const date = new Date(input)
  const shifted = new Date(date.getTime() + days * 86_400_000)
  return shifted
}

export function startOfDay(input: DateInput): Date {
  const date = new Date(input)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function isSameDay(a: DateInput, b: DateInput): boolean {
  return dayKey(a) === dayKey(b)
}

export function relativeTime(input: DateInput, locale: SupportedLocale = 'fr'): string {
  const diffMs = new Date(input).getTime() - Date.now()
  const absMinutes = Math.round(Math.abs(diffMs) / 60_000)
  const rtf = new Intl.RelativeTimeFormat(localeTag(locale), { numeric: 'auto' })

  if (absMinutes < 60) return rtf.format(Math.round(diffMs / 60_000), 'minute')
  if (absMinutes < 60 * 24) return rtf.format(Math.round(diffMs / 3_600_000), 'hour')
  return rtf.format(Math.round(diffMs / 86_400_000), 'day')
}

/** Message de rappel prêt à envoyer par SMS / WhatsApp. */
export function greetingFr(input: DateInput = new Date()): string {
  const hour = Number(
    new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: APP_TIME_ZONE }).format(
      new Date(input),
    ),
  )
  if (hour < 12) return 'Bonjour'
  if (hour < 18) return 'Bon après-midi'
  return 'Bonsoir'
}
