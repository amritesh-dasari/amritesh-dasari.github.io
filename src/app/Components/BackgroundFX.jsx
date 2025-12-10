"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const randomRange = (min, max) => Math.random() * (max - min) + min;

const createParticles = (count = 28) =>
  Array.from({ length: count }).map((_, idx) => {
    const size = randomRange(4, 7);
    const driftX = randomRange(10, 18) * (Math.random() > 0.5 ? 1 : -1);
    const driftY = randomRange(10, 18) * (Math.random() > 0.5 ? 1 : -1);
    return {
      top: `${randomRange(6, 92)}%`,
      left: `${randomRange(6, 94)}%`,
      size,
      delay: randomRange(0, 3),
      duration: randomRange(7, 11) + idx * 0.08,
      xPath: [0, driftX, -driftX * 0.6, 0],
      yPath: [0, driftY * -0.6, driftY, 0],
      opacity: [0.26, 0.52, 0.36, 0.26],
    };
  });

const createOrbs = () => [
  {
    style: { top: "-10%", left: "-12%", size: 360 },
    path: {
      x: [0, randomRange(22, 42), randomRange(-28, -12), 0],
      y: [0, randomRange(-26, -12), randomRange(14, 28), 0],
    },
    duration: randomRange(18, 24),
    colors: "bg-[radial-gradient(circle_at_30%_30%,rgba(96,165,250,0.32),rgba(76,29,149,0))]",
  },
  {
    style: { bottom: "-18%", right: "-12%", size: 420 },
    path: {
      x: [0, randomRange(-34, -18), randomRange(16, 30), 0],
      y: [0, randomRange(18, 30), randomRange(-18, -12), 0],
    },
    duration: randomRange(20, 28),
    colors: "bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.26),rgba(59,130,246,0))]",
  },
  {
    style: { top: "32%", right: "20%", size: 260 },
    path: {
      x: [0, randomRange(12, 24), randomRange(-16, -8), 0],
      y: [0, randomRange(-18, -10), randomRange(12, 22), 0],
    },
    duration: randomRange(18, 24),
    colors: "bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),rgba(236,72,153,0))]",
  },
];

const BackgroundFX = () => {
  const [particles, setParticles] = useState([]);
  const [orbs, setOrbs] = useState([]);

  useEffect(() => {
    // Generate random paths only on the client to avoid SSR hydration mismatch
    setParticles(createParticles(30));
    setOrbs(createOrbs());
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Orbs */}
      {orbs.map((orb, idx) => (
        <motion.div
          key={idx}
          className={`absolute rounded-full blur-3xl ${orb.colors}`}
          style={{
            width: orb.style.size,
            height: orb.style.size,
            ...orb.style,
          }}
          animate={{ x: orb.path.x, y: orb.path.y }}
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Particle dust */}
      {particles.map((particle, idx) => (
        <motion.span
          key={idx}
          className="absolute rounded-full bg-white/40 mix-blend-screen shadow-[0_0_16px_rgba(255,255,255,0.35)]"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
            opacity: 0.32,
          }}
          animate={{
            x: particle.xPath,
            y: particle.yPath,
            opacity: particle.opacity,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundFX;
