import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useI18n } from '../../i18n/I18nProvider'
import { formatCMPhone, inspectPhone } from '../../lib/phone'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { useToast } from '../ui/Toast'

interface FooterColumn {
  title: string
  links: { label: string; to?: string; soon?: boolean }[]
}

export function Footer() {
  const { m } = useI18n()
  const toast = useToast()
  const [year] = useState(() => new Date().getFullYear())
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)

  const columns: FooterColumn[] = [
    {
      title: m.footer.product,
      links: [
        { label: m.nav.features, to: '/#fonctionnalites' },
        { label: m.nav.pricing, to: '/tarifs' },
        { label: ' Démo interactive', to: '/#demo' },
        { label: 'Application mobile (PWA)', soon: true },
      ],
    },
    {
      title: m.footer.company,
      links: [
        { label: 'À propos', soon: true },
        { label: 'Partenaires', soon: true },
        { label: 'Recrutement', soon: true },
        { label: m.footer.contactTitle, to: '/#contact' },
      ],
    },
    {
      title: m.footer.resources,
      links: [
        { label: 'Centre d’aide', soon: true },
        { label: 'Guide de la réservation en ligne', soon: true },
        { label: 'Tarifs Mobile Money', soon: true },
        { label: 'Statut de la plateforme', soon: true },
      ],
    },
    {
      title: m.footer.legal,
      links: [
        { label: 'Conditions générales', soon: true },
        { label: 'Politique de confidentialité', soon: true },
        { label: 'Protection des données de santé', soon: true },
        { label: 'Mentions légales', soon: true },
      ],
    },
  ]

  const submitNewsletter = (event: React.FormEvent) => {
    event.preventDefault()
    const issue = inspectPhone(phone)
    if (issue) {
      setError(issue === 'empty' ? 'Merci de saisir votre numéro.' : 'Numéro camerounais invalide (9 chiffres, commençant par 6).')
      return
    }
    setError(null)
    setPhone('')
    toast.success('Inscription confirmée', `Le brief mensuel arrivera au ${formatCMPhone(phone)}.`)
  }

  return (
    <footer className="relative mt-20 border-t border-line bg-background-soft">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
          <div>
            <Logo size={36} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">{m.brand.tagline}.</p>

            <form onSubmit={submitNewsletter} className="mt-6 max-w-sm" noValidate>
              <p className="text-sm font-semibold text-ink">{m.footer.newsletterTitle}</p>
              <p className="mt-1 text-[13px] text-ink-muted">{m.footer.newsletterText}</p>
              <div className="mt-3 flex gap-2">
                <label className="sr-only" htmlFor="footer-phone">
                  {m.footer.newsletterPlaceholder}
                </label>
                <input
                  id="footer-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder={m.footer.newsletterPlaceholder}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'footer-phone-error' : undefined}
                  className={cn(
                    'h-11 w-full rounded-xl border bg-surface px-3.5 text-sm text-ink transition-colors placeholder:text-ink-subtle',
                    error ? 'border-danger' : 'border-line focus:border-brand',
                  )}
                />
                <Button type="submit" size="md" className="shrink-0">
                  {m.footer.newsletterCta}
                </Button>
              </div>
              {error && (
                <p id="footer-phone-error" role="alert" className="mt-2 text-[12px] font-medium text-danger">
                  {error}
                </p>
              )}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[13px] font-bold tracking-wide text-ink uppercase">{column.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link
                          to={link.to}
                          className="text-[13.5px] text-ink-muted transition-colors hover:text-brand"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            toast.info('Bientôt disponible', `${link.label} — livraison dans une prochaine phase.`)
                          }
                          className="text-left text-[13.5px] text-ink-muted transition-colors hover:text-ink"
                        >
                          {link.label}
                          <span className="ml-1.5 inline-block size-1.5 rounded-full bg-gold align-middle" aria-hidden />
                          <span className="sr-only"> (bientôt disponible)</span>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div id="contact" className="mt-12 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand">
              <MapPin className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink">{m.footer.contactTitle}</p>
              <p className="text-[13px] text-ink-muted">{m.footer.contactText}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://wa.me/237699123456"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-surface-2 px-3.5 text-[13px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <MessageCircle className="size-4 text-success" />
              WhatsApp
            </a>
            <a
              href="mailto:bonjour@rdvpro.cm"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-surface-2 px-3.5 text-[13px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <Mail className="size-4" />
              bonjour@rdvpro.cm
            </a>
            <a
              href="tel:+237699123456"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-surface-2 px-3.5 text-[13px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <Phone className="size-4" />
              {formatCMPhone('+237699123456')}
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[12.5px] text-ink-subtle sm:flex-row">
          <p>
            © {year} {m.brand.name}. {m.footer.rights}
          </p>
          <p>{m.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  )
}
