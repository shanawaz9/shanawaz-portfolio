import React from 'react';

const WORKS = [
  {
    href: 'https://shrub-gallium-386.notion.site/Khoj-Landing-Page-Case-Study-301644ba75b680a587ffd608395e3811?pvs=73',
    img: 'https://framerusercontent.com/images/KD5mHHSu1nuzNMqYhjl4qIy4p0.png',
    alt: 'Khoj',
    year: '2025',
    tag: 'Case study',
    title: 'Khoj Landing page',
    delay: 'd1',
  },
  {
    href: 'https://shrub-gallium-386.notion.site/Confidential-Projects-301644ba75b6806895b6cf7d89e25661?pvs=73',
    img: 'https://framerusercontent.com/images/LKPsBUmKOjVvwZxGtktMsfJgANs.jpg',
    alt: 'Enterprise',
    year: '2024\u20132026',
    tag: 'Confidential work',
    title: 'Enterprise & Client Projects',
    delay: 'd2',
  },
  {
    img: 'https://framerusercontent.com/images/X9Gstk6YdSaJJ0nW4VeflNEvZak.png',
    alt: 'WIP',
    year: '2025',
    tag: 'Case study',
    title: 'Work In Progress',
    delay: 'd3',
    wip: true,
  },
  {
    img: 'https://framerusercontent.com/images/X9Gstk6YdSaJJ0nW4VeflNEvZak.png',
    alt: 'WIP',
    year: '2025',
    tag: 'Design',
    title: 'Work In Progress',
    delay: 'd4',
    wip: true,
  },
];

function WorkCard({ work }) {
  const cardClass = `work-card anim${work.wip ? ' wip' : ''} ${work.delay}`;
  const content = (
    <>
      <div className="work-card-thumb">
        <img src={work.img} alt={work.alt} />
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

  return <div className={cardClass}>{content}</div>;
}

export default function WorkGrid() {
  return (
    <section className="section anim" id="work">
      <p className="section-label">Portfolio</p>
      <h2 className="section-heading">Selected Work</h2>
      <div className="work-grid">
        {WORKS.map((work, i) => (
          <WorkCard key={i} work={work} />
        ))}
      </div>
    </section>
  );
}
