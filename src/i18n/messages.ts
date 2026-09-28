/**
 * Dictionnaire de l'application. Le français est la langue par défaut
 * (le Cameroun est francophone), l'anglais est disponible en second.
 *
 * `Messages` est déduit du dictionnaire FR : toute clé manquante en anglais
 * provoque une erreur de compilation TypeScript.
 */

export const fr = {
  meta: {
    localeName: 'Français',
    otherName: 'English',
    switchLabel: 'Changer de langue',
  },

  brand: {
    name: 'RDVPro',
    tagline: 'Vos rendez-vous, sans coup de fil',
  },

  nav: {
    features: 'Fonctionnalités',
    howItWorks: 'Comment ça marche',
    pricing: 'Tarifs',
    testimonials: 'Témoignages',
    faq: 'Questions fréquentes',
    login: 'Se connecter',
    startTrial: 'Essai gratuit',
    menu: 'Menu',
    close: 'Fermer le menu',
  },

  hero: {
    badge: 'Nouveau · Rappels WhatsApp et paiement Mobile Money',
    titleLead: 'Vos clients réservent',
    titleHighlight: 'chaque jour',
    titleTail: '',
    subtitle:
      "L'agenda en ligne de votre clinique, de votre salon ou de votre spa. Réservation en 30 secondes, confirmations instantanées, rappels automatiques et encaissement MTN MoMo ou Orange Money.",
    ctaPrimary: 'Essayer gratuitement 14 jours',
    ctaSecondary: 'Voir la démo en 2 min',
    microTrust: 'Sans carte bancaire · Annulation en un clic · Données en Afrique',
    stat1Value: '128 000',
    stat1Label: 'rendez-vous gérés / mois',
    stat2Value: '-63 %',
    stat2Label: 'de rendez-vous non honorés',
    stat3Value: '2 400+',
    stat3Label: 'établissements au Cameroun',
    demoTitle: 'Aperçu de l’agenda — Clinique Akwa Santé',
    demoHint: 'Démo interactive : cliquez sur un créneau pour voir la réservation en ligne.',
  },

  logos: {
    title: 'Ils font tourner leur établissement avec RDVPro',
  },

  features: {
    eyebrow: 'Fonctionnalités',
    title: 'Tout ce qu’il faut pour remplir votre agenda',
    subtitle:
      'Un seul outil pour la réservation, la relation client et l’encaissement — pensé pour la réalité du quotidien, y compris sur réseau mobile faible.',
    agenda: {
      title: 'Agenda clair et flexible',
      description:
        'Vues jour, semaine et mois, code couleur par service, glisser-déposer, pauses, congés et dépassements gérés en deux clics.',
    },
    reminders: {
      title: 'Rappels qui évitent les absences',
      description:
        'SMS, email et lien WhatsApp pré-rempli envoyés automatiquement. Vos patients arrivent à l’heure, vous ne rappelez plus à la main.',
    },
    payments: {
      title: 'Mobile Money intégré',
      description:
        'MTN MoMo et Orange Money pour les acomptes comme pour le paiement total. Reçus en FCFA, paiements multipliés par 1,3 en moyenne.',
    },
    crm: {
      title: 'Fiche client enrichie',
      description:
        'Historique, notes, tags, rappel de soin, import et export CSV. Pour les cliniques : antécédents protégés par rôle.',
    },
    stats: {
      title: 'Statistiques utiles',
      description:
        'Chiffre d’affaires en FCFA, taux de remplissage, no-shows, services populaires et performance de chaque praticien.',
    },
    branding: {
      title: 'À vos couleurs',
      description:
        'Votre logo, votre palette, votre nom de domaine. Le parcours de réservation devient une vitrine, pas un formulaire générique.',
    },
  },

  how: {
    eyebrow: 'Mise en service',
    title: 'En ligne en moins de 5 minutes',
    subtitle: 'Aucune migration à préparer, aucun serveur à installer.',
    steps: [
      {
        title: 'Créez votre établissement',
        description: 'Nom, logo, horaires, adresse et services. L’onboarding guidé vous accompagne étape par étape.',
      },
      {
        title: 'Invitez votre équipe',
        description: 'Praticiens, coiffeurs, esthéticiennes : ajoutez leurs disponibilités et leurs permissions.',
      },
      {
        title: 'Partagez votre lien',
        description: 'Un lien unique à mettre sur WhatsApp, Google Maps, Instagram ou votre affiche en vitrine.',
      },
      {
        title: 'Encaissez et relancez',
        description: 'Les confirmations et rappels partent seuls. Vous ne perdez plus de rendez-vous entre deux clients.',
      },
    ],
  },

  demo: {
    eyebrow: 'Démo visuelle',
    title: 'Un aperçu réel de votre quotidien',
    subtitle:
      'Agenda du praticien, parcours de réservation côté client et encaissement Mobile Money — exactement ce que vos équipes verront.',
    tabAgenda: 'Agenda praticien',
    tabBooking: 'Réservation client',
    tabPayment: 'Paiement Mobile Money',
    agendaCaption: 'Semaine du praticien · 34 rendez-vous · 82 % de remplissage',
    bookingCaption: 'Parcours en 4 étapes, pensé pour le pouce',
    paymentCaption: 'Encaissement d’un acompte de 10 000 FCFA',
  },

  pricing: {
    eyebrow: 'Tarifs',
    title: 'Un abonnement clair, sans frais cachés',
    subtitle:
      'Commencez gratuitement pendant 14 jours. Payez par MTN MoMo ou Orange Money quand vous êtes prêt.',
    monthly: 'Mensuel',
    yearly: 'Annuel',
    yearlyDiscount: '-20 %',
    yearlyHint: 'Soit 2 mois offerts',
    perMonth: '/ mois',
    billedMonthly: 'Facturé chaque mois',
    billedYearly: 'Facturé chaque année',
    mostPopular: 'Le plus choisi',
    currentPlan: 'Plan actuel',
    ctaPrimary: 'Commencer l’essai gratuit',
    ctaSecondary: 'Choisir ce plan',
    trialHint: '14 jours offerts · Aucune carte bancaire requise',
    enterpriseCta: 'Parler à un conseiller',
    compareTitle: 'Tout comparer',
    compareSubtitle: 'Chaque plan inclut les réservations illimitées et la mise à jour automatique.',
    feature: 'Fonctionnalité',
    guaranteeTitle: 'Garantie 30 jours',
    guaranteeText:
      'Si RDVPro ne vous convient pas, nous vous remboursons le mois écoulé, sans justification.',
    faqTitle: 'Questions sur la facturation',
  },

  testimonials: {
    eyebrow: 'Témoignages',
    title: 'Des professionnels qui ont repris leur agenda en main',
    subtitle: 'Ils sont au Cameroun, ils utilisent RDVPro au quotidien.',
  },

  faq: {
    eyebrow: 'Questions fréquentes',
    title: 'Tout ce qu’on nous demande',
    subtitle: 'Une question sans réponse ? Écrivez-nous sur WhatsApp, on répond en moins d’une heure.',
  },

  cta: {
    title: 'Votre prochain rendez-vous mérite mieux qu’un coup de fil',
    subtitle:
      'Créez votre établissement gratuitement, ce soir. Vous n’indiquez aucune carte bancaire et vous pouvez arrêter quand vous voulez.',
    primary: 'Créer mon établissement',
    secondary: 'Réserver une démo de 15 min',
    reassurance: 'Essai gratuit 14 jours · Support WhatsApp 7j/7',
  },

  footer: {
    product: 'Produit',
    company: 'Société',
    resources: 'Ressources',
    legal: 'Légal',
    contactTitle: 'Parler à un humain',
    contactText: 'Douala & Yaoundé — réponse en moins d’une heure',
    rights: 'Tous droits réservés.',
    madeIn: 'Conçu au Cameroun, pour l’Afrique francophone.',
    newsletterTitle: 'Le brief des bonuses et des rappels',
    newsletterText: 'Une fois par mois. Pas de spam, désinscription en un clic.',
    newsletterPlaceholder: 'Votre numéro +237…',
    newsletterCta: 'S’inscrire',
  },

  theme: {
    light: 'Mode clair',
    dark: 'Mode sombre',
    toggle: 'Changer de thème',
  },

  common: {
    demoBadge: 'Données de démonstration',
    close: 'Fermer',
    learnMore: 'En savoir plus',
  },
} as const

