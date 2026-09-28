import { MessageCircle, Quote, Star } from 'lucide-react'

import { useI18n } from '../../i18n/I18nProvider'
import { testimonials } from '../../data/testimonials'
import { cn } from '../../lib/utils'
import { Avatar } from '../ui/Avatar'
import { Card } from '../ui/Card'
import { Section, SectionHeading } from '../ui/Section'
import { StaggerGroup, StaggerItem } from '../ui/Reveal'

const ACCENTS = {
  teal: 'from-brand/12 to-brand/0 text-brand',
  coral: 'from-accent/12 to-accent/0 text-accent',
  gold: 'from-gold/18 to-gold/0 text-gold',
  indigo: 'from-indigo-500/12 to-indigo-500/0 text-indigo-500',
}

export function TestimonialsSection() {
  const { m, locale } = useI18n()

  return (
    <Section id="temoignages" background="none">
      <SectionHeading
        eyebrow={m.testimonials.eyebrow}
        title={m.testimonials.title}
        subtitle={m.testimonials.subtitle}
      />

      <StaggerGroup className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-2" as="div">
        {testimonials.map((testimonial, index) => {
          const featured = index === 0
          return (
            <StaggerItem key={testimonial.name} className="h-full">
              <Card
                padding="lg"
                hover="lift"
                className={cn('relative h-full overflow-hidden', featured && 'lg:col-span-1')}
              >
                <div
                  aria-hidden
                  className={cn(
                    'absolute -top-12 -right-10 size-36 rounded-full bg-gradient-to-br blur-2xl',
                    ACCENTS[testimonial.accent as keyof typeof ACCENTS],
                  )}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} className="size-3.5 fill-gold text-gold" aria-hidden />
                    ))}
                  </div>
                  <Quote className="size-6 shrink-0 text-line-strong" aria-hidden />
                </div>

                <blockquote className="relative mt-4 text-[15px] leading-relaxed text-pretty text-ink-muted">
                  « {locale === 'fr' ? testimonial.quote.fr : testimonial.quote.en} »
                </blockquote>

                <div className="relative mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
                  <Avatar name={testimonial.name} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-bold text-ink">{testimonial.name}</p>
                    <p className="truncate text-[12px] text-ink-muted">
                      {locale === 'fr' ? testimonial.role.fr : testimonial.role.en}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 truncate text-[12px] font-semibold text-brand">
                      <MessageCircle className="size-3" />
                      {testimonial.business} · {locale === 'fr' ? testimonial.city.fr : testimonial.city.en}
                    </p>
                  </div>
                  <div className="rounded-xl bg-surface-2 px-3 py-2 text-right">
                    <p className="text-[15px] font-extrabold text-brand tabular-nums">{testimonial.metric.value}</p>
                    <p className="text-[10.5px] leading-tight text-ink-muted">
                      {locale === 'fr' ? testimonial.metric.label.fr : testimonial.metric.label.en}
                    </p>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          )
        })}
      </StaggerGroup>
    </Section>
  )
}
