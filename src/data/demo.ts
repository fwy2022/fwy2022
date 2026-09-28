import { addDays, startOfDay } from '../lib/datetime'

/**
 * Données de démonstration réalistes (Phase 1) : établissement, équipe,
 * services et agenda d'une semaine-type. Rien de cela n'est relié à Firebase
 * pour l'instant — c'est la maquette fonctionnelle qui servira de référence
 * aux phases suivantes.
 */

export type EventColor = 'teal' | 'coral' | 'gold' | 'indigo' | 'mint'
export type EventStatus = 'confirmed' | 'pending' | 'checked-in' | 'paid'

export interface DemoPractitioner {
  id: string
  name: string
  role: string
  roleEn: string
  color: EventColor
}

export interface DemoService {
  id: string
  name: string
  nameEn: string
  duration: number
  price: number
  category: 'Consultation' | 'Soin' | 'Esthétique'
  bufferAfter?: number
}

export interface DemoEvent {
  id: string
  dayOffset: number
  start: string
  duration: number
  patient: string
  service: string
  practitionerId: string
  status: EventStatus
  color: EventColor
  paid?: boolean
}

export const demoClinic = {
  name: 'Clinique Akwa Santé',
  city: 'Douala',
  address: 'Rue Joss, Akwa — face pharmacie du Wouri',
  phone: '+237 6 99 12 34 56',
  hours: 'Lun – Sam · 08:00 – 18:00',
}

export const practitioners: DemoPractitioner[] = [
  { id: 'p1', name: 'Dr. Nadège Ekwalla', role: 'Gynécologue-obstétricienne', roleEn: 'OB-GYN', color: 'teal' },
  { id: 'p2', name: 'Dr. Serge Ondoa', role: 'Médecine générale', roleEn: 'General practitioner', color: 'indigo' },
  { id: 'p3', name: 'Clarisse Mengue', role: 'Sage-femme', roleEn: 'Midwife', color: 'coral' },
]

export const services: DemoService[] = [
  { id: 's1', name: 'Consultation générale', nameEn: 'General consultation', duration: 30, price: 15_000, category: 'Consultation' },
  { id: 's2', name: 'Consultation gynécologique', nameEn: 'Gynaecology consultation', duration: 45, price: 25_000, category: 'Consultation', bufferAfter: 15 },
  { id: 's3', name: 'Suivi de grossesse', nameEn: 'Pregnancy follow-up', duration: 30, price: 20_000, category: 'Consultation' },
  { id: 's4', name: 'Dépistage IST', nameEn: 'STI screening', duration: 20, price: 12_000, category: 'Soin' },
  { id: 's5', name: 'Pansement & soin', nameEn: 'Dressing & care', duration: 25, price: 8_000, category: 'Soin' },
]

