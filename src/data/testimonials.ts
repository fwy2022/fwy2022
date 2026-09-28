export interface Testimonial {
  quote: { fr: string; en: string }
  name: string
  role: { fr: string; en: string }
  business: string
  city: { fr: string; en: string }
  metric: { value: string; label: { fr: string; en: string } }
  accent: string
  seed: number
}

export const testimonials: Testimonial[] = [
  {
    quote: {
      fr: 'Avant, une clientèle sur trois disparaissait entre la prise de téléphone et la confirmation. Aujourd’hui mes clientes réservent le dimanche soir depuis leur téléphone. Mon taux de remplissage est passé de 61 % à 89 % en quatre mois.',
      en: 'One in three clients used to disappear between booking and confirming. Now they book on Sunday night from their phone. My fill rate went from 61% to 89% in four months.',
    },
    name: 'Nadège Ekwalla',
    role: { fr: 'Gynécologue-obstétricienne, fondatrice', en: 'OB-GYN, founder' },
    business: 'Clinique Akwa Santé',
    city: { fr: 'Douala', en: 'Douala' },
    metric: { value: '+89 %', label: { fr: 'de remplissage', en: 'fill rate' } },
    accent: 'teal',
    seed: 1,
  },
  {
    quote: {
      fr: 'J’ai mis le lien de réservation dans mon statut WhatsApp et sur Instagram. Les clientes voient mes vraies disponibilités, je ne tiens plus de carnet à jour. Le samedi matin, j’ouvre avec une agenda déjà rempli.',
      en: 'I put the booking link in my WhatsApp status and on Instagram. Clients see my real availability, and I no longer keep a paper diary. On Saturday mornings I open with a calendar already full.',
    },
    name: 'Samuel Tchoumi',
    role: { fr: 'Coiffeur, propriétaire', en: 'Stylist, owner' },
    business: 'Salon Émeraude',
    city: { fr: 'Yaoundé', en: 'Yaoundé' },
    metric: { value: 'x2,4', label: { fr: 'de réservations en ligne', en: 'more online bookings' } },
    accent: 'coral',
    seed: 2,
  },
  {
    quote: {
      fr: 'Les forfaits mensuels ont transformé mes clientes régulières. Elles rechargent leurs crédits depuis le salon et je vois enfin, service par service, ce qui fonctionne vraiment chez moi.',
      en: 'Monthly packages transformed my regulars. They top up their credits from the salon, and I finally see, service by service, what actually works for my business.',
    },
    name: 'Fatoumata Bello',
    role: { fr: 'Esthéticienne & fondatrice', en: 'Beautician & founder' },
    business: 'Institut Belle Afro',
    city: { fr: 'Bafoussam', en: 'Bafoussam' },
    metric: { value: '18 000 FCFA', label: { fr: 'de forfaits vendus / mois', en: 'packages sold / month' } },
    accent: 'gold',
    seed: 3,
  },
  {
    quote: {
      fr: 'Le paiement Mobile Money a supprimé les impayés de fin de rendez-vous. Je demande un acompte en ligne, le solde se règle au cabinet, et chaque reçu est en FCFA, numéroté, prêt pour ma comptabilité.',
      en: 'Mobile Money payments eliminated end-of-visit unpaid bills. I request a deposit online, the balance is settled at the clinic, and every receipt is in FCFA, numbered and ready for my accountant.',
    },
    name: 'Arsène Mbarga',
    role: { fr: 'Médecin généraliste', en: 'General practitioner' },
    business: 'Centre Médical de la Gare',
    city: { fr: 'Yaoundé', en: 'Yaoundé' },
    metric: { value: '0', label: { fr: 'impayé depuis janvier', en: 'unpaid visit since January' } },
    accent: 'indigo',
    seed: 4,
  },
]

export const clientLogos: { name: string; kind: 'clinic' | 'salon' | 'beauty' | 'spa' | 'medical' }[] = [
  { name: 'Clinique Akwa Santé', kind: 'clinic' },
  { name: 'Salon Émeraude', kind: 'salon' },
  { name: 'Institut Belle Afro', kind: 'beauty' },
  { name: 'Spa Le Baobab', kind: 'spa' },
  { name: 'Centre Médical de la Gare', kind: 'medical' },
  { name: 'Cabinet Ngassa', kind: 'clinic' },
  { name: 'Maison Kadi Beauty', kind: 'beauty' },
  { name: 'Clinique Bafoussam Nord', kind: 'medical' },
]
