import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './SeatSelectionPage.css';
import { FaChair, FaCheck, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function SeatSelectionPage() {
  const history = useHistory();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const totalSeats = 36;

  // Generate booked seats ONCE on component mount
  useEffect(() => {
    const booked = [];
    for (let i = 0; i < totalSeats; i++) {
      if ((i + 1) % 5 === 0 || (i + 1) % 7 === 0) {
        booked.push(i + 1);
      }
    }
    setBookedSeats(booked);
  }, []);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats(prev => {
      if (prev.includes(seatNumber)) {
        return prev.filter(s => s !== seatNumber);
      } else {
        return [...prev, seatNumber];
      }
    });
  };

  const handlePassengerChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const handleAddPassenger = () => {
    if (passengers.length < selectedSeats.length) {
      setPassengers([...passengers, { name: '', email: '', phone: '', gender: '' }]);
    }
  };

  const handleProceed = () => {
  if (selectedSeats.length === 0) {
    alert('Please select at least one seat');
    return;
  }

  if (passengers.length !== selectedSeats.length) {
    alert(`Please fill details for all ${selectedSeats.length} passengers`);
    return;
  }

  const allValid = passengers.every(p => p.name && p.email && p.phone && p.gender);
  if (!allValid) {
    alert('Please fill all passenger details');
    return;
  }

  // Save with CORRECT keys that PaymentPage expects
  localStorage.setItem('reservedSeats', JSON.stringify(selectedSeats));
  localStorage.setItem('nameData', JSON.stringify({
    name: passengers.map(p => p.name)
  }));
  localStorage.setItem('start', 'Delhi'); // Add actual route data
  localStorage.setItem('destination', 'Mumbai'); // Add actual route data
  localStorage.setItem('date', new Date().toISOString()); // Add date

  console.log('✅ Data saved with correct keys');
  history.push('/payment');
};

  const renderSeats = () => {
    const seats = [];
    for (let i = 0; i < totalSeats; i++) {
      const seatNum = i + 1;
      const isSelected = selectedSeats.includes(seatNum);
      const isBooked = bookedSeats.includes(seatNum);

      seats.push(
        <button
          key={seatNum}
          className={`seat ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : 'available'}`}
          onClick={() => !isBooked && handleSeatClick(seatNum)}
          disabled={isBooked}
          title={`Seat ${seatNum}`}
        >
          {isSelected ? <FaCheck /> : seatNum}
        </button>
      );
    }
    return seats;
  };

  return (
    <div className="seat-selection-container">
      <div className="seat-content-wrapper">
        {/* LEFT SIDE - SEAT SELECTION */}
        <div className="seat-selection-panel">
          <h2 className="panel-title">🚌 Select Your Seats</h2>
          
          <div className="legend">
            <div className="legend-item">
              <div className="legend-seat available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-seat selected"></div>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="legend-seat booked"></div>
              <span>Booked</span>
            </div>
          </div>

          <div className="bus-diagram">
            <div className="driver-seat">👨‍✈️</div>
            
            <div className="seats-container">
              <div className="seats-grid">
                {renderSeats()}
              </div>
            </div>
          </div>

          <div className="seat-counter">
            <span className="counter-label">Selected Seats:</span>
            <span className="counter-value">
              {selectedSeats.length > 0 ? selectedSeats.sort((a, b) => a - b).join(', ') : 'None'}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE - PASSENGER DETAILS */}
        <div className="passenger-panel">
          <h2 className="panel-title">👥 Passenger Details</h2>
          
          <div className="ticket-summary">
            <div className="summary-item">
              <span className="summary-label">Seats Selected:</span>
              <span className="summary-value">{selectedSeats.length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Price:</span>
              <span className="summary-value price">₹{selectedSeats.length * 1000}</span>
            </div>
          </div>

          {selectedSeats.length > 0 && (
            <>
              <div className="passengers-list">
                {passengers.map((passenger, index) => (
                  <div key={index} className="passenger-card">
                    <div className="passenger-header">
                      <span className="passenger-num">Passenger {index + 1}</span>
                      <span className="seat-badge">Seat {selectedSeats[index]}</span>
                    </div>

                    <div className="form-field">
                      <label><FaUser /> Name</label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-field">
                      <label><FaEnvelope /> Email</label>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={passenger.email}
                        onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-field">
                        <label><FaPhone /> Phone</label>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={passenger.phone}
                          onChange={(e) => handlePassengerChange(index, 'phone', e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label>Gender</label>
                        <select
                          value={passenger.gender}
                          onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {passengers.length < selectedSeats.length && (
                <button className="btn-add-passenger" onClick={handleAddPassenger}>
                  + Add Passenger ({passengers.length}/{selectedSeats.length})
                </button>
              )}

              {passengers.length === selectedSeats.length && (
                <button className="btn-proceed" onClick={handleProceed}>
                  <FaCheck /> Proceed to Payment
                </button>
              )}
            </>
          )}

          {selectedSeats.length === 0 && (
            <div className="empty-state">
              <FaChair className="empty-icon" />
              <p>Select seats to continue</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
