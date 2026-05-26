'use client';

import { useEffect, useState } from 'react';
import { MagneticButton } from './MagneticButton';

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <strong>Portfolio</strong>
      <nav>
        <MagneticButton className="nav-pill" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top</MagneticButton>
        <MagneticButton className="nav-pill" onClick={() => scrollToId('works')}>Works</MagneticButton>
        <MagneticButton className="nav-pill" onClick={() => scrollToId('contact')}>Contact</MagneticButton>
      </nav>
    </header>
  );
}
