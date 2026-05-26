'use client';

import { motion } from 'motion/react';
import { works } from '@/data/works';

function WorkImageFrame({ src, alt, priority }: { src: string; alt: string; priority: boolean }) {
  return (
    <figure className="work-frame">
      <picture>
        <img
          src={src}
          alt={alt}
          className="work-image"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </picture>
    </figure>
  );
}

export function LongScrollPortfolio() {
  return (
    <motion.section
      id="works"
      className="long-scroll-wrap"
      initial={{ opacity: 0.2 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.02 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="long-scroll-canvas">
        {works.map((work, index) => (
          <WorkImageFrame key={work.id} src={work.src} alt={work.alt} priority={index < 3} />
        ))}
      </div>
    </motion.section>
  );
}
