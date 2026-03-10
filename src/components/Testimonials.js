const TESTIMONIALS = [
  {
    avatar: 'https://framerusercontent.com/images/iT7IbdVfSfsl1WwkMQCLJkv4oA.jpg',
    name: 'Mounika Reddy', role: 'Peer UX Designer', delay: 'd1',
    preview: "Shanawaz has been more than just a senior colleague to me — he's been a mentor and a friend. When I was starting out in my career, he took the time to help me discover my strengths…",
    full: "Shanawaz has been more than just a senior colleague to me — he's been a mentor and a friend. When I was starting out in my career, he took the time to help me discover my strengths and understand where I needed to grow. He taught me how to handle deadlines, collaborate across teams, and communicate effectively with clients. His guidance shaped how I approach my work today. What stands out most about Shanawaz is his integrity and thoughtful approach. He brings fresh perspectives to every project and stays true to his principles, which makes him both disciplined and trustworthy. Working with him has been invaluable to my professional growth, and I know many others on our team feel the same way. He's the kind of person who genuinely invests in helping others succeed.",
  },
  {
    avatar: 'https://framerusercontent.com/images/ICyknOl5RpZZStGy0JIjydMM.jpeg',
    name: 'Satya Shanthi', role: 'Product Owner @American Express', delay: 'd2',
    preview: "As a Business Analyst, I've often faced challenges while working with design teams. Working with Shanawaz has been a completely different experience. Since he has a background in development…",
    full: "As a Business Analyst, I've often faced challenges while working with design teams. Many times, they would not accept our low-fidelity wireframes and instead suggest designs that were too complex or not possible to build. This caused a lot of back-and-forth and delayed the project. Working with Shanawaz has been a completely different experience. Since he has a background in development, he understands both design and technical limitations. He suggests designs that are practical and easy to implement, which saves a lot of time and effort. What I also appreciate is that he trains his team to think the same way — focusing on creating designs that work well and can be built easily. His approach makes the process smoother and helps the team deliver faster and with fewer issues. It's been a great experience working with Shanawaz, and I truly value his practical mindset and support.",
  },
  {
    avatar: 'https://framerusercontent.com/images/DaAaavbV74E7XhQywXRPLFDk00.jpeg',
    name: 'Praveen Sai', role: 'SDE-2 @AAPMOR', delay: 'd3',
    preview: "Working with Shanawaz is always enjoyable and productive. His design thinking is aligned with long-term product development — it goes far beyond aesthetics…",
    full: "As a developer, collaborating with designers can be challenging at times. However, working with Shanawaz is always enjoyable and productive. It's a great mix of learning, brainstorming, and open idea sharing. What really stands out is his design thinking — his ideas are always aligned with long-term product development. His approach goes far beyond just adding colors or making things look good for the moment; he designs in a way that still feels relevant and polished even after a long time. He consistently validates the feasibility of designs with developers and refines them accordingly, which helps avoid rework and improves collaboration. Most importantly, his design decisions have an exceptional success rate and resonate strongly with clients, making a real impact on the overall product quality.",
  },
];

export default function Testimonials({ onExpandClick }) {
  return (
    <section className="section anim">
      <div className="testimonials-head">
        <p className="eyebrow">Testimonials</p>
        <h2>{"Best part of the work"}<br />{"It's all about the people"}</h2>
      </div>
      <div className="t-grid">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className={"t-card anim " + t.delay}>
            <div className="t-avatar"><img src={t.avatar} alt={t.name} /></div>
            <div className="t-name">{t.name}</div>
            <div className="t-role">{t.role}</div>
            <p className="t-text">{t.preview}</p>
            <button className="t-expand-btn" onClick={() => onExpandClick(t.full)}>
              Read more <span className="arrow">&#x203a;</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
