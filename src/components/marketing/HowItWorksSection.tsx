import { Link2, Rocket, UserPlus, Wallet } from 'lucide-react'

import { useI18n } from '../../i18n/I18nProvider'
import { Section, SectionHeading } from '../ui/Section'
import { StaggerGroup, StaggerItem } from '../ui/Reveal'
import { cn } from '../../lib/utils'

const ICONS = [Link2, UserPlus, Rocket, Wallet]

export function HowItWorksSection() {
  const { m } = useI18n()
  const steps = m.how.steps

  return (
    <Section id="fonctionnement" background="soft" className="border-y border-line">
      <SectionHeading eyebrow={m.how.eyebrow} title={m.how.title} subtitle={m.how.subtitle} />

      <div className="relative mt-14">
        {/* Ligne de liaison (desktop) */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent lg:block"
        />

        <StaggerGroup as="ol" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => {
            const Icon = ICONS[index]
            return (
              <StaggerItem as="li" key={step.title} className="relative">
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="relative">
                    <span
                      className={cn(
                        'grid size-12 place-items-center rounded-2xl border border-line bg-surface shadow-soft transition-colors duration-200',
                        'text-brand hover:border-brand/40',
                      )}
                    >
                      <Icon className="size-5.5" strokeWidth={2} />
                    </span>
                    <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-brand text-[11px] font-extrabold text-on-brand shadow-soft">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[16px] font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-[14.5px] leading-relaxed text-ink-muted">{step.description}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </Section>
  )
}