/** Élargit les littéraux du dictionnaire FR en `string` pour accepter l'anglais. */
type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> }

export type Messages = Widen<typeof fr>

export const en: Messages = {
  meta: {
    localeName: 'English',
    otherName: 'Français',
    switchLabel: 'Switch language',
  },

  brand: {
    name: 'RDVPro',
    tagline: 'Bookings without the phone tag',
  },

  nav: {
    features: 'Features',
    howItWorks: 'How it works',
    pricing: 'Pricing',
    testimonials: 'Testimonials',
    faq: 'FAQ',
    login: 'Log in',
    startTrial: 'Start free trial',
    menu: 'Menu',
    close: 'Close menu',
  },

  hero: {
    badge: 'New · WhatsApp reminders and Mobile Money payments',
    titleLead: 'Your customers book',
    titleHighlight: 'every day',
    titleTail: '',
    subtitle:
      'The online calendar for your clinic, salon or spa. Book in 30 seconds, instant confirmations, automatic reminders and MTN MoMo or Orange Money checkout.',
    ctaPrimary: 'Start your 14-day free trial',
    ctaSecondary: 'See the 2-min demo',
    microTrust: 'No credit card · Cancel anytime · Data hosted in Africa',
    stat1Value: '128,000',
    stat1Label: 'appointments managed / month',
    stat2Value: '-63%',
    stat2Label: 'missed appointments',
    stat3Value: '2,400+',
    stat3Label: 'businesses in Cameroon',
    demoTitle: 'Calendar preview — Akwa Santé Clinic',
    demoHint: 'Interactive demo: tap a slot to see the booking flow.',
  },

  logos: {
    title: 'They run their business on RDVPro',
  },

  features: {
    eyebrow: 'Features',
    title: 'Everything you need to fill your calendar',
    subtitle:
      'One tool for bookings, customer relationships and payments — built for daily reality on mobile networks.',
    agenda: {
      title: 'A clear, flexible calendar',
      description:
        'Day, week and month views, colour-coded services, drag and drop, breaks, leave and overtime handled in two clicks.',
    },
    reminders: {
      title: 'Reminders that prevent no-shows',
      description:
        'SMS, email and a pre-filled WhatsApp link, sent automatically. Patients show up on time, you stop calling by hand.',
    },
    payments: {
      title: 'Built-in Mobile Money',
      description:
        'MTN MoMo and Orange Money for deposits or full payment. Receipts in FCFA, average payment uptake of 1.3×.',
    },
    crm: {
      title: 'Enriched customer records',
      description:
        'History, notes, tags, care reminders, CSV import and export. For clinics: protected medical fields by role.',
    },
    stats: {
      title: 'Stats that matter',
      description:
        'Revenue in FCFA, fill rate, no-shows, popular services and per-practitioner performance.',
    },
    branding: {
      title: 'In your colours',
      description:
        'Your logo, your palette, your domain. The booking flow becomes a storefront, not a generic form.',
    },
  },

  how: {
    eyebrow: 'Setup',
    title: 'Live in under 5 minutes',
    subtitle: 'Nothing to migrate, no server to install.',
    steps: [
      {
        title: 'Create your business',
        description: 'Name, logo, opening hours, address and services. The guided onboarding walks you through it.',
      },
      {
        title: 'Invite your team',
        description: 'Practitioners, stylists, beauticians: add their availability and permissions.',
      },
      {
        title: 'Share your link',
        description: 'A single link for WhatsApp, Google Maps, Instagram or your window sticker.',
      },
      {
        title: 'Get paid and follow up',
        description: 'Confirmations and reminders send themselves. No more bookings between two clients.',
      },
    ],
  },

  demo: {
    eyebrow: 'Visual demo',
    title: 'A realistic look at your day',
    subtitle:
      'Practitioner calendar, customer booking flow and Mobile Money checkout — exactly what your team will see.',
    tabAgenda: 'Practitioner calendar',
    tabBooking: 'Customer booking',
    tabPayment: 'Mobile Money payment',
    agendaCaption: 'Practitioner week · 34 appointments · 82% fill rate',
    bookingCaption: 'A 4-step flow, designed for thumbs',
    paymentCaption: 'Collecting a 10,000 FCFA deposit',
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'Clear pricing, no hidden fees',
    subtitle:
      'Start free for 14 days. Pay with MTN MoMo or Orange Money when you are ready.',
    monthly: 'Monthly',
    yearly: 'Yearly',
    yearlyDiscount: '-20%',
    yearlyHint: '2 months free',
    perMonth: '/ month',
    billedMonthly: 'Billed monthly',
    billedYearly: 'Billed yearly',
    mostPopular: 'Most popular',
    currentPlan: 'Current plan',
    ctaPrimary: 'Start the free trial',
    ctaSecondary: 'Choose this plan',
    trialHint: '14 days free · No credit card required',
    enterpriseCta: 'Talk to sales',
    compareTitle: 'Compare everything',
    compareSubtitle: 'Every plan includes unlimited bookings and automatic updates.',
    feature: 'Feature',
    guaranteeTitle: '30-day guarantee',
    guaranteeText: 'If RDVPro is not right for you, we refund the last month, no questions asked.',
    faqTitle: 'Billing questions',
  },

  testimonials: {
    eyebrow: 'Testimonials',
    title: 'Professionals who took their calendar back',
    subtitle: 'They are in Cameroon, they use RDVPro every day.',
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Everything people ask us',
    subtitle: 'No answer here? Message us on WhatsApp, we reply within the hour.',
  },

  cta: {
    title: 'Your next appointment deserves better than a phone call',
    subtitle:
      'Create your business for free tonight. No credit card, and you can stop whenever you want.',
    primary: 'Create my business',
    secondary: 'Book a 15-min demo',
    reassurance: '14-day free trial · WhatsApp support 7/7',
  },

  footer: {
    product: 'Product',
    company: 'Company',
    resources: 'Resources',
    legal: 'Legal',
    contactTitle: 'Talk to a human',
    contactText: 'Douala & Yaoundé — reply within the hour',
    rights: 'All rights reserved.',
    madeIn: 'Built in Cameroon, for French-speaking Africa.',
    newsletterTitle: 'The tips & reminders brief',
    newsletterText: 'Once a month. No spam, unsubscribe in one click.',
    newsletterPlaceholder: 'Your +237 number…',
    newsletterCta: 'Subscribe',
  },

  theme: {
    light: 'Light mode',
    dark: 'Dark mode',
    toggle: 'Toggle theme',
  },

  common: {
    demoBadge: 'Demo data',
    close: 'Close',
    learnMore: 'Learn more',
  },
}
