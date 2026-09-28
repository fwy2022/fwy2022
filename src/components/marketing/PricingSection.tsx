import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, HelpCircle, Minus, Sparkles, X } from 'lucide-react'
import { Fragment, useState } from 'react'

import { useI18n } from '../../i18n/I18nProvider'
import { comparison, localize, plans, yearlyPrice, type Plan, type PlanId } from '../../data/pricing'
import { formatFCFA } from '../../lib/format'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'
import { ButtonLink } from '../ui/Button'
import { Card } from '../ui/Card'
import { Section, SectionHeading } from '../ui/Section'
import { Reveal, StaggerGroup, StaggerItem } from '../ui/Reveal'
import { Accordion, type AccordionItemData } from '../ui/Accordion'
import { billingFaqs } from '../../data/faq'

type Period = 'monthly' | 'yearly'

/** Bascule Mensuel / Annuel avec l economies annuelle affichée. */
export function BillingToggle({ period, onChange }: { period: Period; onChange: (period: Period) => void }) {
  const { m } = useI18n()
  const reduceMotion = useReducedMotion()

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="radiogroup"
        aria-label={m.pricing.monthly}
        className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-2 p-1"
      >
        {(['monthly', 'yearly'] as Period[]).map((value) => {
          const isActive = period === value
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(value)}
              className={cn(
                'relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200',
                isActive ? 'text-on-brand' : 'text-ink-muted hover:text-ink',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-full bg-brand"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{value === 'monthly' ? m.pricing.monthly : m.pricing.yearly}</span>
              {value === 'yearly' && (
                <span
                  className={cn(
                    'relative z-10 rounded-full px-1.5 py-0.5 text-[10.5px] font-extrabold',
                    isActive ? 'bg-on-brand/20 text-on-brand' : 'bg-gold-soft text-gold',
                  )}
                >
                  {m.pricing.yearlyDiscount}
                </span>
              )}
            </button>
          )
        })}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={period}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="text-[12.5px] font-semibold text-ink-muted"
        >
          {period === 'yearly' ? m.pricing.yearlyHint : m.pricing.billedMonthly}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

function PlanPrice({ plan, period }: { plan: Plan; period: Period }) {
  const { m, locale, fcfa } = useI18n()
  const reduceMotion = useReducedMotion()

  if (plan.monthly === null) {
    return (
      <div className="mt-6">
        <p className="text-3xl font-extrabold text-ink">
          {locale === 'fr' ? 'Sur devis' : 'Custom quote'}
        </p>
        <p className="mt-1.5 text-[12.5px] text-ink-muted">
          {locale === 'fr' ? 'Selon votre nombre de sites' : 'Depending on your number of sites'}
        </p>
      </div>
    )
  }

  const yearly = yearlyPrice(plan.monthly)
  const monthlyEquivalent = Math.round(yearly / 12)

  return (
    <div className="mt-6">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={period}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-end gap-1.5">
            <span className="text-[2.1rem] leading-none font-extrabold text-ink tabular-nums">
              {fcfa(period === 'monthly' ? plan.monthly : monthlyEquivalent)}
            </span>
            <span className="pb-1 text-[13.5px] font-semibold text-ink-muted">{m.pricing.perMonth}</span>
          </div>
          <p className="mt-2 text-[12.5px] text-ink-muted">
            {period === 'monthly' ? (
              m.pricing.billedMonthly
            ) : (
              <>
                <span className="font-bold text-success">{formatFCFA(yearly, { locale })}</span>
                {locale === 'fr' ? ' par an' : ' per year'}
              </>
            )}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function PlanCard({ plan, period, highlighted }: { plan: Plan; period: Period; highlighted: boolean }) {
  const { m, locale } = useI18n()

  return (
    <Card
      padding="lg"
      className={cn(
        'relative flex h-full flex-col transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-out-expo)]',
        highlighted
          ? 'border-brand/45 bg-surface shadow-glow lg:-translate-y-3'
          : 'bg-surface hover:-translate-y-1 hover:shadow-lift',
      )}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge tone="brand" className="shadow-soft">
            <Sparkles className="size-3.5" />
            {m.pricing.mostPopular}
          </Badge>
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-extrabold text-ink">{locale === 'fr' ? plan.name : plan.nameEn}</h3>
      </div>

      <p className="mt-2 min-h-[3.5rem] text-[13.5px] leading-relaxed text-ink-muted">
        {locale === 'fr' ? plan.description : plan.descriptionEn}
      </p>

      <PlanPrice plan={plan} period={period} />

      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.highlights.map((highlight) => (
          <li key={highlight.fr} className="flex items-start gap-2.5">
            <span
              className={cn(
                'mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full',
                highlighted ? 'bg-brand text-on-brand' : 'bg-brand-soft text-brand',
              )}
            >
              <Check className="size-3" strokeWidth={3.5} />
            </span>
            <span className="text-[13.5px] leading-snug text-ink-muted">{localize(highlight, locale)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <ButtonLink
          to="/inscription"
          variant={highlighted ? 'primary' : 'secondary'}
          size="lg"
          fullWidth
          className="group"
        >
          {localize(plan.cta, locale)}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </ButtonLink>
        <p className="mt-2.5 text-center text-[11.5px] text-ink-subtle">{m.pricing.trialHint}</p>
      </div>
    </Card>
  )
}

/** Tableau de comparaison, affiché sur la page tarifs. */
function ComparisonTable({ period }: { period: Period }) {
  const { m, locale } = useI18n()
  const groups = Array.from(new Set(comparison.map((row) => localize(row.group, locale))))

  return (
    <div className="mt-14">
      <h3 className="text-center text-xl font-extrabold text-ink sm:text-2xl">{m.pricing.compareTitle}</h3>
      <p className="mt-2 text-center text-[14px] text-ink-muted">{m.pricing.compareSubtitle}</p>

      <Reveal className="mt-8">
        <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <caption className="sr-only">{m.pricing.compareTitle}</caption>
            <thead>
              <tr className="border-b border-line bg-surface-2">
                <th scope="col" className="sticky left-0 z-10 bg-surface-2 px-4 py-3 text-[12.5px] font-bold text-ink-muted">
                  {m.pricing.feature}
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={cn(
                      'px-4 py-3 text-center text-[13px] font-extrabold',
                      plan.id === 'pro' ? 'text-brand' : 'text-ink',
                    )}
                  >
                    {locale === 'fr' ? plan.name : plan.nameEn}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <Fragment key={group}>
                  <tr className="border-b border-line bg-background-soft/60">
                    <th
                      scope="colgroup"
                      colSpan={5}
                      className="px-4 py-2 text-[11.5px] font-bold tracking-wide text-ink-muted uppercase"
                    >
                      {group}
                    </th>
                  </tr>
                  {comparison
                    .filter((row) => localize(row.group, locale) === group)
                    .map((row) => (
                      <tr key={localize(row.label, locale)} className="border-b border-line last:border-0 hover:bg-surface-2/60">
                        <th scope="row" className="px-4 py-3 text-[13px] font-medium text-ink">
                          {localize(row.label, locale)}
                        </th>
                        {plans.map((plan) => (
                          <td key={plan.id} className="px-4 py-3 text-center">
                            <CellValue value={row.values[plan.id]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <p className="mt-4 text-center text-[12.5px] text-ink-subtle">
        {period === 'yearly'
          ? `${m.pricing.yearlyHint} · ${m.pricing.yearlyDiscount}`
          : m.pricing.billedMonthly}
      </p>
    </div>
  )
}

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="mx-auto size-4.5 text-success" strokeWidth={3} aria-label="inclus" />
  if (value === false) return <X className="mx-auto size-4 text-ink-subtle/50" aria-label="non inclus" />
  return (
    <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-ink-muted">
      {value === 'Gérant' && <Minus className="size-3 text-ink-subtle" aria-hidden />}
      {value}
    </span>
  )
}

export function PricingSection({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
  const { m, locale } = useI18n()
  const [period, setPeriod] = useState<Period>('yearly')

  const billingFaqItems: AccordionItemData[] = billingFaqs.map((item, index) => ({
    id: `billing-${index}`,
    question: locale === 'fr' ? item.question.fr : item.question.en,
    answer: locale === 'fr' ? item.answer.fr : item.answer.en,
  }))

  return (
    <Section
      id="tarifs"
      background={variant === 'full' ? 'none' : 'soft'}
      spacing={variant === 'full' ? 'none' : 'md'}
      className={cn(variant === 'full' && 'pt-14 pb-16 sm:pt-20 sm:pb-20')}
    >
      <SectionHeading eyebrow={m.pricing.eyebrow} title={m.pricing.title} subtitle={m.pricing.subtitle} />

      <div className="mt-9 flex justify-center">
        <BillingToggle period={period} onChange={setPeriod} />
      </div>

      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" as="div">
        {plans.map((plan: Plan & { id: PlanId }) => (
          <StaggerItem key={plan.id} className="h-full">
            <PlanCard plan={plan} period={period} highlighted={Boolean(plan.popular)} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Réassurance */}
      <Reveal delay={0.1} className="mt-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-dashed border-line-strong bg-surface/60 p-5 text-center">
          <span className="grid size-10 place-items-center rounded-xl bg-success-soft text-success">
            <HelpCircle className="size-5" />
          </span>
          <div>
            <p className="text-[14.5px] font-bold text-ink">{m.pricing.guaranteeTitle}</p>
            <p className="mt-1 text-[13.5px] leading-relaxed text-ink-muted">{m.pricing.guaranteeText}</p>
          </div>
        </div>
      </Reveal>

      {variant === 'full' && (
        <>
          <ComparisonTable period={period} />

          <div className="mx-auto mt-16 max-w-3xl">
            <h3 className="text-center text-xl font-extrabold text-ink sm:text-2xl">{m.pricing.faqTitle}</h3>
            <Accordion className="mt-6" items={billingFaqItems} />
          </div>
        </>
      )}
    </Section>
  )
}
