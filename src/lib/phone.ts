/**
 * Numéros camerounais — format +237.
 * Un mobile national comporte 9 chiffres et commence par 6
 * (MTN : 6 5x / 6 7x, Orange : 6 9x, Camtel : 6 2x).
 */

export const CM_COUNTRY_CODE = '+237'
export const CM_FLAG = '🇨🇲'

const LOCAL_MOBILE_REGEX = /^(?:2|6)\d{8}$/
const MOBILE_REGEX = /^6\d{8}$/
const LANDLINE_REGEX = /^2\d{8}$/

/** Retire tout ce qui n'est pas un chiffre (espaces, tirets, parenthèses, +). */
export function digitsOnly(value: string): string {
  return (value ?? '').replace(/\D/g, '')
}

/**
 * Normalise vers l'E.164 international : « 6 90 12 34 56 » -> « +237690123456 ».
 * Retourne null si le numéro n'est pas valide.
 */
export function toE164(value: string): string | null {
  let digits = digitsOnly(value)

  if (digits.startsWith('237') && digits.length === 12) digits = digits.slice(3)
  else if (digits.startsWith('00237') && digits.length === 14) digits = digits.slice(5)

  if (digits.length === 9 && LOCAL_MOBILE_REGEX.test(digits)) return `${CM_COUNTRY_CODE}${digits}`
  return null
}

export function isValidCMPhone(value: string): boolean {
  return toE164(value) !== null
}

export function isValidCMMobile(value: string): boolean {
  const e164 = toE164(value)
  return e164 !== null && MOBILE_REGEX.test(digitsOnly(e164).slice(3))
}

/** Affichage lisible par groupes : « +237 6 90 12 34 56 ». */
export function formatCMPhone(value: string): string {
  const e164 = toE164(value)
  if (!e164) return value
  return `${CM_COUNTRY_CODE} ${formatCMLocal(e164)}`
}

/** Affichage local sans indicatif : « 6 90 12 34 56 » (groupes de 2 après l'indicatif). */
export function formatCMLocal(value: string): string {
  const e164 = toE164(value)
  const local = e164 ? e164.slice(4) : digitsOnly(value)
  if (local.length !== 9) return local
  return `${local[0]} ${local.slice(1, 3)} ${local.slice(3, 5)} ${local.slice(5, 7)} ${local.slice(7, 9)}`
}

export type PhoneIssue = 'empty' | 'tooShort' | 'tooLong' | 'invalidPrefix' | null

export function inspectPhone(value: string): PhoneIssue {
  const digits = digitsOnly(value)
  if (!digits) return 'empty'
  if (digits.length < 9) return 'tooShort'
  if (digits.length > 12) return 'tooLong'
  if (!LOCAL_MOBILE_REGEX.test(digits.slice(-9))) return 'invalidPrefix'
  return null
}

export function isValidCMLandline(value: string): boolean {
  const digits = digitsOnly(value).replace(/^237/, '')
  return LANDLINE_REGEX.test(digits)
}

/** Masque un numéro pour l'affichage dans une liste de clients. */
export function maskPhone(value: string): string {
  const e164 = toE164(value)
  if (!e164) return value
  const local = e164.slice(4)
  return `${CM_COUNTRY_CODE} ${local[0]} •• •• ${local.slice(5, 7)} ${local.slice(7, 9)}`
}

/** Lien WhatsApp pré-rempli (utilisé pour les confirmations et rappels). */
export function whatsappLink(value: string, message: string): string {
  const e164 = toE164(value)
  if (!e164) return `https://wa.me/?text=${encodeURIComponent(message)}`
  return `https://wa.me/${e164.slice(1)}?text=${encodeURIComponent(message)}`
}

export type MobileMoneyOperator = 'MTN' | 'Orange'
export type Carrier = MobileMoneyOperator | 'Camtel'

/**
 * Plan de numérotation camerounais : 65x / 66x / 67x = MTN, 69x = Orange,
 * 62x = Camtel. Les autres préfixes appartiennent à d'autres opérateurs.
 */
export function detectCarrier(value: string): Carrier | null {
  const e164 = toE164(value)
  if (!e164) return null
  const prefix = e164.slice(4, 6)
  if (prefix === '69') return 'Orange'
  if (prefix === '62') return 'Camtel'
  if (['65', '66', '67'].includes(prefix)) return 'MTN'
  return null
}

/** Opérateur Mobile Money utilisable pour un paiement. */
export function detectMobileMoneyOperator(value: string): MobileMoneyOperator | null {
  const carrier = detectCarrier(value)
  return carrier === 'MTN' || carrier === 'Orange' ? carrier : null
}
