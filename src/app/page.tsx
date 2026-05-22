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
import { useEffect, useMemo, useRef, useState } from 'react';
import { totalWorks, works } from '@/data/works';

function WorkSection({
  work,
  index,
  onOpen,
  setActiveByView,
}: {
  work: (typeof works)[number];
  index: number;
  onOpen: () => void;
  setActiveByView: (index: number) => void;
}) {
  return (
    <motion.section
      id={`work-${work.id}`}
      initial={{ opacity: 0, y: 44, scale: 0.96, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      onViewportEnter={() => setActiveByView(index)}
      viewport={{ once: true, amount: 0.38 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      className="mx-auto w-full max-w-6xl"
    >
      <motion.button
        type="button"
        onClick={onOpen}
        whileHover={{ y: -4 }}
        className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 text-left shadow-[0_10px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-indigo-400/0 via-white/0 to-cyan-200/0 transition duration-500 group-hover:from-indigo-400/10 group-hover:to-cyan-200/10" />
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black/40">
          <Image
            src={work.image}
            alt={`Work ${work.indexLabel}`}
            fill
            className="object-contain transition duration-500 group-hover:scale-[1.015]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 85vw"
          />
        </div>
      </motion.button>
      <p className="mt-3 text-xs tracking-[0.18em] text-white/55">{work.indexLabel}</p>
    </motion.section>
  );
}

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(y, { stiffness: 90, damping: 24 });
  const rotateY = useTransform(smoothX, [-100, 100], [-5, 5]);
  const rotateX = useTransform(smoothY, [-100, 100], [5, -5]);

  const { scrollYProgress } = useScroll();
  const progressWidth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const activeLightboxWork = useMemo(
    () => (lightboxIndex === null ? null : works[lightboxIndex]),
    [lightboxIndex],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowRight') setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % works.length));
      if (event.key === 'ArrowLeft') setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + works.length) % works.length));
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex]);

  return (
    <main className="relative overflow-x-hidden bg-[#08090d] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-50">
        <div className="absolute left-[-12rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-[-12rem] top-[16rem] h-[26rem] w-[26rem] rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(130,150,255,0.12),transparent_34%),radial-gradient(circle_at_70%_80%,rgba(120,255,230,0.08),transparent_32%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.6)_0.35px,transparent_0.35px)] [background-size:3px_3px]" />
      </div>

      <motion.div style={{ scaleX: progressWidth }} className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-cyan-300/70 to-indigo-400/70" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
          <span className="text-sm tracking-[0.2em] text-white/90">Portfolio</span>
          <div className="flex items-center gap-6 text-sm text-white/70">
            <a href="#works" className="transition hover:text-white">Works</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 pb-14 pt-10 md:grid-cols-[1fr_1.1fr] md:px-8 md:pb-20 md:pt-16">
        <div className="self-center">
          <h1 className="text-3xl font-semibold leading-tight md:text-5xl">Senior UI Designer Portfolio</h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
            A curated collection of mobile app interfaces, visual systems, operation pages, and product design works.
          </p>
        </div>
        <motion.div
          ref={heroRef}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            x.set(event.clientX - (rect.left + rect.width / 2));
            y.set(event.clientY - (rect.top + rect.height / 2));
          }}
          onMouseLeave={() => {
            x.set(0);
            y.set(0);
          }}
          style={{ rotateX, rotateY }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-indigo-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src="/works/01.png"
                alt="Portfolio cover 01"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 55vw"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section id="works" className="mx-auto w-full max-w-7xl space-y-14 px-4 pb-12 md:space-y-20 md:px-8">
        {works.map((work, index) => (
          <WorkSection
            key={work.id}
            work={work}
            index={index}
            onOpen={() => setLightboxIndex(index)}
            setActiveByView={setActiveIndex}
          />
        ))}
      </section>

      <aside className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <div className="rounded-2xl border border-white/10 bg-black/35 px-3 py-4 backdrop-blur-xl">
          <p className="text-center text-xs tracking-[0.16em] text-white/65">{works[activeIndex].indexLabel}</p>
          <div className="mt-3 flex max-h-[55vh] flex-col gap-1 overflow-auto pr-1">
            {works.map((work, index) => (
              <button
                key={work.id}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  document.getElementById(`work-${work.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`rounded px-2 py-1 text-left text-xs tracking-[0.16em] transition ${
                  activeIndex === index ? 'bg-white/15 text-white' : 'text-white/45 hover:text-white/80'
                }`}
              >
                {String(work.id).padStart(2, '0')}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section id="contact" className="mx-auto w-full max-w-7xl px-4 pb-20 pt-12 md:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
          <p className="text-lg text-white/90 md:text-2xl">Let’s create refined digital experiences.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="mailto:hello@designer-portfolio.com" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black">Contact Me</a>
            <a href="#" className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10">Download Resume</a>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeLightboxWork && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + works.length) % works.length))}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % works.length))}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2"
            >
              ▶
            </button>
            <div className="mx-auto mt-16 flex h-[78vh] w-[96vw] max-w-7xl items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-3 md:p-4">
              <div className="relative aspect-video w-full">
                <Image src={activeLightboxWork.image} alt={`Work ${activeLightboxWork.indexLabel}`} fill className="object-contain" sizes="95vw" priority />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
