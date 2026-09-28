import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react'

import { useI18n } from '../../i18n/I18nProvider'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'

export function CtaSection() {
  const { m, locale } = useI18n()

  return (
    <section className="container-page py-16 sm:py-24">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-3xl bg-brand px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-active to-[#083c39]" />
            <div className="absolute -top-24 -right-16 size-72 rounded-full bg-accent/25 blur-3xl" />
            <div className="absolute -bottom-24 -left-16 size-72 rounded-full bg-gold/20 blur-3xl" />
            <div className="absolute inset-0 bg-dots opacity-30" />
          </div>

          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold text-balance text-white sm:text-4xl lg:text-[2.75rem]">
              {m.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-relaxed text-pretty text-white/85 sm:text-lg">
              {m.cta.subtitle}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                to="/inscription"
                size="lg"
                variant="accent"
                className="group w-full shadow-lift sm:w-auto"
              >
                {m.cta.primary}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </ButtonLink>
              <a
                href="https://wa.me/237699123456?text=Bonjour%20RDVPro%2C%20je%20souhaite%20une%20d%C3%A9mo"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/20 sm:w-auto"
              >
                <MessageCircle className="size-4.5" />
                {m.cta.secondary}
              </a>
            </div>

            <p className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-semibold text-white/70">
              <ShieldCheck className="size-4" />
              {locale === 'fr' ? m.cta.reassurance : m.pricing.trialHint}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
