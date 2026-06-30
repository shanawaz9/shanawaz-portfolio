import Reveal from './Reveal';
import { Stagger, StaggerItem } from './Stagger';

const EXPERIENCES = [
  { company: 'AAPMOR', period: '2023 – Present', role: 'Senior UX Designer', delay: 'd1',
    desc: 'Joined as the first designer, helping establish the design function and contributing to team hiring and growth. Worked across enterprise platforms, AI-driven products, marketing websites, and healthcare solutions, taking on senior-level ownership.' },
  { company: '10kDesigners', period: '2024', role: 'Learning Experience', delay: 'd2',
    desc: 'Part of the 10k Designers Cohort focused on product thinking, visual design, and career growth. Participated in critiques, live sessions, and peer collaborations, applying modern design frameworks and scalable UI patterns.' },
  { company: 'TCS', period: '2021 – 2022', role: 'UX Designer', delay: 'd3',
    desc: 'Designed user flows and interfaces for an enterprise e-commerce platform, focusing on usability and clarity. Partnered with product managers and engineers to translate business requirements into intuitive, user-centered experiences.' },
];

export default function Timeline() {
  return (
    <section className="section">
      <Reveal as="p" className="section-label" y={16}>Experience</Reveal>
      <Reveal as="h2" className="section-heading" delay={0.05}>The Path So Far</Reveal>
      <Stagger className="timeline" stagger={0.12}>
        {EXPERIENCES.map((exp, i) => (
          <StaggerItem key={i} className="timeline-node">
            <div className="timeline-dot" />
            {i < EXPERIENCES.length - 1 && <div className="timeline-line" />}
            <div className="timeline-card">
              <div className="tl-company">{exp.company}</div>
              <div className="tl-period">{exp.period}</div>
              <div className="tl-role">{exp.role}</div>
              <p className="tl-desc">{exp.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
