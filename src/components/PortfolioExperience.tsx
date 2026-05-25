'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { works } from '@/data/works';
import { MagneticButton } from './MagneticButton';

const total = works.length;
const pad = (n: number) => String(n).padStart(2, '0');

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />;
}

function CinematicHero({ onEnter, onOverview, onContact }: { onEnter: () => void; onOverview: () => void; onContact: () => void }) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  return <section className="hero-wrap">
    <div className="hero-copy">
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="kicker">PORTFOLIO</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="hero-title">Senior UI Designer Portfolio</motion.h1>
      <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="hero-sub">A curated interactive showcase of mobile app interfaces, visual systems, operation pages, and product design works.</motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }} className="hero-actions">
        <MagneticButton onClick={onEnter}>Enter Showcase</MagneticButton><MagneticButton onClick={onOverview}>Overview</MagneticButton><MagneticButton onClick={onContact}>Contact</MagneticButton>
      </motion.div>
    </div>
    <div className="hero-stack" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setParallax({ x: (e.clientX - r.left - r.width / 2) / 28, y: (e.clientY - r.top - r.height / 2) / 28 }); }} onMouseLeave={() => setParallax({ x: 0, y: 0 })}>
      {[0, 1, 2].map((i) => <motion.div key={works[i].id} className="hero-card" style={{ transform: `translate3d(${parallax.x * (i + 1)}px,${parallax.y * (i + 1)}px,0) rotate(${(i - 1) * 4}deg)` }} initial={{ opacity: 0, y: 40 + i * 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 + i * 0.1 }}><Image src={works[i].src} alt={works[i].alt} fill className="object-cover" priority /></motion.div>)}
    </div>
  </section>;
}

