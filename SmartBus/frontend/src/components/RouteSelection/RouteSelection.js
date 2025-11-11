import React from 'react';
import RouteSelector from '../routeSelector/Routeselector';
import SeatSelection from '../SeatSelectionPage/SeatSelectionPage';
import PaymentTab from '../PaymentPage/PaymentPage';
import './RouteSelection.css';
import { FaUser, FaSignOutAlt, FaBus } from 'react-icons/fa';

export default function RouteSelection({ history }) {
  const handleUserIcon = (e) => {
    e.preventDefault();
    history.push('/profile');
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('reservedSeats');
    localStorage.removeItem('nameData');
    localStorage.clear();
    history.push('/');
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    history.push('/routes');
  };

  return (
    <div className="route-selection-page">
      {/* Modern Navbar */}
      <nav className="modern-navbar">
        <div className="navbar-content">
          <a className="navbar-brand-modern" onClick={handleLogoClick}>
            <FaBus /> SmartBus
          </a>
          <div className="nav-links-modern">
            <a className="nav-link-modern" onClick={handleLogoClick}>
              Home
            </a>
            <a className="nav-link-modern" onClick={handleUserIcon}>
              My Bookings
            </a>
            <FaUser className="nav-icon" onClick={handleUserIcon} />
            <FaSignOutAlt className="nav-icon" onClick={handleSignOut} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="route-selection-content">
        <div className="route-container">
          <div className="selection-section">
            <RouteSelector />
          </div>
          <div className="selection-section">
            <SeatSelection />
          </div>
          <div className="selection-section">
            <PaymentTab history={history} />
          </div>
        </div>
      </div>
    </div>
  );
}
