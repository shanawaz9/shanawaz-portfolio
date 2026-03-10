import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const textRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      textRef.current?.classList.add('visible');
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hero">
      <div className="hero-image">
        <img
          src="https://framerusercontent.com/images/8WxXcBdyNXGUMsq5iT0VwcAjvU.png"
          alt="Hero visual"
        />
        <div className="hero-image-overlay"></div>
      </div>
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
      </div>
    </div>
  );
}
