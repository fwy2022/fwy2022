import { CtaSection } from '../components/marketing/CtaSection'
import { DemoSection } from '../components/marketing/DemoSection'
import { FaqSection } from '../components/marketing/FaqSection'
import { FeaturesSection } from '../components/marketing/FeaturesSection'
import { Hero } from '../components/marketing/Hero'
import { HowItWorksSection } from '../components/marketing/HowItWorksSection'
import { LogoStrip } from '../components/marketing/LogoStrip'
import { PricingSection } from '../components/marketing/PricingSection'
import { StatsSection } from '../components/marketing/StatsSection'
import { TestimonialsSection } from '../components/marketing/TestimonialsSection'

export function LandingPage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection />
      <StatsSection />
      <PricingSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  )
}
