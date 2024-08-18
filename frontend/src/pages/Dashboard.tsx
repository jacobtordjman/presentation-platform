// src/pages/Dashboard.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPresentations, createPresentation, deletePresentation } from '../services/presentationApi';
import { Presentation } from '../types';
import Navbar from '../components/Navbar';
import PresentationCarousel from '../components/PresentationCarousel';
import Actions from '../components/Actions';
import '../styles/dashboard.css';

const Dashboard: React.FC = () => {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newPresentationTitle, setNewPresentationTitle] = useState('');
  const [newAuthors, setNewAuthors] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPresentations() {
      try {
        const data = await getPresentations();
        setPresentations(data);
      } catch (error) {
        console.error('Failed to fetch presentations', error);
      }
    }
    fetchPresentations();
  }, []);

  const currentPresentation = presentations[currentIndex];

  const handleNext = () => {
    if (currentIndex < presentations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCreatePresentation = async () => {
    try {
      const authorsArray = newAuthors.split(',').map(author => author.trim());
      const newPresentation = await createPresentation({
        title: newPresentationTitle,
        authors: authorsArray,
      });
      setPresentations([...presentations, newPresentation]);
      setNewPresentationTitle('');
      setNewAuthors('');
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create presentation', error);
    }
  };

  const handleDeletePresentation = async () => {
    try {
      await deletePresentation(currentPresentation._id);
      setPresentations(presentations.filter(p => p._id !== currentPresentation._id));
      setCurrentIndex(0);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to delete presentation', error);
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      {presentations.length > 0 && (
        <PresentationCarousel
          presentation={currentPresentation}
          currentIndex={currentIndex}
          total={presentations.length}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      <Actions
        onCreate={() => setShowCreateForm(true)}
        onUpdate={() => navigate(`/presentation/${currentPresentation._id}`)}
        onDelete={() => setShowDeleteConfirm(true)}
      />

      {showCreateForm && (
        <div className="create-form">
          <h3>Create New Presentation</h3>
          <input
            type="text"
            placeholder="Title"
            value={newPresentationTitle}
            onChange={e => setNewPresentationTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Authors (comma separated)"
            value={newAuthors}
            onChange={e => setNewAuthors(e.target.value)}
          />
          <button onClick={() => {
            if (window.confirm("Are you sure you want to create this presentation?")) {
              handleCreatePresentation();
            }
          }}>Create Presentation</button>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="delete-confirm">
          <p>Are you sure you want to delete this presentation?</p>
          <button onClick={handleDeletePresentation}>Yes</button>
          <button onClick={() => setShowDeleteConfirm(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
