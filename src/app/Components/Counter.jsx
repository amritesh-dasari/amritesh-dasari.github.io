"use client";
import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { EASE } from '../lib/animations';

// Counts up from 0 when scrolled into view.
const Counter = ({ to, suffix = '', duration = 1.8 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

export default Counter;
