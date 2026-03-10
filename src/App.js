import { useEffect, useState, useCallback } from 'react';
import './index.css';
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
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverText, setPopoverText] = useState('');

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

  const openLightbox = useCallback((i) => { setLbIndex(i); setLbOpen(true); }, []);
  const closeLightbox = useCallback(() => setLbOpen(false), []);
  const lbPrev = useCallback(() => setLbIndex((i) => (i - 1 + 4) % 4), []);
  const lbNext = useCallback(() => setLbIndex((i) => (i + 1) % 4), []);

  const openPopover = useCallback((text) => {
    setPopoverText(text);
    setPopoverOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);
  const closePopover = useCallback(() => {
    setPopoverOpen(false);
    document.body.style.overflow = '';
  }, []);

  return (
    <>
      <CursorGlow />
      <Navbar />
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
      <Footer />
      <Popover open={popoverOpen} text={popoverText} onClose={closePopover} />
    </>
  );
}
