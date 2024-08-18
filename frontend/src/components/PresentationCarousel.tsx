// src/components/PresentationCarousel.tsx

import React, { useState } from 'react';
import { Presentation } from '../types';
import '../styles/presentationPreview.css';

interface PresentationCarouselProps {
  presentation: Presentation;
}

const PresentationCarousel: React.FC<PresentationCarouselProps> = ({ presentation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = () => {
    if (currentSlideIndex < presentation.slidesIds.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const currentSlide = presentation.slidesIds[currentSlideIndex];

  return (
    <div className="presentation-carousel">
      <h2>{presentation.title}</h2>
      <p>By: {presentation.authors.join(', ')}</p>
      <p>{new Date(presentation.dateOfPublishment).toLocaleDateString()}</p>
      <div className="slide-content">
        {currentSlide?.content || 'No Content Available'}
      </div>
      <div className="navigation">
        <button onClick={prevSlide} disabled={currentSlideIndex === 0}>Previous</button>
        <span>{currentSlideIndex + 1} of {presentation.slidesIds.length}</span>
        <button onClick={nextSlide} disabled={currentSlideIndex === presentation.slidesIds.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default PresentationCarousel;
