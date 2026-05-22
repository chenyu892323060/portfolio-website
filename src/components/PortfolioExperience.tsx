'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TOTAL_WORKS, works } from '@/data/works';
import { MagneticButton } from './MagneticButton';

function ScrollProgress({ progress }: { progress: number }) {
  return <motion.div className="fixed left-0 top-0 z-[160] h-[2px] origin-left bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300" style={{ width: '100%', scaleX: progress }} />;
}

function CinematicHero({ onEnter, onOverview, onContact }: { onEnter: () => void; onOverview: () => void; onContact: () => void }) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useTransform(useSpring(py, { stiffness: 70, damping: 16 }), [-180, 180], [8, -8]);
  const ry = useTransform(useSpring(px, { stiffness: 70, damping: 16 }), [-180, 180], [-10, 10]);
  return <section className="relative mx-auto grid min-h-screen max-w-[1600px] items-center gap-10 px-5 py-24 md:grid-cols-[1fr_1.05fr] md:px-10">
    <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}>
      {['PORTFOLIO', 'Senior UI Designer Portfolio'].map((line, i) => <motion.h1 key={line} variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } }} className={i === 0 ? 'text-xs tracking-[0.34em] text-white/60' : 'mt-4 text-4xl font-semibold leading-tight md:text-6xl'}>{line}</motion.h1>)}
      <motion.p variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }} className="mt-6 max-w-2xl text-white/75">A curated interactive showcase of mobile app interfaces, visual systems, operation pages, and product design works.</motion.p>
      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-10 flex flex-wrap gap-3">
        <MagneticButton onClick={onEnter}>Enter Showcase</MagneticButton>
        <MagneticButton onClick={onOverview}>Overview</MagneticButton>
        <MagneticButton onClick={onContact}>Contact</MagneticButton>
      </motion.div>
    </motion.div>
    <motion.div className="relative h-[420px] md:h-[600px]" style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      px.set(e.clientX - rect.left - rect.width / 2);
      py.set(e.clientY - rect.top - rect.height / 2);
    }} onMouseLeave={() => { px.set(0); py.set(0); }}>
      {[0, 1, 2].map((i) => <motion.div key={i} initial={{ opacity: 0, y: 35 + i * 12, rotate: (i - 1) * 4 }} animate={{ opacity: 1, y: 0, rotate: (i - 1) * 2 }} transition={{ duration: 0.9, delay: 0.22 + i * 0.12 }} className={`absolute ${i === 0 ? 'left-[2%] top-[26%]' : i === 1 ? 'left-[22%] top-[10%]' : 'left-[44%] top-[26%]'} h-[65%] w-[40%] overflow-hidden rounded-[24px] border border-white/20 bg-white/10 p-2 shadow-[0_28px_90px_rgba(10,18,45,.55)] backdrop-blur-xl`}>
        <Image src={works[i].src} alt={`hero-${works[i].label}`} fill className="rounded-[18px] object-cover" priority />
      </motion.div>)}
    </motion.div>
  </section>;
}

function AdaptiveImageStage({ index, onOpenFocus }: { index: number; onOpenFocus: () => void }) {
  const work = works[index];
  return <motion.button type="button" onClick={onOpenFocus} className="group relative w-full overflow-hidden rounded-[32px] border border-white/15 bg-white/[0.03] p-2 text-left backdrop-blur-2xl md:p-3" initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Image src={work.src} alt={`${work.label} bg`} fill className="object-cover opacity-55 blur-[50px] brightness-[0.35] saturate-[1.2] scale-[1.25]" sizes="100vw" />
    </div>
    <div className="pointer-events-none absolute left-5 top-4 text-xs tracking-[0.3em] text-white/75">{work.label} / {String(TOTAL_WORKS).padStart(2, '0')}</div>
    <div className="relative flex min-h-[52vh] w-full items-center justify-center rounded-[24px] border border-white/10 bg-black/25 md:min-h-[62vh]">
      <Image src={work.src} alt={`Work ${work.label}`} width={2200} height={2200} className="h-auto max-h-[78vh] w-auto max-w-[88vw] object-contain transition duration-500 group-hover:scale-[1.012]" sizes="88vw" priority={index < 3} loading={index < 3 ? 'eager' : 'lazy'} />
    </div>
  </motion.button>;
}

