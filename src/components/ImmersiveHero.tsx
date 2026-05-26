'use client';

import { motion, useReducedMotion } from 'motion/react';
import { MagneticButton } from './MagneticButton';

export function ImmersiveHero({ onStart }: { onStart: () => void }) {
  const reduceMotion = useReducedMotion();
  const parallax = (x: number, y: number) =>
    reduceMotion ? undefined : { transform: `translate3d(calc(var(--mx-offset, 0px) * ${x}), calc(var(--my-offset, 0px) * ${y}), 0)` };

  return (
    <section className="hero-section" id="top">
      <div className="hero-orbit" aria-hidden>
        <div className="shape orb orb-a" style={parallax(0.7, 0.6)} />
        <div className="shape orb orb-b" style={parallax(-0.6, 0.45)} />
        <div className="shape ring ring-a" style={parallax(-0.45, -0.35)} />
        <div className="shape ring ring-b" style={parallax(0.4, -0.3)} />
        <div className="shape prism prism-a" style={parallax(0.95, 0.72)} />
        <div className="shape prism prism-b" style={parallax(-0.85, 0.65)} />
        <div className="shape wire" style={parallax(0.32, -0.25)} />
        <div className="shape ribbon" style={parallax(0.2, 0.18)} />
      </div>
      <div className="hero-particles" aria-hidden />

      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.85, ease: [0.2, 0.82, 0.2, 1] }}
      >
        <motion.p className="hero-kicker" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>PORTFOLIO</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>Senior UI Designer Portfolio</motion.h1>
        <motion.p className="hero-lead" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          A continuous visual archive of mobile app interfaces, operation pages, product systems, and visual design works.
        </motion.p>
        <MagneticButton className="hero-cta" onClick={onStart}>Start Viewing</MagneticButton>
      </motion.div>

      <small className="hero-hint">Scroll to explore</small>
    </section>
  );
}
