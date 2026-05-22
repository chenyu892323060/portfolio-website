'use client';

import Image from 'next/image';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { AdaptiveWorkStage } from '@/components/AdaptiveWorkStage';
import { FloatingNavRail } from '@/components/FloatingNavRail';
import { MagneticButton } from '@/components/MagneticButton';
import { OverviewModal } from '@/components/OverviewModal';
import { PortfolioLightbox } from '@/components/PortfolioLightbox';
import { ScrollProgress } from '@/components/ScrollProgress';
import { TOTAL_WORKS, works } from '@/data/works';

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const worksRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 20 });
  const sy = useSpring(y, { stiffness: 90, damping: 20 });
  const rotateY = useTransform(sx, [-120, 120], [-7, 7]);
  const rotateX = useTransform(sy, [-120, 120], [7, -7]);

  useEffect(() => scrollY.on('change', (v) => setScrolled(v > 36)), [scrollY]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOverviewOpen(false);
        setLightboxIndex(null);
      }
      if (lightboxIndex !== null && event.key === 'ArrowRight') setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % TOTAL_WORKS));
      if (lightboxIndex !== null && event.key === 'ArrowLeft') setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + TOTAL_WORKS) % TOTAL_WORKS));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  return (
    <main className="relative overflow-x-hidden pb-20 text-white">
      <ScrollProgress />

      <header className={`fixed inset-x-0 top-0 z-50 transition ${scrolled ? 'border-b border-white/15 bg-black/35 backdrop-blur-2xl' : 'bg-transparent'}`}>
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-8">
          <a href="#" className="text-sm tracking-[0.2em] text-white/95">Portfolio</a>
          <nav className="flex items-center gap-6 text-sm text-white/80">
            <button onClick={() => worksRef.current?.scrollIntoView({ behavior: 'smooth' })}>Works</button>
            <button onClick={() => setOverviewOpen(true)}>Overview</button>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section className="relative mx-auto mt-20 grid max-w-[1440px] gap-10 px-5 pb-14 pt-10 md:grid-cols-[1fr_1.1fr] md:items-center md:px-8 md:pt-16">
        <div>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">Senior UI Designer Portfolio</h1>
          <p className="mt-5 max-w-xl text-sm text-white/70 md:text-lg">A curated collection of mobile app interfaces, visual systems, operation pages, and product design works.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MagneticButton onClick={() => worksRef.current?.scrollIntoView({ behavior: 'smooth' })}>View Works</MagneticButton>
            <MagneticButton onClick={() => setOverviewOpen(true)}>Overview</MagneticButton>
            <MagneticButton href="#contact">Contact Me</MagneticButton>
          </div>
        </div>
        <motion.div className="grid grid-cols-3 gap-3 rounded-3xl border border-white/15 bg-white/[0.04] p-3 backdrop-blur-xl" style={{ rotateX, rotateY }} onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left - rect.width / 2); y.set(e.clientY - rect.top - rect.height / 2);
        }} onMouseLeave={() => { x.set(0); y.set(0); }}>
          {works.slice(0, 3).map((work, idx) => (
            <div key={work.id} className={`relative overflow-hidden rounded-2xl border border-white/20 ${idx === 1 ? 'mt-6' : ''}`}>
              <div className="relative h-48 md:h-72"><Image src={work.image} alt={`Hero ${work.label}`} fill className="object-cover" priority={idx === 0} /></div>
            </div>
          ))}
        </motion.div>
      </section>

      <section ref={worksRef} id="works" className="space-y-12 md:space-y-16">
        {works.map((work, idx) => (
          <AdaptiveWorkStage key={work.id} work={work} index={idx} total={TOTAL_WORKS} onOpen={(i) => setLightboxIndex(i)} setActive={setActiveIndex} />
        ))}
      </section>

      <FloatingNavRail works={works} activeIndex={activeIndex} onJump={(idx) => document.getElementById(`work-${works[idx].label}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })} />

      <section id="contact" className="mx-auto mt-20 max-w-[1200px] px-5 md:px-8">
        <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-9 text-center backdrop-blur-xl md:p-14">
          <p className="text-2xl font-medium md:text-4xl">Let’s create refined digital experiences.</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 md:text-base">Available for senior UI design, visual design, and product experience opportunities.</p>
          <div className="mt-8 flex justify-center gap-3">
            <MagneticButton href="mailto:hello@designer-portfolio.com">Contact Me</MagneticButton>
            <MagneticButton href="#">Download Resume</MagneticButton>
          </div>
        </div>
      </section>

      <OverviewModal
        open={overviewOpen}
        works={works}
        onClose={() => setOverviewOpen(false)}
        onSelect={(idx) => {
          setOverviewOpen(false);
          document.getElementById(`work-${works[idx].label}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
      />

      <PortfolioLightbox
        openIndex={lightboxIndex}
        works={works}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + TOTAL_WORKS) % TOTAL_WORKS))}
        onNext={() => setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % TOTAL_WORKS))}
        onPick={(idx) => setLightboxIndex(idx)}
        zoomed={zoomed}
        onToggleZoom={() => setZoomed((z) => !z)}
        onWheelZoom={(delta) => setZoomed(delta < 0)}
      />
    </main>
  );
}
