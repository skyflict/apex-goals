import React from 'react'
import {
  LandingNav,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  TestimonialsSection,
  PricingSection,
  CtaBanner,
  LandingFooter,
} from '@/components/landing'

export const LandingScreen: React.FC = () => (
  <div className="landing-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <LandingNav />
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <TestimonialsSection />
    <PricingSection />
    <CtaBanner />
    <LandingFooter />
  </div>
)
