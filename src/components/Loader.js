import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Stagger,
  StaggerItem,
  INTRO_FLOOR_MS,
  INTRO_SPLIT_EVENT,
  INTRO_SWAP_MS,
} from './Stagger';
import { markIntroPlayed } from '../introState';

// A short terminal "boot" - echoes the hero's .EXE windows so the intro feels
// like part of the same world rather than a generic spinner.
const BOOT_LINES = [
  { txt: 'initializing interface', ok: true },
  { txt: 'loading design system', ok: true },
  { txt: 'mounting components', ok: true },
  { txt: 'ready', cursor: true },
];

const EASE = [0.22, 1, 0.36, 1];

// The hand-off only makes sense when there are hero cards to hand off to; on
// narrow screens they are hidden, so the loader keeps its curtain lift there.
function heroCardsVisible() {
  const layer = document.querySelector('.hero-floating-layer');
  return (
    !!layer &&
    getComputedStyle(layer).display !== 'none' &&
    document.querySelectorAll('.hero-window').length === 2
  );
}

export default function Loader() {
  const reduce = useReducedMotion();
  // boot -> handoff -> done (or boot -> done, the curtain lift)
  const [phase, setPhase] = useState('boot');
  const [pct, setPct] = useState(0);
  const rafRef = useRef(0);
  const termRef = useRef(null);

  // Lock scroll + schedule the end of the boot.
  useEffect(() => {
    markIntroPlayed();
    document.body.style.overflow = 'hidden';
    let doneTimer;
    const floor = setTimeout(() => {
      if (reduce || !heroCardsVisible() || !termRef.current) {
        // No cards to hand off to: lift the curtain, and still tell the hero
        // the boot is over so its text can start coming in.
        window.dispatchEvent(new CustomEvent(INTRO_SPLIT_EVENT, { detail: null }));
        setPhase('done');
        return;
      }
      // Tell the hero where the prompt is, so its two cards can appear on top
      // of it and glide apart from there; the prompt eases down to their size
      // and fades out underneath them.
      const r = termRef.current.getBoundingClientRect();
      window.dispatchEvent(
        new CustomEvent(INTRO_SPLIT_EVENT, {
          detail: { x: r.left, y: r.top, w: r.width, h: r.height },
        })
      );
      setPhase('handoff');
      doneTimer = setTimeout(() => setPhase('done'), INTRO_SWAP_MS + 120);
    }, reduce ? 280 : INTRO_FLOOR_MS);
    return () => {
      clearTimeout(floor);
      clearTimeout(doneTimer);
    };
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

  const handingOff = phase === 'handoff';

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = ''; }}>
      {phase !== 'done' && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          // After a hand-off there is nothing left to lift: the prompt has
          // already given way to the hero cards.
          exit={reduce ? { opacity: 0 } : handingOff ? { opacity: 0 } : { y: '-100%' }}
          transition={
            reduce ? { duration: 0.3 }
              : handingOff ? { duration: 0.12 }
              : { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }
          aria-hidden="true"
        >
          <motion.div
            className="loader-bg"
            initial={false}
            animate={{ opacity: handingOff ? 0 : 1 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <motion.div
            ref={termRef}
            className="loader-term"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            // it eases down to the cards' size and fades out under them
            animate={
              handingOff
                ? { opacity: 0, y: 0, scale: 0.7 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={
              handingOff
                ? { duration: INTRO_SWAP_MS / 1000, ease: EASE }
                : { duration: 0.55, ease: EASE }
            }
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
