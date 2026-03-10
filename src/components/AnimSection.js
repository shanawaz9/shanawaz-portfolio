import { useEffect, useRef } from 'react';

export default function AnimSection({ children, className = '', tag: Tag = 'section', id }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <Tag ref={ref} className={`anim ${className}`.trim()} id={id}>
      {children}
    </Tag>
  );
}
