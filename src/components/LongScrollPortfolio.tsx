'use client';

import { motion } from 'motion/react';
import { works } from '@/data/works';

function PortfolioImage({ src, alt, priority }: { src: string; alt: string; priority: boolean }) {
  return (
    <figure className="work-frame">
      <motion.img
        src={src}
        alt={alt}
        className="work-image"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        initial={{ opacity: 0.92, filter: 'blur(6px)', scale: 1.012 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        viewport={{ once: true, amount: 0.14 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </figure>
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
