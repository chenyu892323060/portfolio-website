'use client';

import { AmbientBackground } from './AmbientBackground';
import { ContactSection } from './ContactSection';
import { CursorGlow } from './CursorGlow';
import { ImmersiveHero } from './ImmersiveHero';
import { LongScrollPortfolio } from './LongScrollPortfolio';
import { ScrollProgress } from './ScrollProgress';
import { ScrollToExplore } from './ScrollToExplore';
import { SiteHeader } from './SiteHeader';

export function PortfolioExperience() {
  const scrollToWorks = () => {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      <AmbientBackground />
      <CursorGlow />
      <ScrollProgress />
      <SiteHeader />
      <ImmersiveHero onStart={scrollToWorks} />
      <ScrollToExplore />
      <LongScrollPortfolio />
      <ContactSection />
    </main>
  );
}
