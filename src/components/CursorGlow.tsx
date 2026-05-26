'use client';

import { useEffect } from 'react';

export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = document.documentElement;
    const onMove = (event: MouseEvent) => {
      root.style.setProperty('--cursor-x', `${event.clientX}px`);
      root.style.setProperty('--cursor-y', `${event.clientY}px`);
      root.style.setProperty('--mx-offset', `${(event.clientX / window.innerWidth - 0.5) * 36}px`);
      root.style.setProperty('--my-offset', `${(event.clientY / window.innerHeight - 0.5) * 28}px`);
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      root.style.setProperty('--ambient-boost', target?.closest('button, a, nav, .site-header') ? '1' : '0');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return <div className="cursor-field" aria-hidden />;
}
