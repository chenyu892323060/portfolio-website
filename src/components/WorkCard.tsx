'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { WorkItem } from '@/data/works';

export function WorkCard({ work, index, onClick }: { work: WorkItem; index: number; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.03 }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group w-full overflow-hidden rounded-2xl border border-white/10 bg-panel text-left shadow-soft"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-contain transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-white md:text-base">{work.title}</h3>
        <p className="mt-1 text-xs text-muted md:text-sm">{work.category}</p>
      </div>
    </motion.button>
  );
}
