// src/components/Actions.tsx

import React from 'react';
import '../styles/actions.css';

interface ActionsProps {
  onCreate: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

const Actions: React.FC<ActionsProps> = ({ onCreate, onUpdate, onDelete }) => {
  return (
    <div className="actions">
      <button className="action-button create-btn" onClick={onCreate}>Create Presentation</button>
      <button className="action-button update-btn" onClick={onUpdate}>Update Presentation</button>
      <button className="action-button delete-btn" onClick={onDelete}>Delete Presentation</button>
    </div>
  );
};

export default Actions;
