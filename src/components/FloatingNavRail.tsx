'use client';

import Image from 'next/image';
import type { WorkItem } from '@/data/works';

type Props = { works: WorkItem[]; activeIndex: number; onJump: (index: number) => void };

export function FloatingNavRail({ works, activeIndex, onJump }: Props) {
  return (
    <aside className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 rounded-3xl border border-white/15 bg-black/35 p-3 backdrop-blur-2xl xl:block">
      <div className="max-h-[72vh] space-y-1 overflow-y-auto pr-1">
        {works.map((work, index) => (
          <button
            key={work.id}
            type="button"
            onClick={() => onJump(index)}
            className={`group relative block w-14 rounded-lg px-2 py-1 text-right text-xs tracking-widest transition ${activeIndex === index ? 'bg-white/15 text-cyan-100' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
          >
            {work.label}
            <div className="pointer-events-none absolute right-full top-1/2 mr-3 hidden h-20 w-32 -translate-y-1/2 overflow-hidden rounded-lg border border-white/20 bg-black/60 shadow-xl group-hover:block">
              <Image src={work.image} alt="preview" fill className="object-cover" sizes="128px" />
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
