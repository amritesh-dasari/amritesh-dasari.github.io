// Shared Framer Motion animation grammar for the storytelling redesign.
// Every section speaks the same motion language: masked reveals, soft
// vertical drift, and one signature ease.

export const EASE = [0.22, 1, 0.36, 1];

export const VIEWPORT = { once: true, amount: 0.25 };
export const VIEWPORT_SHALLOW = { once: true, amount: 0.1 };

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE }
  }
};

export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Rises while un-blurring — used for hero copy and epigraph lines.
export const blurUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE }
  }
};

// Spring pop for timeline nodes and small badges.
export const popIn = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 18 }
  }
};

export const slideLeft = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE }
  }
};

export const slideRight = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE }
  }
};

export const lineScaleX = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.2, ease: EASE }
  }
};

export const lineScaleY = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1, ease: EASE }
  }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

// Parameterised stagger when a section needs its own rhythm.
export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren }
  }
});

// Masked text reveals — pair these with an `overflow-hidden` wrapper span.
export const maskUp = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: EASE }
  }
};

export const letterMaskUp = {
  hidden: { y: '110%', rotate: 6 },
  visible: {
    y: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: EASE }
  }
};