/** Semaine-type : 5 jours, du lundi au samedi. */
const weekTemplate: Omit<DemoEvent, 'id'>[] = [
  { dayOffset: 0, start: '08:00', duration: 30, patient: 'Aminatou D.', service: 'Consultation générale', practitionerId: 'p1', status: 'checked-in', color: 'teal', paid: true },
  { dayOffset: 0, start: '08:45', duration: 45, patient: 'Rose M.', service: 'Consultation gynécologique', practitionerId: 'p1', status: 'confirmed', color: 'teal' },
  { dayOffset: 0, start: '10:00', duration: 30, patient: 'Josiane T.', service: 'Suivi de grossesse', practitionerId: 'p1', status: 'confirmed', color: 'teal' },
  { dayOffset: 0, start: '11:00', duration: 20, patient: 'Blaise N.', service: 'Dépistage IST', practitionerId: 'p1', status: 'pending', color: 'teal' },
  { dayOffset: 0, start: '09:00', duration: 30, patient: 'Chantal E.', service: 'Consultation générale', practitionerId: 'p2', status: 'checked-in', color: 'indigo', paid: true },
  { dayOffset: 0, start: '10:00', duration: 25, patient: 'Yves A.', service: 'Pansement & soin', practitionerId: 'p2', status: 'confirmed', color: 'indigo' },
  { dayOffset: 0, start: '14:00', duration: 30, patient: 'Marthe K.', service: 'Suivi de grossesse', practitionerId: 'p3', status: 'confirmed', color: 'coral' },
  { dayOffset: 0, start: '15:00', duration: 20, patient: 'Nadège B.', service: 'Dépistage IST', practitionerId: 'p3', status: 'confirmed', color: 'coral' },

  { dayOffset: 1, start: '08:30', duration: 45, patient: 'Sylvie M.', service: 'Consultation gynécologique', practitionerId: 'p1', status: 'confirmed', color: 'teal' },
  { dayOffset: 1, start: '09:30', duration: 30, patient: 'Irène L.', service: 'Consultation générale', practitionerId: 'p1', status: 'confirmed', color: 'teal' },
  { dayOffset: 1, start: '11:00', duration: 20, patient: 'Patrick D.', service: 'Dépistage IST', practitionerId: 'p1', status: 'pending', color: 'teal' },
  { dayOffset: 1, start: '10:00', duration: 30, patient: 'Gérard O.', service: 'Consultation générale', practitionerId: 'p2', status: 'checked-in', color: 'indigo', paid: true },
  { dayOffset: 1, start: '14:30', duration: 25, patient: 'Laure P.', service: 'Pansement & soin', practitionerId: 'p2', status: 'confirmed', color: 'indigo' },
  { dayOffset: 1, start: '15:00', duration: 30, patient: 'Sandrine E.', service: 'Suivi de grossesse', practitionerId: 'p3', status: 'confirmed', color: 'coral' },

  { dayOffset: 2, start: '08:00', duration: 30, patient: 'Aïcha B.', service: 'Consultation générale', practitionerId: 'p1', status: 'confirmed', color: 'teal' },
  { dayOffset: 2, start: '09:00', duration: 45, patient: 'Estelle N.', service: 'Consultation gynécologique', practitionerId: 'p1', status: 'confirmed', color: 'teal' },
  { dayOffset: 2, start: '10:15', duration: 20, patient: 'Hôtel Trade', service: 'Dépistage IST', practitionerId: 'p1', status: 'confirmed', color: 'teal' },
  { dayOffset: 2, start: '09:30', duration: 30, patient: 'Bertrand M.', service: 'Consultation générale', practitionerId: 'p2', status: 'checked-in', color: 'indigo', paid: true },
  { dayOffset: 2, start: '11:00', duration: 30, patient: 'Clarisse T.', service: 'Suivi de grossesse', practitionerId: 'p2', status: 'confirmed', color: 'indigo' },
  { dayOffset: 2, start: '14:00', duration: 20, patient: 'Nadine S.', service: 'Dépistage IST', practitionerId: 'p3', status: 'pending', color: 'coral' },
  { dayOffset: 2, start: '15:00', duration: 25, patient: 'Pauline Z.', service: 'Pansement & soin', practitionerId: 'p3', status: 'confirmed', color: 'coral' },

  { dayOffset: 3, start: '08:30', duration: 30, patient: 'Rodrigue K.', service: 'Consultation générale', practitionerId: 'p1', status: 'confirmed', color: 'teal' },
  { dayOffset: 3, start: '09:15', duration: 45, patient: 'Vanille J.', service: 'Consultation gynécologique', practitionerId: 'p1', status: 'confirmed', color: 'teal' },
  { dayOffset: 3, start: '10:30', duration: 20, patient: 'Serge B.', service: 'Dépistage IST', practitionerId: 'p1', status: 'confirmed', color: 'teal' },
  { dayOffset: 3, start: '09:00', duration: 30, patient: 'Odile F.', service: 'Consultation générale', practitionerId: 'p2', status: 'checked-in', color: 'indigo', paid: true },
  { dayOffset: 3, start: '13:30', duration: 30, patient: 'Carine W.', service: 'Suivi de grossesse', practitionerId: 'p3', status: 'confirmed', color: 'coral' },
  { dayOffset: 3, start: '16:00', duration: 25, patient: 'Michel Q.', service: 'Pansement & soin', practitionerId: 'p3', status: 'pending', color: 'coral' },

  { dayOffset: 4, start: '08:00', duration: 30, patient: 'Solange R.', service: 'Consultation générale', practitionerId: 'p1', status: 'confirmed', color: 'teal' },
  { dayOffset: 4, start: '09:00', duration: 45, patient: 'Denise A.', service: 'Consultation gynécologique', practitionerId: 'p1', status: 'checked-in', color: 'teal', paid: true },
  { dayOffset: 4, start: '10:15', duration: 20, patient: 'Landry C.', service: 'Dépistage IST', practitionerId: 'p1', status: 'confirmed', color: 'teal' },
  { dayOffset: 4, start: '10:00', duration: 30, patient: 'Alice M.', service: 'Consultation générale', practitionerId: 'p2', status: 'confirmed', color: 'indigo' },
  { dayOffset: 4, start: '15:00', duration: 30, patient: 'Nadege Y.', service: 'Suivi de grossesse', practitionerId: 'p3', status: 'confirmed', color: 'coral' },

  { dayOffset: 5, start: '09:00', duration: 45, patient: 'Rachelle T.', service: 'Consultation gynécologique', practitionerId: 'p1', status: 'confirmed', color: 'teal' },
  { dayOffset: 5, start: '10:00', duration: 30, patient: 'Yannick P.', service: 'Consultation générale', practitionerId: 'p2', status: 'checked-in', color: 'indigo', paid: true },
  { dayOffset: 5, start: '11:00', duration: 20, patient: 'Fanta D.', service: 'Dépistage IST', practitionerId: 'p3', status: 'confirmed', color: 'coral' },
]

