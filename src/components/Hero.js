import React, { useEffect, useRef, useState } from 'react';

const RESUME_URL =
  'https://drive.google.com/file/d/1ov4QErnN8T8Xs9hYUNmKyrb5rfdHiw4L/view?usp=sharing';

function MacSVG() {
  return (
    <svg viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-mac" aria-hidden="true">
      {/* === Macintosh (slightly left-angled via skewY) === */}
      <g transform="translate(130, 60)">
        {/* Monitor body — tall rectangle with rounded top */}
        <rect x="0" y="0" width="260" height="240" rx="10" stroke="currentColor" strokeWidth="1.5"/>
        {/* Screen bezel */}
        <rect x="20" y="16" width="220" height="155" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        {/* Screen inner CRT */}
        <rect x="28" y="24" width="204" height="139" rx="6" stroke="currentColor" strokeWidth="0.75" opacity="0.35"/>
        {/* Screen content — hello text */}
        <text x="130" y="105" textAnchor="middle" fontFamily="'Silkscreen', cursive" fontSize="24" fill="currentColor" opacity="0.5">hello.</text>
        {/* Floppy drive slot */}
        <rect x="170" y="190" width="56" height="6" rx="3" stroke="currentColor" strokeWidth="1"/>
        {/* Apple logo placeholder */}
        <rect x="122" y="186" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        {/* Bottom chin lines */}
        <line x1="34" y1="210" x2="110" y2="210" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        <line x1="34" y1="214" x2="90" y2="214" stroke="currentColor" strokeWidth="0.5" opacity="0.15"/>
        {/* Ventilation lines on left */}
        <line x1="6" y1="40" x2="6" y2="60" stroke="currentColor" strokeWidth="0.75" opacity="0.25"/>
        <line x1="10" y1="40" x2="10" y2="60" stroke="currentColor" strokeWidth="0.75" opacity="0.25"/>
        <line x1="14" y1="40" x2="14" y2="60" stroke="currentColor" strokeWidth="0.75" opacity="0.25"/>

        {/* Base / Stand */}
        <rect x="30" y="250" width="200" height="22" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        {/* Stand foot */}
        <rect x="60" y="272" width="140" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>

        {/* Keyboard (flat, below stand) */}
        <rect x="-10" y="300" width="280" height="16" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        {/* Key rows */}
        <line x1="10" y1="308" x2="250" y2="308" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        {/* Individual key hints */}
        <rect x="4" y="302" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.25"/>
        <rect x="20" y="302" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.25"/>
        <rect x="36" y="302" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.25"/>
        <rect x="52" y="302" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.25"/>
        <rect x="100" y="302" width="60" height="6" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.25"/>
        <rect x="200" y="302" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.25"/>
        <rect x="216" y="302" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.25"/>
        <rect x="232" y="302" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.25"/>

        {/* Mouse (to the right of keyboard) */}
        <rect x="290" y="296" width="30" height="24" rx="10" stroke="currentColor" strokeWidth="1" opacity="0.45"/>
        <line x1="305" y1="296" x2="305" y2="308" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      </g>

      {/* === Floating UX/UI Icons (larger, pixelated style) === */}

      {/* Cursor icon — top left */}
      <g transform="translate(20, 40)" opacity="0.3" stroke="currentColor" strokeWidth="1.5" fill="none">
        <path d="M4 4 L4 28 L11 21 L19 28 L22 25 L15 18 L22 18 Z"/>
      </g>

      {/* Grid / Layout icon — top right */}
      <g transform="translate(460, 30)" opacity="0.3" stroke="currentColor" strokeWidth="1.5" fill="none">
        <rect x="0" y="0" width="12" height="12"/>
        <rect x="16" y="0" width="12" height="12"/>
        <rect x="0" y="16" width="12" height="12"/>
        <rect x="16" y="16" width="12" height="12"/>
      </g>

      {/* Wireframe / Browser icon — right center */}
      <g transform="translate(455, 200)" opacity="0.3" stroke="currentColor" strokeWidth="1.5" fill="none">
        <rect x="0" y="0" width="32" height="24" rx="2"/>
        <line x1="0" y1="7" x2="32" y2="7"/>
        <line x1="12" y1="7" x2="12" y2="24"/>
        <circle cx="4" cy="3.5" r="1.5"/>
        <circle cx="9" cy="3.5" r="1.5"/>
      </g>

      {/* Typography icon — bottom right */}
      <g transform="translate(460, 380)" opacity="0.3" fill="currentColor">
        <text fontFamily="'Cascadia Code', monospace" fontSize="24" stroke="none">Aa</text>
      </g>

      {/* Component / Layers icon — bottom left */}
      <g transform="translate(20, 380)" opacity="0.3" stroke="currentColor" strokeWidth="1.5" fill="none">
        <rect x="0" y="8" width="20" height="14" rx="2"/>
        <rect x="5" y="3" width="20" height="14" rx="2"/>
        <rect x="10" y="-2" width="20" height="14" rx="2"/>
      </g>

      {/* Pen tool / Bezier icon — left center */}
      <g transform="translate(16, 200)" opacity="0.3" stroke="currentColor" strokeWidth="1.5" fill="none">
        <path d="M16 2 L28 22 L16 30 L4 22 Z"/>
        <circle cx="16" cy="16" r="3"/>
      </g>

      {/* Color palette / circles — top center-left */}
      <g transform="translate(60, 10)" opacity="0.2" stroke="currentColor" strokeWidth="1.5" fill="none">
        <circle cx="8" cy="8" r="7"/>
        <circle cx="22" cy="8" r="7"/>
        <circle cx="15" cy="20" r="7"/>
      </g>

      {/* Pixel grid — bottom center */}
      <g transform="translate(210, 460)" opacity="0.2" stroke="currentColor" strokeWidth="1" fill="none">
        <rect x="0" y="0" width="8" height="8"/><rect x="8" y="0" width="8" height="8"/><rect x="16" y="0" width="8" height="8"/>
        <rect x="0" y="8" width="8" height="8"/><rect x="8" y="8" width="8" height="8" fill="currentColor" opacity="0.15"/><rect x="16" y="8" width="8" height="8"/>
        <rect x="0" y="16" width="8" height="8"/><rect x="8" y="16" width="8" height="8"/><rect x="16" y="16" width="8" height="8"/>
      </g>
    </svg>
  );
}

function ConnectModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="connect-backdrop" onClick={onClose} />
      <div className="connect-modal" role="dialog" aria-modal="true">
        <button className="connect-modal-close" onClick={onClose} aria-label="Close">&times;</button>
        <p className="section-label">Get in touch</p>
        <h3 className="connect-modal-title">{"Let's Connect"}</h3>
        <div className="connect-modal-links">
          <a href="https://www.linkedin.com/in/shanawaz-hussain-42335b12b" target="_blank" rel="noreferrer" className="connect-modal-link">
            <span className="connect-modal-icon">in</span>
            <span>LinkedIn</span>
          </a>
          <a href="mailto:shanawazhussain989@gmail.com" className="connect-modal-link">
            <span className="connect-modal-icon">@</span>
            <span>Email</span>
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
  const textRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      textRef.current?.classList.add('visible');
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="hero-inner">
        <div className="hero-text anim" ref={textRef}>
          <p className="hero-eyebrow">Product Designer &middot; Hyderabad, India</p>
          <h1 className="hero-title">
            Designing with<br /><span className="accent">Curiosity</span>
          </h1>
          <p className="hero-desc">
            Hi, I'm Shanawaz. Generalist product designer crafting thoughtful, user-centered
            experiences across systems, stories, and interfaces.
          </p>
          <div className="hero-cta-wrap">
            <button
              className="hero-cta"
              onClick={() => setModalOpen(true)}
            >
              Let's Connect
              <span className="hero-cta-icon" aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
      <ConnectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
