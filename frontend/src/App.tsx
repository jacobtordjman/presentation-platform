// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports
import Dashboard from './pages/Dashboard';
import PresentationPreview from './pages/PresentationPreview';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Dashboard />} />
        <Route path="/presentation/:id" element={<PresentationPreview />} />
      </Routes>
    </Router>
  );
}

export default App;
