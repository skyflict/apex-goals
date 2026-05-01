import React from 'react'
import {
  LandingNav,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  CtaBanner,
  LandingFooter,
} from '@/components/landing'

export const LandingScreen: React.FC = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <LandingNav />
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <CtaBanner />
    <LandingFooter />
  </div>
)
