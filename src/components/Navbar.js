import React, { useState, useCallback } from 'react';

const RESUME_URL =
  'https://drive.google.com/file/d/1ov4QErnN8T8Xs9hYUNmKyrb5rfdHiw4L/view?usp=sharing';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <nav>
        <div className="nav-logo">Shanawaz</div>
        <ul className="nav-links">
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href={RESUME_URL} target="_blank" rel="noreferrer" className="resume-btn">
              Resume &#8599;
            </a>
          </li>
        </ul>
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        style={{ display: menuOpen ? 'flex' : 'none' }}
      >
        <a href="#work" onClick={closeMenu}>
          Work
        </a>
        <a href="#about" onClick={closeMenu}>
          About
        </a>
        <a href={RESUME_URL} target="_blank" rel="noreferrer">
          Resume &#8599;
        </a>
      </div>
    </>
  );
}
