import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPresentationById, updatePresentation } from '../services/presentationApi';
import { createSlide } from '../services/slideApi';
import { Presentation, Slide } from '../types';
import Navbar from '../components/Navbar';
import EditPresentation from '../components/EditPresentation';
import EditSlides from '../components/EditSlides';
import '../styles/presentationPreview.css';
import { useDebouncedCallback } from 'use-debounce';

const PresentationPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [isEditingSlides, setIsEditingSlides] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPresentation() {
      try {
        const data = await getPresentationById(id!);
        setPresentation(data);
      } catch (error) {
        console.error('Failed to fetch presentation', error);
      }
    }
    fetchPresentation();
  }, [id]);

  const handleUpdatePresentation = (updatedPresentation: Presentation) => {
    setPresentation(updatedPresentation);
    setUnsavedChanges(true);
  };

  const handleUpdateSlides = (updatedSlides: Slide[]) => {
    setPresentation({
      ...presentation!,
      slidesIds: updatedSlides,
    });
    setUnsavedChanges(true);
  };

  const debouncedSaveChanges = useDebouncedCallback(async () => {
    try {
      // First, save any new slides
      const newSlides = presentation!.slidesIds.filter(slide => slide._id.startsWith('temp-'));
      for (const newSlide of newSlides) {
        const createdSlide = await createSlide(presentation!._id, newSlide.content);
        // Replace the temporary ID with the real one from the database
        newSlide._id = createdSlide._id;
      }
  
      // Now, save the entire presentation with the correct slide IDs
      await updatePresentation(id!, presentation!);
      setUnsavedChanges(false);
      alert('Changes saved successfully');
    } catch (error) {
      console.error('Failed to save changes', error);
      alert('Failed to save changes');
    }
  }, 500);

  const handleSaveChanges = () => {
    debouncedSaveChanges();
  };

  const handleBackToDashboard = () => {
    if (unsavedChanges) {
      const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
      if (!confirmLeave) return;
    }
    navigate('/');
  };

  return (
    <div className="presentation-preview">
      <Navbar title={`${presentation?.title} - Editing`} />
      {presentation ? (
        <div className="content-container">
          {!isEditingSlides ? (
            <EditPresentation presentation={presentation} onUpdate={handleUpdatePresentation} />
          ) : (
            <EditSlides presentation={presentation} onUpdate={handleUpdateSlides} />
          )}
        </div>
      ) : (
        <p>Loading presentation...</p>
      )}
      <div className="action-buttons">
        <button onClick={handleBackToDashboard} className="back-button">Back to Dashboard</button>
        <button onClick={handleSaveChanges} className="save-button">Save Changes</button>
        <button onClick={() => setIsEditingSlides(!isEditingSlides)} className="edit-toggle-button">
          {isEditingSlides ? 'Edit Presentation' : 'Edit Slides'}
        </button>
      </div>
    </div>
  );
};

export default PresentationPreview;
