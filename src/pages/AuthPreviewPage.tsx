import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, KeyRound, Lock, Mail, Phone, ShieldCheck, Sparkles, UserRound } from 'lucide-react'

import { useI18n } from '../i18n/I18nProvider'
import { inspectPhone } from '../lib/phone'
import { Badge } from '../components/ui/Badge'
import { Button, ButtonLink } from '../components/ui/Button'
import { TextField } from '../components/ui/Input'
import { Reveal } from '../components/ui/Reveal'
import { plans } from '../data/pricing'

/**
 * Aperçu des écrans d'authentification (Phase 2).
 * Le formulaire est présenté comme maquette : la soumission est désactivée et
 * explique honnêtement ce qui arrive à la prochaine phase.
 */
export function AuthPreviewPage({ mode }: { mode: 'signup' | 'login' }) {
  const { m, locale, fcfa } = useI18n()
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState<string | null>(null)
  const [planId] = useState('pro')

  const isSignup = mode === 'signup'
  const plan = plans.find((item) => item.id === planId)!

  const validatePhone = (value: string) => {
    const issue = inspectPhone(value)
    setPhoneError(
      issue === 'tooShort'
        ? locale === 'fr'
          ? 'Le numéro doit contenir 9 chiffres.'
          : 'The number must contain 9 digits.'
        : issue
          ? locale === 'fr'
            ? 'Numéro camerounais invalide (ex. : 6 90 12 34 56).'
            : 'Invalid Cameroonian number (e.g. 6 90 12 34 56).'
          : null,
    )
  }

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute -top-24 -left-24 size-[28rem] rounded-full bg-brand/16 blur-[100px]" />
        <div className="absolute -right-24 -bottom-24 size-[24rem] rounded-full bg-accent/14 blur-[100px]" />
      </div>

      <div className="container-page">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          {/* Formulaire */}
          <Reveal>
            <div className="surface-card rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
                  {isSignup ? <Sparkles className="size-5" /> : <Lock className="size-5" />}
                </span>
                <div>
                  <h1 className="text-xl font-extrabold text-ink">
                    {isSignup ? (locale === 'fr' ? 'Créer mon établissement' : 'Create my business') : m.nav.login}
                  </h1>
                  <p className="text-[13px] text-ink-muted">
                    {isSignup
                      ? locale === 'fr'
                        ? 'Essai gratuit 14 jours · aucune carte bancaire'
                        : '14-day free trial · no credit card'
                      : locale === 'fr'
                        ? 'Espace gérant, praticien et réception'
                        : 'Manager, practitioner and front desk area'}
                  </p>
                </div>
              </div>

              <Badge tone="gold" className="mt-5">
                {locale === 'fr' ? 'Aperçu — Phase 2' : 'Preview — Phase 2'}
              </Badge>

              <form
                className="mt-5 space-y-4"
                noValidate
                onSubmit={(event) => {
                  event.preventDefault()
                  validatePhone(phone)
                }}
              >
                {isSignup && (
                  <TextField
                    label={locale === 'fr' ? 'Nom de l’établissement' : 'Business name'}
                    placeholder="Clinique Akwa Santé"
                    icon={<Building2 className="size-4" />}
                    autoComplete="organization"
                  />
                )}

                <TextField
                  label={locale === 'fr' ? 'Email professionnel' : 'Work email'}
                  type="email"
                  placeholder="contact@etablissement.cm"
                  icon={<Mail className="size-4" />}
                  autoComplete="email"
                />

                <TextField
                  label={locale === 'fr' ? 'Téléphone (+237)' : 'Phone (+237)'}
                  type="tel"
                  inputMode="tel"
                  placeholder="6 90 12 34 56"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value)
                    validatePhone(event.target.value)
                  }}
                  error={phoneError ?? undefined}
                  icon={<Phone className="size-4" />}
                  autoComplete="tel"
                  hint={locale === 'fr' ? 'Vous recevrez les rappels de rendez-vous sur ce numéro.' : 'Appointment reminders will be sent to this number.'}
                />

                {isSignup && (
                  <TextField
                    label={locale === 'fr' ? 'Mot de passe' : 'Password'}
                    type="password"
                    placeholder="••••••••"
                    icon={<KeyRound className="size-4" />}
                    autoComplete="new-password"
                    hint={locale === 'fr' ? '8 caractères minimum' : '8 characters minimum'}
                  />
                )}

                <Button type="submit" size="lg" fullWidth className="group">
                  {isSignup ? m.hero.ctaPrimary : m.nav.login}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </form>

              <p className="mt-4 text-center text-[12.5px] text-ink-muted">
                {isSignup ? (
                  <>
                    {locale === 'fr' ? 'Déjà un compte ?' : 'Already have an account?'}{' '}
                    <Link to="/connexion" className="font-semibold text-brand hover:underline">
                      {m.nav.login}
                    </Link>
                  </>
                ) : (
                  <>
                    {locale === 'fr' ? 'Pas encore de compte ?' : 'No account yet?'}{' '}
                    <Link to="/inscription" className="font-semibold text-brand hover:underline">
                      {m.nav.startTrial}
                    </Link>
                  </>
                )}
              </p>
            </div>
          </Reveal>

          {/* Bandeau latéral */}
          <Reveal delay={0.08} className="flex flex-col gap-4">
            <div className="rounded-3xl border border-line bg-surface p-6">
              <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-ink">
                <UserRound className="size-4.5 text-brand" />
                {locale === 'fr' ? 'Ce qui arrive en Phase 2' : 'What arrives in Phase 2'}
              </h2>
              <ul className="mt-4 space-y-3 text-[13.5px] leading-relaxed text-ink-muted">
                {[
                  locale === 'fr'
                    ? 'Inscription par email, Google ou code OTP envoyé par SMS.'
                    : 'Sign-up by email, Google, or an SMS OTP code.',
                  locale === 'fr'
                    ? 'Rôles Super Admin, gérant, praticien et réceptionniste, appliqués côté Firestore.'
                    : 'Super Admin, manager, practitioner and front-desk roles, enforced in Firestore rules.',
                  locale === 'fr'
                    ? 'Onboarding guidé de 5 minutes, import des services et des horaires.'
                    : 'Guided 5-minute onboarding, service and opening-hours import.',
                  locale === 'fr'
                    ? 'Chaque utilisateur est rattaché à un établissement (tenantId) : aucune fuite entre cabinets.'
                    : 'Every user is attached to a business (tenantId): no data leaking between practices.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-line bg-surface p-6">
              <p className="text-[12px] font-bold tracking-wide text-ink-muted uppercase">
                {locale === 'fr' ? 'Plan par défaut' : 'Default plan'}
              </p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                  <p className="text-lg font-extrabold text-ink">{plan.name}</p>
                  <p className="text-[12.5px] text-ink-muted">
                    {locale === 'fr' ? '14 jours offerts' : '14 days free'}
                  </p>
                </div>
                <p className="text-right text-xl font-extrabold text-brand tabular-nums">
                  {fcfa(plan.monthly ?? 0)}
                  <span className="text-[12px] font-semibold text-ink-muted">/{locale === 'fr' ? 'mois' : 'mo'}</span>
                </p>
              </div>
              <ButtonLink to="/tarifs" variant="secondary" size="sm" className="mt-4 w-full group">
                {locale === 'fr' ? 'Comparer les plans' : 'Compare plans'}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </ButtonLink>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-success/25 bg-success-soft p-4">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-success" />
              <p className="text-[12.5px] leading-relaxed text-success">
                {locale === 'fr'
                  ? 'Aucun mot de passe ni secret de paiement n’est stocké en clair côté client : l’authentification passe par Firebase et les paiements par notre serveur.'
                  : 'No password or payment secret is stored in clear on the client: authentication goes through Firebase and payments through our server.'}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
