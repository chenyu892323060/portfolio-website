'use client';

import { useEffect, useRef } from 'react';

type Point = { x: number; y: number; vx: number; vy: number };

const TRAIL_POINTS = 24;

export function FluidCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const root = document.documentElement;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.4;
    let lastX = targetX;
    let lastY = targetY;
    let speed = 0;
    let energy = 0;
    let lastMove = performance.now();

    const points: Point[] = Array.from({ length: TRAIL_POINTS }, () => ({ x: targetX, y: targetY, vx: 0, vy: 0 }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      root.style.setProperty('--mx-offset', `${(event.clientX / window.innerWidth - 0.5) * 36}px`);
      root.style.setProperty('--my-offset', `${(event.clientY / window.innerHeight - 0.5) * 28}px`);
      lastMove = performance.now();
      energy = Math.min(1, energy + 0.18);
    };

    const drawLayer = (lineWidth: number, blur: number, alpha: number) => {
      const gradient = ctx.createLinearGradient(points[0].x, points[0].y, points[points.length - 1].x, points[points.length - 1].y);
      gradient.addColorStop(0, `rgba(120,180,255,${alpha})`);
      gradient.addColorStop(0.38, `rgba(190,120,255,${alpha * 0.9})`);
      gradient.addColorStop(0.68, `rgba(140,255,210,${alpha * 0.88})`);
      gradient.addColorStop(1, `rgba(255,220,180,${alpha * 0.82})`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = lineWidth;
      ctx.shadowColor = 'rgba(140,180,255,0.42)';
      ctx.shadowBlur = blur;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length - 1; i += 1) {
        const xc = (points[i].x + points[i + 1].x) * 0.5;
        const yc = (points[i].y + points[i + 1].y) * 0.5;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      const tail = points[points.length - 1];
      ctx.lineTo(tail.x, tail.y);
      ctx.stroke();
    };

    const tick = () => {
      const head = points[0];
      const dx = targetX - lastX;
      const dy = targetY - lastY;
      speed = speed * 0.84 + Math.hypot(dx, dy) * 0.16;
      lastX = targetX;
      lastY = targetY;

      const idleMs = performance.now() - lastMove;
      const idleFade = Math.max(0, 1 - idleMs / 700);
      energy = Math.max(0, energy * 0.965 - 0.008);

      head.vx += (targetX - head.x) * 0.22;
      head.vy += (targetY - head.y) * 0.22;
      head.vx *= 0.7;
      head.vy *= 0.7;
      head.x += head.vx;
      head.y += head.vy;

      for (let i = 1; i < points.length; i += 1) {
        const prev = points[i - 1];
        const p = points[i];
        p.vx += (prev.x - p.x) * (0.19 - i * 0.0045);
        p.vy += (prev.y - p.y) * (0.19 - i * 0.0045);
        p.vx *= 0.7;
        p.vy *= 0.7;
        p.x += p.vx;
        p.y += p.vy;
      }

      ctx.clearRect(0, 0, width, height);

      const speedBoost = Math.min(1, speed / 28);
      const visible = Math.min(1, idleFade * (0.1 + energy + speedBoost * 0.55));
      if (visible > 0.01) {
        drawLayer(18 + speedBoost * 12, 28, 0.065 * visible);
        drawLayer(8 + speedBoost * 5, 12, 0.14 * visible);
        drawLayer(2.4 + speedBoost * 2, 4, 0.38 * visible);
      }

      raf = window.requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="fluid-cursor-trail" aria-hidden />;
}
