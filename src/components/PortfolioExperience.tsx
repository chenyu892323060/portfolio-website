'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TOTAL_WORKS, works, type WorkItem } from '@/data/works';
import { MagneticButton } from './MagneticButton';

export function ScrollProgress({ progress }: { progress: number }) {
  return <motion.div className="fixed left-0 top-0 z-[120] h-[2px] w-full origin-left bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-300" style={{ scaleX: progress }} />;
}

function HeroShowcase({ onView, onOverview, onContact }: { onView: () => void; onOverview: () => void; onContact: () => void }) {
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const rx = useTransform(useSpring(my, { stiffness: 80, damping: 18 }), [-120, 120], [6, -6]);
  const ry = useTransform(useSpring(mx, { stiffness: 80, damping: 18 }), [-120, 120], [-6, 6]);
  return <section className="relative mx-auto grid max-w-[1600px] gap-10 px-5 pt-20 md:grid-cols-[1fr_1.1fr] md:px-10 md:pt-28">
    <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
      {['PORTFOLIO', 'Senior UI Designer Portfolio'].map((t, i) => <motion.h1 key={t} variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }} className={i ? 'mt-3 text-4xl font-semibold md:text-6xl' : 'text-sm tracking-[0.28em] text-white/65'}>{t}</motion.h1>)}
      <motion.p variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mt-5 max-w-xl text-white/75">A curated collection of mobile app interfaces, visual systems, operation pages, and product design works.</motion.p>
      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-8 flex flex-wrap gap-3"><MagneticButton onClick={onView}>View Works</MagneticButton><MagneticButton onClick={onOverview}>Overview</MagneticButton><MagneticButton onClick={onContact}>Contact Me</MagneticButton></motion.div>
    </motion.div>
    <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} onMouseMove={(e)=>{const r=e.currentTarget.getBoundingClientRect();mx.set(e.clientX-r.left-r.width/2);my.set(e.clientY-r.top-r.height/2);}} onMouseLeave={()=>{mx.set(0);my.set(0);}} className="relative h-[400px] md:h-[520px]">
      {[0,1,2].map((i)=> <motion.div key={i} initial={{ opacity:0, x:40*(i-1), y: 50-20*i, rotate: (i-1)*5 }} animate={{ opacity:1,x:0,y:0,rotate:(i-1)*3 }} transition={{ delay: 0.2 + i*0.1, duration: 0.8 }} className={`absolute ${i===0?'left-0 top-16':i===1?'left-[18%] top-8':'left-[36%] top-20'} h-[72%] w-[44%] overflow-hidden rounded-2xl border border-white/25 bg-white/10 p-2 shadow-2xl backdrop-blur-xl`}>
        <Image src={works[i].src} alt="hero" fill className="rounded-xl object-cover" priority />
      </motion.div>)}
    </motion.div>
  </section>;
}

function AdaptiveImageStage({ work, active, onOpenFocus }: { work: WorkItem; active: boolean; onOpenFocus: () => void }) {
  return <motion.section id={`stage-${work.label}`} className="relative mx-auto flex min-h-screen w-full items-center justify-center px-2 py-14 md:px-10" initial={{ opacity:0, y:80, scale:0.94, filter:'blur(16px)' }} whileInView={{ opacity:1,y:0,scale:1,filter:'blur(0px)' }} viewport={{ amount:0.45, once:true }} transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}>
    <div className="absolute inset-0 -z-10 overflow-hidden"><Image src={work.src} alt="bg" fill className="scale-125 object-cover blur-[50px] brightness-[0.35] saturate-[1.2]" /></div>
    <button onClick={onOpenFocus} className={`group relative w-[min(88vw,1680px)] overflow-hidden rounded-[30px] border bg-white/[0.04] p-2 md:p-3 ${active ? 'border-cyan-100/40 shadow-[0_0_80px_rgba(130,170,255,.18)]':'border-white/20'}`}>
      <div className="absolute left-5 top-4 z-20 text-xs tracking-[0.28em] text-white/75">{work.label} / {String(TOTAL_WORKS).padStart(2,'0')}</div>
      <div className="relative flex max-h-[82vh] min-h-[52vh] items-center justify-center rounded-2xl border border-white/10 bg-black/30">
        <Image src={work.src} alt={`Work ${work.label}`} width={2400} height={1600} className="h-auto max-h-[82vh] w-auto max-w-full object-contain transition duration-500 group-hover:scale-[1.01]" loading="lazy" />
      </div>
    </button>
  </motion.section>;
}

