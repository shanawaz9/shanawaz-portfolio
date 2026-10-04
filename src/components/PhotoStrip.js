import React, { useRef, useState, useCallback } from 'react';
import PHOTOS from '../photos';

const STEP = 380;

export default function PhotoStrip({ onPhotoClick }) {
  const allPhotos = [...PHOTOS, ...PHOTOS];
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const [manual, setManual] = useState(false);

  const applyOffset = useCallback((next) => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    if (half > 0) {
      while (next <= -half) next += half;
      while (next > 0) next -= half;
    }
    offsetRef.current = next;
    track.style.transform = `translateX(${next}px)`;
  }, []);

  const nudge = useCallback((direction) => {
    const track = trackRef.current;
    if (!track) return;
    if (!manual) {
      const m = new DOMMatrixReadOnly(getComputedStyle(track).transform);
      const startX = Number.isFinite(m.m41) ? m.m41 : 0;
      offsetRef.current = startX;
      track.style.transform = `translateX(${startX}px)`;
      setManual(true);
    }
    applyOffset(offsetRef.current - STEP * direction);
  }, [manual, applyOffset]);

  return (
    <section className="section anim life-section" id="life">
      <div className="strip-header">
        <div>
          <p className="section-label">Life</p>
          <h2 className="section-heading">Outside of Work</h2>
        </div>
        <div className="strip-controls" role="group" aria-label="Photo carousel controls">
          <button
            type="button"
            className="strip-arrow"
            onClick={() => nudge(-1)}
            aria-label="Previous photos"
          >
            &#x2039;
          </button>
          <button
            type="button"
            className="strip-arrow"
            onClick={() => nudge(1)}
            aria-label="Next photos"
          >
            &#x203A;
          </button>
        </div>
      </div>
      <div className="strip-wrapper">
        <div className="photo-strip">
          <div className="photo-strip-fade-l"></div>
          <div className="photo-strip-fade-r"></div>
          <div
            className={`photo-strip-track${manual ? ' photo-strip-track--manual' : ''}`}
            ref={trackRef}
          >
            {/* The list is doubled for the seamless loop. Only the first copy
                is exposed: the second is hidden from screen readers and the
                tab order, so each photo is announced and reachable once. */}
            {allPhotos.map((photo, i) => {
              const isCopy = i >= PHOTOS.length;
              return (
                <button
                  type="button"
                  className="photo-strip-item"
                  key={i}
                  onClick={() => onPhotoClick(i % PHOTOS.length)}
                  aria-label={isCopy ? undefined : `View photo: ${photo.caption}`}
                  aria-hidden={isCopy || undefined}
                  tabIndex={isCopy ? -1 : undefined}
                >
                  <img src={photo.src} alt="" loading="lazy" />
                  <span className="photo-strip-item-cap" aria-hidden="true">{photo.caption}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
