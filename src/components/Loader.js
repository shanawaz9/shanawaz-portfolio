import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Stagger, StaggerItem, INTRO_FLOOR_MS } from './Stagger';

// A short terminal "boot" — echoes the hero's .EXE windows so the intro feels
// like part of the same world rather than a generic spinner.
const BOOT_LINES = [
  { txt: 'initializing interface', ok: true },
  { txt: 'loading design system', ok: true },
  { txt: 'mounting components', ok: true },
  { txt: 'ready', cursor: true },
];

export default function Loader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  const rafRef = useRef(0);

  // Lock scroll + schedule the curtain lift.
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const floor = setTimeout(() => setDone(true), reduce ? 280 : INTRO_FLOOR_MS);
    return () => clearTimeout(floor);
  }, [reduce]);

  // Live 1 → 100 count, eased over the full loader window; drives the progress bar too.
  useEffect(() => {
    if (reduce) {
      setPct(100);
      return undefined;
    }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / INTRO_FLOOR_MS);
      setPct(Math.max(1, Math.round(p * 100)));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reduce]);

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = ''; }}>
      {!done && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: '-100%' }}
          transition={reduce ? { duration: 0.3 } : { duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="loader-term"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="loader-term__bar">
              <span className="loader-term__dots" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span className="loader-term__name">SHANAWAZ.EXE</span>
            </div>
            <Stagger className="loader-term__body" onLoad stagger={0.13} delay={0.25}>
              {BOOT_LINES.map((line, i) => (
                <StaggerItem className="loader-line" key={i}>
                  <span className="loader-line__caret">&gt;</span>
                  <span className="loader-line__txt">
                    {line.txt}
                    {line.cursor && <span className="loader-cursor" aria-hidden="true">▋</span>}
                  </span>
                  {line.ok && <span className="loader-line__ok">[ok]</span>}
                </StaggerItem>
              ))}
              <StaggerItem className="loader-term__progress">
                <span className="loader-bar">
                  <span className="loader-bar-fill" style={{ width: `${pct}%` }} />
                </span>
                <span className="loader-term__pct">{pct}%</span>
              </StaggerItem>
            </Stagger>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
