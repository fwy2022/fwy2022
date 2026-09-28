export interface FaqItem {
  question: { fr: string; en: string }
  answer: { fr: string; en: string }
}

export const faqs: FaqItem[] = [
  {
    question: {
      fr: 'Faut-il connaître l’informatique pour utiliser RDVPro ?',
      en: 'Do I need to be computer-savvy to use RDVPro?',
    },
    answer: {
      fr: 'Non. L’onboarding guidé vous crée l’établissement en 5 minutes, et vous ne gérez que trois choses : vos services, vos horaires et vos praticiens. Le reste est automatique. Notre équipe répond aussi sur WhatsApp pendant toute la première semaine.',
      en: 'No. The guided onboarding sets up your business in 5 minutes, and you only manage three things: your services, opening hours and practitioners. Everything else is automatic. Our team is also on WhatsApp for your entire first week.',
    },
  },
  {
    question: {
      fr: 'Combien coûte la mise en service ?',
      en: 'What does setup cost?',
    },
    answer: {
      fr: 'Rien. La création du compte, l’import de vos services et l’installation de la page de réservation sont offerts. Vous ne payez que lorsque vous choisissez un plan, après 14 jours d’essai gratuit.',
      en: 'Nothing. Creating the account, importing your services and setting up the booking page are free. You only pay when you pick a plan, after your 14-day free trial.',
    },
  },
  {
    question: {
      fr: 'Quels moyens de paiement acceptez-vous ?',
      en: 'Which payment methods do you accept?',
    },
    answer: {
      fr: 'MTN Mobile Money et Orange Money pour les abonnements, ainsi que pour les acomptes de vos patients. Le paiement en espèces reste possible au cabinet, et chaque encaissement en ligne génère un reçu en FCFA.',
      en: 'MTN Mobile Money and Orange Money for subscriptions, and for your patients’ deposits too. Cash is still accepted at the practice, and every online payment generates a receipt in FCFA.',
    },
  },
  {
    question: {
      fr: 'Mes patients peuvent-ils réserver sans créer de compte ?',
      en: 'Can my customers book without creating an account?',
    },
    answer: {
      fr: 'Oui. Le parcours invité ne demande qu’un nom et un numéro +237 : c’est ce qui convierte le mieux. Ceux qui le souhaitent peuvent se connecter et retrouver leur historique.',
      en: 'Yes. The guest flow only asks for a name and a +237 number — it converts the best. Those who want to can log in and see their history.',
    },
  },
  {
    question: {
      fr: 'Puis-je mettre mon logo et mes couleurs ?',
      en: 'Can I use my logo and colours?',
    },
    answer: {
      fr: 'Oui, dès le plan Starter. Vous choisissez votre palette, votre logo et votre photo de couverture. La page de réservation ressemble à votre établissement, pas à un logiciel.',
      en: 'Yes, from the Starter plan upwards. You pick your palette, logo and cover photo. The booking page looks like your business, not like a piece of software.',
    },
  },
  {
    question: {
      fr: 'Je suis plusieurs établissements : est-ce gérable ?',
      en: 'I run several locations — is that manageable?',
    },
    answer: {
      fr: 'Oui, dès le plan Business. Vous gérez plusieurs sites depuis un seul compte, avec des équipes, des horaires et des statistiques par établissement.',
      en: 'Yes, from the Business plan. You manage several locations from one account, with teams, hours and stats per location.',
    },
  },
  {
    question: {
      fr: 'Comment mes données patients sont-elles protégées ?',
      en: 'How are my patients’ data protected?',
    },
    answer: {
      fr: 'Chaque établissement est isolé : un praticien ne voit que ses propres rendez-vous, et les champs médicaux sont réservés aux rôles habilités. L’hébergement est protégé, les sauvegardes sont quotidiennes, et vous pouvez exporter ou supprimer les données d’une personne à tout moment.',
      en: 'Each business is isolated: a practitioner only sees their own appointments, and medical fields are restricted to authorised roles. Hosting is protected, backups run daily, and you can export or delete a person’s data at any time.',
    },
  },
  {
    question: {
      fr: 'Puis-je arrêter si ça ne me convient pas ?',
      en: 'What if RDVPro is not right for me?',
    },
    answer: {
      fr: 'Oui. Vous annulez en un clic depuis le portail de facturation, sans engagement ni frais de résiliation. Et pendant les 30 premiers jours, nous remboursons le mois écoulé si vous n’êtes pas satisfait.',
      en: 'Yes. You cancel in one click from the billing portal, with no commitment or cancellation fee. And within your first 30 days, we refund the last month if you are not satisfied.',
    },
  },
]

export const billingFaqs: FaqItem[] = [
  {
    question: {
      fr: 'Comment se passe le renouvellement par Mobile Money ?',
      en: 'How does Mobile Money renewal work?',
    },
    answer: {
      fr: 'MTN MoMo et Orange Money ne permettent pas toujours le prélèvement automatique. Nous vous envoyons donc un rappel 7, 3 et 1 jour avant l’échéance, avec un lien de paiement en un clic. Vous avez 5 jours de grâce, puis l’accès passe en lecture seule — vos données ne sont jamais supprimées.',
      en: 'MTN MoMo and Orange Money do not always support automatic debits. We therefore send a reminder 7, 3 and 1 day before the due date, with a one-click payment link. You get a 5-day grace period, after which the account goes read-only — your data is never deleted.',
    },
  },
  {
    question: {
      fr: 'Puis-je changer de plan en cours de mois ?',
      en: 'Can I change plan mid-month?',
    },
    answer: {
      fr: 'Oui. Le changement est immédiat et le montant déjà payé est calculé au prorata. Descendre de plan ne vous fait jamais perdre les données de vos clients.',
      en: 'Yes. The change is immediate and the amount already paid is prorated. Downgrading never deletes your customer data.',
    },
  },
  {
    question: {
      fr: 'Puis-je payer en espèces ?',
      en: 'Can I pay in cash?',
    },
    answer: {
      fr: 'Oui, par virement ou en espèces au bureau RDVPro de Douala. Un reçu est délivré et votre abonnement est activé dans l’heure.',
      en: 'Yes, by transfer or in cash at the RDVPro office in Douala. You get a receipt and your subscription is activated within the hour.',
    },
  },
  {
    question: {
      fr: 'Les factures sont-elles en FCFA ?',
      en: 'Are invoices issued in FCFA?',
    },
    answer: {
      fr: 'Toujours. Factures, reçus et abonnements des clients sont libellés en Franc CFA (XAF), sans devise étrangère, pour simplifier votre comptabilité.',
      en: 'Always. Invoices, receipts and client packages are in CFA francs (XAF), with no foreign currency, to keep your accounting simple.',
    },
  },
]
