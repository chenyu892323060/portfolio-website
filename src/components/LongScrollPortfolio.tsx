'use client';

import { motion } from 'motion/react';
import { works } from '@/data/works';

function WorkImageFrame({ src, alt, priority }: { src: string; alt: string; priority: boolean }) {
  return (
    <figure className="work-frame">
      <picture>
        <motion.img
          src={src}
          alt={alt}
          className="work-image"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          initial={{ opacity: 0.94, scale: 1.035, filter: 'blur(3px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </picture>
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
