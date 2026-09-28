import { ArrowRight, CreditCard, MessageCircle, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useI18n } from '../i18n/I18nProvider'
import { faqs } from '../data/faq'
import { Accordion, type AccordionItemData } from '../components/ui/Accordion'
import { Badge } from '../components/ui/Badge'
import { Reveal } from '../components/ui/Reveal'
import { Section } from '../components/ui/Section'
import { CtaSection } from '../components/marketing/CtaSection'
import { PricingSection } from '../components/marketing/PricingSection'

export function PricingPage() {
  const { m, locale } = useI18n()

  const items: AccordionItemData[] = faqs.map((item, index) => ({
    id: `pricing-faq-${index}`,
    question: locale === 'fr' ? item.question.fr : item.question.en,
    answer: locale === 'fr' ? item.answer.fr : item.answer.en,
  }))

  return (
    <>
      {/* En-tête de page */}
      <section className="relative isolate overflow-hidden pt-28 pb-6 sm:pt-36 sm:pb-10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute -top-32 left-1/3 size-[26rem] rounded-full bg-brand/16 blur-[100px]" />
        </div>

        <div className="container-page text-center">
          <Reveal>
            <Badge tone="brand" size="sm">
              {m.pricing.eyebrow}
            </Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold text-balance text-ink sm:text-5xl">
              {locale === 'fr'
                ? 'Le prix d’un café, par jour, pour un agenda plein'
                : 'The price of a coffee, per day, for a full calendar'}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-[15.5px] leading-relaxed text-pretty text-ink-muted sm:text-lg">
              {m.pricing.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[12.5px] font-semibold text-ink-muted">
                <CreditCard className="size-4 text-brand" />
                MTN MoMo · Orange Money
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[12.5px] font-semibold text-ink-muted">
                <ShieldCheck className="size-4 text-success" />
                {locale === 'fr' ? 'Sans engagement' : 'No commitment'}
              </span>
              <Link
                to="/#fonctionnement"
                className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[12.5px] font-semibold text-ink-muted transition-colors hover:text-brand"
              >
                {locale === 'fr' ? 'Voir la mise en service' : 'See the setup'}
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <PricingSection variant="full" />

      <Section spacing="sm">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-xl font-extrabold text-ink sm:text-2xl">{m.faq.title}</h2>
          <p className="mt-2 text-center text-[14px] text-ink-muted">{m.faq.subtitle}</p>
          <Accordion className="mt-6" items={items} defaultOpenId="pricing-faq-0" />
          <div className="mt-6 flex justify-center">
            <a
              href="https://wa.me/237699123456?text=Bonjour%20RDVPro%2C%20j%27ai%20une%20question%20sur%20les%20tarifs"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-surface px-4 text-[13.5px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              <MessageCircle className="size-4 text-success" />
              {locale === 'fr' ? 'Poser ma question sur WhatsApp' : 'Ask me on WhatsApp'}
            </a>
          </div>
        </div>
      </Section>

      <CtaSection />
    </>
  )
}
