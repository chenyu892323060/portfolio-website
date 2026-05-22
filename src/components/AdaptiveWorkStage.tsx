'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { WorkItem } from '@/data/works';

type Props = {
  work: WorkItem;
  index: number;
  total: number;
  onOpen: (index: number) => void;
  setActive: (index: number) => void;
};

export function AdaptiveWorkStage({ work, index, total, onOpen, setActive }: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 120, damping: 20 });
  const smy = useSpring(my, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(smx, [-80, 80], [-3, 3]);
  const rotateX = useTransform(smy, [-80, 80], [3, -3]);

  return (
    <motion.article
      id={`work-${work.label}`}
      onViewportEnter={() => setActive(index)}
      initial={{ opacity: 0, y: 80, scale: 0.94, filter: 'blur(14px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ amount: 0.45, once: true }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: index % 4 === 0 ? 0.03 : 0 }}
      className="mx-auto w-[88vw] max-w-[1600px]"
    >
      <motion.button
        type="button"
        onClick={() => onOpen(index)}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative block w-full overflow-hidden rounded-[30px] border border-white/20 bg-white/[0.06] p-3 text-left shadow-[0_30px_90px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition duration-500 hover:border-cyan-100/40 hover:shadow-[0_0_60px_rgba(120,180,255,0.25)] md:p-4"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - rect.left - rect.width / 2);
          my.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
      >
        <div className="mb-3 text-xs tracking-[0.2em] text-white/65">{work.label} / {String(total).padStart(2, '0')}</div>
        <div className="relative mx-auto flex max-h-[85vh] min-h-[40vh] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-black/40">
          <Image src={work.image} alt="" fill className="scale-110 object-cover blur-2xl brightness-50" sizes="88vw" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/35" />
          <div className="relative z-10 flex h-full max-h-[85vh] w-full items-center justify-center p-2 md:p-4">
            <Image src={work.image} alt={`Work ${work.label}`} width={2200} height={2200} className="h-auto max-h-[82vh] w-auto max-w-full object-contain transition duration-500 group-hover:scale-[1.02]" />
          </div>
        </div>
      </motion.button>
    </motion.article>
  );
}