function FloatingControlDock({ onPrev,onNext,onOverview,onFocus,page,mode,setMode }:{onPrev:()=>void;onNext:()=>void;onOverview:()=>void;onFocus:()=>void;page:number;mode:string;setMode:(m:string)=>void}){
 const btn='rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs hover:border-cyan-200/60 hover:shadow-[0_0_20px_rgba(120,180,255,.35)]';
 return <div className="fixed bottom-4 left-1/2 z-[110] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/20 bg-black/45 p-2 backdrop-blur-2xl">
  <button className={btn} onClick={onPrev}>Previous</button><button className={btn} onClick={onNext}>Next</button><button className={btn} onClick={onOverview}>Overview</button>
  {['fit','fill','focus'].map((m)=><button key={m} className={`${btn} ${mode===m?'text-cyan-200':''}`} onClick={()=>setMode(m)}>{m[0].toUpperCase()+m.slice(1)}</button>)}
  <span className="px-2 text-xs text-white/75">{String(page).padStart(2,'0')} / {TOTAL_WORKS}</span></div>
}

function ThumbnailRail({ activeIndex, onJump }:{activeIndex:number;onJump:(i:number)=>void}){return <aside className="fixed right-4 top-1/2 z-40 hidden max-h-[72vh] -translate-y-1/2 overflow-y-auto rounded-3xl border border-white/15 bg-black/35 p-2 backdrop-blur-2xl xl:block">{works.map((w,i)=><button key={w.id} onClick={()=>onJump(i)} className={`group relative my-1 block w-10 rounded-md py-1 text-xs ${activeIndex===i?'bg-white/15 text-cyan-200':'text-white/60 hover:bg-white/10'}`}>{w.label}<span className="pointer-events-none absolute right-full top-1/2 mr-2 hidden h-16 w-24 -translate-y-1/2 overflow-hidden rounded-lg border border-white/25 group-hover:block"><Image src={w.src} alt="preview" fill className="object-cover"/></span></button>)}</aside>}

