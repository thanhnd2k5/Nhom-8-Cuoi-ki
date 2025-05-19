import React from 'react';
import styles from './LandingPage.less';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ProcessSection from './components/ProcessSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

const LandingPage: React.FC = () => {
  return (
    <div className={styles.landingContainer}>
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default LandingPage; 