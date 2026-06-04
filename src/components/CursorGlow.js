import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dotRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
        dotRef.current.classList.add('cursor-dot--ready');
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div className="cursor-dot" ref={dotRef} />;
}
