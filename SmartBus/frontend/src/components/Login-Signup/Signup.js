import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './signup.css';
import { FaUser, FaEnvelope, FaLock, FaBus } from 'react-icons/fa';
import axios from 'axios';

export default function Signup() {
  const history = useHistory();
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChangeEvent = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value
    });
    setError('');
  };

  const submitNewUser = async (e) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.password || !newUser.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newUser.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://smartbusbackend.onrender.com/user/register', {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
      });

      if (response.data.success) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          history.push('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getToLogin = (e) => {
    e.preventDefault();
    history.push('/login');
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
              Create an account to start booking your bus tickets and enjoy exclusive offers
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="auth-form-panel">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Create Account</h2>
            <p className="auth-form-subtitle">Fill in your details to get started</p>
          </div>

          {error && <div className="error-alert">❌ {error}</div>}
          {success && <div className="success-alert">✓ {success}</div>}

          <form className="auth-form" onSubmit={submitNewUser}>
            <div className="form-group">
              <label className="form-label">
                <FaUser /> Full Name
              </label>
              <input
                className="form-input"
                type="text"
                placeholder="Enter your full name"
                value={newUser.name}
                onChange={(e) => handleChangeEvent(e, 'name')}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaEnvelope /> Email
              </label>
              <input
                className="form-input"
                type="email"
                placeholder="Enter your email"
                value={newUser.email}
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
                placeholder="Enter password (min 6 characters)"
                value={newUser.password}
                onChange={(e) => handleChangeEvent(e, 'password')}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaLock /> Confirm Password
              </label>
              <input
                className="form-input"
                type="password"
                placeholder="Confirm your password"
                value={newUser.confirmPassword}
                onChange={(e) => handleChangeEvent(e, 'confirmPassword')}
                disabled={loading}
                required
              />
            </div>

            <button className="auth-submit-button" type="submit" disabled={loading}>
              {loading ? '⏳ Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-switch">
            Already have an account?{' '}
            <button className="auth-switch-link" onClick={getToLogin}>
              Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
