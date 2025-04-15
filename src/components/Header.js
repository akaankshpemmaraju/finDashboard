import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <header className="header">
      <div className="logo">FinPort</div>
      
      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      
      <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <li className="nav-item">
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link 
            to="/investments" 
            className={`nav-link ${isActive('/investments') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Investments
          </Link>
        </li>
      </ul>
      
      <div className="user-menu">
        <div className="user-avatar">U</div>
      </div>
    </header>
  );
};

export default Header;
