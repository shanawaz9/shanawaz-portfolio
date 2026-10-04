import { motion, useReducedMotion } from 'motion/react';

// Shared motion language - calm, premium, with gentle spring physics (minimal overshoot).
export const SPRING = { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 };
export const EASE_OUT = [0.22, 1, 0.36, 1];

// Intro timing - keeps the loader (MS Paint boot) and the hero entrance in sync.
// The loader runs a 1→100 count for ~4.5s; the hero text starts rising just before
// the curtain lifts, so the reveal feels continuous.
export const INTRO_FLOOR_MS = 4500;
export const INTRO_REVEAL_DELAY = 4.3;

// Loader -> hero hand-off. When the boot finishes, the loader's prompt
// announces where it is (INTRO_SPLIT_EVENT) and fades as it shrinks; the hero's
// two window cards appear stacked on that spot and glide apart to their resting
// places over INTRO_HANDOFF_MS.
export const INTRO_SPLIT_EVENT = 'intro:split';
export const INTRO_HANDOFF_MS = 1450;
// how long the prompt takes to give way to the two cards on the same spot
export const INTRO_SWAP_MS = 420;

// A single child's entrance: soft fade + small rise, on a gentle spring.
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

const containerVariants = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/**
 * Stagger orchestrator. Reveals its <StaggerItem> children one after another.
 * - Scroll-triggered by default; pass `onLoad` for above-the-fold sequences.
 * - Fully respects prefers-reduced-motion (renders a plain element, no animation).
 */
export function Stagger({
  as = 'div',
  stagger = 0.09,
  delay = 0.04,
  amount = 0.2,
  once = true,
  onLoad = false,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain = as;
    return <Plain {...rest}>{children}</Plain>;
  }

  const MotionTag = motion[as] || motion.div;
  const trigger = onLoad
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once, amount } };

  return (
    <MotionTag initial="hidden" {...trigger} variants={containerVariants(stagger, delay)} {...rest}>
      {children}
    </MotionTag>
  );
}

/** A single staggered child - inherits its timing from the parent <Stagger>. */
export function StaggerItem({ as = 'div', children, ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain = as;
    return <Plain {...rest}>{children}</Plain>;
  }

  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag variants={itemVariants} {...rest}>
      {children}
    </MotionTag>
  );
}
