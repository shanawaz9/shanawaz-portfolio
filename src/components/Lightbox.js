import { useEffect, useRef } from 'react';
import PHOTOS from '../photos';

export default function Lightbox({ open, index, onClose, onPrev, onNext }) {
  const photo = PHOTOS[index] || PHOTOS[0];
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  return (
    <div
      className="lightbox open"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${photo.caption}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button className="lb-close" onClick={onClose} aria-label="Close photo viewer" ref={closeRef}>&#10005;</button>
      <button className="lb-arrow" onClick={onPrev} aria-label="Previous photo">&#8592;</button>
      <div className="lb-img-wrap">
        <img src={photo.src} alt={photo.caption} />
        <div className="lb-caption">{photo.caption}</div>
      </div>
      <button className="lb-arrow" onClick={onNext} aria-label="Next photo">&#8594;</button>
      <div className="lb-counter" aria-hidden="true">{index + 1} / {PHOTOS.length}</div>
    </div>
  );
}
