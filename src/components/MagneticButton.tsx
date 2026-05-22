'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import type { MouseEvent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
};

export function MagneticButton({ children, onClick, href, className = '' }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const shared = {
    className: `inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white shadow-[0_0_0_rgba(125,211,252,0)] backdrop-blur-xl transition duration-300 hover:border-cyan-200/60 hover:shadow-[0_0_28px_rgba(125,211,252,0.35)] ${className}`,
    style: { x: sx, y: sy },
    onMouseMove: (event: MouseEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      x.set(dx * 0.14);
      y.set(dy * 0.14);
    },
    onMouseLeave: () => {
      x.set(0);
      y.set(0);
    },
  };

  if (href) {
    return (
      <motion.a href={href} {...shared}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} {...shared}>
      {children}
    </motion.button>
  );
}
