/**
 * Devise unique du produit : Franc CFA (XOF / FCFA).
 * Aucun centime, séparateur de milliers à l'espace.
 *
 *   formatFCFA(25000)            -> "25 000 FCFA"
 *   formatFCFA(25000, 'en')     -> "25,000 FCFA"
 *   formatFCFA(25000, {currency:false}) -> "25 000"
 */

export type SupportedLocale = 'fr' | 'en'

/** Espace insécable : évite qu'un montant soit coupé en fin de ligne. */
const NBSP = '\u00A0'

const LOCALE_TAG: Record<SupportedLocale, string> = {
  fr: 'fr-FR',
  en: 'en-US',
}

const CURRENCY_SYMBOL: Record<SupportedLocale, string> = {
  fr: 'FCFA',
  en: 'FCFA',
}

function resolveLocale(locale: SupportedLocale = 'fr'): string {
  return LOCALE_TAG[locale] ?? LOCALE_TAG.fr
}

/**
 * Groupe les milliers avec le séparateur attendu :
 * espace insécable en français, virgule en anglais.
 */
export function groupThousands(value: number, locale: SupportedLocale = 'fr'): string {
  const safe = Number.isFinite(value) ? value : 0
  const formatter = new Intl.NumberFormat(resolveLocale(locale), {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    useGrouping: true,
  })
  const parts = formatter.formatToParts(safe)
  const separator = locale === 'fr' ? NBSP : ','
  return parts
    .map((part) => (part.type === 'group' ? separator : part.value))
    .join('')
}

export interface FormatFCFAOptions {
  /** Langue de rendu — détermine le séparateur de milliers. */
  locale?: SupportedLocale
  /** Ajoute le suffixe « FCFA ». Défaut : true. */
  currency?: boolean
  /** Suffixe personnalisé (ex. « / mois »). */
  suffix?: string
  /** Forme abrégée pour les graphiques : « 25 k ». */
  compact?: boolean
}

/**
 * Fonction de formatage unique de la monnaie, utilisée dans toute l'application.
 */
export function formatFCFA(amount: number, options: FormatFCFAOptions = {}): string {
  const { locale = 'fr', currency = true, suffix, compact = false } = options
  const safe = Number.isFinite(amount) ? amount : 0

  let body: string
  if (compact) {
    body =
      locale === 'fr'
        ? new Intl.NumberFormat(LOCALE_TAG.fr, { notation: 'compact', maximumFractionDigits: 1 })
            .format(safe)
            .replace(/\s/g, NBSP)
        : new Intl.NumberFormat(LOCALE_TAG.en, { notation: 'compact', maximumFractionDigits: 1 }).format(
            safe,
          )
  } else {
    body = groupThousands(safe, locale)
  }

  const parts: string[] = []
  if (currency) parts.push(body, CURRENCY_SYMBOL[locale])
  else parts.push(body)
  if (suffix) parts.push(suffix)

  return parts.join(locale === 'fr' ? NBSP : ' ')
}

export function formatFCFANumber(amount: number, locale: SupportedLocale = 'fr'): string {
  return formatFCFA(amount, { locale, currency: false })
}

export function formatPercent(value: number, locale: SupportedLocale = 'fr', digits = 0): string {
  return new Intl.NumberFormat(resolveLocale(locale), {
    style: 'percent',
    maximumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0)
}

/**
 * Analyse une saisie utilisateur : « 25 000 », « 25000 », « 25.000 », « 25,5 k ».
 * Retourne null si la saisie n'est pas exploitable.
 */
export function parseFCFA(input: string): number | null {
  if (typeof input !== 'string') return null
  // Le FCFA n'a pas de décimales : tout séparateur (espace, point, virgule)
  // est un séparateur de milliers.
  const digits = input.replace(/\D/g, '')
  if (!digits) return null
  const value = Number(digits)
  return Number.isFinite(value) ? Math.round(value) : null
}

/** Saisie utilisateur tolérante : garde les chiffres pendant la frappe. */
export function sanitizeAmountInput(input: string): string {
  return input.replace(/[^\d\s]/g, '').slice(0, 12)
}
