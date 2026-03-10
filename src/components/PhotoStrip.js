import React, { useEffect, useRef } from 'react';

const PHOTOS = [
  { src: '/images/photo-0.png', caption: 'Manali, Himachal Pradesh' },
  { src: '/images/photo-1.png', caption: 'Snow days, Manali' },
  { src: '/images/photo-2.jpg', caption: 'Sunrise at the summit' },
  { src: '/images/photo-3.jpg', caption: 'Varkala Beach, Kerala' },
];

export default function PhotoStrip({ onPhotoClick }) {
  const stripRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const strip = stripRef.current;
    const track = trackRef.current;
    if (!strip || !track) return;

    let isDragging = false;
    let startX = 0;
    let offset = 0;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      lastX = startX;
      lastTime = Date.now();
      velocity = 0;
      track.style.animation = 'none';
      strip.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const now = Date.now();
      const dt = Math.max(now - lastTime, 16);
      velocity = (dx / dt) * 16;
      offset += dx;
      track.style.transform = 'translateX(' + offset + 'px)';
      lastX = e.clientX;
      lastTime = now;
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      strip.style.cursor = 'grab';

      let currentOffset = offset;
      let momVelocity = velocity;
      const decel = 0.92;

      function applyMomentum() {
        momVelocity *= decel;
        if (Math.abs(momVelocity) > 0.3) {
          currentOffset += momVelocity;
          track.style.transform = 'translateX(' + currentOffset + 'px)';
          requestAnimationFrame(applyMomentum);
        } else {
          offset = currentOffset;
          track.style.animation = '';
          track.style.transform = '';
        }
      }
      applyMomentum();
    };

    strip.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      strip.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  const allPhotos = [...PHOTOS, ...PHOTOS];

  return (
    <section className="section anim" id="life">
      <p className="section-label">Life</p>
      <h2 className="section-heading">Outside of Work</h2>
      <div className="strip-wrapper">
        <div className="photo-strip" ref={stripRef}>
          <div className="photo-strip-fade-l"></div>
          <div className="photo-strip-fade-r"></div>
          <div className="photo-strip-track" ref={trackRef}>
            {allPhotos.map((photo, i) => {
              const realIndex = i < PHOTOS.length ? i : undefined;
              return (
                <div
                  className="photo-strip-item"
                  key={i}
                  onClick={realIndex !== undefined ? () => onPhotoClick(realIndex) : undefined}
                  style={{ cursor: realIndex !== undefined ? 'pointer' : 'pointer' }}
                >
                  <img src={photo.src} alt={photo.caption} loading="lazy" />
                  <div className="photo-strip-item-cap">{photo.caption}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export { PHOTOS };
