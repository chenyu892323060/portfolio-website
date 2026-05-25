'use client';

import { motion } from 'motion/react';
import { works } from '@/data/works';

function PortfolioImage({ src, alt, priority }: { src: string; alt: string; priority: boolean }) {
  return (
    <motion.figure
      className="work-frame"
      initial={{ opacity: 0.4, y: 24, filter: 'contrast(0.92)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'contrast(1)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <img src={src} alt={alt} className="work-image" loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'} />
    </motion.figure>
  );
}

export function LongScrollPortfolio() {
  return (
    <section id="works" className="long-scroll-wrap">
      <div className="long-scroll-canvas">
        {works.map((work, index) => (
          <PortfolioImage key={work.id} src={work.src} alt={work.alt} priority={index < 3} />
        ))}
      </div>
    </section>
  );
}
