// src/components/PreviewSlides.tsx

import React from 'react';
import { Presentation } from '../types';

interface PreviewSlidesProps {
  presentation: Presentation;
}

const PreviewSlides: React.FC<PreviewSlidesProps> = ({ presentation }) => {
  return (
    <div className="preview-slides">
      {presentation.slidesIds.length > 0 ? (
        <div className="carousel">
          {presentation.slidesIds.map((slide, index) => (
            <div key={index} className="slide-preview">
              <h3>Slide {index + 1}</h3>
              <p>{slide.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No slides available.</p>
      )}
    </div>
  );
};

export default PreviewSlides;
