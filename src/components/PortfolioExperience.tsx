'use client';

import { ContactSection } from './ContactSection';
import { LongScrollPortfolio } from './LongScrollPortfolio';
import { ScrollProgress } from './ScrollProgress';
import { SiteHeader } from './SiteHeader';

export function PortfolioExperience() {
  const scrollToWorks = () => {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      <ScrollProgress />
      <SiteHeader />

      <section className="hero-section">
        <div className="hero-inner">
          <p className="hero-kicker">PORTFOLIO</p>
          <h1>Senior UI Designer Portfolio</h1>
          <p>
            A continuous visual archive of mobile app interfaces, operation pages, product systems, and visual design
            works.
          </p>
          <button type="button" onClick={scrollToWorks}>
            Start Viewing
          </button>
        </div>
      </section>

      <LongScrollPortfolio />

      <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        ↑ Top
      </button>

      <ContactSection />
    </main>
  );
}
