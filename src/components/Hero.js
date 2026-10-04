import React, { useEffect, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'motion/react';
import Reveal from './Reveal';
import {
  Stagger,
  StaggerItem,
  INTRO_REVEAL_DELAY,
  INTRO_FLOOR_MS,
  INTRO_SPLIT_EVENT,
  INTRO_HANDOFF_MS,
  INTRO_SWAP_MS,
} from './Stagger';
import { PLAY_INTRO } from '../introState';

const CYCLE_WORDS = ['Curiosity', 'Empathy', 'Intent'];
const SCRAMBLE_CHARS = '◆○□△◇●■▲◈◉◎·∙⬡✦◐◑';

const RESUME_URL =
  'https://drive.google.com/file/d/17dqLMiZSPHW2qX38N2fS5N0pazbWhBv8/view?usp=sharing';
const EMAIL_ADDRESS = 'shanawazhussain989@gmail.com';
const FLOATING_WINDOWS = [
  {
    id: 'strategy',
    title: 'Strategy',
    className: 'hero-window hero-window--strategy',
    rotation: '-5deg',
    label: 'STRATEGY.EXE',
    initialZ: 3,
  },
  {
    id: 'process',
    title: 'Process',
    className: 'hero-window hero-window--process',
    rotation: '4deg',
    label: 'PROCESS.EXE',
    initialZ: 2,
  },
];

function HeroWindowGraphic({ id, label }) {
  if (id === 'strategy') {
    return (
      <>
        <div className="hero-window__chrome">
          <span className="hero-window__name">{label}</span>
          <div className="hero-window__chrome-btns" aria-hidden="true">
            <span className="hero-window__chrome-btn" />
            <span className="hero-window__chrome-btn" />
            <span className="hero-window__chrome-btn" />
          </div>
        </div>
        <div className="hero-window__body hero-window__body--strategy">
          <div className="hw-phases">
            <div className="hw-phase hw-phase--done hw-metric">
              <span className="hw-phase__chk" />
              <span className="hw-phase__lbl">Conversion</span>
              <span className="hw-metric__val">2%</span>
            </div>
            <div className="hw-phase hw-phase--done hw-metric">
              <span className="hw-phase__chk" />
              <span className="hw-phase__lbl">Target</span>
              <span className="hw-metric__val">4%</span>
            </div>
            <div className="hw-phase hw-phase--done hw-metric">
              <span className="hw-phase__chk" />
              <span className="hw-phase__lbl">Framework</span>
              <span className="hw-metric__val">C-Trust</span>
            </div>
            <div className="hw-phase hw-phase--now">
              <span className="hw-phase__chk" />
              <span className="hw-phase__lbl">Activation</span>
              <span className="hw-cursor" aria-hidden="true" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (id === 'process') {
    return (
      <>
        <div className="hero-window__chrome">
          <span className="hero-window__name">{label}</span>
          <div className="hero-window__chrome-btns" aria-hidden="true">
            <span className="hero-window__chrome-btn" />
            <span className="hero-window__chrome-btn" />
            <span className="hero-window__chrome-btn" />
          </div>
        </div>
        <div className="hero-window__body hero-window__body--process">
          <div className="hw-phases">
            <div className="hw-phase hw-phase--done">
              <span className="hw-phase__chk" />
              <span className="hw-phase__lbl">Discover</span>
            </div>
            <div className="hw-phase hw-phase--done">
              <span className="hw-phase__chk" />
              <span className="hw-phase__lbl">Define</span>
            </div>
            <div className="hw-phase hw-phase--now">
              <span className="hw-phase__chk" />
              <span className="hw-phase__lbl">Design</span>
              <span className="hw-cursor" aria-hidden="true" />
            </div>
            <div className="hw-phase">
              <span className="hw-phase__chk" />
              <span className="hw-phase__lbl">Deliver</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// First-visit hero text: held back until the cards have left the prompt, then
// each line fades and rises into place, slowly, one after another. Opacity and
// transform only, so it stays on the GPU alongside the cards' glide.
const HERO_TEXT_SLOW = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

function RevealLayer(props) {
  return <Reveal as="div" {...props} />;
}

// eslint-disable-next-line no-unused-vars
function PlainLayer({ y, delay, amount, ...rest }) {
  return <div {...rest} />;
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function ConnectModal({ open, onClose }) {
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!emailCopied) return undefined;
    const timer = setTimeout(() => setEmailCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [emailCopied]);

  const handleEmailCopy = async (e) => {
    e.preventDefault();
    await copyToClipboard(EMAIL_ADDRESS);
    setEmailCopied(true);
  };

  if (!open) return null;

  return (
    <>
      <div className="connect-backdrop" onClick={onClose} />
      <div className="connect-modal" role="dialog" aria-modal="true">
        <button className="connect-modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <p className="section-label">Get in touch</p>
        <h3 className="connect-modal-title">{"Let's Connect"}</h3>
        <div className="connect-modal-links">
          <a
            href="https://www.linkedin.com/in/shanawaz-hussain-42335b12b"
            target="_blank"
            rel="noreferrer"
            className="connect-modal-link"
          >
            <span className="connect-modal-icon">in</span>
            <span>LinkedIn</span>
          </a>
          <a href={`mailto:${EMAIL_ADDRESS}`} className="connect-modal-link" onClick={handleEmailCopy}>
            <span className="connect-modal-icon">@</span>
            <span>{emailCopied ? 'Email copied' : 'Email'}</span>
          </a>
          <a href={RESUME_URL} target="_blank" rel="noreferrer" className="connect-modal-link">
            <span className="connect-modal-icon">&darr;</span>
            <span>Resume</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default function Hero() {
  const dragStateRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [ctaCopied, setCtaCopied] = useState(false);
  const [displayWord, setDisplayWord] = useState(CYCLE_WORDS[0]);
  const [isScrambling, setIsScrambling] = useState(false);
  const [windowState, setWindowState] = useState(() =>
    FLOATING_WINDOWS.reduce((acc, window) => {
      acc[window.id] = { x: 0, y: 0, z: window.initialZ };
      return acc;
    }, {})
  );
  const wordIndexRef = useRef(0);
  const windowRefs = useRef({});
  const reduce = useReducedMotion();
  // On a first visit the two cards are born from the loader's prompt: they stay
  // hidden until the boot ends, then appear stacked on the prompt and glide
  // apart to their resting places.
  const splitIntro = PLAY_INTRO && !reduce;
  const [awaitingSplit, setAwaitingSplit] = useState(splitIntro);
  // While the cards travel out from the centre they cross the headline, so
  // they ride above it until they land.
  const [splitting, setSplitting] = useState(false);
  // ...and the hero text waits for that moment too, then fades in behind them.
  const [heroTextShown, setHeroTextShown] = useState(!splitIntro);

  useEffect(() => {
    if (!awaitingSplit) return undefined;

    const onSplit = (event) => {
      const prompt = event.detail;
      // The loader lifted like a curtain instead (no cards on screen to hand
      // off to): just bring the hero in.
      if (!prompt) {
        setHeroTextShown(true);
        setAwaitingSplit(false);
        return;
      }
      const flights = [];
      FLOATING_WINDOWS.forEach((windowCard, i) => {
        const el = windowRefs.current[windowCard.id];
        if (!el || !prompt) return;
        // Both cards start whole, stacked on the prompt's centre, and glide
        // apart from there. A rotation spins a card about its centre, so the
        // centre of its bounding box is its true resting centre.
        const rest = el.getBoundingClientRect();
        const dx = prompt.x + prompt.w / 2 - (rest.left + rest.width / 2);
        const dy = prompt.y + prompt.h / 2 - (rest.top + rest.height / 2);
        // they come out of the prompt a touch smaller, and grow as they glide
        const onPrompt = `translate3d(${dx}px, ${dy}px, 0) rotate(0deg) scale(0.9)`;
        const atRest = `translate3d(0px, 0px, 0) rotate(${windowCard.rotation}) scale(1)`;
        // A critically damped spring (no bounce): it leaves the prompt softly,
        // glides and settles without overshoot. Motion turns the spring into a
        // CSS linear() curve on the Web Animations API, so the glide runs on
        // the compositor and stays smooth while the page is still busy
        // mounting. The second card trails by a beat.
        const glide = animate(
          el,
          { transform: [onPrompt, atRest], opacity: [0, 1] },
          {
            transform: { type: 'spring', visualDuration: INTRO_HANDOFF_MS / 1000, bounce: 0, delay: i * 0.09 },
            opacity: { duration: INTRO_SWAP_MS / 1000, ease: 'easeOut' },
          }
        );
        // Motion writes the final values inline as it finishes; a frame later,
        // hand the card back to its stylesheet, where its drag offset and tilt
        // live (the values are identical, so nothing visibly changes).
        flights.push(
          new Promise((resolve) => {
            glide.then(() => requestAnimationFrame(() => {
              el.style.transform = '';
              el.style.opacity = '';
              resolve();
            }));
          })
        );
      });
      setSplitting(true);
      setHeroTextShown(true);
      Promise.all(flights).then(() => setSplitting(false));
      setAwaitingSplit(false);
    };

    window.addEventListener(INTRO_SPLIT_EVENT, onSplit);
    // If the loader never splits (it lifts like a curtain where the cards are
    // hidden), don't leave the cards waiting.
    const fallback = setTimeout(() => {
      setAwaitingSplit(false);
      setHeroTextShown(true);
    }, INTRO_FLOOR_MS + 3000);
    return () => {
      window.removeEventListener(INTRO_SPLIT_EVENT, onSplit);
      clearTimeout(fallback);
    };
  }, [awaitingSplit]);

  useEffect(() => {
    let cycleTimer;
    let scrambleTimer;
    let active = true;

    const scrambleTo = (target) => {
      if (!active) return;
      setIsScrambling(true);
      let frame = 0;
      const totalFrames = 14;
      clearInterval(scrambleTimer);
      scrambleTimer = setInterval(() => {
        if (!active) { clearInterval(scrambleTimer); return; }
        frame++;
        if (frame >= totalFrames) {
          clearInterval(scrambleTimer);
          setDisplayWord(target);
          setIsScrambling(false);
          return;
        }
        const revealed = Math.floor((frame / totalFrames) * target.length);
        setDisplayWord(
          target.slice(0, revealed) +
          Array.from({ length: target.length - revealed }, () =>
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          ).join('')
        );
      }, 26);
    };

    cycleTimer = setInterval(() => {
      wordIndexRef.current = (wordIndexRef.current + 1) % CYCLE_WORDS.length;
      scrambleTo(CYCLE_WORDS[wordIndexRef.current]);
    }, 2800);

    return () => {
      active = false;
      clearInterval(cycleTimer);
      clearInterval(scrambleTimer);
    };
  }, []);

  useEffect(() => {
    if (!ctaCopied) return undefined;
    const timer = setTimeout(() => setCtaCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [ctaCopied]);

  const handleConnectClick = async () => {
    await copyToClipboard(EMAIL_ADDRESS);
    setCtaCopied(true);
    setModalOpen(true);
  };

  const handleWindowPointerDown = (id) => (event) => {
    if (!event.isPrimary) return;

    dragStateRef.current = {
      id,
      startX: event.clientX,
      startY: event.clientY,
      originX: windowState[id].x,
      originY: windowState[id].y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);

    setWindowState((prev) => {
      const nextZ = Math.max(...Object.values(prev).map((item) => item.z)) + 1;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          z: nextZ,
        },
      };
    });
  };

  const handleWindowPointerMove = (id) => (event) => {
    const activeDrag = dragStateRef.current;
    if (!activeDrag || activeDrag.id !== id) return;

    const deltaX = event.clientX - activeDrag.startX;
    const deltaY = event.clientY - activeDrag.startY;

    setWindowState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        x: activeDrag.originX + deltaX,
        y: activeDrag.originY + deltaY,
      },
    }));
  };

  const handleWindowPointerEnd = (id) => (event) => {
    if (dragStateRef.current?.id === id) {
      dragStateRef.current = null;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  // The hero waits for the boot curtain only when the curtain is actually there.
  const revealDelay = PLAY_INTRO ? INTRO_REVEAL_DELAY : 0.05;
  // The split animates the cards itself, so the layer must not also fade in.
  const FloatingLayer = splitIntro ? PlainLayer : RevealLayer;
  const textItem = splitIntro ? { variants: HERO_TEXT_SLOW } : {};

  return (
    <div className="hero">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="hero-inner">
        <Stagger
          className="hero-text"
          onLoad
          {...(splitIntro
            ? { stagger: 0.16, delay: 0.55, animate: heroTextShown ? 'show' : 'hidden' }
            : { stagger: 0.12, delay: revealDelay })}
        >
          <StaggerItem as="p" className="hero-eyebrow" {...textItem}>Product Designer &middot; Hyderabad, India</StaggerItem>
          <StaggerItem as="h1" className="hero-title" {...textItem}>
            Designing with
            <br />
            <span
              className={`accent hero-word${isScrambling ? ' scrambling' : ''}`}
              data-word={displayWord}
            >
              {displayWord}
            </span>
          </StaggerItem>
          <StaggerItem as="p" className="hero-desc" {...textItem}>
            Hi, I'm <span className="name-mark">Shanawaz</span>. Generalist product designer
            crafting thoughtful, user-centered experiences across systems, stories, and interfaces.
          </StaggerItem>
          <StaggerItem className="hero-cta-wrap" {...textItem}>
            <button className={`hero-cta${ctaCopied ? ' is-copied' : ''}`} onClick={handleConnectClick}>
              {ctaCopied ? 'Email Copied' : "Let's Connect"}
              <span className="hero-cta-icon" aria-hidden="true">
                &rarr;
              </span>
            </button>
          </StaggerItem>
        </Stagger>
        <FloatingLayer
          className={`hero-floating-layer${awaitingSplit ? ' is-awaiting-split' : ''}${splitting ? ' is-splitting' : ''}`}
          y={0}
          delay={revealDelay + 0.4}
          amount={0}
        >
          {FLOATING_WINDOWS.map((windowCard) => {
            const current = windowState[windowCard.id];

            return (
              <button
                key={windowCard.id}
                ref={(el) => { windowRefs.current[windowCard.id] = el; }}
                type="button"
                className={windowCard.className}
                onPointerDown={handleWindowPointerDown(windowCard.id)}
                onPointerMove={handleWindowPointerMove(windowCard.id)}
                onPointerUp={handleWindowPointerEnd(windowCard.id)}
                onPointerCancel={handleWindowPointerEnd(windowCard.id)}
                style={{
                  '--window-offset-x': `${current.x}px`,
                  '--window-offset-y': `${current.y}px`,
                  '--window-rotation': windowCard.rotation,
                  zIndex: current.z,
                }}
                aria-label={`Drag ${windowCard.title} card`}
              >
                <span className="sr-only">{windowCard.title}</span>
                <HeroWindowGraphic id={windowCard.id} label={windowCard.label} />
              </button>
            );
          })}
        </FloatingLayer>
      </div>
      <ConnectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
