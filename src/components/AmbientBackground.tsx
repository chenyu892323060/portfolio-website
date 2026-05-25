'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '14%']);

  return (
    <div className="ambient-bg" aria-hidden>
      <motion.div className="ambient-ribbon ambient-ribbon-a" style={{ y: orbY }} />
      <motion.div className="ambient-ribbon ambient-ribbon-b" style={{ y: orbY }} />
      <div className="ambient-grid" />
      <div className="ambient-noise" />
    </div>
  );
}
