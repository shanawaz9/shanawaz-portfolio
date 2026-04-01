import React, { useEffect, useRef, useState } from 'react';

const RESUME_URL =
  'https://drive.google.com/file/d/1keXLOyPMbeusGi4czz1AJGL0bs92SzYy/view?usp=sharing';

function ConnectModal({ open, onClose }) {
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
            Designing with
            <br />
            <span className="accent">Curiosity</span>
          </h1>
          <p className="hero-desc">
            Hi, I'm Shanawaz. Generalist product designer crafting thoughtful, user-centered
            experiences across systems, stories, and interfaces.
          </p>
          <div className="hero-cta-wrap">
            <button className="hero-cta" onClick={() => setModalOpen(true)}>
              Let's Connect
              <span className="hero-cta-icon" aria-hidden="true">
                &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>
      <ConnectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
