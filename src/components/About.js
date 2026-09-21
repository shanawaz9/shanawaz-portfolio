import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import Reveal from './Reveal';
import { Stagger, StaggerItem, SPRING } from './Stagger';

/* Pixel glyphs, authored the same way as the cursor sprites — '#' filled,
   '.' empty, rows of equal length — so the whole site speaks one pixel
   language. Each grid is 9x9 so the icons optically match in the row. */
const GLYPHS = {
  // Lightbulb — product thinking.
  bulb: [
    '...###...',
    '..#...#..',
    '.#.....#.',
    '.#.....#.',
    '.#.....#.',
    '..#...#..',
    '...###...',
    '...###...',
    '....#....',
  ],
  // Terminal window with a prompt — front-end coding.
  terminal: [
    '#########',
    '#.#.#...#',
    '#########',
    '#.......#',
    '#.#.....#',
    '#..#....#',
    '#.#.###.#',
    '#.......#',
    '#########',
  ],
  // Two figures side by side — collaboration.
  people: [
    '.........',
    '.##...##.',
    '.##...##.',
    '.........',
    '####.####',
    '####.####',
    '####.####',
    '####.####',
    '.........',
  ],
  // Pencil on the diagonal — design thinking.
  pencil: [
    '......###',
    '.....####',
    '....####.',
    '...####..',
    '..####...',
    '.####....',
    '####.....',
    '##.......',
    '#........',
  ],
  // Magnifying glass — user research.
  magnifier: [
    '.####....',
    '#....#...',
    '#....#...',
    '#....#...',
    '#....#...',
    '.####....',
    '....##...',
    '.....##..',
    '......##.',
  ],
  // Bullseye — user-centered design.
  target: [
    '..#####..',
    '.#.....#.',
    '#.......#',
    '#..###..#',
    '#..###..#',
    '#..###..#',
    '#.......#',
    '.#.....#.',
    '..#####..',
  ],
};

// One meter cell per half point, so 4.5 reads as 9 lit cells out of 10.
const METER_CELLS = 10;

const SKILLS = [
  { label: 'Design Thinking', glyph: 'pencil', score: 4.5 },
  { label: 'User-Centered Design', glyph: 'target', score: 4.5 },
  { label: 'Product Thinking', glyph: 'bulb', score: 4.5 },
  { label: 'User Research', glyph: 'magnifier', score: 4 },
  { label: 'Collaboration', glyph: 'people', score: 5 },
  { label: 'Front-End Coding', glyph: 'terminal', score: 4 },
];

function PixelGlyph({ rows }) {
  return (
    <svg
      className="skill-glyph"
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rows.map((row, y) =>
        [...row].map((cell, x) =>
          cell === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" /> : null
        )
      )}
    </svg>
  );
}

function Meter({ score }) {
  const lit = Math.round(score * 2);
  return (
    <span className="skill-meter" aria-hidden="true">
      {Array.from({ length: METER_CELLS }, (_, i) => (
        <span key={i} className={`skill-cell${i < lit ? ' is-lit' : ''}`} />
      ))}
    </span>
  );
}

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
            Product Designer with 5+ years turning messy problems into clear,
            scalable, system-driven interfaces.
          </p>
          <p>
            Engineering roots &mdash; so I think in systems, work close to the build,
            and I&rsquo;m currently exploring how AI speeds up the UX workflow.
          </p>
          <Stagger as="ul" className="skills" stagger={0.07} amount={0.3}>
            {SKILLS.map((skill) => (
              <StaggerItem as="li" className="skill" key={skill.label}>
                <PixelGlyph rows={GLYPHS[skill.glyph]} />
                <span className="skill-name">{skill.label}</span>
                <span className="skill-rate">
                  <Meter score={skill.score} />
                  <span className="skill-score">
                    {skill.score.toFixed(1)}
                    <span className="sr-only"> out of 5</span>
                  </span>
                </span>
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
