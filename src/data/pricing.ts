import type { SupportedLocale } from '../lib/format'

export type PlanId = 'starter' | 'pro' | 'business' | 'enterprise'

export interface Plan {
  id: PlanId
  name: string
  nameEn: string
  /** Prix mensuel en FCFA (XAF). `null` = sur devis. */
  monthly: number | null
  description: string
  descriptionEn: string
  highlights: { fr: string; en: string }[]
  cta: { fr: string; en: string }
  popular?: boolean
  /** Nombre maximum de praticiens (null = illimité). */
  maxPractitioners: number | null
  maxSites: number | null
}

/** -20 % sur le tarif annuel (2 mois offerts). */
export const YEARLY_DISCOUNT = 0.2

export function yearlyPrice(monthly: number): number {
  return Math.round(monthly * 12 * (1 - YEARLY_DISCOUNT))
}

export function monthlyEquivalent(yearlyTotal: number): number {
  return Math.round(yearlyTotal / 12)
}

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    nameEn: 'Starter',
    monthly: 10_000,
    description: 'Pour un praticien indépendant qui veut arrêter de gérer son agenda par téléphone.',
    descriptionEn: 'For a solo practitioner ready to stop managing their diary by phone.',
    highlights: [
      { fr: '1 praticien', en: '1 practitioner' },
      { fr: 'Réservations illimitées', en: 'Unlimited bookings' },
      { fr: 'Page de réservation à vos couleurs', en: 'Branded booking page' },
      { fr: 'Rappels par email', en: 'Email reminders' },
      { fr: 'Fiche client & historique', en: 'Client records & history' },
    ],
    cta: { fr: 'Commencer l’essai gratuit', en: 'Start the free trial' },
    maxPractitioners: 1,
    maxSites: 1,
  },
  {
    id: 'pro',
    name: 'Pro',
    nameEn: 'Pro',
    monthly: 25_000,
    description: 'Pour les cabinets et salons qui vivent des rendez-vous et encaissent sur place.',
    descriptionEn: 'For practices and salons that live on appointments and take payment on site.',
    highlights: [
      { fr: 'Jusqu’à 5 praticiens', en: 'Up to 5 practitioners' },
      { fr: 'SMS + liens WhatsApp', en: 'SMS + WhatsApp links' },
      { fr: 'Paiement en ligne Mobile Money', en: 'Mobile Money online payment' },
      { fr: 'Statistiques & chiffre d’affaires', en: 'Stats & revenue reporting' },
      { fr: 'Reçus et factures PDF en FCFA', en: 'PDF receipts in FCFA' },
    ],
    cta: { fr: 'Choisir le plan Pro', en: 'Choose Pro' },
    popular: true,
    maxPractitioners: 5,
    maxSites: 1,
  },
  {
    id: 'business',
    name: 'Business',
    nameEn: 'Business',
    monthly: 50_000,
    description: 'Pour les cliniques multi-praticiens, les instituts et les groupes d’établissements.',
    descriptionEn: 'For multi-practitioner clinics, beauty institutes and small groups.',
    highlights: [
      { fr: 'Jusqu’à 15 praticiens', en: 'Up to 15 practitioners' },
      { fr: 'Multi-sites', en: 'Multi-site' },
      { fr: 'CRM avancé, tags et import CSV', en: 'Advanced CRM, tags & CSV import' },
      { fr: 'Marketing : campagnes, codes promo, cartes cadeaux', en: 'Marketing: campaigns, promo codes, gift cards' },
      { fr: 'Rôles & permissions avancés', en: 'Advanced roles & permissions' },
    ],
    cta: { fr: 'Choisir le plan Business', en: 'Choose Business' },
    maxPractitioners: 15,
    maxSites: 5,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    nameEn: 'Enterprise',
    monthly: null,
    description: 'Pour les groupes de cliniques, les chaînes et les projets d’export hors Cameroun.',
    descriptionEn: 'For hospital groups, chains and projects outside Cameroon.',
    highlights: [
      { fr: 'Praticiens illimités', en: 'Unlimited practitioners' },
      { fr: 'Sites illimités', en: 'Unlimited sites' },
      { fr: 'Déploiement dédié & API', en: 'Dedicated deployment & API' },
      { fr: 'Facturation entreprise & formation', en: 'Corporate billing & onboarding' },
      { fr: 'Account manager dédié', en: 'Dedicated account manager' },
    ],
    cta: { fr: 'Parler à un conseiller', en: 'Talk to sales' },
    maxPractitioners: null,
    maxSites: null,
  },
]

