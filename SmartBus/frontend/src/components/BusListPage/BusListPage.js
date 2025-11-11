import React, { useState, useEffect } from 'react';
import './BusListPage.css';
import { FaMapMarkerAlt, FaChair, FaRupeeSign, FaCheckCircle, FaFilter, FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Your real bus data
const MOCK_BUSES = [
    {
        _id: 1,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Delhi",
        destination: "bangalore",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "27/10/2025"
    },
    {
        _id: 2,
        CompanyName: "ORANGE BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Delhi",
        destination: "bangalore",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "27/10/2025"
    },
    {
        _id: 3,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Delhi",
        destination: "Hyderabad",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "27/10/2025"
    },
    {
        _id: 4,
        CompanyName: "ORANGE BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Delhi",
        destination: "Hyderabad",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "27/10/2025"
    },
    {
        _id: 5,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Delhi",
        destination: "Coimbatore",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "28/10/2025"
    },
    {
        _id: 6,
        CompanyName: "ORANGE BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Delhi",
        destination: "Coimbatore",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "28/10/2025"
    },
    {
        _id: 7,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Delhi",
        destination: "Vishakapatnam",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "28/10/2025"
    },
    {
        _id: 8,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Delhi",
        destination: "Salem",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "28/10/2025"
    },
    {
        _id: 9,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Delhi",
        destination: "Tirunelveli",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "28/10/2025"
    },
    {
        _id: 10,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Bangalore",
        destination: "Delhi",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "29/10/2025"
    },
    {
        _id: 11,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Bangalore",
        destination: "Salem",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "29/10/2025"
    },
    {
        _id: 12,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Bangalore",
        destination: "Hyderabad",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "29/10/2025"
    },
    {
        _id: 13,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Bangalore",
        destination: "Coimbatore",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "29/10/2025"
    },
    {
        _id: 14,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Bangalore",
        destination: "Vishakapatnam",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "29/10/2025"
    },
    {
        _id: 15,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Bangalore",
        destination: "Kochi",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "29/10/2025"
    },
    {
        _id: 16,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Kochi",
        destination: "Bangalore",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "30/10/2025"
    },
    {
        _id: 17,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Kochi",
        destination: "Vishakapatnam",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "30/10/2025"
    },
    {
        _id: 18,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Kochi",
        destination: "Delhi",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "30/10/2025"
    },
    {
        _id: 19,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Kochi",
        destination: "Salem",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "30/10/2025"
    },
    {
        _id: 20,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Kochi",
        destination: "Coimbatore",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "30/10/2025"
    },
    {
        _id: 21,
        CompanyName: "RED BUS",
        busType: "Multi AXLE AC",
        busNumber: "TN 27 110099",
        startCity: "Kochi",
        destination: "OOty",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "30/10/2025"
    },
    {
        _id: 22,
        CompanyName: "Santhosh Travels bus",
        busType: "Multi AXLE AC",
        busNumber: "AP 27 110099",
        startCity: "Kakinada",
        destination: "Bangalore",
        totalSeats: "36",
        availableSeats: "20",
        pricePerSeat: "1000",
        date: "30/10/2025"
    }
];

export default function BusListPage({ busData = [], onSelectBus }) {
  const [buses, setBuses] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'low-to-high', 'high-to-low'

  useEffect(() => {
    // Ensure buses is always an array
    if (Array.isArray(busData) && busData.length > 0) {
      setBuses(busData);
    } else {
      // Use mock data if no buses provided
      setBuses(MOCK_BUSES);
    }
  }, [busData]);

  // Filter buses based on search criteria from localStorage
  useEffect(() => {
    const startCity = localStorage.getItem('start');
    const destination = localStorage.getItem('destination');

    let filtered = buses;
    if (startCity && destination) {
      filtered = buses.filter(
        bus => 
          bus.startCity.toLowerCase() === startCity.toLowerCase() &&
          bus.destination.toLowerCase() === destination.toLowerCase()
      );
    }

    // Apply price sorting
    if (sortOrder === 'low-to-high') {
      filtered = [...filtered].sort((a, b) => parseInt(a.pricePerSeat) - parseInt(b.pricePerSeat));
    } else if (sortOrder === 'high-to-low') {
      filtered = [...filtered].sort((a, b) => parseInt(b.pricePerSeat) - parseInt(a.pricePerSeat));
    }

    setFilteredBuses(filtered.length > 0 ? filtered : buses);
  }, [buses, sortOrder]);

  const displayBuses = filteredBuses.length > 0 ? filteredBuses : buses;

  const handleSelectBus = (busId) => {
    setSelectedBusId(busId);
    if (onSelectBus) {
      onSelectBus(busId);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="bus-list-page">
      <div className="bus-list-content">
        <div className="bus-list-header">
          <div className="header-title">
            <h2>Available Buses</h2>
            <p>{displayBuses.length} buses found</p>
          </div>

          {/* Filter Options */}
          <div className="filter-section">
            <div className="filter-label">
              <FaFilter /> Sort by Price:
            </div>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${sortOrder === 'none' ? 'active' : ''}`}
                onClick={() => handleSortChange('none')}
              >
                All Prices
              </button>
              <button
                className={`filter-btn ${sortOrder === 'low-to-high' ? 'active' : ''}`}
                onClick={() => handleSortChange('low-to-high')}
              >
                <FaArrowUp /> Low to High
              </button>
              <button
                className={`filter-btn ${sortOrder === 'high-to-low' ? 'active' : ''}`}
                onClick={() => handleSortChange('high-to-low')}
              >
                <FaArrowDown /> High to Low
              </button>
            </div>
          </div>
        </div>

        <div className="bus-list-grid">
          {displayBuses && displayBuses.length > 0 ? (
            displayBuses.map((bus, idx) => (
              <div
                key={bus._id || idx}
                className={`bus-card-modern ${selectedBusId === bus._id ? 'selected' : ''}`}
                onClick={() => handleSelectBus(bus._id)}
              >
                <div className="bus-card-header">
                  <h3>{bus.CompanyName || `Bus ${idx + 1}`}</h3>
                  <span className="bus-badge">{bus.busType}</span>
                </div>

                <span className="bus-number">
                  <span role="img" aria-label="location">📍</span> {bus.busNumber}
                </span>
                <span className="bus-date">
                  <span role="img" aria-label="calendar">📅</span> {bus.date}
                </span>

                <div className="bus-card-details">
                  <div className="detail-item">
                    <FaMapMarkerAlt />
                    <span>{bus.startCity} → {bus.destination}</span>
                  </div>
                  <div className="detail-item">
                    <FaChair />
                    <span>{bus.availableSeats}/{bus.totalSeats} Seats Available</span>
                  </div>
                </div>

                <div className="bus-card-footer">
                  <div className="bus-price">
                    <FaRupeeSign />
                    <span>{bus.pricePerSeat}</span>
                    <small>per seat</small>
                  </div>
                  <button className="select-bus-btn">
                    {selectedBusId === bus._id ? (
                      <>
                        <FaCheckCircle /> Selected
                      </>
                    ) : (
                      'Select Bus'
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '3rem',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              <p>No buses available for selected route.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
