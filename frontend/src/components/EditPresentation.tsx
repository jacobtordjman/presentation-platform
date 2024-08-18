// src/components/EditPresentation.tsx

import React, { useState } from 'react';
import { Presentation } from '../types';
import SlideCarousel from './SlidesCarousel';

interface EditPresentationProps {
  presentation: Presentation;
  onUpdate: (updatedPresentation: Presentation) => void;
}

const EditPresentation: React.FC<EditPresentationProps> = ({ presentation, onUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < presentation.slidesIds.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSave = () => {
    onUpdate(presentation);
  };

  return (
    <div className="edit-presentation">
      <h2>Edit Presentation</h2>
      <label htmlFor="title-input">Title</label>
      <input
        id="title-input"
        type="text"
        value={presentation.title}
        onChange={(e) => onUpdate({ ...presentation, title: e.target.value })}
        placeholder="Title"
        className="input-field"
      />
      <label htmlFor="authors-input">Authors</label>
      <input
        id="authors-input"
        type="text"
        value={presentation.authors.join(', ')}
        onChange={(e) => onUpdate({ ...presentation, authors: e.target.value.split(',').map(a => a.trim()) })}
        placeholder="Authors"
        className="input-field"
      />
      <button onClick={handleSave} className="save-button">Save Changes</button>

      {/* Add Slide Carousel here */}
      <div className="slide-preview-carousel">
        <h3>Preview Slides</h3>
        <SlideCarousel
          slides={presentation.slidesIds}
          currentIndex={currentIndex}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </div>
  );
};

export default EditPresentation;
