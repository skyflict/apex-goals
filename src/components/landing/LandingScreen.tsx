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
  <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
    <LandingNav />
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <CtaBanner />
    <LandingFooter />
  </div>
)