export type FeatureValue = boolean | string

export interface ComparisonRow {
  label: { fr: string; en: string }
  group: { fr: string; en: string }
  values: Record<PlanId, FeatureValue>
  tooltip?: { fr: string; en: string }
}

const yes: FeatureValue = true
const no: FeatureValue = false

export const comparison: ComparisonRow[] = [
  {
    group: { fr: 'Réservation', en: 'Booking' },
    label: { fr: 'Réservations illimitées', en: 'Unlimited bookings' },
    values: { starter: yes, pro: yes, business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Réservation', en: 'Booking' },
    label: { fr: 'Page de réservation à vos couleurs', en: 'Branded booking page' },
    values: { starter: yes, pro: yes, business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Réservation', en: 'Booking' },
    label: { fr: 'Réservation invité (sans compte)', en: 'Guest booking (no account)' },
    values: { starter: yes, pro: yes, business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Réservation', en: 'Booking' },
    label: { fr: 'Liste d’attente & rappels automatiques', en: 'Waitlist & automatic reminders' },
    values: { starter: yes, pro: yes, business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Équipe', en: 'Team' },
    label: { fr: 'Praticiens', en: 'Practitioners' },
    values: { starter: '1', pro: 'Jusqu’à 5', business: 'Jusqu’à 15', enterprise: 'Illimité' },
  },
  {
    group: { fr: 'Équipe', en: 'Team' },
    label: { fr: 'Sites / établissements', en: 'Sites' },
    values: { starter: '1', pro: '1', business: 'Jusqu’à 5', enterprise: 'Illimité' },
  },
  {
    group: { fr: 'Équipe', en: 'Team' },
    label: { fr: 'Rôles & permissions', en: 'Roles & permissions' },
    values: { starter: 'Gérant', pro: 'Gérant, praticien, réception', business: 'Complet', enterprise: 'Personnalisé' },
  },
  {
    group: { fr: 'Équipe', en: 'Team' },
    label: { fr: 'Champs médicaux protégés', en: 'Protected medical fields' },
    values: { starter: no, pro: yes, business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Communication', en: 'Communication' },
    label: { fr: 'Rappels email', en: 'Email reminders' },
    values: { starter: yes, pro: yes, business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Communication', en: 'Communication' },
    label: { fr: 'Rappels SMS', en: 'SMS reminders' },
    values: { starter: no, pro: yes, business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Communication', en: 'Communication' },
    label: { fr: 'Liens WhatsApp pré-remplis', en: 'Pre-filled WhatsApp links' },
    values: { starter: no, pro: yes, business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Paiement', en: 'Payments' },
    label: { fr: 'Paiement en ligne MTN MoMo / Orange Money', en: 'MTN MoMo / Orange Money online payment' },
    values: { starter: no, pro: yes, business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Paiement', en: 'Payments' },
    label: { fr: 'Acomptes & forfaits clients', en: 'Deposits & client packages' },
    values: { starter: no, pro: yes, business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Paiement', en: 'Payments' },
    label: { fr: 'Reçus et factures PDF en FCFA', en: 'PDF receipts in FCFA' },
    values: { starter: no, pro: yes, business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Gestion', en: 'Management' },
    label: { fr: 'CRM avancé, tags, import/export CSV', en: 'Advanced CRM, tags, CSV import/export' },
    values: { starter: no, pro: 'Tags', business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Gestion', en: 'Management' },
    label: { fr: 'Marketing, codes promo, cartes cadeaux', en: 'Marketing, promo codes, gift cards' },
    values: { starter: no, pro: no, business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Gestion', en: 'Management' },
    label: { fr: 'Statistiques & performance praticien', en: 'Stats & practitioner performance' },
    values: { starter: no, pro: yes, business: yes, enterprise: yes },
  },
  {
    group: { fr: 'Support', en: 'Support' },
    label: { fr: 'Support', en: 'Support' },
    values: { starter: 'Email', pro: 'WhatsApp 7j/7', business: 'WhatsApp prioritaire', enterprise: 'Account manager dédié' },
  },
  {
    group: { fr: 'Support', en: 'Support' },
    label: { fr: 'Essai gratuit de 14 jours', en: '14-day free trial' },
    values: { starter: yes, pro: yes, business: yes, enterprise: yes },
  },
]

export function localize(value: { fr: string; en: string }, locale: SupportedLocale): string {
  return locale === 'fr' ? value.fr : value.en
}
