'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { works } from '@/data/works';

function PortfolioImage({ src, webpSrc, alt, priority }: { src: string; webpSrc: string; alt: string; priority: boolean }) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <motion.img
      src={currentSrc}
      alt={alt}
      className="work-image"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      onError={() => {
        if (currentSrc !== webpSrc) setCurrentSrc(webpSrc);
      }}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}

export function LongScrollPortfolio() {
  return (
    <section id="works" className="long-scroll-wrap">
      <div className="long-scroll-canvas">
        {works.map((work, index) => (
          <PortfolioImage key={work.id} src={work.src} webpSrc={work.webpSrc} alt={work.alt} priority={index < 2} />
        ))}
      </div>
    </section>
  );
}
