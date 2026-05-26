'use client';

import { motion, useReducedMotion } from 'motion/react';

export function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  const parallax = (x: number, y: number) =>
    reduceMotion ? undefined : { transform: `translate3d(calc(var(--mx-offset, 0px) * ${x}), calc(var(--my-offset, 0px) * ${y}), 0)` };

  return (
    <div className="ambient-bg" aria-hidden>
      <div className="ambient-grid" style={parallax(0.08, 0.08)} />
      <div className="ambient-noise" />
      <motion.div className="ambient-line ambient-line-a" style={parallax(0.18, 0.16)} />
      <motion.div className="ambient-line ambient-line-b" style={parallax(-0.14, 0.12)} />
      <motion.div className="ambient-line ambient-line-c" style={parallax(0.1, -0.1)} />
    </div>
  );
}
