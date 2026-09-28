import { Compass, Home } from 'lucide-react'

import { useI18n } from '../i18n/I18nProvider'
import { ButtonLink } from '../components/ui/Button'
import { Logo } from '../components/ui/Logo'

export function NotFoundPage() {
  const { locale } = useI18n()

  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
      <Logo size={44} />
      <p className="mt-8 text-[5rem] leading-none font-extrabold text-line-strong tabular-nums">404</p>
      <h1 className="mt-4 text-2xl font-extrabold text-ink sm:text-3xl">
        {locale === 'fr' ? 'Cette page a pris un rendez-vous ailleurs' : 'This page booked itself elsewhere'}
      </h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
        {locale === 'fr'
          ? 'Le lien que vous avez suivi ne mène nulle part. Revenez à l’accueil ou consultez nos tarifs.'
          : 'The link you followed does not lead anywhere. Head back home or check our pricing.'}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink to="/" size="lg" className="group">
          <Home className="size-4" />
          {locale === 'fr' ? 'Retour à l’accueil' : 'Back home'}
        </ButtonLink>
        <ButtonLink to="/tarifs" variant="secondary" size="lg" className="group">
          <Compass className="size-4" />
          {locale === 'fr' ? 'Voir les tarifs' : 'See pricing'}
        </ButtonLink>
      </div>
    </section>
  )
}
