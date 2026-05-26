'use client';

import { motion, useReducedMotion } from 'motion/react';

export function ImmersiveHero({ onStart }: { onStart: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-section" id="top">
      <div className="hero-orbit" aria-hidden>
        <div className="shape orb orb-a" />
        <div className="shape orb orb-b" />
        <div className="shape ring ring-a" />
        <div className="shape capsule cap-a" />
        <div className="shape capsule cap-b" />
        <div className="shape wire" />
      </div>

      <motion.div className="hero-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        <motion.p className="hero-kicker" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.05 }}>
          PORTFOLIO
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }}>
          Senior UI Designer Portfolio
        </motion.h1>
        <motion.p className="hero-lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
          A continuous visual archive of mobile app interfaces, operation pages, product systems, and visual design works.
        </motion.p>
        <motion.button type="button" onClick={onStart} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.32 }}>
          Start Viewing
        </motion.button>
      </motion.div>

      <div className="hero-stack" aria-hidden>
        {['/works/P01.png', '/works/P02.png', '/works/P03.png'].map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            initial={{ opacity: 0, y: 26, rotate: 5 - i * 3 }}
            animate={{ opacity: 1, y: i * 16, rotate: 4 - i * 4 }}
            transition={{ duration: 0.8, delay: 0.22 + i * 0.12 }}
            style={reduceMotion ? undefined : { x: `calc(var(--mx-offset, 0px) * ${0.12 + i * 0.06})`, y: `calc(${i * 16}px + var(--my-offset, 0px) * ${0.08 + i * 0.05})` }}
          />
        ))}
      </div>

      <small className="hero-hint">Scroll to explore</small>
    </section>
  );
}
