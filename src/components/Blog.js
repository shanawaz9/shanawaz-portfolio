import React, { useState, useCallback } from 'react';
import Reveal from './Reveal';
import { Stagger, StaggerItem } from './Stagger';

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
      'Do something for a long time, become good at it, then you develop a passion for it.',
    delay: 'd4',
  },
  {
    href: 'https://medium.com/@shanawazhussain989/ai-indias-economy-and-the-2026-it-slowdown-what-might-be-coming-567f99dd311d',
    img: '/images/blog/ai-india-it-slowdown.webp',
    alt: 'A city skyline at dusk with a large translucent "AI" over it',
    title: 'AI, India’s Economy, and the IT Slowdown: What Might Be Coming',
    excerpt:
      'A ground-up look at how India’s economy actually works, what AI is genuinely disrupting, and why the headlines are getting almost everything wrong.',
    delay: 'd1',
  },
  {
    href: 'https://medium.com/@shanawazhussain989/khoj-landing-page-case-study-c279cb08c671',
    img: '/images/blog/khoj-landing-page.webp',
    alt: 'The Khoj landing page: "Your AI Research Copilot" above a product preview',
    title: 'Khoj Landing Page: Case Study',
    excerpt:
      'I personally liked the product Khoj, and that’s the main reason I took this up...',
    delay: 'd2',
  },
  {
    href: 'https://medium.com/@shanawazhussain989/5-super-cool-design-portfolios-by-amazing-indian-designers-1ecb3b98cf13',
    img: '/images/blog/indian-design-portfolios.webp',
    alt: 'A meme: a man lying in a coffin, then sitting up in it working on a laptop',
    title: '5 Super Cool Design Portfolios by Amazing Indian Designers',
    excerpt:
      'Designer’s portfolios and procrastination are a match made in heaven.',
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
    <section className="section">
      <Reveal as="p" className="section-label" y={16}>Writing</Reveal>
      <Reveal as="div" className="blog-head" delay={0.05}>
        <h2 className="section-heading">
          Sometimes I write too
        </h2>
        <div className="blog-controls">
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
      </Reveal>
      <Stagger className="blog-grid" key={currentPage}>
        {BLOG_POSTS.map((post, idx) => {
          const pageIndex = Math.floor(idx / CARDS_PER_PAGE);
          const shouldShow = pageIndex === currentPage;
          return (
            <StaggerItem
              className="reveal-cell"
              key={idx}
              style={{ display: shouldShow ? undefined : 'none' }}
            >
              <a
                className="blog-card"
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="blog-thumb">
                  <img src={post.img} alt={post.alt} />
                </div>
                <div className="blog-body">
                  <div className="blog-title">{post.title}</div>
                  <div className="blog-excerpt">{post.excerpt}</div>
                </div>
              </a>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
