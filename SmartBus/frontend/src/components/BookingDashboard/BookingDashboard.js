import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import SharedNavbar from '../SharedNavbar/SharedNavbar';
import './BookingDashboard.css';
import { FaBus, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaChair, FaCreditCard, FaTicketAlt, FaCheckCircle } from 'react-icons/fa';
import BusListPage from '../BusListPage/BusListPage';
import SeatSelectionPage from '../SeatSelectionPage/SeatSelectionPage';
import PaymentPage from '../PaymentPage/PaymentPage';
import TicketPage from '../TicketPage/TicketPage';

// Mock bus data with all locations
const MOCK_BUSES = [
    { _id: 1, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Delhi", destination: "bangalore", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "27/10/2025" },
    { _id: 2, CompanyName: "ORANGE BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Delhi", destination: "bangalore", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "27/10/2025" },
    { _id: 3, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Delhi", destination: "Hyderabad", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "27/10/2025" },
    { _id: 4, CompanyName: "ORANGE BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Delhi", destination: "Hyderabad", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "27/10/2025" },
    { _id: 5, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Delhi", destination: "Coimbatore", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "28/10/2025" },
    { _id: 6, CompanyName: "ORANGE BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Delhi", destination: "Coimbatore", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "28/10/2025" },
    { _id: 7, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Delhi", destination: "Vishakapatnam", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "28/10/2025" },
    { _id: 8, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Delhi", destination: "Salem", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "28/10/2025" },
    { _id: 9, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Delhi", destination: "Tirunelveli", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "28/10/2025" },
    { _id: 10, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Bangalore", destination: "Delhi", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "29/10/2025" },
    { _id: 11, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Bangalore", destination: "Salem", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "29/10/2025" },
    { _id: 12, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Bangalore", destination: "Hyderabad", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "29/10/2025" },
    { _id: 13, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Bangalore", destination: "Coimbatore", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "29/10/2025" },
    { _id: 14, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Bangalore", destination: "Vishakapatnam", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "29/10/2025" },
    { _id: 15, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Bangalore", destination: "Kochi", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "29/10/2025" },
    { _id: 16, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Kochi", destination: "Bangalore", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "30/10/2025" },
    { _id: 17, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Kochi", destination: "Vishakapatnam", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "30/10/2025" },
    { _id: 18, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Kochi", destination: "Delhi", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "30/10/2025" },
    { _id: 19, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Kochi", destination: "Salem", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "30/10/2025" },
    { _id: 20, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Kochi", destination: "Coimbatore", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "30/10/2025" },
    { _id: 21, CompanyName: "RED BUS", busType: "Multi AXLE AC", busNumber: "TN 27 110099", startCity: "Kochi", destination: "OOty", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "30/10/2025" },
    { _id: 22, CompanyName: "Santhosh Travels bus", busType: "Multi AXLE AC", busNumber: "AP 27 110099", startCity: "Kakinada", destination: "Bangalore", totalSeats: "36", availableSeats: "20", pricePerSeat: "1000", date: "30/10/2025" }
];

export default function BookingDashboard() {
  const [activeTab, setActiveTab] = useState(1);
  const [busData, setBusData] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const history = useHistory();

  // Search form state
  const [startCity, setStartCity] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  // Extract unique cities from mock data
  const uniqueCities = useMemo(() => {
    const cities = new Set();
    MOCK_BUSES.forEach(bus => {
      if (bus.startCity) cities.add(bus.startCity);
      if (bus.destination) cities.add(bus.destination);
    });
    return Array.from(cities).sort();
  }, []);

  // Get available destination cities based on selected start city
  const availableDestinations = useMemo(() => {
    if (!startCity) return uniqueCities;
    const destinations = new Set();
    MOCK_BUSES.forEach(bus => {
      if (bus.startCity === startCity && bus.destination) {
        destinations.add(bus.destination);
      }
    });
    return Array.from(destinations).sort();
  }, [startCity, uniqueCities]);

  const handleSearchBuses = (e) => {
    e.preventDefault();
    
    if (!startCity || !destination || !date) {
      alert('Please fill all fields');
      return;
    }

    localStorage.setItem('start', startCity);
    localStorage.setItem('destination', destination);
    localStorage.setItem('date', date);

    // Filter mock data
    const filteredBuses = MOCK_BUSES.filter(
      bus => 
        bus.startCity.toLowerCase() === startCity.toLowerCase() &&
        bus.destination.toLowerCase() === destination.toLowerCase()
    );

    setBusData(filteredBuses.length > 0 ? filteredBuses : MOCK_BUSES);
    setActiveTab(2);
  };

  const handleBusSelection = (busId) => {
    setSelectedBusId(busId);
    localStorage.setItem('selectedBusId', busId);
    setActiveTab(3);
  };

  const handleSeatsConfirmed = (seats) => {
    setSelectedSeats(seats);
    setActiveTab(4);
  };

  const handlePaymentComplete = () => {
    setPaymentComplete(true);
    setActiveTab(5);
  };

  const canAccessTab = (tabNumber) => {
    if (tabNumber === 1) return true;
    if (tabNumber === 2) return busData.length > 0;
    if (tabNumber === 3) return selectedBusId !== null;
    if (tabNumber === 4) return selectedSeats.length > 0;
    if (tabNumber === 5) return paymentComplete;
    return false;
  };

  return (
    <div className="booking-dashboard">
      <SharedNavbar currentPage="booking" />

      <div className="dashboard-container">
        {/* Progress Tabs */}
        <div className="tabs-header">
          <div className={`tab-item ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>
            <div className="tab-icon"><FaSearch /></div>
            <div className="tab-info">
              <span className="tab-number">Step 1</span>
              <span className="tab-label">Search Bus</span>
            </div>
          </div>
          <div className="tab-connector"></div>

          <div className={`tab-item ${activeTab === 2 ? 'active' : ''} ${canAccessTab(2) ? '' : 'disabled'}`} 
               onClick={() => canAccessTab(2) && setActiveTab(2)}>
            <div className="tab-icon"><FaBus /></div>
            <div className="tab-info">
              <span className="tab-number">Step 2</span>
              <span className="tab-label">Select Bus</span>
            </div>
          </div>
          <div className="tab-connector"></div>

          <div className={`tab-item ${activeTab === 3 ? 'active' : ''} ${canAccessTab(3) ? '' : 'disabled'}`}
               onClick={() => canAccessTab(3) && setActiveTab(3)}>
            <div className="tab-icon"><FaChair /></div>
            <div className="tab-info">
              <span className="tab-number">Step 3</span>
              <span className="tab-label">Choose Seats</span>
            </div>
          </div>
          <div className="tab-connector"></div>

          <div className={`tab-item ${activeTab === 4 ? 'active' : ''} ${canAccessTab(4) ? '' : 'disabled'}`}
               onClick={() => canAccessTab(4) && setActiveTab(4)}>
            <div className="tab-icon"><FaCreditCard /></div>
            <div className="tab-info">
              <span className="tab-number">Step 4</span>
              <span className="tab-label">Payment</span>
            </div>
          </div>
          <div className="tab-connector"></div>

          <div className={`tab-item ${activeTab === 5 ? 'active' : ''} ${canAccessTab(5) ? '' : 'disabled'}`}
               onClick={() => canAccessTab(5) && setActiveTab(5)}>
            <div className="tab-icon"><FaTicketAlt /></div>
            <div className="tab-info">
              <span className="tab-number">Step 5</span>
              <span className="tab-label">Get Ticket</span>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Tab 1: Search */}
          {activeTab === 1 && (
            <div className="content-panel search-panel">
              <h2 className="panel-title">Search Your Bus</h2>
              <form className="search-form-dashboard" onSubmit={handleSearchBuses}>
                {/* From City Dropdown */}
                <div className="form-group-dash">
                  <label>
                    <FaMapMarkerAlt /> From
                  </label>
                  <select
                    value={startCity}
                    onChange={(e) => {
                      setStartCity(e.target.value);
                      setDestination(''); // Reset destination when start city changes
                    }}
                    required
                  >
                    <option value="">Select departure city</option>
                    {uniqueCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* To City Dropdown */}
                <div className="form-group-dash">
                  <label>
                    <FaMapMarkerAlt /> To
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    disabled={!startCity}
                  >
                    <option value="">Select destination city</option>
                    {availableDestinations.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Picker */}
                <div className="form-group-dash">
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

                <button type="submit" className="btn-next">
                  <FaSearch /> Search Buses
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Bus List */}
          {activeTab === 2 && (
            <div className="content-panel">
              <BusListPage 
                busData={busData} 
                onSelectBus={handleBusSelection} 
              />
            </div>
          )}

            {/* Tab 3: Seat Selection */}
            {activeTab === 3 && (
            <div className="content-panel">
                <SeatSelectionPage 
                selectedBusId={selectedBusId}
                onSeatsConfirmed={handleSeatsConfirmed}
                />
            </div>
            )}

            {/* Tab 4: Payment */}
            {activeTab === 4 && (
            <div className="content-panel">
                <PaymentPage
                selectedSeats={selectedSeats}
                onPaymentComplete={handlePaymentComplete}
                />
            </div>
            )}

            {/* Tab 5: Ticket */}
            {activeTab === 5 && (
            <div className="content-panel">
                <TicketPage 
                selectedSeats={selectedSeats}
                selectedBusId={selectedBusId}
                />
            </div>
            )}
        </div>
      </div>
    </div>
  );
}
