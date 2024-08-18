// src/pages/PresentationPreview.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Updated imports
import { getPresentationById } from '../services/presentationApi';
import { Presentation } from '../types';
import PresentationCarousel from '../components/PresentationCarousel';
import '../styles/presentationPreview.css';

const PresentationPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const navigate = useNavigate(); // Updated hook

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

  return (
    <div className="presentation-preview">
      <h1>Presentation Preview</h1>
      {presentation ? (
        <>
          <PresentationCarousel presentation={presentation} />
          <button onClick={() => navigate('/')}>Back to Dashboard</button> {/* Updated */}
        </>
      ) : (
        <p>Loading presentation...</p>
      )}
    </div>
  );
};

export default PresentationPreview;
