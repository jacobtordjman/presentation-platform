// src/components/PresentationCarousel.tsx

import React from 'react';
import { Presentation } from '../types';
import '../styles/presentationCarousel.css';

interface PresentationCarouselProps {
  presentation: Presentation;
  currentIndex: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

const PresentationCarousel: React.FC<PresentationCarouselProps> = ({ presentation, currentIndex, total, onNext, onPrev }) => {
  return (
    <div className="presentation-carousel">
      <h2>{presentation.title}</h2>
      <p>By: {presentation.authors.join(', ')}</p>
      <p>Last Changed: {new Date(presentation.dateOfPublishment).toLocaleDateString()}</p>
      <div className="navigation">
        <button className="nav-button" onClick={onPrev} disabled={currentIndex === 0}>Previous</button>
        <span>{currentIndex + 1} of {total}</span>
        <button className="nav-button" onClick={onNext} disabled={currentIndex === total - 1}>Next</button>
      </div>
    </div>
  );
};

export default PresentationCarousel;
