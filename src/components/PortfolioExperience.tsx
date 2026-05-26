'use client';

import { AmbientBackground } from './AmbientBackground';
import { ContactSection } from './ContactSection';
import { FluidCursorTrail } from './FluidCursorTrail';
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
      <FluidCursorTrail />
      <ScrollProgress />
      <SiteHeader />
      <ImmersiveHero onStart={scrollToWorks} />
      <ScrollToExplore />
      <LongScrollPortfolio />
      <ContactSection />
    </main>
  );
}
