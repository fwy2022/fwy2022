import { Building2, HeartPulse, Scissors, Sparkles, Stethoscope } from 'lucide-react'

import { useI18n } from '../../i18n/I18nProvider'
import { clientLogos } from '../../data/testimonials'
import { Reveal } from '../ui/Reveal'

const ICONS = {
  clinic: Stethoscope,
  salon: Scissors,
  beauty: Sparkles,
  spa: HeartPulse,
  medical: Building2,
}

/** Bandeau de confiance : les établissements types qui utilisent RDVPro. */
export function LogoStrip() {
  const { m } = useI18n()

  return (
    <section aria-label={m.logos.title} className="border-y border-line bg-surface/60 py-8">
      <div className="container-page">
        <p className="text-center text-[12px] font-semibold tracking-wide text-ink-subtle uppercase">
          {m.logos.title}
        </p>
        <Reveal>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-8">
            {clientLogos.map((logo) => {
              const Icon = ICONS[logo.kind]
              return (
                <li
                  key={logo.name}
                  className="flex items-center justify-center gap-2 text-center text-[12.5px] font-bold text-ink-muted/85 transition-colors duration-200 hover:text-ink"
                >
                  <Icon className="size-4 shrink-0 text-brand/70" aria-hidden />
                  <span className="truncate">{logo.name}</span>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
