// src/components/SlideCarousel.tsx

import React from 'react';
import { Slide } from '../types';

interface SlideCarouselProps {
  slides: Slide[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

const SlideCarousel: React.FC<SlideCarouselProps> = ({ slides, currentIndex, onNext, onPrev }) => {
  return (
    <div className="slide-carousel">
      {slides.length > 0 ? (
        <>
          <div className="slide-preview">
            <h3>Slide {currentIndex + 1}</h3>
            <p>{slides[currentIndex].content}</p>
          </div>
          <div className="carousel-navigation">
            <button onClick={onPrev} disabled={currentIndex === 0}>Previous</button>
            <span>{currentIndex + 1} of {slides.length}</span>
            <button onClick={onNext} disabled={currentIndex === slides.length - 1}>Next</button>
          </div>
        </>
      ) : (
        <p>No slides available.</p>
      )}
    </div>
  );
};

export default SlideCarousel;