export const weekEvents: DemoEvent[] = weekTemplate.map((event, index) => ({
  ...event,
  id: `evt_${index}`,
}))

/** Créneaux du jour (échelle 08:00 → 17:00, pas de 30 min). */
export const daySlots: { time: string; hour: number; minute: number }[] = Array.from({ length: 19 }, (_, i) => {
  const total = 8 * 60 + i * 30
  return {
    time: `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`,
    hour: Math.floor(total / 60),
    minute: total % 60,
  }
})

/** Date de référence du premier jour affiché dans la démo. */
export function demoWeekStart(): Date {
  return startOfDay(addDays(new Date(), 0))
}

export interface BookingService {
  id: string
  name: string
  nameEn: string
  duration: number
  price: number
}

export interface BookingSlot {
  time: string
  available: boolean
}

export const bookingDemo = {
  salon: {
    name: 'Salon Émeraude',
    city: 'Yaoundé',
    tagline: 'Salon de coiffure & beauté',
  },
  services: [
    { id: 'b1', name: 'Coupe femme', nameEn: 'Women’s cut', duration: 45, price: 15_000 },
    { id: 'b2', name: 'Brushing + soin', nameEn: 'Blow-dry + treatment', duration: 60, price: 18_000 },
    { id: 'b3', name: 'Tresses /locks', nameEn: 'Braids / locks', duration: 120, price: 35_000 },
    { id: 'b4', name: 'Manucure', nameEn: 'Manicure', duration: 30, price: 8_000 },
  ] satisfies BookingService[],
  practitioners: [
    { id: 'pb1', name: 'Samuel Tchoumi', role: 'Coiffeur senior' },
    { id: 'pb2', name: 'Yasmine D.', role: 'Coloriste' },
    { id: 'pb3', name: 'Peu importe', role: 'First available' },
  ],
  slots: [
    { time: '09:00', available: true },
    { time: '09:30', available: true },
    { time: '10:00', available: false },
    { time: '10:30', available: true },
    { time: '11:00', available: true },
    { time: '11:30', available: false },
    { time: '12:00', available: true },
    { time: '14:00', available: true },
    { time: '14:30', available: true },
    { time: '15:00', available: true },
    { time: '15:30', available: false },
    { time: '16:00', available: true },
    { time: '16:30', available: true },
  ] satisfies BookingSlot[],
}

export const paymentDemo = {
  amount: 10_000,
  label: 'Acompte · Coupe femme',
  operators: [
    { id: 'mtn', name: 'MTN MoMo', color: 'gold' as EventColor, number: '6 77 43 12 08' },
    { id: 'orange', name: 'Orange Money', color: 'accent' as EventColor, number: '6 55 90 21 34' },
  ],
  reference: 'RDP-4K82-1B',
}

/** Chiffres clefs affichés en bandeau (données de démonstration). */
export const kpis = {
  monthlyRevenue: 4_850_000,
  revenueDelta: 18,
  fillRate: 0.82,
  noShowRate: 0.07,
  appointmentsToday: 24,
  sparkline: [18, 26, 21, 32, 28, 41, 36, 48, 44, 57, 52, 63],
}
