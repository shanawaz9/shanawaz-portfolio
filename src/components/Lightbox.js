import { useEffect } from 'react';

const PHOTOS = [
  { src: '/images/photo-0.png', caption: 'Manali, Himachal Pradesh' },
  { src: '/images/photo-1.png', caption: 'Snow days, Manali' },
  { src: '/images/photo-2.jpg', caption: 'Sunrise at the summit' },
  { src: '/images/photo-3.jpg', caption: 'Varkala Beach, Kerala' },
];

export default function Lightbox({ open, index, onClose, onPrev, onNext }) {
  const photo = PHOTOS[index] || PHOTOS[0];

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  return (
    <div
      className="lightbox open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <button className="lb-close" onClick={onClose}>&#10005;</button>
      <button className="lb-arrow" onClick={onPrev}>&#8592;</button>
      <div className="lb-img-wrap">
        <img src={photo.src} alt={photo.caption} />
        <div className="lb-caption">{photo.caption}</div>
      </div>
      <button className="lb-arrow" onClick={onNext}>&#8594;</button>
      <div className="lb-counter">{index + 1} / {PHOTOS.length}</div>
    </div>
  );
}