function AdaptiveImageStage({ active, onFocus }: { active: number; onFocus: () => void }) {
  const item = works[active];
  return <motion.button type="button" onClick={onFocus} className="stage-shell" key={item.id} initial={{ opacity: 0, y: 40, scale: 0.96, filter: 'blur(12px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}>
    <div className="stage-bg"><Image src={item.src} alt="background" fill className="object-cover" sizes="100vw" loading="lazy" /></div>
    <div className="stage-fg"><Image src={item.src} alt={item.alt} width={2400} height={2400} sizes="88vw" className="stage-image" priority={active < 3} loading={active < 3 ? 'eager' : 'lazy'} /></div>
  </motion.button>;
}

function ThumbnailStrip({ active, onPick }: { active: number; onPick: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.querySelector<HTMLButtonElement>(`button[data-i='${active}']`)?.scrollIntoView({ behavior: 'smooth', inline: 'center' }); }, [active]);
  return <>
    <div className="thumb-mobile"><button onClick={() => onPick((active - 1 + total) % total)}>←</button><span>{pad(active + 1)} / {total}</span><button onClick={() => onPick((active + 1) % total)}>→</button></div>
    <div ref={ref} className="thumb-strip">{works.map((w, i) => <button key={w.id} data-i={i} onClick={() => onPick(i)} className={`thumb ${i === active ? 'active' : ''}`}><Image src={w.src} alt={w.alt} fill sizes="88px" loading="lazy" className="object-cover" /></button>)}</div>
  </>;
}

const Overlay = ({ open, children }: { open: boolean; children: React.ReactNode }) => <AnimatePresence>{open && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overlay">{children}</motion.div>}</AnimatePresence>;

export function PortfolioExperience() {
  const [active, setActive] = useState(0);
  const [overview, setOverview] = useState(false);
  const [focus, setFocus] = useState(false);
  const [cont, setCont] = useState(false);
  const [auto, setAuto] = useState(false);
  const [zoom, setZoom] = useState(1);
  const stageRef = useRef<HTMLElement>(null);

  const go = useCallback((i: number, manual = false) => { if (manual) setAuto(false); setActive((i + total) % total); }, []);
  const next = useCallback((manual = false) => go(active + 1, manual), [active, go]);
  const prev = useCallback((manual = false) => go(active - 1, manual), [active, go]);

  useEffect(() => { if (!auto) return; const t = setInterval(() => setActive((i) => (i + 1) % total), 3000); return () => clearInterval(t); }, [auto]);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) { e.preventDefault(); next(true); } if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); prev(true); } if (e.key.toLowerCase() === 'o') setOverview(true); if (e.key.toLowerCase() === 'f') setFocus(true); if (e.key.toLowerCase() === 'c') setCont(true); if (e.key === 'Escape') { setOverview(false); setFocus(false); setCont(false); } }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [next, prev]);

  const nextCont = useMemo(() => (active + 1 < total ? works[active + 1] : null), [active]);

  return <main>
    <ScrollProgress />
    <header className="top-nav"><strong>Portfolio</strong><nav><button onClick={() => stageRef.current?.scrollIntoView({ behavior: 'smooth' })}>Showcase</button><button onClick={() => setOverview(true)}>Overview</button><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact</button></nav></header>
    <CinematicHero onEnter={() => stageRef.current?.scrollIntoView({ behavior: 'smooth' })} onOverview={() => setOverview(true)} onContact={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
    <section ref={stageRef} className="showcase">
      <AnimatePresence mode="wait"><AdaptiveImageStage active={active} onFocus={() => setFocus(true)} key={works[active].id} /></AnimatePresence>
      <div className="dock"><button onClick={() => prev(true)}>Previous</button><button onClick={() => next(true)}>Next</button><button onClick={() => setOverview(true)}>Overview</button><button onClick={() => setFocus(true)}>Focus</button><button onClick={() => setCont(true)}>Continue</button><button onClick={() => setAuto((v) => !v)}>{auto ? 'Pause' : 'Auto Play'}</button><span>{pad(active + 1)} / {total}</span></div>
      <ThumbnailStrip active={active} onPick={(i) => go(i, true)} />
    </section>

    <section id="contact" className="contact"><h2>Let’s create refined digital experiences.</h2><p>Available for senior UI design, visual design, and product experience opportunities.</p><div><MagneticButton>Contact Me</MagneticButton><MagneticButton>Download Resume</MagneticButton></div></section>

    <Overlay open={overview}><div className="panel"><h3>{total} Portfolio Screens</h3><button onClick={() => setOverview(false)}>Close</button><div className="overview-grid">{works.map((w, i) => <button key={w.id} onClick={() => { go(i, true); setOverview(false); }} className={`overview-item ${i === active ? 'active' : ''}`}><Image src={w.src} alt={w.alt} fill sizes="18vw" loading="lazy" className="object-cover" /></button>)}</div></div></Overlay>

    <Overlay open={focus}><div className="panel"><div className="focus-head"><span>{pad(active + 1)} / {total}</span><div><button onClick={() => setZoom(1)}>Fit</button><button onClick={() => setZoom(1)}>100%</button><button onClick={() => setZoom(1.5)}>150%</button><button onClick={() => setZoom(2)}>200%</button><button onClick={() => setFocus(false)}>Close</button></div></div><div className="focus-stage" onWheel={(e) => setZoom((z) => Math.max(1, Math.min(2.6, z + (e.deltaY < 0 ? 0.1 : -0.1))))}><motion.div drag={zoom > 1} dragConstraints={{ left: -800, right: 800, top: -600, bottom: 600 }}><Image src={works[active].src} alt={works[active].alt} width={2600} height={2600} className="focus-image" style={{ transform: `scale(${zoom})` }} /></motion.div></div><ThumbnailStrip active={active} onPick={(i) => go(i, true)} /></div></Overlay>

    <Overlay open={cont}><div className="panel"><div className="focus-head"><span>Continuous View {active + 1}{nextCont ? ` + ${active + 2}` : ''} / {total}</span><div><button onClick={() => go(active - 2, true)}>Previous Group</button><button onClick={() => go(active + 2, true)}>Next Group</button><button onClick={() => setCont(false)}>Close</button></div></div><div className="continue-scroll"><Image src={works[active].src} alt={works[active].alt} width={1800} height={2600} loading="lazy" className="continue-image" />{nextCont && <Image src={nextCont.src} alt={nextCont.alt} width={1800} height={2600} loading="lazy" className="continue-image" />}</div></div></Overlay>
  </main>;
}
