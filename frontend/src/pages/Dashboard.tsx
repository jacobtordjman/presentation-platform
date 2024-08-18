import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPresentations,
  createPresentation,
  deletePresentation,
} from "../services/presentationApi";
import { Presentation } from "../types";
import Navbar from "../components/Navbar";
import PresentationCarousel from "../components/PresentationCarousel";
import Actions from "../components/Actions";
import "../styles/dashboard.css";

const Dashboard: React.FC = () => {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newPresentationTitle, setNewPresentationTitle] = useState("");
  const [newAuthors, setNewAuthors] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");  // State to hold error message
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPresentations() {
      try {
        const data = await getPresentations();
        setPresentations(data);
      } catch (error) {
        console.error("Failed to fetch presentations", error);
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
      const authorsArray = newAuthors.split(",").map((author) => author.trim());
      const newPresentation = await createPresentation({
        title: newPresentationTitle,
        authors: authorsArray,
      });
      setPresentations([...presentations, newPresentation]);
      setNewPresentationTitle("");
      setNewAuthors("");
      setShowCreateForm(false);
      setErrorMessage("");  // Clear any previous error message
    } catch (error) {
        const err = error as any;  // Type assertion to any
      
        if (err.response && err.response.data.message) {
          setErrorMessage(err.response.data.message);  // Set error message from backend
        } else {
          setErrorMessage("Failed to create presentation.");
        }
      }
      
  };

  const handleDeletePresentation = async () => {
    try {
      await deletePresentation(currentPresentation._id);
      setPresentations(
        presentations.filter((p) => p._id !== currentPresentation._id)
      );
      setCurrentIndex(0);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Failed to delete presentation", error);
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
        <div className="create-presentation-container">
          <h3 className="create-presentation-container-title">
            Create New Presentation
          </h3>
          <div className="create-presentation-body">
            <div className="create-input-group">
              <input
                id="presentation-title"
                type="text"
                placeholder="Title"
                value={newPresentationTitle}
                onChange={(e) => setNewPresentationTitle(e.target.value)}
              />
              <input
                id="presentation-authors"
                type="text"
                placeholder="Authors (comma separated)"
                value={newAuthors}
                onChange={(e) => setNewAuthors(e.target.value)}
              />
            </div>
            <div className="create-button-group">
              <button
                className="create-presentation-button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to create this presentation?"
                    )
                  ) {
                    handleCreatePresentation();
                  }
                }}
              >
                Create
              </button>
              <button
                className="cancel-presentation-button"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}
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
