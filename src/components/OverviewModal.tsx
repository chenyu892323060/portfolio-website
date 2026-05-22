'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import type { WorkItem } from '@/data/works';

type Props = {
  open: boolean;
  works: WorkItem[];
  onClose: () => void;
  onSelect: (index: number) => void;
};

export function OverviewModal({ open, works, onClose, onSelect }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[95] bg-black/70 p-4 backdrop-blur-2xl md:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button onClick={onClose} className="mb-4 rounded-full border border-white/30 px-4 py-2 text-sm">Close</button>
          <div className="grid max-h-[88vh] grid-cols-2 gap-3 overflow-y-auto rounded-2xl border border-white/15 bg-white/[0.04] p-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {works.map((work, index) => (
              <button key={work.id} onClick={() => onSelect(index)} className="group relative overflow-hidden rounded-xl border border-white/15 bg-black/40">
                <div className="relative aspect-[4/3]">
                  <Image src={work.image} alt={`Work ${work.label}`} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="20vw" />
                </div>
                <div className="absolute left-2 top-2 text-[10px] tracking-widest text-white/90">{work.label}</div>
                <div className="absolute inset-0 opacity-0 shadow-[inset_0_0_0_1px_rgba(125,211,252,0.8),0_0_28px_rgba(125,211,252,0.35)] transition group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
