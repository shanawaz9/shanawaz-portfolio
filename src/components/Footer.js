import Reveal from './Reveal';

export default function Footer() {
  return (
    <Reveal as="footer" y={16} amount={0.5}>
      <p>{"Designed in Figma & built with Claude Code"}</p>
      <p>{"© 2025 "}<span className="footer-accent">Shanawaz</span>{" · All rights reserved"}</p>
    </Reveal>
  );
}
