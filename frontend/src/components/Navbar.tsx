// src/components/Navbar.tsx

import React from 'react';
import '../styles/navbar.css';

interface NavbarProps {
  title?: string; // Make the title prop optional
}

const Navbar: React.FC<NavbarProps> = ({ title = 'Dashboard' }) => {
  return (
    <nav className="navbar">
      <h1>{title}</h1>
    </nav>
  );
};

export default Navbar;
