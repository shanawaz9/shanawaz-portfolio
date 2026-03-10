export default function CTA() {
  return (
    <div className="cta anim">
      <div className="cta-left">
        <h2>{"Let's collaborate"}</h2>
        <a href="mailto:shanawazhussain989@gmail.com" className="cta-email">
          shanawazhussain989@gmail.com
        </a>
        <div className="cta-socials">
          <a href="https://www.linkedin.com/in/shanawaz-hussain-42335b12b" target="_blank" rel="noreferrer" className="cta-social-link" title="LinkedIn" aria-label="LinkedIn">in</a>
          <a href="https://www.instagram.com/_shanawaz_shaik?igsh=MXJ6bWoxOGNhMzVubg%3D%3D" target="_blank" rel="noreferrer" className="cta-social-link" title="Instagram" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"></path>
              <circle cx="17.5" cy="6.5" r="1.5"></circle>
            </svg>
          </a>
          <a href="https://x.com/shaikshanawazz" target="_blank" rel="noreferrer" className="cta-social-link" title="X (Twitter)" aria-label="X">𝕏</a>
        </div>
      </div>
      <div className="cta-img-wrap">
        <img src="https://framerusercontent.com/images/8WxXcBdyNXGUMsq5iT0VwcAjvU.png" alt="collaborate" />
      </div>
    </div>
  );
}
