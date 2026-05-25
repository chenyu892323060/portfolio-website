'use client';

import { motion } from 'motion/react';
import { works } from '@/data/works';

function PortfolioImage({ src, webpSrc, alt, priority }: { src: string; webpSrc: string; alt: string; priority: boolean }) {
  return (
    <motion.figure className="work-frame" initial={{ opacity: 0.58, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.5 }}>
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img src={src} alt={alt} className="work-image" loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'} />
      </picture>
    </motion.figure>
  );
}

export function LongScrollPortfolio() {
  return (
    <section id="works" className="long-scroll-wrap">
      <div className="long-scroll-canvas">
        {works.map((work, index) => (
          <PortfolioImage key={work.id} src={work.src} webpSrc={work.webpSrc} alt={work.alt} priority={index < 3} />
        ))}
      </div>
    </section>
  );
}
