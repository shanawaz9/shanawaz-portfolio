import Reveal from './Reveal';

export default function Philosophy() {
  return (
    <div className="philosophy">
      <Reveal as="div" className="philosophy-tag">Design Philosophy</Reveal>
      <Reveal as="h2" delay={0.05}>{"Not Just Pixels"}<br />{"Built on "}<span className="a">Principles</span></Reveal>
      <Reveal as="p" delay={0.1}>I believe that simplicity is the ultimate sophistication — not just in appearance, but in function.</Reveal>
      <Reveal as="p" delay={0.15}>Inspired by Steve Jobs and human-centered thinking, I design experiences that feel intuitive and effortless — the result of deep research, exploration, and iteration.</Reveal>
      <Reveal as="p" delay={0.2}>My process begins with curiosity and unfolds through whiteboards, wireframes, and detail-focused refinement. I see design as holistic — where UX and UI, strategy and aesthetics, all work together.</Reveal>
    </div>
  );
}
