'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useMemo, useState, useEffect } from 'react';
import { SectionTitle } from '@/components/SectionTitle';
import { WorkCard } from '@/components/WorkCard';
import { featuredWorks, works } from '@/data/works';

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 70, damping: 22 });
  const smoothY = useSpring(y, { stiffness: 70, damping: 22 });
  const rotateY = useTransform(smoothX, [-100, 100], [-4, 4]);
  const rotateX = useTransform(smoothY, [-100, 100], [4, -4]);

  const activeWork = useMemo(() => (activeIndex === null ? null : works[activeIndex]), [activeIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % works.length));
      if (event.key === 'ArrowLeft') setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + works.length) % works.length));
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex]);

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 md:px-8 md:pt-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-panel/60 p-6 shadow-soft backdrop-blur md:p-10">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -left-16 top-1/2 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-muted">Portfolio</p>
            <h1 className="text-3xl font-semibold leading-tight md:text-5xl">Senior UI Designer Portfolio</h1>
            <p className="mt-5 max-w-xl text-sm text-muted md:text-base">
              A curated collection of mobile app interfaces, visual systems, operation pages, and product design works.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#all-works" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:opacity-90">View Works</a>
              <a href="#contact" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">Contact Me</a>
            </div>
          </div>
          <div
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              x.set(e.clientX - (rect.left + rect.width / 2));
              y.set(e.clientY - (rect.top + rect.height / 2));
            }}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
            className="relative h-[260px] md:h-[380px]"
          >
            {[0, 1, 2].map((layer) => (
              <motion.div
                key={layer}
                style={{ rotateX, rotateY }}
                animate={{ y: [0, -8 - layer * 2, 0] }}
                transition={{ duration: 6 + layer, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <div className="absolute overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                  style={{ inset: `${layer * 14}px` }}>
                  <Image
                    src={featuredWorks[layer].image}
                    alt={featuredWorks[layer].title}
                    fill
                    priority={layer === 0}
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16" id="featured-works">
        <SectionTitle title="Featured Works" subtitle="A selected showcase from recent product and visual interface projects." />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {featuredWorks.map((work, index) => (
            <WorkCard key={work.id} work={work} index={index} onClick={() => setActiveIndex(work.id - 1)} />
          ))}
        </div>
      </section>

      <section className="mt-16" id="all-works">
        <SectionTitle title="All Works" subtitle="Complete project archive, from mobile UI explorations to operation and growth pages." />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {works.map((work, index) => (
            <WorkCard key={work.id} work={work} index={index} onClick={() => setActiveIndex(index)} />
          ))}
        </div>
      </section>

      <section id="contact" className="mt-20 rounded-3xl border border-white/10 bg-panel/70 p-7 shadow-soft md:p-10">
        <SectionTitle title="Contact" subtitle="Available for product interface, visual system, and end-to-end design collaborations." />
        <p className="text-sm text-muted md:text-base">Email: hello@designer-portfolio.com</p>
      </section>

      <AnimatePresence>
        {activeWork && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/90 p-4 md:p-10">
            <button className="absolute right-4 top-4 rounded-full border border-white/20 px-4 py-2 text-sm" onClick={() => setActiveIndex(null)}>Close</button>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 px-3 py-2" onClick={() => setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + works.length) % works.length))}>◀</button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 px-3 py-2" onClick={() => setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % works.length))}>▶</button>
            <div className="relative mx-auto mt-16 h-[70vh] max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <Image src={activeWork.image} alt={activeWork.title} fill className="object-contain" sizes="90vw" priority />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
