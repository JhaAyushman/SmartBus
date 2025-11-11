import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './logOrsign.css';
import { FaEnvelope, FaLock, FaBus } from 'react-icons/fa';
import { loginUser } from './loginFunctions';

export default function LogOrsign({ onLoginSuccess }) {
  const history = useHistory();
  const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeEvent = (event, key) => {
    setLoginCredentials({
      ...loginCredentials,
      [key]: event.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginCredentials.email || !loginCredentials.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    const result = await loginUser(loginCredentials);
    
    if (result.success) {
      sessionStorage.setItem('authToken', result.token);
      localStorage.setItem('user', JSON.stringify(result.user || {}));

      if (onLoginSuccess) {
        onLoginSuccess();
      }

      history.push('/booking');
    } else {
      setError(result.message || 'Login failed. Please try again.');
      setLoading(false);
    }
  };

  const goToSignup = (e) => {
    e.preventDefault();
    history.push('/register');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Left Side - Bus Image/Branding */}
        <div className="auth-branding">
          <div className="auth-branding-content">
            <div className="bus-icon-container">
              <FaBus className="bus-icon" />
            </div>
            <h1 className="auth-brand-title">SmartBus</h1>
            <p className="auth-brand-subtitle">
              Your journey begins here. Book buses with ease and travel comfortably across the nation.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="auth-form-panel">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Welcome Back!</h2>
            <p className="auth-form-subtitle">Sign in to continue your journey</p>
          </div>

          {error && <div className="error-alert">❌ {error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                <FaEnvelope /> Email
              </label>
              <input
                className="form-input"
                type="email"
                placeholder="Enter your email"
                value={loginCredentials.email}
                onChange={(e) => handleChangeEvent(e, 'email')}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaLock /> Password
              </label>
              <input
                className="form-input"
                type="password"
                placeholder="Enter your password"
                value={loginCredentials.password}
                onChange={(e) => handleChangeEvent(e, 'password')}
                disabled={loading}
                required
              />
            </div>

            <button className="auth-submit-button" type="submit" disabled={loading}>
              {loading ? '⏳ Logging in...' : 'Login'}
            </button>
          </form>

          <div className="auth-switch">
            Don't have an account?{' '}
            <button className="auth-switch-link" onClick={goToSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
