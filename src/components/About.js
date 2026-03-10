import AnimSection from './AnimSection';

const TAGS = [
  'UI / UX Design',
  'Design Systems',
  'Figma',
  'Product Thinking',
  'Atomic Design',
  'AI + Design',
];

export default function About() {
  return (
    <AnimSection className="section" id="about">
      <p className="section-label">About me</p>
      <h2 className="section-heading">A Bit About Me</h2>
      <div className="about-inner">
        <div className="about-body anim anim-left">
          <p>
            Product Designer (UI/UX) with over 2 years of experience crafting user-focused
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
          <div className="about-tags">
            {TAGS.map((tag, i) => (
              <span className="about-tag" key={i}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="about-img-wrap anim anim-right">
          <img
            src="https://framerusercontent.com/images/ShSVzHQ54oZLNDEVuKiHyQz9JhY.png"
            alt="Shanawaz"
          />
        </div>
      </div>
    </AnimSection>
  );
}
