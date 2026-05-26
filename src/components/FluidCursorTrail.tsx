'use client';

import { useEffect, useRef } from 'react';

type P = { x: number; y: number };

export function FluidCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let alpha = 0;
    let speed = 0;
    let lastMove = performance.now();
    const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3 };
    let prev = { ...target };
    const points: P[] = Array.from({ length: 24 }, () => ({ ...target }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const root = document.documentElement;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      speed = Math.min(1, Math.hypot(dx, dy) / 26);
      prev = { x: e.clientX, y: e.clientY };
      alpha = Math.min(1, alpha + 0.16);
      root.style.setProperty('--mx-offset', `${(e.clientX / window.innerWidth - 0.5) * 36}px`);
      root.style.setProperty('--my-offset', `${(e.clientY / window.innerHeight - 0.5) * 28}px`);
      lastMove = performance.now();
    };

    const drawRibbon = (width: number, blur: number, a: number) => {
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = blur;
      const g = ctx.createLinearGradient(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y);
      g.addColorStop(0, `rgba(120,180,255,${a * 0.9})`);
      g.addColorStop(0.35, `rgba(190,120,255,${a})`);
      g.addColorStop(0.68, `rgba(140,255,210,${a * 0.95})`);
      g.addColorStop(1, `rgba(255,220,180,${a * 0.75})`);
      ctx.strokeStyle = g;
      ctx.shadowColor = `rgba(146,188,255,${a})`;

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i += 1) {
        const cx = (points[i].x + points[i + 1].x) * 0.5;
        const cy = (points[i].y + points[i + 1].y) * 0.5;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cx, cy);
      }
      ctx.stroke();
    };

    const loop = () => {
      if (!running) return;
      const now = performance.now();
      if (now - lastMove > 90) alpha *= 0.96;
      const lead = points[0];
      lead.x += (target.x - lead.x) * 0.22;
      lead.y += (target.y - lead.y) * 0.22;
      for (let i = 1; i < points.length; i += 1) {
        points[i].x += (points[i - 1].x - points[i].x) * (0.2 - i * 0.004);
        points[i].y += (points[i - 1].y - points[i].y) * (0.2 - i * 0.004);
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (alpha > 0.015) {
        const energy = Math.min(1, 0.35 + speed * 1.4);
        drawRibbon(18 + speed * 14, 28, alpha * 0.12 * energy);
        drawRibbon(8 + speed * 6, 12, alpha * 0.26 * energy);
        drawRibbon(2.2 + speed * 2, 4, alpha * 0.7 * energy);
      }
      speed *= 0.93;
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-ribbon" aria-hidden />;
}
