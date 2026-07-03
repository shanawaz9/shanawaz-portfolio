import React from 'react';
import Reveal from './Reveal';
import { Stagger, StaggerItem } from './Stagger';

const WORKS = [
  {
    href: '/case-studies/shiftlyn.html',
    img: '/images/shiftlyn.png',
    alt: 'Shiftlyn',
    year: '2025',
    tag: 'Case study',
    title: 'Shiftlyn — AI Risk Assessment, Humanized',
    delay: 'd1',
    fit: 'contain',
    thumbBg: '#ece2d0',
  },
  {
    href: 'https://shrub-gallium-386.notion.site/Confidential-Projects-301644ba75b6806895b6cf7d89e25661?pvs=73',
    img: 'https://framerusercontent.com/images/LKPsBUmKOjVvwZxGtktMsfJgANs.jpg',
    alt: 'Enterprise',
    year: '2024\u20132026',
    tag: 'Confidential work',
    title: 'Enterprise SaaS, Healthcare & AI Systems',
    delay: 'd2',
  },
  {
    href: 'https://medium.com/@shanawazhussain989/khoj-landing-page-case-study-c279cb08c671',
    img: 'https://framerusercontent.com/images/KD5mHHSu1nuzNMqYhjl4qIy4p0.png',
    alt: 'Khoj',
    year: '2025',
    tag: 'Case study',
    title: 'Khoj — Landing Page Built to Convert',
    delay: 'd3',
  },
  {
    href: 'https://medium.com/@shanawazhussain989/ethno-furniture-e-commerce-ux-ui-design-ed915e70eb97',
    img: '/images/ethno-furniture.png',
    alt: 'Ethno Furniture e-commerce UI screens',
    year: '2023',
    tag: 'Case study',
    title: 'Ethno — Indian Craft Commerce, Reimagined',
    delay: 'd4',
  },
];

function WorkCard({ work }) {
  const cardClass = `work-card${work.wip ? ' wip' : ''}`;
  const thumbStyle = work.thumbBg ? { background: work.thumbBg } : undefined;
  const imgStyle = work.fit ? { objectFit: work.fit } : undefined;
  const content = (
    <>
      <div className="work-card-thumb" style={thumbStyle}>
        <img src={work.img} alt={work.alt} style={imgStyle} />
      </div>
      <div className="work-card-body">
        <div className="work-card-meta">
          <span className="work-card-year">{work.year}</span>
          <span className="work-card-tag">{work.tag}</span>
        </div>
        <div className="work-card-title">{work.title}</div>
      </div>
    </>
  );

  if (work.href) {
    return (
      <a
        className={cardClass}
        href={work.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  // The WIP card is a non-interactive, intentionally-dimmed placeholder — hide it from
  // assistive tech (its faded text is decorative teaser only, exempt from contrast as inactive).
  return <div className={cardClass} aria-hidden={work.wip ? 'true' : undefined}>{content}</div>;
}

export default function WorkGrid() {
  return (
    <section className="section" id="work">
      <Reveal as="p" className="section-label" y={16}>Portfolio</Reveal>
      <Reveal as="h2" className="section-heading" delay={0.05}>Selected Work</Reveal>
      <Stagger className="work-grid">
        {WORKS.map((work, i) => (
          <StaggerItem className="reveal-cell" key={i}>
            <WorkCard work={work} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
