import { useEffect, useState, useCallback, useRef } from 'react';
import './index.css';
import PHOTOS from './photos';
import Loader from './components/Loader';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ticker from './components/Ticker';
import Timeline from './components/Timeline';
import WorkGrid from './components/WorkGrid';
import Blog from './components/Blog';
import About from './components/About';
import PhotoStrip from './components/PhotoStrip';
import Lightbox from './components/Lightbox';
import Testimonials from './components/Testimonials';
import Philosophy from './components/Philosophy';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Popover from './components/Popover';

export default function App() {
  // Light mode disabled for now — force dark regardless of any stored preference.
  const [theme, setTheme] = useState('dark');
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverText, setPopoverText] = useState('');
  // Remembers the element that opened a modal, so focus returns there on close.
  const lastFocusRef = useRef(null);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      document.documentElement.setAttribute('data-theme', next);
      document.querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', next === 'dark' ? '#0e0c0a' : '#f8f7f4');
      return next;
    });
  }, []);

  // Light mode disabled for now — pin the document to dark on mount and clear any stale preference.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#0e0c0a');
    localStorage.setItem('theme', 'dark');
  }, []);

  // Global scroll-in animation observer
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
      },
      { threshold: 0.08 }
    );
    const observe = () => {
      document.querySelectorAll('.anim:not(.visible)').forEach((el) => io.observe(el));
    };
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, []);

  const openLightbox = useCallback((i) => { lastFocusRef.current = document.activeElement; setLbIndex(i); setLbOpen(true); }, []);
  const closeLightbox = useCallback(() => { setLbOpen(false); lastFocusRef.current?.focus?.(); }, []);
  const lbPrev = useCallback(() => setLbIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length), []);
  const lbNext = useCallback(() => setLbIndex((i) => (i + 1) % PHOTOS.length), []);

  const openPopover = useCallback((text) => {
    lastFocusRef.current = document.activeElement;
    setPopoverText(text);
    setPopoverOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);
  const closePopover = useCallback(() => {
    setPopoverOpen(false);
    document.body.style.overflow = '';
    lastFocusRef.current?.focus?.();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Loader />
      <CursorGlow />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Ticker />
        <Timeline />
        <WorkGrid />
        <Blog />
        <About />
        <PhotoStrip onPhotoClick={openLightbox} />
        <Lightbox open={lbOpen} index={lbIndex} onClose={closeLightbox} onPrev={lbPrev} onNext={lbNext} />
        <Testimonials onExpandClick={openPopover} />
        <Philosophy />
        <CTA />
      </main>
      <Footer />
      <Popover open={popoverOpen} text={popoverText} onClose={closePopover} />
    </>
  );
}
