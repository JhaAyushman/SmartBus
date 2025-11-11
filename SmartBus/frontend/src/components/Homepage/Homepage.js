import React, { useEffect, useRef } from 'react';
import './homepage.css';
import { 
  FaBus, 
  FaTicketAlt, 
  FaShieldAlt, 
  FaClock,
  FaBolt,
  FaMapMarkedAlt,
  FaStar,
  FaArrowRight,
  FaChartLine
} from 'react-icons/fa';

export default function Homepage({ history }) {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    // Custom Cursor Effect
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    const moveCursor = (e) => {
      if (cursor && cursorDot) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
      }
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

const enterSite = (e) => {
  e.preventDefault();
  
  // Check if user is already logged in
  const token = sessionStorage.getItem('authToken');
  if (token) {
    history.push('/booking'); // Changed from /routes to /booking
  } else {
    history.push('/login');
  }
};

  return (
    <div className="homepage-wrapper">
      {/* Custom Cursor */}
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="custom-cursor-dot" ref={cursorDotRef}></div>

      {/* Animated Background Elements */}
      <div className="animated-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="gradient-orb orb-4"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="grid-overlay"></div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          {/* Animated Badge */}
          <div className="hero-badge">
            <FaBolt className="badge-icon" />
            <span>India's Own Bus Booking Platform</span>
          </div>

          {/* Main Title with Gradient */}
          <h1 className="hero-title">
            Your Journey
            <br />
            <span className="gradient-text">Begins Here</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Experience seamless bus bookings with cutting-edge technology.
            <br />
            Travel smart, travel safe, travel with us.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta">
            <button className="cta-primary" onClick={enterSite}>
              <span>Start Booking</span>
              <FaArrowRight className="cta-icon" />
            </button>
            <button className="cta-secondary">
              <span>SmartBus</span>
            </button>
          </div>

          {/* Stats Row */}
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Happy Travelers</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Routes Covered</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">4.9</div>
              <div className="stat-label">
                <FaStar className="star-icon" /> Rating
              </div>
            </div>
          </div>
        </div>

        {/* 3D Bus Illustration */}
        <div className="hero-visual">
          <div className="bus-3d-container">
            <div className="bus-icon-large">
              <FaBus />
            </div>
            <div className="floating-elements">
              <div className="float-card card-1">
                <FaTicketAlt />
                <span>Instant Booking</span>
              </div>
              <div className="float-card card-2">
                <FaShieldAlt />
                <span>100% Safe</span>
              </div>
              <div className="float-card card-3">
                <FaMapMarkedAlt />
                <span>Live Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="section-header">
          <span className="section-tag">Why Choose Us</span>
          <h2 className="section-title">Premium Features</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card modern">
            <div className="feature-icon-wrapper">
              <div className="icon-glow"></div>
              <FaBolt className="feature-icon" />
            </div>
            <h3 className="feature-title">Lightning Fast</h3>
            <p className="feature-description">
              Book tickets in under 60 seconds with our optimized booking engine
            </p>
            <div className="feature-arrow">→</div>
          </div>

          <div className="feature-card modern">
            <div className="feature-icon-wrapper">
              <div className="icon-glow"></div>
              <FaShieldAlt className="feature-icon" />
            </div>
            <h3 className="feature-title">Secure Payments</h3>
            <p className="feature-description">
              Blockchain encryption ensures your money is always protected
            </p>
            <div className="feature-arrow">→</div>
          </div>

          <div className="feature-card modern">
            <div className="feature-icon-wrapper">
              <div className="icon-glow"></div>
              <FaMapMarkedAlt className="feature-icon" />
            </div>
            <h3 className="feature-title">Live Tracking</h3>
            <p className="feature-description">
              Track your bus in real-time with GPS-enabled location updates
            </p>
            <div className="feature-arrow">→</div>
          </div>

          <div className="feature-card modern">
            <div className="feature-icon-wrapper">
              <div className="icon-glow"></div>
              <FaClock className="feature-icon" />
            </div>
            <h3 className="feature-title">24/7 Support</h3>
            <p className="feature-description">
              Round-the-clock assistance for all your travel needs
            </p>
            <div className="feature-arrow">→</div>
          </div>

          <div className="feature-card modern">
            <div className="feature-icon-wrapper">
              <div className="icon-glow"></div>
              <FaTicketAlt className="feature-icon" />
            </div>
            <h3 className="feature-title">Easy Refunds</h3>
            <p className="feature-description">
              Cancel anytime and get instant refunds with zero hassle
            </p>
            <div className="feature-arrow">→</div>
          </div>

          <div className="feature-card modern">
            <div className="feature-icon-wrapper">
              <div className="icon-glow"></div>
              <FaChartLine className="feature-icon" />
            </div>
            <h3 className="feature-title">Best Prices</h3>
            <p className="feature-description">
              Get the lowest fares with our price match guarantee
            </p>
            <div className="feature-arrow">→</div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="testimonial-section">
        <div className="testimonial-card">
          <div className="quote-mark">"</div>
          <p className="testimonial-text">
            Amazing experience! The booking process was smooth and the bus was right on time. 
            Highly recommend this platform for all your travel needs.
          </p>
          <div className="testimonial-author">
            <div className="author-avatar">AJ</div>
            <div className="author-info">
              <div className="author-name">Aditya Jha</div>
              <div className="author-role">Frequent Traveler</div>
            </div>
            <div className="rating-stars">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
