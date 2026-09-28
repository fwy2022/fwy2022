import { ArrowRight, MessageCircle } from 'lucide-react'

import { useI18n } from '../../i18n/I18nProvider'
import { faqs } from '../../data/faq'
import { Accordion, type AccordionItemData } from '../ui/Accordion'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

export function FaqSection() {
  const { m, locale } = useI18n()

  const items: AccordionItemData[] = faqs.map((item, index) => ({
    id: `faq-${index}`,
    question: locale === 'fr' ? item.question.fr : item.question.en,
    answer: locale === 'fr' ? item.answer.fr : item.answer.en,
  }))

  return (
    <Section id="faq" background="soft" className="border-y border-line">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-bold tracking-wide text-brand uppercase">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden />
            {m.faq.eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-balance text-ink sm:text-4xl">{m.faq.title}</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-muted">{m.faq.subtitle}</p>

          <div className="mt-7 rounded-2xl border border-line bg-surface p-5 shadow-soft">
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-success-soft text-success">
                <MessageCircle className="size-5" />
              </span>
              <div>
                <p className="text-[14.5px] font-bold text-ink">
                  {locale === 'fr' ? 'Réponse en moins d’une heure' : 'Answer within the hour'}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">
                  {locale === 'fr'
                    ? 'Notre équipe est joignable sur WhatsApp du lundi au samedi, de 8h à 20h (heure de Douala).'
                    : 'Our team is on WhatsApp Monday to Saturday, 8am to 8pm (Douala time).'}
                </p>
              </div>
            </div>
            <ButtonLink to="/tarifs" variant="secondary" size="sm" className="mt-4 group w-full">
              {locale === 'fr' ? 'Voir les tarifs' : 'See pricing'}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Accordion items={items} defaultOpenId="faq-0" />
        </Reveal>
      </div>
    </Section>
  )
}
