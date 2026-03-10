import React, { useState, useCallback } from 'react';

const BLOG_POSTS = [
  {
    href: 'https://medium.com/@shanawazhussain989/top-10-ux-laws-you-should-know-e8b8baa3c2f4',
    img: 'https://framerusercontent.com/images/wuj24slqBEQmSWVNiTdbUcLOUK4.png',
    alt: 'UX Laws',
    title: 'Top 10 UX laws you should know',
    excerpt:
      'Here are the "Top 10 UX Laws" in a fun and easy-to-digest way, perfect for our short attention spans...',
    delay: 'd1',
  },
  {
    href: 'https://medium.com/@shanawazhussain989/the-journey-of-ux-design-from-digital-interfaces-to-ai-powered-experiences-8bd8d7e70fef',
    img: 'https://framerusercontent.com/images/VEJToYOYjP2HeeAzrcmD7EMlCUg.png',
    alt: 'Journey',
    title: 'The Journey of UX Design',
    excerpt:
      'The concept of UX design, though not formally named, existed as early as the Industrial Revolution...',
    delay: 'd2',
  },
  {
    href: 'https://medium.com/@shanawazhussain989/the-top-5-design-secrets-you-must-know-about-human-psychology-41bd07ea8060',
    img: 'https://framerusercontent.com/images/3BRIzJpeYNYuji4IDIDYKxCYz0.webp',
    alt: 'Secrets',
    title: 'The Top 5 Design Secrets',
    excerpt:
      'Have you ever wondered why you choose one product over another, even when they seem identical?',
    delay: 'd3',
  },
  {
    href: 'https://medium.com/@shanawazhussain989/passion-is-a-myth-2780af8885ec',
    img: 'https://framerusercontent.com/images/0CmhyiczG0kStTCjn4GFXnlZ2nc.webp',
    alt: 'Passion',
    title: 'Passion is a myth',
    excerpt:
      'Do something for a long time, become good at it \u2014 then you develop a passion for it.',
    delay: 'd4',
  },
  {
    href: '#',
    img: 'https://framerusercontent.com/images/wuj24slqBEQmSWVNiTdbUcLOUK4.png',
    alt: 'Design Thinking',
    title: 'Design Thinking Framework',
    excerpt:
      'Exploring the core principles of design thinking and how it transforms problem-solving approaches in modern teams...',
    delay: 'd1',
  },
  {
    href: '#',
    img: 'https://framerusercontent.com/images/VEJToYOYjP2HeeAzrcmD7EMlCUg.png',
    alt: 'AI Design',
    title: 'AI and the Future of Design',
    excerpt:
      'How artificial intelligence is reshaping design workflows and opening new possibilities for creative expression...',
    delay: 'd2',
  },
  {
    href: '#',
    img: 'https://framerusercontent.com/images/3BRIzJpeYNYuji4IDIDYKxCYz0.webp',
    alt: 'User Research',
    title: 'Deep Dive into User Research Methods',
    excerpt:
      'Master the essential techniques for gathering insights and understanding user behavior across different research methodologies...',
    delay: 'd3',
  },
];

const CARDS_PER_PAGE = 4;

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(BLOG_POSTS.length / CARDS_PER_PAGE);

  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;

  const handlePrev = useCallback(() => {
    setCurrentPage((p) => Math.max(0, p - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
  }, [totalPages]);

  return (
    <section className="section anim">
      <p className="section-label">Writing</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
          gap: 32,
        }}
      >
        <h2 className="section-heading" style={{ margin: 0 }}>
          Sometimes I write too
        </h2>
        <div className="blog-controls" style={{ flexShrink: 0 }}>
          <button
            className="blog-nav-btn"
            onClick={handlePrev}
            aria-label="Previous posts"
            style={{
              opacity: isFirst ? 0.5 : 1,
              pointerEvents: isFirst ? 'none' : 'auto',
              cursor: isFirst ? 'not-allowed' : 'pointer',
            }}
          >
            &larr;
          </button>
          <button
            className="blog-nav-btn"
            onClick={handleNext}
            aria-label="Next posts"
            style={{
              opacity: isLast ? 0.5 : 1,
              pointerEvents: isLast ? 'none' : 'auto',
              cursor: isLast ? 'not-allowed' : 'pointer',
            }}
          >
            &rarr;
          </button>
        </div>
      </div>
      <div className="blog-grid">
        {BLOG_POSTS.map((post, idx) => {
          const pageIndex = Math.floor(idx / CARDS_PER_PAGE);
          const shouldShow = pageIndex === currentPage;
          return (
            <a
              className={`blog-card anim ${post.delay}`}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              style={{
                display: shouldShow ? 'block' : 'none',
                visibility: shouldShow ? 'visible' : 'hidden',
              }}
            >
              <div className="blog-thumb">
                <img src={post.img} alt={post.alt} />
              </div>
              <div className="blog-body">
                <div className="blog-title">{post.title}</div>
                <div className="blog-excerpt">{post.excerpt}</div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
