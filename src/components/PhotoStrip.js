import React from 'react';
import PHOTOS from '../photos';

export default function PhotoStrip({ onPhotoClick }) {
  const allPhotos = [...PHOTOS, ...PHOTOS];

  return (
    <section className="section anim" id="life">
      <p className="section-label">Life</p>
      <h2 className="section-heading">Outside of Work</h2>
      <div className="strip-wrapper">
        <div className="photo-strip">
          <div className="photo-strip-fade-l"></div>
          <div className="photo-strip-fade-r"></div>
          <div className="photo-strip-track">
            {allPhotos.map((photo, i) => {
              const realIndex = i < PHOTOS.length ? i : undefined;
              return (
                <div
                  className="photo-strip-item"
                  key={i}
                  onClick={realIndex !== undefined ? () => onPhotoClick(realIndex) : undefined}
                  style={{ cursor: 'pointer' }}
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
