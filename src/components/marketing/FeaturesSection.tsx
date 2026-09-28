import { BarChart3, BellRing, CreditCard, Palette, Sparkles, UsersRound } from 'lucide-react'

import { useI18n } from '../../i18n/I18nProvider'
import { Section, SectionHeading } from '../ui/Section'
import { StaggerGroup, StaggerItem } from '../ui/Reveal'

export function FeaturesSection() {
  const { m } = useI18n()

  const features = [
    { icon: BellRing, ...m.features.reminders, accent: 'from-brand/15 to-brand/5 text-brand' },
    { icon: CreditCard, ...m.features.payments, accent: 'from-accent/15 to-accent/5 text-accent' },
    { icon: BarChart3, ...m.features.stats, accent: 'from-gold/20 to-gold/5 text-gold' },
    { icon: UsersRound, ...m.features.crm, accent: 'from-indigo-500/15 to-indigo-500/5 text-indigo-500' },
    { icon: Sparkles, ...m.features.agenda, accent: 'from-emerald-500/15 to-emerald-500/5 text-emerald-500' },
    { icon: Palette, ...m.features.branding, accent: 'from-fuchsia-500/15 to-fuchsia-500/5 text-fuchsia-500' },
  ]

  return (
    <Section id="fonctionnalites" background="none">
      <SectionHeading eyebrow={m.features.eyebrow} title={m.features.title} subtitle={m.features.subtitle} />

      <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5" as="div">
        {features.map((feature) => (
          <StaggerItem key={feature.title}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-brand/35 hover:shadow-lift">
              <div
                aria-hidden
                className="absolute -right-10 -top-10 size-28 rounded-full bg-brand/12 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />
              <span
                className={`relative grid size-11 place-items-center rounded-xl bg-gradient-to-br ${feature.accent}`}
              >
                <feature.icon className="size-5" strokeWidth={2} />
              </span>
              <h3 className="relative mt-4 text-[16.5px] font-bold text-ink">{feature.title}</h3>
              <p className="relative mt-2 text-[14.5px] leading-relaxed text-ink-muted">{feature.description}</p>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  )
}
