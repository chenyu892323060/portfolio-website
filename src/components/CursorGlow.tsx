'use client';

import { useEffect } from 'react';

export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const root = document.documentElement;
    const onMove = (event: MouseEvent) => {
      root.style.setProperty('--mx', `${event.clientX}px`);
      root.style.setProperty('--my', `${event.clientY}px`);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      root.style.setProperty('--glow-boost', target?.closest('button, a, .work-frame') ? '1' : '0');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return <div className="cursor-glow" aria-hidden />;
}
