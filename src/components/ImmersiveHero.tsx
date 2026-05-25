'use client';

import { motion } from 'motion/react';

export function ImmersiveHero({ onStart }: { onStart: () => void }) {
  const previews = ['/works/P01.png', '/works/P02.png', '/works/P03.png'];

  return (
    <section className="hero-section" id="top">
      <div className="hero-inner">
        <motion.p className="hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          PORTFOLIO
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }}>
          Senior UI Designer Portfolio
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }}>
          A continuous visual archive of mobile app interfaces, operation pages, product systems, and visual design works.
        </motion.p>
        <motion.button type="button" onClick={onStart} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.34 }}>
          Start Viewing
        </motion.button>
        <small>Scroll to explore</small>
      </div>

      <div className="hero-stack" aria-hidden>
        {previews.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            initial={{ opacity: 0, x: 36 - i * 14, y: 30 + i * 10, rotate: 5 - i * 3 }}
            animate={{ opacity: 1, x: i * 12, y: i * 16, rotate: 4 - i * 4 }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.12 }}
          />
        ))}
      </div>
    </section>
  );
}