function OverviewModal({ open, active, onClose, onPick }:{open:boolean;active:number;onClose:()=>void;onPick:(i:number)=>void}){useEffect(()=>{const e=(k:KeyboardEvent)=>k.key==='Escape'&&onClose();window.addEventListener('keydown',e);return()=>window.removeEventListener('keydown',e);},[onClose]);return <AnimatePresence>{open&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[130] bg-black/70 p-4 backdrop-blur-2xl md:p-8"><button onClick={onClose} className="mb-4 rounded-full border border-white/30 px-4 py-2">Close</button><div className="grid max-h-[86vh] grid-cols-3 gap-3 overflow-auto sm:grid-cols-4 lg:grid-cols-6">{works.map((w,i)=><button key={w.id} onClick={()=>onPick(i)} className={`group relative overflow-hidden rounded-xl border ${active===i?'border-cyan-200 shadow-[0_0_28px_rgba(120,180,255,.4)]':'border-white/20'}`}><div className="relative aspect-video"><Image src={w.src} alt={w.label} fill className="object-cover transition group-hover:scale-105"/></div></button>)}</div></motion.div>}</AnimatePresence>}

function FocusViewer({ open, index, onClose, onMove }:{open:boolean;index:number;onClose:()=>void;onMove:(d:number)=>void}){const [zoom,setZoom]=useState(1);const img=works[index];useEffect(()=>{const k=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();if(e.key==='ArrowRight')onMove(1);if(e.key==='ArrowLeft')onMove(-1);};window.addEventListener('keydown',k);return()=>window.removeEventListener('keydown',k);},[onClose,onMove]);return <AnimatePresence>{open&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[140] bg-black/80 p-3 backdrop-blur-2xl md:p-6"><div className="mb-2 flex justify-between text-sm"><span>{img.label} / {TOTAL_WORKS}</span><div className="flex gap-2"><button onClick={()=>setZoom(1)} className="rounded-full border border-white/30 px-3 py-1">Fit</button><button onClick={()=>setZoom(1.2)} className="rounded-full border border-white/30 px-3 py-1">Fill</button><button onClick={()=>setZoom(2)} className="rounded-full border border-white/30 px-3 py-1">2x</button><button onClick={onClose} className="rounded-full border border-white/30 px-3 py-1">Close</button></div></div><div onWheel={(e)=>setZoom((z)=>Math.max(1,Math.min(2.5,z+(e.deltaY<0?0.1:-0.1))))} className="relative flex h-[74vh] items-center justify-center overflow-hidden rounded-2xl border border-white/20"><motion.div drag={zoom>1} dragConstraints={{top:-400,left:-500,right:500,bottom:400}}><Image src={img.src} alt="focus" width={2600} height={1800} className="h-auto max-h-[72vh] w-auto max-w-full object-contain" style={{transform:`scale(${zoom})`}}/></motion.div></div></motion.div>}</AnimatePresence>}

export function PortfolioExperience() {
  const [active, setActive] = useState(0); const [overview, setOverview] = useState(false); const [focus, setFocus] = useState(false); const [mode, setMode] = useState('fit');
  const refs = useRef<(HTMLElement | null)[]>([]); const worksArea = useRef<HTMLElement>(null); const { scrollYProgress } = useScroll();
  const go = (i:number)=>{const next=(i+TOTAL_WORKS)%TOTAL_WORKS; refs.current[next]?.scrollIntoView({behavior:'smooth',block:'center'});};
  useEffect(()=>{const io=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){const i=Number((e.target as HTMLElement).dataset.index);setActive(i);}}),{threshold:0.5});refs.current.forEach(r=>r&&io.observe(r));return()=>io.disconnect();},[]);
  useEffect(()=>{const h=(e:KeyboardEvent)=>{if(['ArrowDown','ArrowRight'].includes(e.key)||e.key===' '){e.preventDefault();go(active+1);} if(['ArrowUp','ArrowLeft'].includes(e.key)){e.preventDefault();go(active-1);} if(e.key.toLowerCase()==='o')setOverview(true); if(e.key.toLowerCase()==='f')setFocus(true); if(e.key==='Escape'){setOverview(false);setFocus(false);} };window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h);},[active]);
  const stageClass = useMemo(()=> mode==='fill'?'scale-[1.04]':mode==='focus'?'scale-[1.08]':'scale-100',[mode]);
  return <main className={`relative overflow-x-hidden pb-24 ${stageClass}`}>
    <ScrollProgress progress={scrollYProgress.get()} />
    <HeroShowcase onView={()=>worksArea.current?.scrollIntoView({behavior:'smooth'})} onOverview={()=>setOverview(true)} onContact={()=>document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})} />
    <section ref={worksArea}>{works.map((w,i)=><div key={w.id} ref={(el)=>{refs.current[i]=el; if(el) el.dataset.index=String(i);}}><AdaptiveImageStage work={w} active={active===i} onOpenFocus={()=>{setActive(i);setFocus(true);}}/></div>)}</section>
    <ThumbnailRail activeIndex={active} onJump={go} />
    <FloatingControlDock onPrev={()=>go(active-1)} onNext={()=>go(active+1)} onOverview={()=>setOverview(true)} onFocus={()=>setFocus(true)} page={active+1} mode={mode} setMode={setMode} />
    <section id="contact" className="mx-auto mt-16 max-w-5xl px-5"><div className="rounded-3xl border border-white/15 bg-white/[0.04] p-10 text-center backdrop-blur-2xl"><h2 className="text-3xl">Let’s create refined digital experiences.</h2></div></section>
    <OverviewModal open={overview} active={active} onClose={()=>setOverview(false)} onPick={(i)=>{setOverview(false);go(i);}} />
    <FocusViewer open={focus} index={active} onClose={()=>setFocus(false)} onMove={(d)=>go(active+d)} />
  </main>;
}
