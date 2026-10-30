import React from 'react';
import Reveal from './Reveal';
import { Stagger, StaggerItem } from './Stagger';

const WORKS = [
  {
    href: '/ai-visa-platform',
    img: '/images/visa/visa-card-thumb.webp',
    alt: 'The redesigned PetitionIQ.ai landing page on a desktop monitor, its serif headline reading "Immigration intelligence before the petition is written"',
    year: '2026',
    tag: 'Case study',
    client: 'AI Visa Platform',
    title: 'Redesigning an AI-Built Visa Platform to Build Trust and Improve Conversions',
    chips: ['AI vs human design', 'Case study', 'Conversion journey'],
    delay: 'd1',
  },
  {
    href: '/johnson-and-johnson',
    img: '/images/jnj/jnj-card-thumb.jpg',
    alt: 'The Johnson & Johnson access management home screen, blurred under NDA',
    year: '2024–2026',
    tag: 'Confidential work',
    client: 'Johnson & Johnson',
    title: 'Simplifying Compliance Workflows and Designing Action-Driven Conversational AI',
    chips: ['Conversational UX', 'Under NDA', 'Complex workflows'],
    delay: 'd2',
  },
  {
    href: '/shiftlyn',
    img: '/images/shiftlyn/shiftlyn-card-thumb-v3.webp',
    alt: 'Shiftlyn, AI Career Readiness Platform: the landing page on a desktop monitor, its headline reading "See how AI-ready your skills really are"',
    year: '2025',
    tag: 'Case study',
    client: 'Shiftlyn',
    title: 'Designing an End-to-End AI Career Product to Reduce Drop-Off and Bring Users Back',
    chips: ['Product design', 'Case study', 'End to end product'],
    delay: 'd3',
    flush: true,
  },
  {
    href: '/liberty-dental-plan',
    img: '/images/ldp/ldp-card-thumb.jpg',
    alt: 'The Liberty Dental Plan homepage on a desktop monitor, captioned "Explore the live platform"',
    year: '2025–2026',
    tag: 'Confidential work',
    client: 'Liberty Dental Plan',
    title: 'Redesigning a Decade-Old Platform’s Information Architecture for Three User Groups',
    chips: ['UX design', 'Information architecture', 'Case study'],
    delay: 'd4',
  },
  {
    href: 'https://medium.com/@shanawazhussain989/khoj-landing-page-case-study-c279cb08c671',
    img: 'https://framerusercontent.com/images/KD5mHHSu1nuzNMqYhjl4qIy4p0.png',
    alt: 'Khoj',
    year: '2025',
    tag: 'Case study',
    client: 'Khoj',
    title: 'Landing Page Built to Convert',
    delay: 'd5',
    // Hidden for now - flip this off to bring it back.
    hidden: true,
  },
  {
    href: 'https://medium.com/@shanawazhussain989/ethno-furniture-e-commerce-ux-ui-design-ed915e70eb97',
    img: '/images/ethno-furniture.png',
    alt: 'Ethno Furniture e-commerce UI screens',
    year: '2023',
    tag: 'Case study',
    client: 'Ethno',
    title: 'Indian Craft Commerce, Reimagined',
    delay: 'd5',
    // Kept in the list but not shown for now - flip this off to bring it back.
    hidden: true,
  },
];

function WorkCard({ work }) {
  const cardClass = `work-card${work.wip ? ' wip' : ''}`;
  const cardStyle = work.flush ? { borderRadius: 0 } : undefined;
  const thumbStyle = work.thumbBg ? { background: work.thumbBg } : undefined;
  const imgStyle = work.fit ? { objectFit: work.fit } : undefined;
  const content = (
    <>
      <div className="work-card-thumb" style={thumbStyle}>
        {work.clients && (
          <div className="work-card-clients">
            {work.clients.map((c) => (
              <span key={c.name} className="work-card-client-badge" style={{ background: c.color }}>
                {c.name}
              </span>
            ))}
          </div>
        )}
        <img src={work.img} alt={work.alt} style={imgStyle} />
      </div>
      <div className="work-card-body">
        <div className="work-card-head">
          <div className="work-card-heading">
            {work.client && <span className="work-card-brand">{work.client}</span>}
            <div className="work-card-title">{work.title}</div>
          </div>
          {work.href && <span className="work-card-go" aria-hidden="true">&#8599;</span>}
        </div>
        {work.chips && (
          <ul className="work-card-chips" aria-label="Keywords">
            {work.chips.map((chip) => (
              <li key={chip} className="work-card-chip">{chip}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

  if (work.href) {
    return (
      <a
        className={cardClass}
        style={cardStyle}
        href={work.href}
        data-cursor-label="Read case study"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  // The WIP card is a non-interactive, intentionally-dimmed placeholder - hide it from
  // assistive tech (its faded text is decorative teaser only, exempt from contrast as inactive).
  return <div className={cardClass} aria-hidden={work.wip ? 'true' : undefined}>{content}</div>;
}

export default function WorkGrid() {
  return (
    <section className="section" id="work">
      <Reveal as="p" className="section-label" y={16}>Portfolio</Reveal>
      <Reveal as="h2" className="section-heading" delay={0.05}>Selected Work</Reveal>
      <Stagger className="work-grid">
        {WORKS.filter((work) => !work.hidden).map((work, i) => (
          <StaggerItem className="reveal-cell" key={i}>
            <WorkCard work={work} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
