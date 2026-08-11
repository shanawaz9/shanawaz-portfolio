import React, { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { Stagger, StaggerItem, INTRO_REVEAL_DELAY } from './Stagger';

const CYCLE_WORDS = ['Curiosity', 'Empathy', 'Intent'];
const SCRAMBLE_CHARS = '◆○□△◇●■▲◈◉◎·—∙⬡✦◐◑';

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
            <span className="hero-window__chrome-btn">_</span>
            <span className="hero-window__chrome-btn">□</span>
            <span className="hero-window__chrome-btn hero-window__chrome-btn--x">×</span>
          </div>
        </div>
        <div className="hero-window__body hero-window__body--strategy">
          <p className="hw-head">BRIEF.MD</p>
          <div className="hw-rule" />
          <div className="hw-brief-rows">
            <div className="hw-brief-row">
              <span className="hw-brief-key">WHO</span>
              <span className="hw-brief-val">product teams</span>
            </div>
            <div className="hw-brief-row">
              <span className="hw-brief-key">PAIN</span>
              <span className="hw-brief-val">unclear flows</span>
            </div>
            <div className="hw-brief-row">
              <span className="hw-brief-key">GOAL</span>
              <span className="hw-brief-val">time to value</span>
            </div>
          </div>
          <div className="hw-rule" />
          <p className="hw-hmw">HMW: reduce friction?</p>
          <div className="hw-brief-status">
            <span aria-hidden="true">▶</span>
            <span>DEFINING</span>
            <span className="hw-cursor" aria-hidden="true">▋</span>
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
            <span className="hero-window__chrome-btn">_</span>
            <span className="hero-window__chrome-btn">□</span>
            <span className="hero-window__chrome-btn hero-window__chrome-btn--x">×</span>
          </div>
        </div>
        <div className="hero-window__body hero-window__body--process">
          <div className="hw-phases">
            <div className="hw-phase hw-phase--done">
              <span className="hw-phase__chk">[x]</span>
              <span className="hw-phase__lbl">DISCOVER</span>
            </div>
            <div className="hw-phase hw-phase--done">
              <span className="hw-phase__chk">[x]</span>
              <span className="hw-phase__lbl">DEFINE</span>
            </div>
            <div className="hw-phase hw-phase--now">
              <span className="hw-phase__chk">[&gt;]</span>
              <span className="hw-phase__lbl">DESIGN</span>
              <span className="hw-cursor" aria-hidden="true">▋</span>
            </div>
            <div className="hw-phase">
              <span className="hw-phase__chk">[ ]</span>
              <span className="hw-phase__lbl">DELIVER</span>
            </div>
          </div>
          <div className="hw-pbar">
            <span className="hw-pbar__lbl">PROGRESS</span>
            <div className="hw-pbar__track">
              <div className="hw-pbar__fill" />
            </div>
            <span className="hw-pbar__pct">67%</span>
          </div>
        </div>
      </>
    );
  }
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

  return (
    <div className="hero">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="hero-inner">
        <Stagger className="hero-text" onLoad stagger={0.12} delay={INTRO_REVEAL_DELAY}>
          <StaggerItem as="p" className="hero-eyebrow">Product Designer &middot; Hyderabad, India</StaggerItem>
          <StaggerItem as="h1" className="hero-title">
            Designing with
            <br />
            <span
              className={`accent hero-word${isScrambling ? ' scrambling' : ''}`}
              data-word={displayWord}
            >
              {displayWord}
            </span>
          </StaggerItem>
          <StaggerItem as="p" className="hero-desc">
            Hi, I'm <span className="name-mark">Shanawaz</span>. Generalist product designer
            crafting thoughtful, user-centered experiences across systems, stories, and interfaces.
          </StaggerItem>
          <StaggerItem className="hero-cta-wrap">
            <button className="hero-cta" onClick={handleConnectClick}>
              {ctaCopied ? 'Email Copied' : "Let's Connect"}
              <span className="hero-cta-icon" aria-hidden="true">
                &rarr;
              </span>
            </button>
          </StaggerItem>
        </Stagger>
        <Reveal as="div" className="hero-floating-layer" y={0} delay={INTRO_REVEAL_DELAY + 0.4} amount={0}>
          {FLOATING_WINDOWS.map((windowCard) => {
            const current = windowState[windowCard.id];

            return (
              <button
                key={windowCard.id}
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
        </Reveal>
      </div>
      <ConnectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
