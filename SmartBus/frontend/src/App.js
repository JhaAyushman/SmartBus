import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage';
import LogOrsign from './components/Login-Signup/LogOrsign';
import Signup from './components/Login-Signup/Signup';
import Profile from './components/Profile/Profile';
import PaymentPage from './components/PaymentPage/PaymentPage';
import TicketPage from './components/TicketPage/TicketPage';
import BookingDashboard from './components/BookingDashboard/BookingDashboard';
import Chatbot from './components/Chatbot/Chatbot';
import selectedSeats from './components/SeatSelectionPage/SeatSelectionPage';
import './App.css';

// Protected Route Component
function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = sessionStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Function to handle login success
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('authToken');
    localStorage.clear();
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: '800'
      }}>
        ⏳ Loading...
      </div>
    );
  }

  return (
    <Router>
      <Chatbot />
      <Switch>
        {/* Public Routes */}
        <Route exact path="/" component={Homepage} />
        
        <Route path="/login">
          <LogOrsign onLoginSuccess={handleLoginSuccess} />
        </Route>
        
        <Route path="/register">
          <Signup />
        </Route>

        {/* Protected Routes - Requires Login */}
        <ProtectedRoute
          path="/booking"
          component={BookingDashboard}
          isAuthenticated={isAuthenticated}
        />
        
        <ProtectedRoute
          path="/profile"
          component={Profile}
          isAuthenticated={isAuthenticated}
        />
        
        <ProtectedRoute
          path="/ticket"
          component={TicketPage}
          isAuthenticated={isAuthenticated}
        />
        
        <ProtectedRoute
          path="/payment"
          component={PaymentPage}
          isAuthenticated={isAuthenticated}
        />

        {/* Redirect /routes to /booking */}
        <Route path="/routes">
          <Redirect to="/booking" />
        </Route>

        {/* Catch all - redirect to home */}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
