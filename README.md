<div align="center">

# RDVPro

**La plateforme de prise de rendez-vous en ligne pour les cliniques, cabinets, salons, instituts de beauté et spas au Cameroun.**

🇫🇷 Français par défaut · 🇬🇧 English disponible · 💰 Franc CFA (XAF) · 🕐 Africa/Douala · 📱 Installable (PWA)

</div>

---

## Phase 1 — Design system, landing page et page de tarification

Cette phase livre les fondations visuelles du produit : le design system complet,
le site marketing et la page de tarifs, avec des données de démonstration
réalistes (noms camerounais, prix en FCFA). L'authentification et les données
Firebase arrivent en phase 2.

### Ce qui est livré

| Domaine | Détail |
| --- | --- |
| **Design system** | Jetons de couleurs (teal + corail), modes clair/sombre, typographie Plus Jakarta Sans embarquée, rayons 12–16 px, ombres douces, animations 150–250 ms |
| **Composants** | Button, Card, Badge, Modal, Toast, Accordéon, Stepper, SegmentedControl, Switch, Skeleton, Avatar, Input/Select, Champ téléphone +237, Logo, Layout |
| **Landing page** | Hero avec démo d'agenda interactive, bandeau clients, 6 fonctionnalités, mise en service en 4 étapes, démo à 3 onglets (agenda / réservation / paiement Mobile Money), statistiques, tarifs, témoignages, FAQ, CTA, footer |
| **Page tarifs** | Bascule mensuel / annuel (-20 %), 4 plans, tableau comparatif à 19 lignes, FAQ de facturation, garantie 30 jours |
| **Pages annexes** | Aperçu connexion / inscription (phase 2), page 404 |
| **PWA** | Manifeste, service worker (precache), icônes 192/512/maskable, mise à jour non intrusive |
| **i18n** | Dictionnaire FR complet + EN typé (une clé manquante = erreur de compilation) |
| **Performance** | First load ≈ 110 kB gzip (JS), polices locales, squelettes de chargement, routes chargées à la demande |

### Démo visuelle incluse

La page d'accueil contient trois maquettes **réellement interactives** (ce ne sont
pas des images) :

- **Agenda praticien** — journée du Dr. Ekwalla, code couleur par service, créneaux
  libres cliquables, bascule jour/semaine ;
- **Réservation client** — le parcours public en 4 étapes (service → praticien →
  date et créneau → confirmation), jouable jusqu'à l'écran de confirmation ;
- **Paiement Mobile Money** — choix MTN MoMo / Orange Money, push sur le
  téléphone, reçu en FCFA avec référence.

Elles servent de cahier des charges visuel pour les phases 3 à 5.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement (HMR) |
| `npm run build` | Vérification des types + build de production |
| `npm run preview` | Prévisualisation du build |
| `npm run typecheck` | `tsc --noEmit` sur tout le projet |
| `npm run lint` | oxlint |

## Stack

- **React 19 + TypeScript + Vite 8**
- **Tailwind CSS v4** (thème en CSS, pas de fichier de config)
- **Framer Motion** (animations, 150–250 ms, `prefers-reduced-motion` respecté)
- **lucide-react** (icônes arborescentes)
- **React Router 7** (routes chargées à la demande)
- **vite-plugin-pwa** (manifeste + service worker)

Firebase (Auth, Firestore, Storage), les Cloud Functions de paiement et la
planification des rappels ne sont pas encore branchés : aucune donnée de cette
phase n'est persistée.

## Structure

```
src/
├─ components/
│  ├─ layout/      Header (sticky, tiroir mobile), Footer, Layout + ScrollManager
│  ├─ marketing/   Hero, Features, HowItWorks, Demo, Stats, Pricing, Testimonials, FAQ, CTA
│  ├─ mock/        Maquettes interactives : AppWindow, AgendaMock, BookingMock, PaymentMock
│  └─ ui/          Design system (Button, Card, Modal, Toast, Stepper, Accordion…)
├─ data/           Tarifs, démo clinique, témoignages, FAQ
├─ i18n/           Dictionnaires FR/EN + provider
├─ lib/            format.ts (FCFA), phone.ts (+237), datetime.ts (Africa/Douala)
├─ pages/          LandingPage, PricingPage, AuthPreviewPage, NotFoundPage
└─ theme/          ThemeProvider (clair/sombre persisté)
```

## Décisions produit structurantes

### La monnaie

`formatFCFA()` est la seule fonction de formatage monétaire de l'application.
Le FCFA n'a pas de décimales et utilise l'espace comme séparateur de milliers :

```ts
formatFCFA(25_000)                      // "25 000 FCFA"   (espace insécable)
formatFCFA(25_000, { locale: 'en' })   // "25,000 FCFA"
formatFCFA(25_000, { suffix: '/ mois' })// "25 000 FCFA / mois"
formatFCFA(4_850_000, { compact: true })// "4,9 M FCFA" (graphiques)
```

L'espace insécable empêche qu'un montant soit coupé en fin de ligne tout en
s'affichant comme un espace normal.

### L'heure

Tout est affiché en `Africa/Douala` (UTC+1, sans heure d'été), quel que soit le
fuseau du navigateur : un patient à Yaoundé et un patient à Douala voient la même
heure, et les créneaux ne dérivent pas. Les clés de journée (`dayKey`) sont
calculées dans ce fuseau — c'est ce qui évite les doubles réservations le soir.

### Le téléphone

Les numéros camerounais sont validés en local (9 chiffres, commençant par 2 ou 6),
puis normalisés en E.164. L'opérateur est déduit du préfixe (65x/66x/67x = MTN,
69x = Orange, 62x = Camtel) pour ne proposer que les bons moyens de paiement.

### Les tarifs

Mensuel et annuel (-20 %, soit deux mois offerts) sont gérés par un simple
bascule : le prix affiché reste toujours « par mois » pour rester comparable, et
le total annuel est rappelé en dessous. Aucune donnée n'est figée en dur dans les
cartes : `src/data/pricing.ts` est la source unique pour les cartes **et** pour le
tableau comparatif.

## Accessibilité

- Navigation clavier complète, focus visible, lien d'évitement « Aller au contenu principal » ;
- Modale : piégeage du focus, fermeture par Échap, restitution du focus, verrouillage du scroll ;
- Onglets, stepper, bascules et accordéons exposés via `aria-*` ;
- Contraste AA sur les deux thèmes ;
- `prefers-reduced-motion` coupe les animations ;
- Cibles tactiles ≥ 44 px, parcours de réservation conçu au pouce.

## Suite du projet

| Phase | Contenu |
| --- | --- |
| 2 | Authentification (email, Google, OTP téléphone), rôles, onboarding guidé |
| 3 | Services, équipe, agenda, moteur de réservation |
| 4 | Page de réservation publique, notifications (SMS, email, WhatsApp) |
| 5 | Paiements Mobile Money, module d'abonnements |
| 6 | Statistiques, CRM, marketing |
