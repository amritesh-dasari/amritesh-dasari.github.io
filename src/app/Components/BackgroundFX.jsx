"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";

// Atmosphere layer: film grain, drifting ember particles, a faint dot grid,
// and a cursor-following spotlight. Everything lives behind the content.
const BackgroundFX = () => {
  const grainRef = useRef(null);
  const emberRef = useRef(null);
  const [finePointer, setFinePointer] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const spotX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.6 });
  const spotY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.6 });
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${spotX}px ${spotY}px, rgba(245, 158, 11, 0.05), transparent 70%)`;

  // Static film grain, regenerated on resize.
  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const noise = Math.random() * 255;
        imageData.data[i] = noise;
        imageData.data[i + 1] = noise;
        imageData.data[i + 2] = noise;
        imageData.data[i + 3] = 10;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    let resizeTimer;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateNoise();
    };
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    resize();
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Ember particles drifting slowly upward, like sparks above a campfire story.
  useEffect(() => {
    const canvas = emberRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let rafId;
    let running = true;

    const spawn = () => {
      const count = Math.min(70, Math.floor(window.innerWidth / 24));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 0.6 + Math.random() * 1.3,
        speed: 0.08 + Math.random() * 0.22,
        sway: 0.2 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.08 + Math.random() * 0.22,
        amber: Math.random() < 0.4,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      spawn();
    };

    const tick = (t) => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.y -= p.speed;
        const x = p.x + Math.sin(t * 0.0006 + p.phase) * p.sway * 14;
        if (p.y < -8) {
          p.y = canvas.height + 8;
          p.x = Math.random() * canvas.width;
        }
        const twinkle = 0.65 + 0.35 * Math.sin(t * 0.0015 + p.phase * 3);
        ctx.beginPath();
        ctx.arc(x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.amber
          ? `rgba(245, 158, 11, ${p.alpha * twinkle})`
          : `rgba(250, 250, 250, ${p.alpha * twinkle * 0.6})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) rafId = requestAnimationFrame(tick);
      else cancelAnimationFrame(rafId);
    };

    resize();
    rafId = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Cursor spotlight only makes sense with a real pointer.
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setFinePointer(true);
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Film grain */}
      <canvas
        ref={grainRef}
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        aria-hidden="true"
      />

      {/* Drifting embers */}
      <canvas
        ref={emberRef}
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      />

      {/* Amber vignette at the top of the page */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.04) 0%, transparent 55%)'
        }}
        aria-hidden="true"
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
        aria-hidden="true"
      />

      {/* Cursor spotlight */}
      {finePointer && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-0"
          style={{ background: spotlight }}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default BackgroundFX;