function ThumbnailStrip({ active, onPick }: { active: number; onPick: (i: number) => void }) {
  const railRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = railRef.current?.querySelector<HTMLButtonElement>(`button[data-index='${active}']`);
    node?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [active]);
  return <>
    <div ref={railRef} className="hidden w-full gap-2 overflow-x-auto rounded-2xl border border-white/15 bg-black/30 p-2 backdrop-blur-2xl md:flex">
      {works.map((w, i) => <button data-index={i} key={w.id} onClick={() => onPick(i)} className={`group relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition ${active === i ? 'border-cyan-200 shadow-[0_0_26px_rgba(120,180,255,.45)]' : 'border-white/20 hover:border-white/45'}`}><Image src={w.src} alt={w.label} fill className="object-cover transition group-hover:scale-105" sizes="80px" /><span className="absolute bottom-1 left-1 rounded bg-black/50 px-1 text-[10px]">{w.label}</span></button>)}
    </div>
    <div className="flex items-center justify-center rounded-full border border-white/15 bg-black/30 px-3 py-2 text-xs text-white/75 md:hidden">{String(active + 1).padStart(2, '0')} / {String(TOTAL_WORKS).padStart(2, '0')}</div>
  </>;
}

function ControlDock({ active, autoPlay, onPrev, onNext, onOverview, onFocus, onToggleAuto }: { active: number; autoPlay: boolean; onPrev: () => void; onNext: () => void; onOverview: () => void; onFocus: () => void; onToggleAuto: () => void }) {
  const b = 'rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs hover:border-cyan-200/60 hover:shadow-[0_0_20px_rgba(120,180,255,.35)]';
  return <div className="w-full rounded-2xl border border-white/15 bg-black/35 p-2 backdrop-blur-2xl"><div className="flex flex-wrap items-center justify-center gap-2 md:justify-between"><div className="flex flex-wrap gap-2"><button className={b} onClick={onPrev}>Previous</button><button className={b} onClick={onNext}>Next</button><button className={b} onClick={onOverview}>Overview</button><button className={b} onClick={onFocus}>Focus</button><button className={b} onClick={onToggleAuto}>{autoPlay ? 'Pause' : 'Auto Play'}</button></div><span className="px-2 text-xs text-white/70">{String(active + 1).padStart(2, '0')} / {String(TOTAL_WORKS).padStart(2, '0')}</span></div></div>;
}

function OverviewModal({ open, active, onClose, onPick }: { open: boolean; active: number; onClose: () => void; onPick: (i: number) => void }) {
  return <AnimatePresence>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[180] bg-black/80 p-4 backdrop-blur-2xl md:p-8"><button onClick={onClose} className="mb-4 rounded-full border border-white/30 px-4 py-2">Close</button><div className="grid max-h-[88vh] grid-cols-3 gap-2 overflow-auto sm:grid-cols-4 lg:grid-cols-6">{works.map((w, i) => <button key={w.id} onClick={() => onPick(i)} className={`group relative aspect-[3/4] overflow-hidden rounded-xl border ${active === i ? 'border-cyan-200 shadow-[0_0_30px_rgba(120,180,255,.5)]' : 'border-white/20 hover:border-white/55'}`}><Image src={w.src} alt={w.label} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="20vw" /><span className="absolute left-2 top-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px]">{w.label}</span></button>)}</div></motion.div>}</AnimatePresence>;
}

