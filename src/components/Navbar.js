import React, { useState, useCallback } from 'react';

const RESUME_URL =
  'https://drive.google.com/file/d/1ykbOksFk2TVq_DqjcCJnp0pBTNzEd-_X/view?usp=sharing';

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const nextMode = theme === 'light' ? 'dark' : 'light';

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
          <li>
            <button
              className="theme-toggle"
              onClick={onToggleTheme}
              aria-label={`Switch to ${nextMode} mode`}
              title={`Switch to ${nextMode} mode`}
            >
              {theme === 'light' ? '[ dark ]' : '[ light ]'}
            </button>
          </li>
        </ul>
        <div className="nav-right-mobile">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${nextMode} mode`}
            title={`Switch to ${nextMode} mode`}
          >
            {theme === 'light' ? '[ dark ]' : '[ light ]'}
          </button>
          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
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
