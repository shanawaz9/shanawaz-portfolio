import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Reveal from './Reveal';
import { Stagger, StaggerItem, SPRING } from './Stagger';

const TAGS = [
  'UI / UX Design',
  'Design Systems',
  'Figma',
  'Product Thinking',
  'Atomic Design',
  'AI + Design',
];

export default function About() {
  const reduce = useReducedMotion();
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  });
  // Gentle parallax — the image block drifts a touch against the text as you scroll.
  const imgY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <section className="section" id="about">
      <Reveal as="p" className="section-label" y={16}>About me</Reveal>
      <Reveal as="h2" className="section-heading" delay={0.05}>A Bit About Me</Reveal>
      <div className="about-inner">
        <Reveal as="div" className="about-body" x={-28} y={0} delay={0.05}>
          <p>
            Product Designer (UI/UX) with over 5+ years of experience crafting user-focused
            digital experiences that are clear, scalable, and system-driven.
          </p>
          <p>
            I work across the full product design lifecycle &mdash; from user flows and wireframes
            to polished UI and interaction design. My approach combines visual clarity with
            strategic thinking, shaped by frameworks like atomic design, usability principles,
            and component-based systems.
          </p>
          <p>
            With roots in engineering, I naturally think in systems and collaborate closely
            across teams &mdash; balancing user needs, business goals, and technical feasibility.
          </p>
          <p>
            Currently exploring how AI can support and speed up UX workflows &mdash; from
            early ideation to testing and iteration.
          </p>
          <Stagger className="about-tags" stagger={0.06} amount={0.4}>
            {TAGS.map((tag, i) => (
              <StaggerItem as="span" key={i} style={{ display: 'inline-flex' }}>
                <span className="about-tag">{tag}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
        <motion.div
          ref={imgRef}
          className="about-img-wrap"
          style={reduce ? undefined : { y: imgY }}
          initial={reduce ? false : { opacity: 0, x: 28 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={SPRING}
        >
          <img
            src="https://framerusercontent.com/images/ShSVzHQ54oZLNDEVuKiHyQz9JhY.png"
            alt="Shanawaz"
          />
        </motion.div>
      </div>
    </section>
  );
}