function FocusViewer({ open, active, onClose, onMove, onPick }: { open: boolean; active: number; onClose: () => void; onMove: (d: number) => void; onPick: (i: number) => void }) {
  const [zoom, setZoom] = useState(1);
  const [fit, setFit] = useState<'fit' | 'zoom'>('fit');
  useEffect(() => { setZoom(fit === 'fit' ? 1 : 1.6); }, [fit, active]);
  const current = works[active];
  return <AnimatePresence>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[190] flex flex-col bg-black/85 p-3 backdrop-blur-2xl md:p-6">
    <div className="mb-3 flex items-center justify-between"><span className="text-sm">{current.label} / {String(TOTAL_WORKS).padStart(2, '0')}</span><div className="flex gap-2 text-xs"><button onClick={() => setFit('fit')} className="rounded-full border border-white/30 px-3 py-1">Fit</button><button onClick={() => setFit('zoom')} className="rounded-full border border-white/30 px-3 py-1">Zoom</button><button onClick={onClose} className="rounded-full border border-white/30 px-3 py-1">Close</button></div></div>
    <div onWheel={(e) => fit === 'zoom' && setZoom((z) => Math.max(1.6, Math.min(3.2, z + (e.deltaY < 0 ? 0.08 : -0.08))))} className="relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/20">
      <motion.div drag={zoom > 1} dragConstraints={{ top: -500, left: -700, right: 700, bottom: 500 }}>
        <Image src={current.src} alt={current.label} width={2600} height={2600} className="h-auto max-h-[78vh] w-auto max-w-[95vw] object-contain" style={{ transform: `scale(${zoom})` }} />
      </motion.div>
      <button onClick={() => onMove(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 px-3 py-2">‹</button>
      <button onClick={() => onMove(1)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 px-3 py-2">›</button>
    </div>
    <div className="mt-3"><ThumbnailStrip active={active} onPick={onPick} /></div>
  </motion.div>}</AnimatePresence>;
}

function ContactSection() {
  return <section id="contact" className="mx-auto w-full max-w-[1200px] px-5 pb-20 pt-12 md:px-10"><div className="rounded-[28px] border border-white/15 bg-white/[0.04] p-8 text-center backdrop-blur-2xl md:p-12"><h3 className="text-2xl md:text-4xl">Let’s create refined digital experiences.</h3><p className="mx-auto mt-4 max-w-2xl text-white/75">Available for senior UI design, visual design, and product experience opportunities.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><MagneticButton>Contact Me</MagneticButton><MagneticButton>Download Resume</MagneticButton></div></div></section>;
}

export function PortfolioExperience() {
  const [active, setActive] = useState(0);
  const [overview, setOverview] = useState(false);
  const [focus, setFocus] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

  const goTo = useCallback((i: number) => setActive((i + TOTAL_WORKS) % TOTAL_WORKS), []);
  const next = useCallback((manual?: boolean) => { if (manual) setAutoPlay(false); goTo(active + 1); }, [active, goTo]);
  const prev = useCallback((manual?: boolean) => { if (manual) setAutoPlay(false); goTo(active - 1); }, [active, goTo]);

  useEffect(() => { if (!autoPlay) return; const t = window.setInterval(() => setActive((n) => (n + 1) % TOTAL_WORKS), 3000); return () => window.clearInterval(t); }, [autoPlay]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) { e.preventDefault(); next(true); }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); prev(true); }
      if (e.key.toLowerCase() === 'o') setOverview(true);
      if (e.key.toLowerCase() === 'f') setFocus(true);
      if (e.key === 'Escape') { setOverview(false); setFocus(false); }
    };
    const onWheel = (e: WheelEvent) => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) e.deltaY > 0 ? next(true) : prev(true);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('wheel', onWheel); };
  }, [next, prev]);

  return <main className="relative overflow-x-hidden">
    <ScrollProgress progress={scrollYProgress.get()} />
    <header className="fixed left-0 top-0 z-[170] w-full px-4 py-3 md:px-8"><div className="mx-auto flex max-w-[1500px] items-center justify-between rounded-full border border-white/15 bg-black/25 px-4 py-2 text-sm backdrop-blur-xl"><span>Portfolio</span><nav className="flex gap-4 text-xs md:text-sm"><button onClick={() => stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Showcase</button><button onClick={() => setOverview(true)}>Overview</button><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact</button></nav></div></header>
    <CinematicHero onEnter={() => stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} onOverview={() => setOverview(true)} onContact={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
    <section ref={stageRef} className="mx-auto w-full max-w-[1500px] px-2 pb-8 md:px-6">
      <AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0.45 }} transition={{ duration: 0.35 }}><AdaptiveImageStage index={active} onOpenFocus={() => setFocus(true)} /></motion.div></AnimatePresence>
      <div className="mt-4 space-y-3"><ControlDock active={active} autoPlay={autoPlay} onPrev={() => prev(true)} onNext={() => next(true)} onOverview={() => setOverview(true)} onFocus={() => setFocus(true)} onToggleAuto={() => setAutoPlay((s) => !s)} /><ThumbnailStrip active={active} onPick={goTo} /></div>
    </section>
    <ContactSection />
    <OverviewModal open={overview} active={active} onClose={() => setOverview(false)} onPick={(i) => { goTo(i); setOverview(false); }} />
    <FocusViewer open={focus} active={active} onClose={() => setFocus(false)} onMove={(d) => goTo(active + d)} onPick={goTo} />
  </main>;
}
