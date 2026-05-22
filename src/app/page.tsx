'use client';

import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { TOTAL_WORKS, works } from '@/data/works';

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 130, damping: 25, mass: 0.2 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 20 });
  const rotateY = useTransform(smoothX, [-120, 120], [-6, 6]);
  const rotateX = useTransform(smoothY, [-120, 120], [6, -6]);

  const activeWork = useMemo(() => (activeIndex === null ? null : works[activeIndex]), [activeIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (activeIndex === null) return;
      if (event.key === 'ArrowRight') setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % TOTAL_WORKS));
      if (event.key === 'ArrowLeft') setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + TOTAL_WORKS) % TOTAL_WORKS));
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex]);

  return (
    <main className="relative overflow-x-hidden pb-24 text-white">
      <motion.div className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-indigo-300 via-violet-400 to-cyan-300" style={{ scaleX: progressScale }} />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
          <a href="#" className="text-sm font-medium tracking-[0.2em] text-white/90">Portfolio</a>
          <nav className="flex items-center gap-6 text-sm text-white/80">
            <a href="#works" className="transition hover:text-white">Works</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      <section className="relative mx-auto mt-6 grid max-w-[1400px] gap-10 px-5 md:mt-10 md:grid-cols-[1fr_0.95fr] md:items-center md:px-10">
        <div className="relative z-10">
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">Senior UI Designer Portfolio</h1>
          <p className="mt-5 max-w-2xl text-sm text-white/70 md:text-lg">
            A curated collection of mobile app interfaces, visual systems, operation pages, and product design works.
          </p>
        </div>
        <motion.div
          className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            x.set(event.clientX - rect.left - rect.width / 2);
            y.set(event.clientY - rect.top - rect.height / 2);
          }}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
        >
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image src={works[0].image} alt="Portfolio cover" fill priority className="object-contain transition duration-500 group-hover:scale-[1.02]" sizes="(max-width: 768px) 100vw, 45vw" />
          </div>
        </motion.div>
      </section>

      <section id="works" className="relative mx-auto mt-14 max-w-[1600px] px-4 md:px-8">
        <aside className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur-xl lg:block">
          <div className="max-h-[68vh] space-y-1 overflow-y-auto pr-1">
            {works.map((work) => (
              <a key={work.id} href={`#work-${work.label}`} className="block rounded-md px-2 py-1 text-right text-xs text-white/55 transition hover:bg-white/10 hover:text-white">
                {work.label}
              </a>
            ))}
          </div>
        </aside>

        <div className="space-y-14 md:space-y-20">
          {works.map((work, index) => (
            <motion.article
              key={work.id}
              id={`work-${work.label}`}
              initial={{ opacity: 0, y: 70, scale: 0.96, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ amount: 0.35, once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mx-auto w-full max-w-[90vw]"
            >
              <button
                onClick={() => setActiveIndex(index)}
                className="group block w-full rounded-[28px] border border-white/15 bg-white/[0.04] p-3 text-left shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition duration-500 hover:border-white/30 md:p-4"
              >
                <div className="mb-3 text-xs tracking-[0.2em] text-white/60">
                  {work.label} / {String(TOTAL_WORKS).padStart(2, '0')}
                </div>
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black/35">
                  <Image src={work.image} alt={`Work ${work.label}`} fill className="object-contain transition duration-500 group-hover:scale-[1.015]" sizes="(max-width: 768px) 98vw, 86vw" />
                </div>
              </button>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto mt-24 max-w-[1200px] px-5 md:px-10">
        <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-8 text-center backdrop-blur-2xl md:p-14">
          <p className="text-2xl font-medium md:text-4xl">Let’s create refined digital experiences.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:hello@designer-portfolio.com" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90">Contact Me</a>
            <a href="#" className="rounded-full border border-white/25 px-6 py-3 text-sm font-medium transition hover:bg-white/10">Download Resume</a>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeWork && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/70 p-4 backdrop-blur-2xl md:p-10">
            <button onClick={() => setActiveIndex(null)} className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-sm">Close</button>
            <button onClick={() => setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + TOTAL_WORKS) % TOTAL_WORKS))} className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/30 bg-black/40 px-3 py-2 md:block">◀</button>
            <button onClick={() => setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % TOTAL_WORKS))} className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/30 bg-black/40 px-3 py-2 md:block">▶</button>
            <div className="mx-auto flex h-full max-w-[1600px] items-center justify-center">
              <div className="w-full rounded-3xl border border-white/15 bg-black/30 p-3 md:p-4">
                <div className="mb-3 text-center text-xs tracking-[0.2em] text-white/70">{activeWork.label} / {String(TOTAL_WORKS).padStart(2, '0')}</div>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                  <Image src={activeWork.image} alt={`Work ${activeWork.label}`} fill priority className="object-contain" sizes="96vw" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
