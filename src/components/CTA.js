import { useEffect, useRef, useState } from 'react';
import Typewriter from './Typewriter';

const EMAIL_ADDRESS = 'shanawazhussain989@gmail.com';
const CTA_HEADING_TEXT = "Let's collaborate";
const CTA_DESC_TEXT =
  "Have a project in mind, or just want to say hello? I'm always open to discussing new opportunities and ideas.";

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

export default function CTA() {
  const [copied, setCopied] = useState(false);
  const panelRef = useRef(null);

  // Sequences the terminal type-in: heading -> description -> email -> socials.
  const [started, setStarted] = useState(false);
  const [headingDone, setHeadingDone] = useState(false);
  const [descActive, setDescActive] = useState(false);
  const [descDone, setDescDone] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [emailDone, setEmailDone] = useState(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleEmailCopy = async (e) => {
    e.preventDefault();
    await copyToClipboard(EMAIL_ADDRESS);
    setCopied(true);
  };

  return (
    <div className="cta">
      <div className="cta-panel anim" ref={panelRef}>
        <div className="cta-chrome" aria-hidden="true">
          <span className="cta-chrome-name">CONNECT.EXE</span>
          <span className="cta-chrome-btns">
            <span className="cta-chrome-btn">_</span>
            <span className="cta-chrome-btn">&#9633;</span>
            <span className="cta-chrome-btn cta-chrome-btn--x">&times;</span>
          </span>
        </div>

        <div className="cta-content">
          <p className="section-label">Get in touch</p>

          <h2 className={`cta-heading${headingDone ? '' : ' cta-heading--typing'}`}>
            {headingDone ? (
              <>
                {"Let's "}
                <span className="accent">collaborate</span>
              </>
            ) : (
              <Typewriter
                as="span"
                text={CTA_HEADING_TEXT}
                active={started}
                slowMs={130}
                fastMs={22}
                onDone={() => {
                  setHeadingDone(true);
                  setDescActive(true);
                }}
              />
            )}
          </h2>

          <p className="cta-desc">
            {descDone ? (
              CTA_DESC_TEXT
            ) : (
              <Typewriter
                as="span"
                text={CTA_DESC_TEXT}
                active={descActive}
                slowMs={50}
                fastMs={5}
                onDone={() => {
                  setDescDone(true);
                  setEmailActive(true);
                }}
              />
            )}
          </p>

          <a href={`mailto:${EMAIL_ADDRESS}`} className="cta-email" onClick={handleEmailCopy}>
            <span className="cta-email-prefix" aria-hidden="true">&gt;</span>
            {emailDone ? (
              copied ? 'Email copied to clipboard' : EMAIL_ADDRESS
            ) : (
              <Typewriter
                as="span"
                text={EMAIL_ADDRESS}
                active={emailActive}
                slowMs={90}
                fastMs={12}
                onDone={() => setEmailDone(true)}
              />
            )}
          </a>

          <div className={`cta-socials${emailDone ? ' visible' : ''}`}>
            <a href="https://www.linkedin.com/in/shanawaz-hussain-42335b12b" target="_blank" rel="noreferrer" className="cta-social-link" title="LinkedIn" aria-label="LinkedIn">in</a>
            <a href="https://www.instagram.com/_shanawaz_shaik?igsh=MXJ6bWoxOGNhMzVubg%3D%3D" target="_blank" rel="noreferrer" className="cta-social-link" title="Instagram" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"></path>
                <circle cx="17.5" cy="6.5" r="1.5"></circle>
              </svg>
            </a>
            <a href="https://x.com/shaikshanawazz" target="_blank" rel="noreferrer" className="cta-social-link" title="X (Twitter)" aria-label="X">&#120143;</a>
          </div>
        </div>
      </div>
    </div>
  );
}
