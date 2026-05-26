'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useState, type CSSProperties, type MouseEvent } from 'react';
import { works } from '@/data/works';

type PointerState = { mx: number; my: number; rx: number; ry: number; tx: number; ty: number };

function WorkImageFrame({ src, alt, priority }: { src: string; alt: string; priority: boolean }) {
  const reduceMotion = useReducedMotion();
  const [pos, setPos] = useState<PointerState>({ mx: 50, my: 50, rx: 0, ry: 0, tx: 0, ty: 0 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const nx = (x - 50) / 50;
    const ny = (y - 50) / 50;

    setPos({
      mx: Math.max(0, Math.min(100, x)),
      my: Math.max(0, Math.min(100, y)),
      rx: -ny * 3,
      ry: nx * 3,
      tx: nx * 4,
      ty: ny * 4,
    });
  };

  const handleLeave = () => setPos({ mx: 50, my: 50, rx: 0, ry: 0, tx: 0, ty: 0 });

  const style = {
    '--mx': `${pos.mx}%`,
    '--my': `${pos.my}%`,
    '--rx': `${pos.rx}deg`,
    '--ry': `${pos.ry}deg`,
    '--tx': `${pos.tx}px`,
    '--ty': `${pos.ty}px`,
  } as CSSProperties;

  return (
    <figure className="work-frame">
      <motion.div
        className="work-media-shell"
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        initial={{ opacity: 0.92, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.14 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <img src={src} alt={alt} className="work-image" loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'} />
        <span className="work-spotlight" aria-hidden />
        <span className="work-edge-glow" aria-hidden />
        <span className="work-noise-overlay" aria-hidden />
      </motion.div>
    </figure>
  );
}

export function LongScrollPortfolio() {
  return (
    <section id="works" className="long-scroll-wrap">
      <div className="long-scroll-canvas">
        {works.map((work, index) => (
          <WorkImageFrame key={work.id} src={work.src} alt={work.alt} priority={index < 3} />
        ))}
      </div>
    </section>
  );
}
