'use client';

import { motion, useReducedMotion } from 'motion/react';
import { MagneticButton } from './MagneticButton';

export function ImmersiveHero({ onStart }: { onStart: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="hero-section" id="top">
      <div className="hero-orbit" aria-hidden>
        <div className="shape orb orb-a" /><div className="shape orb orb-b" />
        <div className="shape ring ring-a" /><div className="shape ring ring-b" />
        <div className="shape capsule cap-a" /><div className="shape capsule cap-b" />
        <div className="shape wire" /><div className="shape ribbon" />
      </div>
      <div className="hero-particles" aria-hidden />

      <motion.div className="hero-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
        <motion.p className="hero-kicker" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>PORTFOLIO</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>Senior UI Designer Portfolio</motion.h1>
        <motion.p className="hero-lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          A continuous visual archive of mobile app interfaces, operation pages, product systems, and visual design works.
        </motion.p>
        <MagneticButton className="hero-cta" onClick={onStart}>Start Viewing</MagneticButton>
      </motion.div>

      <div className="hero-stack" aria-hidden>
        {['/works/P01.png', '/works/P02.png', '/works/P03.png'].map((src, i) => (
          <motion.img key={src} src={src} alt="" initial={{ opacity: 0, y: 26, rotate: 5 - i * 3 }} animate={{ opacity: 1, y: i * 16, rotate: 4 - i * 4 }}
            transition={{ duration: 0.8, delay: 0.22 + i * 0.12 }}
            style={reduceMotion ? undefined : { x: `calc(var(--mx-offset, 0px) * ${0.14 + i * 0.05})`, y: `calc(${i * 16}px + var(--my-offset, 0px) * ${0.1 + i * 0.04})` }} />
        ))}
      </div>

      <small className="hero-hint">Scroll to explore</small>
    </section>
  );
}
