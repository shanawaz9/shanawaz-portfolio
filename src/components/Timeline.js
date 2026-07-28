import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'motion/react';
import Reveal from './Reveal';

// Number of discrete increments the fill snaps through as it draws — a coarse
// count reads like a terminal printing line-by-line rather than a smooth wipe.
const PRINT_STEPS = 18;

const EXPERIENCES = [
  {
    period: 'Dec 2024 – Present',
    role: 'Senior UX Designer',
    company: 'AAPMOR',
    desc: 'Leading enterprise UX initiatives, product strategy, design systems, and cross-functional collaboration for global SaaS products.',
  },
  {
    period: '2025',
    role: 'Product Design Cohort',
    company: '10kdesigners',
    desc: 'Strengthened product thinking through intensive product design training, real-world projects, mentorship, and design critiques.',
  },
  {
    period: 'Nov 2023 – Dec 2024',
    role: 'UX Designer',
    company: 'AAPMOR',
    desc: 'Designed enterprise SaaS experiences, conducted user research, and delivered scalable, user-centered solutions.',
  },
  {
    period: 'Oct 2022 – Oct 2023',
    role: 'Freelance UX/UI Designer',
    company: 'Self-employed',
    desc: 'Designed end-to-end digital products for startups, from research and wireframes to polished, responsive interfaces.',
  },
  {
    period: 'Apr 2021 – Oct 2022',
    role: 'UI/UX Designer',
    company: 'Tata Consultancy Services (TCS)',
    desc: 'Designed enterprise web experiences while collaborating closely with developers to build responsive, accessible interfaces.',
  },
];

export default function Timeline() {
  const reduce = useReducedMotion();
  const railRef = useRef(null);
  const [line, setLine] = useState({ top: 0, height: 0 });

  // The connector runs from the first dot's centre to the last dot's centre.
  // Measured from the DOM so it stays exact as text wraps / the layout reflows.
  useLayoutEffect(() => {
    const cont = railRef.current;
    if (!cont) return;
    const measure = () => {
      const dots = cont.querySelectorAll('.timeline-dot');
      if (dots.length < 2) return;
      const c = cont.getBoundingClientRect();
      const first = dots[0].getBoundingClientRect();
      const last = dots[dots.length - 1].getBoundingClientRect();
      const top = first.top + first.height / 2 - c.top;
      const bottom = last.top + last.height / 2 - c.top;
      setLine({ top, height: Math.max(0, bottom - top) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(cont);
    return () => ro.disconnect();
  }, []);

  // Scroll-linked progress: the fill draws as the section passes through the viewport.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 85%', 'end 55%'],
  });
  // Quantize into fixed steps first — the spring then eases *between* steps
  // rather than continuously, so the draw visibly snaps block by block.
  const stepped = useTransform(scrollYProgress, (v) => Math.floor(v * PRINT_STEPS) / PRINT_STEPS);
  const scaleY = useSpring(stepped, { stiffness: 300, damping: 24, mass: 0.3 });
  // Terminal caret rides the tip of the printed line, ticking down in the same steps.
  const caretTop = useTransform(scaleY, (v) => `${v * 100}%`);

  return (
    <section className="section" id="experience">
      <Reveal as="p" className="section-label" y={16}>Experience</Reveal>
      <Reveal as="h2" className="section-heading" delay={0.05}>The Path So Far</Reveal>

      <div className="timeline" ref={railRef}>
        <div className="timeline-line" aria-hidden="true" style={{ top: line.top, height: line.height }}>
          <span className="timeline-line-track" />
          <motion.span
            className="timeline-line-fill"
            style={{ scaleY: reduce ? 1 : scaleY }}
          />
          {!reduce && (
            <motion.span className="timeline-caret" style={{ top: caretTop }} />
          )}
        </div>

        {EXPERIENCES.map((exp, i) => (
          <div className="timeline-node" key={i}>
            <div className="timeline-rail">
              <span className="timeline-dot" />
            </div>
            <div className="timeline-card">
              <div className="tl-period">{exp.period}</div>
              <h3 className="tl-role">{exp.role}</h3>
              <div className="tl-company">{exp.company}</div>
              <p className="tl-desc">{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
