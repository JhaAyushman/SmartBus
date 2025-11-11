import React from 'react';
import './TicketPage.css';
import { 
  FaCheckCircle, 
  FaDownload, 
  FaBus, 
  FaSignOutAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaCreditCard,
  FaQrcode
} from 'react-icons/fa';

export default function TicketPage({ history }) {
  const handleSignOut = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('reservedSeats');
    localStorage.removeItem('nameData');
    localStorage.clear();
    history.push('/');
  };

  const handleBookAgain = (e) => {
    e.preventDefault();
    history.push('/routes');
  };

  const getLocationData = () => {
    let from = localStorage.getItem('start') || 'N/A';
    let to = localStorage.getItem('destination') || 'N/A';
    return { from, to };
  };

  const getDateValue = () => {
    let dat = localStorage.getItem('date') || 'N/A';
    return dat;
  };

  const getPassengerData = () => {
    const seats = JSON.parse(localStorage.getItem('reservedSeats') || '[]');
    const passengerData = JSON.parse(localStorage.getItem('nameData') || '{}');
    const passengers = passengerData.name || [];
    
    return passengers.map((name, idx) => ({
      name,
      seat: seats[idx],
    }));
  };

  const getBookingId = () => {
    return 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const location = getLocationData();
  const passengers = getPassengerData();
  const bookingId = getBookingId();
  const date = getDateValue();
  const totalAmount = passengers.length * 850;

  return (
    <div className="ticket-page-wrapper">
      <div className="ticket-container">
        {/* Success Animation */}
        <div className="success-animation">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          <h1 className="success-title">Booking Confirmed!</h1>
          <p className="success-message">
            Your ticket has been booked successfully. 
            A confirmation email has been sent to your registered email address.
          </p>
        </div>

        {/* Ticket Card */}
        <div className="ticket-card">
          {/* Ticket Header */}
          <div className="ticket-header">
            <div className="ticket-number">BOOKING ID: {bookingId}</div>
            <h2 className="ticket-title">
              <FaBus /> E-Ticket
            </h2>
            <div className="ticket-route">
              <span>{location.from}</span>
              <FaMapMarkerAlt className="route-arrow-ticket" />
              <span>{location.to}</span>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="ticket-body">
            {/* Left Section */}
            <div className="ticket-section">
              <div className="ticket-info-group">
                <span className="ticket-label">
                  <FaMapMarkerAlt /> From
                </span>
                <span className="ticket-value">{location.from}</span>
              </div>

              <div className="ticket-info-group">
                <span className="ticket-label">
                  <FaMapMarkerAlt /> To
                </span>
                <span className="ticket-value">{location.to}</span>
              </div>

              <div className="ticket-info-group">
                <span className="ticket-label">
                  <FaCalendarAlt /> Journey Date
                </span>
                <span className="ticket-value">{date}</span>
              </div>

              <div className="ticket-info-group">
                <span className="ticket-label">Departure Time</span>
                <span className="ticket-value">10:00 AM</span>
              </div>
            </div>

            {/* Right Section */}
            <div className="ticket-section">
              <div className="ticket-info-group">
                <span className="ticket-label">
                  <FaUsers /> Total Passengers
                </span>
                <span className="ticket-value highlight">{passengers.length}</span>
              </div>

              <div className="ticket-info-group">
                <span className="ticket-label">
                  <FaCreditCard /> Total Amount
                </span>
                <span className="ticket-value highlight">₹{totalAmount}</span>
              </div>

              <div className="ticket-info-group">
                <span className="ticket-label">Payment Method</span>
                <span className="ticket-value">Credit Card</span>
              </div>

              <div className="ticket-info-group">
                <span className="ticket-label">Payment Status</span>
                <span className="ticket-value" style={{ color: '#10b981' }}>
                  ✓ Confirmed
                </span>
              </div>
            </div>
          </div>

          {/* Passengers Section */}
          {passengers.length > 0 && (
            <div className="ticket-body" style={{ paddingTop: 0 }}>
              <div className="ticket-section" style={{ gridColumn: '1 / -1' }}>
                <div className="ticket-info-group">
                  <span className="ticket-label">
                    <FaUsers /> Passenger Details
                  </span>
                  <div className="passengers-list">
                    {passengers.map((passenger, idx) => (
                      <div key={idx} className="passenger-entry">
                        <span className="passenger-name-ticket">
                          {idx + 1}. {passenger.name}
                        </span>
                        <span className="passenger-seat-ticket">
                          Seat {passenger.seat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* QR Code Section */}
          <div className="qr-code-section">
            <div className="qr-code-placeholder">
              <FaQrcode style={{ fontSize: '8rem', color: '#e5e7eb' }} />
            </div>
            <p className="qr-code-text">
              Scan this QR code at the boarding point for quick check-in
            </p>
          </div>

          {/* Action Buttons */}
          <div className="ticket-actions">
            <button className="ticket-action-button primary" onClick={handleBookAgain}>
              <span>
                <FaBus /> Book Another Trip
              </span>
            </button>
            <button className="ticket-action-button secondary">
              <span>
                <FaDownload /> Download Ticket
              </span>
            </button>
            <button className="ticket-action-button secondary" onClick={handleSignOut}>
              <span>
                <FaSignOutAlt /> Sign Out
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
