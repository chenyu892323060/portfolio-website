'use client';

import { useEffect, useState } from 'react';

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
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top</button>
        <button type="button" onClick={() => scrollToId('works')}>Works</button>
        <button type="button" onClick={() => scrollToId('contact')}>Contact</button>
      </nav>
    </header>
  );
}
