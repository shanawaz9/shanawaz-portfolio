const EXPERIENCES = [
  { company: 'AAPMOR', period: '2023 – Present', role: 'Senior UX Designer', delay: 'd1',
    desc: 'Joined as the first designer, helping establish the design function and contributing to team hiring and growth. Worked across enterprise platforms, AI-driven products, marketing websites, and healthcare solutions, taking on senior-level ownership.' },
  { company: '10kDesigners', period: '2024', role: 'Learning Experience', delay: 'd2',
    desc: 'Part of the 10k Designers Cohort focused on product thinking, visual design, and career growth. Participated in critiques, live sessions, and peer collaborations, applying modern design frameworks and scalable UI patterns.' },
  { company: 'TCS', period: '2021 – 2022', role: 'UI Developer', delay: 'd3',
    desc: 'Worked on an enterprise e-commerce application, contributing to UI features and resolving frontend issues. Collaborated with designers, product managers, and backend teams within large-scale systems.' },
];

export default function Timeline() {
  return (
    <section className="section anim">
      <p className="section-label">Experience</p>
      <h2 className="section-heading">The Path So Far</h2>
      <div>
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className={"timeline-item anim " + exp.delay}>
            <div>
              <div className="tl-company">{exp.company}</div>
              <div className="tl-period">{exp.period}</div>
              <div className="tl-role">{exp.role}</div>
            </div>
            <p className="tl-desc">{exp.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
