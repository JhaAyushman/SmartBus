import React, { useState } from 'react';
import './Routeselector.css';
import * as apiCall from './routeApifunc';
import BusList from '../BusListPage/BusListPage';
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';

export default function Routeselector() {
  const [dataInp, setData] = useState('');
  const [startCity, setStartCity] = useState('');
  const [destination, setDestination] = useState('');

  const handleFromCity = (e) => {
    e.preventDefault();
    setStartCity(e.target.value);
    localStorage.setItem('start', e.target.value);
  };

  const handleToCity = (e) => {
    e.preventDefault();
    setDestination(e.target.value);
    localStorage.setItem('destination', e.target.value);
  };

  const handleDate = (e) => {
    e.preventDefault();
    localStorage.setItem('date', e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use the correct function name from routeApifunc.js
    apiCall.getRoutesFromApi(startCity, destination).then((data) => {
      setData(data.data);
    });
  };

  const renderBusList = (dataInp) => {
    if (Object.keys(dataInp).length > 0) {
      return <BusList value={dataInp} />;
    }
  };

  return (
    <div className="route-selector-wrapper">
      {/* Search Panel */}
      <div className="search-panel">
        <div className="search-card">
          <div className="search-header">
            <h2 className="search-title">Find Your Perfect Journey</h2>
            <p className="search-subtitle">
              Search and book bus tickets across thousands of routes
            </p>
          </div>

          <form className="search-form" onSubmit={handleSubmit}>
            {/* From City */}
            <div className="form-group-modern">
              <label className="form-label-modern">
                <FaMapMarkerAlt className="label-icon" />
                From
              </label>
              <input
                type="text"
                className="form-input-modern"
                placeholder="Enter departure city"
                onChange={handleFromCity}
                required
              />
            </div>

            {/* To City */}
            <div className="form-group-modern">
              <label className="form-label-modern">
                <FaMapMarkerAlt className="label-icon" />
                To
              </label>
              <input
                type="text"
                className="form-input-modern"
                placeholder="Enter destination city"
                onChange={handleToCity}
                required
              />
            </div>

            {/* Date */}
            <div className="form-group-modern">
              <label className="form-label-modern">
                <FaCalendarAlt className="label-icon" />
                Date
              </label>
              <input
                type="date"
                className="form-input-modern"
                onChange={handleDate}
                required
              />
            </div>

            {/* Search Button */}
            <button type="submit" className="search-button-modern">
              <span>
                <FaSearch /> Search Buses
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* Results Container */}
      <div className="results-container">{renderBusList(dataInp)}</div>
    </div>
  );
}
