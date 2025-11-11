import React from 'react';
import { useHistory } from 'react-router-dom';
import './SharedNavbar.css';
import { FaBus, FaUser, FaSignOutAlt, FaHome } from 'react-icons/fa';

export default function SharedNavbar({ currentPage }) {
  const history = useHistory();

  const handleSignOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('authToken');
    localStorage.clear();
    history.push('/');
  };

const handleLogoClick = (e) => {
  e.preventDefault();
  history.push('/booking'); 
};


  const handleProfile = (e) => {
    e.preventDefault();
    history.push('/profile');
  };

  const handleHome = (e) => {
    e.preventDefault();
    history.push('/');
  };

  return (
    <nav className="shared-navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={handleLogoClick}>
          <FaBus className="brand-icon" />
          <span>SmartBus</span>
        </div>
        
        <div className="navbar-links">
          <button 
            className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={handleHome}
          >
            <FaHome /> Home
          </button>
          <button 
            className={`nav-btn ${currentPage === 'search' ? 'active' : ''}`}
            onClick={handleLogoClick}
          >
            Search Buses
          </button>
          <button 
            className={`nav-btn ${currentPage === 'profile' ? 'active' : ''}`}
            onClick={handleProfile}
          >
            <FaUser /> Profile
          </button>
          <button className="nav-btn signout-btn" onClick={handleSignOut}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
