export const luxeEase = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0 },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0 },
};

export const fadeScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const fadeClip = {
  hidden: { opacity: 0, y: 24, clipPath: 'inset(12% 0 0 0)' },
  visible: { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' },
};

export const directions = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  scale: fadeScale,
  clip: fadeClip,
};

export const luxeTransition = (delay = 0, duration = 0.85) => ({
  duration,
  delay,
  ease: luxeEase,
});

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

export const pageEnter = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
};

export const pageEnterReduced = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 1, y: 0 },
};
