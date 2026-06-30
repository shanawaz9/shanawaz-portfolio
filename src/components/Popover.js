import { useEffect, useRef } from 'react';

export default function Popover({ open, text, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    closeRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="t-popover-backdrop open" onClick={onClose} />
      <div className="t-popover open" role="dialog" aria-modal="true" aria-label="Full testimonial">
        <button className="t-popover-close" onClick={onClose} aria-label="Close testimonial" ref={closeRef}>&times;</button>
        <div className="t-popover-content">
          <p className="t-popover-text">{text}</p>
        </div>
      </div>
    </>
  );
}
