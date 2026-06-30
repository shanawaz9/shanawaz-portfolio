import { motion, useReducedMotion } from 'motion/react';
import { SPRING } from './Stagger';

/**
 * Scroll-triggered reveal built on Framer Motion.
 * Soft-fades + drifts into view once on a gentle spring, and fully respects
 * prefers-reduced-motion (no transform/opacity animation when the user opts out).
 *
 * Usage:
 *   <Reveal as="section" className="philosophy">...</Reveal>
 *   <Reveal as="h2" delay={0.05} x={-24} y={0}>...</Reveal>
 */
export default function Reveal({
  as = 'div',
  delay = 0,
  x = 0,
  y = 24,
  once = true,
  amount = 0.2,
  children,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag {...rest}>{children}</Tag>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ ...SPRING, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
