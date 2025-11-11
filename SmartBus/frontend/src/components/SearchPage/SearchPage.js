import React, { useState } from 'react';
import SharedNavbar from '../SharedNavbar/SharedNavbar';
import './SearchPage.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';

export default function SearchPage({ history }) {
  const [startCity, setStartCity] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!startCity || !destination || !date) {
      alert('Please fill all fields');
      return;
    }

    localStorage.setItem('start', startCity);
    localStorage.setItem('destination', destination);
    localStorage.setItem('date', date);
    
    history.push('/buses');
  };

  return (
    <div className="search-page">
      <SharedNavbar history={history} currentPage="search" />
      
      <div className="search-content">
        <div className="search-hero">
          <h1 className="search-hero-title">Find Your Perfect Journey</h1>
          <p className="search-hero-subtitle">
            Search and book bus tickets across thousands of routes
          </p>
        </div>

        <div className="search-form-container">
          <form className="search-form-clean" onSubmit={handleSearch}>
            <div className="form-field">
              <label>
                <FaMapMarkerAlt /> From
              </label>
              <input
                type="text"
                placeholder="Enter departure city"
                value={startCity}
                onChange={(e) => setStartCity(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>
                <FaMapMarkerAlt /> To
              </label>
              <input
                type="text"
                placeholder="Enter destination city"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>
                <FaCalendarAlt /> Journey Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="search-submit-btn">
              <FaSearch /> Search Buses
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
