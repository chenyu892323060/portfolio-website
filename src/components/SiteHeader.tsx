'use client';

export function SiteHeader() {
  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="site-header">
      <strong>Portfolio</strong>
      <nav>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top</button>
        <button onClick={() => scrollToId('works')}>Works</button>
        <button onClick={() => scrollToId('contact')}>Contact</button>
      </nav>
    </header>
  );
}
