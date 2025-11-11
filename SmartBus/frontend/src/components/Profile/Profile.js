import React, { useState, useEffect, useRef } from 'react';
import './profile.css';
import jwt_decode from 'jwt-decode';
import { 
  FaUser, 
  FaStar, 
  FaTicketAlt, 
  FaComments,
  FaSignOutAlt,
  FaBus,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheck,
  FaTimes,
  FaCamera,
  FaTrash
} from 'react-icons/fa';

export default function Profile({ history }) {
  const [token, setToken] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({
    reviews: 20,
    bookings: 10,
    stars: 5,
  });
  const [userInfo, setUserInfo] = useState({
    phone: '+91 98765 43210',
    location: 'Mumbai, India'
  });
  const [editing, setEditing] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef(null);
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const tok = sessionStorage.getItem('authToken');
    if (tok) {
      const decoded = jwt_decode(tok);
      setToken(decoded.user);
    }
    
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
        setShowContextMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goBackToRoutes = (e) => {
    e.preventDefault();
    history.push('/routes');
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('authToken');
    localStorage.clear();
    history.push('/');
  };

  const handleAvatarRightClick = (e) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  const handleProfileImageClick = () => {
    setShowContextMenu(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setProfileImage(result);
        localStorage.setItem('profileImage', result);
      };
      reader.readAsDataURL(file);
    }
    setShowContextMenu(false);
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
    localStorage.removeItem('profileImage');
    setShowContextMenu(false);
  };

  const handleEditClick = (key, value, e) => {
    e.stopPropagation();
    setEditing(key);
    setInputValue(value);
  };

  const handleSave = (key) => {
    if (inputValue.trim() === '') return;
    
    if (key === 'phone') {
      if (!/^\+?[0-9\s\-\(\)]{10,}$/.test(inputValue)) {
        alert('Please enter a valid phone number');
        return;
      }
    }
    
    setUserInfo((prev) => ({ ...prev, [key]: inputValue }));
    setEditing(null);
  };

  const handleStatEdit = (key) => {
    if (inputValue.trim() === '') return;
    setStats((prev) => ({ ...prev, [key]: Number(inputValue) }));
    setEditing(null);
  };

  const handleKeyDown = (e, key, isUserInfo = false) => {
    if (e.key === 'Enter') {
      isUserInfo ? handleSave(key) : handleStatEdit(key);
    }
    if (e.key === 'Escape') setEditing(null);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-nav">
            <div className="profile-nav-icon" onClick={goBackToRoutes} title="Back to Routes">
              <FaBus />
            </div>
            <div className="profile-nav-icon" onClick={handleSignOut} title="Sign Out">
              <FaSignOutAlt />
            </div>
          </div>

          <div className="profile-avatar-wrapper">
            <div className="profile-avatar-container">
              <div 
                className="profile-avatar"
                onContextMenu={handleAvatarRightClick}
                title="Right-click for options"
              >
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="profile-image" />
                ) : (
                  <FaUser />
                )}
              </div>
              <button 
                className="avatar-edit-button"
                onClick={handleProfileImageClick}
                title="Change profile picture"
              >
                <FaCamera />
              </button>

              {/* Context Menu */}
              {showContextMenu && (
                <div 
                  ref={contextMenuRef}
                  className="avatar-context-menu"
                  style={{ top: `${contextMenuPos.y}px`, left: `${contextMenuPos.x}px` }}
                >
                  <button className="context-menu-item" onClick={handleProfileImageClick}>
                    <FaCamera /> Change Photo
                  </button>
                  {profileImage && (
                    <button className="context-menu-item remove" onClick={handleRemovePhoto}>
                      <FaTrash /> Remove Photo
                    </button>
                  )}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="profile-user-info">
            <h1 className="profile-username">{token.name || 'Guest User'}</h1>
            <p className="profile-email">{token.email || 'guest@example.com'}</p>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="profile-stats">
          <div className="stat-item">
            {editing === 'reviews' ? (
              <div className="stat-edit-container">
                <input
                  type="number"
                  className="stat-edit-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'reviews')}
                  autoFocus
                />
                <div className="stat-edit-buttons">
                  <button onClick={() => handleStatEdit('reviews')} className="btn-check">
                    <FaCheck />
                  </button>
                  <button onClick={() => setEditing(null)} className="btn-cancel">
                    <FaTimes />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="stat-value">{stats.reviews}</span>
                <button
                  className="stat-edit-button"
                  onClick={(e) => handleEditClick('reviews', stats.reviews, e)}
                >
                  <FaEdit />
                </button>
              </>
            )}
            <span className="stat-label">
              <FaComments /> Reviews
            </span>
          </div>

          <div className="stat-item">
            {editing === 'bookings' ? (
              <div className="stat-edit-container">
                <input
                  type="number"
                  className="stat-edit-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'bookings')}
                  autoFocus
                />
                <div className="stat-edit-buttons">
                  <button onClick={() => handleStatEdit('bookings')} className="btn-check">
                    <FaCheck />
                  </button>
                  <button onClick={() => setEditing(null)} className="btn-cancel">
                    <FaTimes />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="stat-value">{stats.bookings}</span>
                <button
                  className="stat-edit-button"
                  onClick={(e) => handleEditClick('bookings', stats.bookings, e)}
                >
                  <FaEdit />
                </button>
              </>
            )}
            <span className="stat-label">
              <FaTicketAlt /> Bookings
            </span>
          </div>

          <div className="stat-item">
            {editing === 'stars' ? (
              <div className="stat-edit-container">
                <input
                  type="number"
                  className="stat-edit-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 'stars')}
                  autoFocus
                  min="0"
                  max="5"
                />
                <div className="stat-edit-buttons">
                  <button onClick={() => handleStatEdit('stars')} className="btn-check">
                    <FaCheck />
                  </button>
                  <button onClick={() => setEditing(null)} className="btn-cancel">
                    <FaTimes />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span className="stat-value">{stats.stars}</span>
                <button
                  className="stat-edit-button"
                  onClick={(e) => handleEditClick('stars', stats.stars, e)}
                >
                  <FaEdit />
                </button>
              </>
            )}
            <span className="stat-label">
              <FaStar /> Rating
            </span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {/* Personal Information */}
          <div className="profile-section">
            <h3 className="section-title">
              <FaUser className="section-icon" />
              Personal Information
            </h3>
            <div className="info-cards">
              <div className="info-card">
                <div className="info-card-label">
                  <FaEnvelope /> Email Address
                </div>
                <div className="info-card-value">{token.email || 'Not provided'}</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">
                  <FaPhone /> Phone Number
                </div>
                {editing === 'phone' ? (
                  <div className="info-card-edit">
                    <input
                      type="tel"
                      className="info-edit-input"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 'phone', true)}
                      autoFocus
                      placeholder="Enter phone number"
                    />
                    <div className="info-edit-buttons">
                      <button onClick={() => handleSave('phone')} className="btn-check">
                        <FaCheck />
                      </button>
                      <button onClick={() => setEditing(null)} className="btn-cancel">
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="info-card-value-wrapper">
                    <div className="info-card-value">{userInfo.phone}</div>
                    <button
                      className="info-edit-button"
                      onClick={(e) => handleEditClick('phone', userInfo.phone, e)}
                      title="Edit phone number"
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
              </div>
              <div className="info-card">
                <div className="info-card-label">
                  <FaMapMarkerAlt /> Location
                </div>
                {editing === 'location' ? (
                  <div className="info-card-edit">
                    <input
                      type="text"
                      className="info-edit-input"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, 'location', true)}
                      autoFocus
                      placeholder="Enter location"
                    />
                    <div className="info-edit-buttons">
                      <button onClick={() => handleSave('location')} className="btn-check">
                        <FaCheck />
                      </button>
                      <button onClick={() => setEditing(null)} className="btn-cancel">
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="info-card-value-wrapper">
                    <div className="info-card-value">{userInfo.location}</div>
                    <button
                      className="info-edit-button"
                      onClick={(e) => handleEditClick('location', userInfo.location, e)}
                      title="Edit location"
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="profile-section">
            <h3 className="section-title">
              <FaTicketAlt className="section-icon" />
              Recent Activity
            </h3>
            <div className="info-cards">
              <div className="info-card">
                <div className="info-card-label">Last Booking</div>
                <div className="info-card-value">Mumbai → Pune</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Booking Date</div>
                <div className="info-card-value">Oct 25, 2025</div>
              </div>
              <div className="info-card">
                <div className="info-card-label">Total Spent</div>
                <div className="info-card-value">₹8,500</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="profile-section">
            <div className="profile-actions">
              <button className="action-button" onClick={goBackToRoutes}>
                <span>
                  <FaBus /> Book New Trip
                </span>
              </button>
              <button className="action-button secondary">
                <span>
                  <FaTicketAlt /> View Bookings
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
