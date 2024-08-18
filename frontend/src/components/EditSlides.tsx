// src/components/EditSlides.tsx

import React, { useState } from 'react';
import { Slide, Presentation } from '../types';
import SlideCarousel from './SlidesCarousel';

interface EditSlidesProps {
  presentation: Presentation;
  onUpdate: (updatedSlides: Slide[]) => void;
}

const EditSlides: React.FC<EditSlidesProps> = ({ presentation, onUpdate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content, setContent] = useState(presentation.slidesIds[0]?.content || '');

  const handleSave = () => {
    const updatedSlides = presentation.slidesIds.map((slide, index) => {
      if (index === currentIndex) {
        return { ...slide, content };
      }
      return slide;
    });
    onUpdate(updatedSlides);
  };

  const handleDeleteSlide = () => {
    if (presentation.slidesIds.length > 1) {
      const updatedSlides = presentation.slidesIds.filter((_, index) => index !== currentIndex);
      onUpdate(updatedSlides);
      setCurrentIndex(Math.max(0, currentIndex - 1));
      setContent(updatedSlides[currentIndex]?.content || '');
    } else {
      alert("Cannot delete the last slide");
    }
  };

  const [newSlides, setNewSlides] = useState<Slide[]>([]);

  const handleAddSlide = () => {
    const newSlide: Slide = {
      content: '',
      presentationId: presentation._id,
      _id: `temp-${Date.now()}` // Temporary ID to distinguish new slides
    };
  
    const updatedSlides = [...presentation.slidesIds, newSlide];
    onUpdate(updatedSlides);
    setCurrentIndex(updatedSlides.length - 1);
    setContent('');
  };
  

  const handleNext = () => {
    if (currentIndex < presentation.slidesIds.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setContent(presentation.slidesIds[currentIndex + 1].content);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setContent(presentation.slidesIds[currentIndex - 1].content);
    }
  };

  return (
    <div className="edit-slides-container">
      <h2>Edit Slide {currentIndex + 1}</h2>

      <label htmlFor="slide-content">Slide Content</label>
      <textarea
        id="slide-content"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="input-field"
      />

      <div className="navigation">
        <button onClick={handlePrev} disabled={currentIndex === 0}>Previous</button>
        <button onClick={handleNext} disabled={currentIndex === presentation.slidesIds.length - 1}>Next</button>
      </div>

      <button onClick={handleSave} className="save-button">Save Slide</button>
      <button onClick={handleAddSlide} className="add-slide-button">Add Slide</button>
      <button onClick={handleDeleteSlide} className="delete-slide-button">Delete Slide</button>

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

export default EditSlides;
