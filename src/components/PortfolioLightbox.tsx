'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import type { WorkItem } from '@/data/works';

type Props = {
  onWheelZoom: (deltaY: number) => void;
  openIndex: number | null;
  works: WorkItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onPick: (index: number) => void;
  zoomed: boolean;
  onToggleZoom: () => void;
};

export function PortfolioLightbox({ openIndex, works, onClose, onPrev, onNext, onPick, zoomed, onToggleZoom, onWheelZoom }: Props) {
  const work = openIndex === null ? null : works[openIndex];
  return (
    <AnimatePresence>
      {work && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 p-3 backdrop-blur-2xl md:p-8">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs tracking-[0.24em] text-white/80">{work.label} / {String(works.length).padStart(2, '0')}</div>
            <div className="flex gap-2">
              <button onClick={onToggleZoom} className="rounded-full border border-white/30 px-4 py-2 text-sm">{zoomed ? 'Fit' : 'Zoom 2x'}</button>
              <button onClick={onClose} className="rounded-full border border-white/30 px-4 py-2 text-sm">Close</button>
            </div>
          </div>
          <div onWheel={(e) => onWheelZoom(e.deltaY)} className="relative flex h-[72vh] items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-black/50">
            <Image src={work.image} alt={`Work ${work.label}`} width={2600} height={2600} className={`h-auto max-h-full w-auto max-w-full object-contain transition duration-300 ${zoomed ? 'scale-[2]' : 'scale-100'}`} />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={onPrev} className="rounded-full border border-white/30 px-4 py-2">Prev</button>
              <button onClick={onNext} className="rounded-full border border-white/30 px-4 py-2">Next</button>
            </div>
            <div className="flex max-w-[70vw] gap-2 overflow-x-auto">
              {works.map((item, idx) => (
                <button key={item.id} onClick={() => onPick(idx)} className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border ${idx === openIndex ? 'border-cyan-200' : 'border-white/20'}`}>
                  <Image src={item.image} alt={item.label} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
