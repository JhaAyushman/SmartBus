import React, { useState } from 'react';
import Card from 'react-credit-cards';
import SharedNavbar from '../SharedNavbar/SharedNavbar';
import './PaymentPage.css';
import jwt_decode from 'jwt-decode';
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from '../PaymentPage/utils';
import 'react-credit-cards/es/styles-compiled.css';
import BusTicketArtifact from '../../contracts/BusTicket.json';
import { ethers } from 'ethers';
import { FaCreditCard, FaLock, FaShieldAlt, FaArrowRight, FaCalendarAlt, FaUsers, FaRupeeSign } from 'react-icons/fa';

const BusTicketABI = BusTicketArtifact.abi;

export default class PaymentPage extends React.Component {
  state = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    token: '',
  };

  componentDidMount() {
    const tok = sessionStorage.getItem('authToken');
    if (tok) {
      const decoded = jwt_decode(tok);
      this.setState({ token: decoded.user });
    }
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({ focused: target.name });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

 handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const contractAddress = '0xCBbb8c3043F82DE72a36Dd63D8734577068FB1A4';
    const privateKey = '0xbeb070802c34f1dce627809916a089b4e719ae16891dc3ca20f536d6676682a5';

    const summary = this.getBookingSummary();
    
    if (!summary.seats || summary.seats.length === 0) {
      alert('Please select seats first');
      return;
    }

    const provider = new ethers.providers.JsonRpcProvider('http://localhost:7545');
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, BusTicketABI, wallet);

    const busRoute = `${summary.from} - ${summary.to}`;
    const seatNumbers = summary.seats.join(',');
    
    // FIX: Send a small test amount (0.001 ETH)
    const amountInWei = ethers.utils.parseEther('0.001');

    console.log('Transaction details:', {
      busRoute,
      seatNumbers,
      amount: '0.001 ETH',
      priceInRupees: summary.total
    });

    const tx = await contract.purchaseTicket(busRoute, seatNumbers, {
      value: amountInWei,
    });

    console.log('✅ Transaction sent:', tx.hash);
    const receipt = await tx.wait();
    console.log('✅ Transaction confirmed:', receipt);
    
    alert('✅ Ticket purchased on blockchain!');
    this.props.history.push('/ticket');
  } catch (error) {
    console.error('❌ Error:', error);
    alert(`Error: ${error.message}`);
  }
};


  getBookingSummary = () => {
    const seats = JSON.parse(localStorage.getItem('reservedSeats') || '[]');
    const passengerData = JSON.parse(localStorage.getItem('nameData') || '{}');
    const from = localStorage.getItem('start') || 'N/A';
    const to = localStorage.getItem('destination') || 'N/A';
    const date = localStorage.getItem('date') || 'N/A';
    const pricePerSeat = 850;

    return {
      seats,
      passengers: passengerData.name || [],
      from,
      to,
      date,
      pricePerSeat,
      subtotal: seats.length * pricePerSeat,
      tax: Math.round(seats.length * pricePerSeat * 0.05),
      total: seats.length * pricePerSeat + Math.round(seats.length * pricePerSeat * 0.05),
    };
  };

  render() {
    const { number, name, expiry, cvc, focused } = this.state;
    const summary = this.getBookingSummary();

    return (
      <div className="payment-page">
        <SharedNavbar history={this.props.history} currentPage="payment" />

        <div className="payment-content">
          <div className="payment-container">
            {/* Payment Form */}
            <div className="payment-form-section">
              <h2 className="form-title">Payment Details</h2>
              <p className="form-subtitle">Complete your booking securely</p>

              <div className="card-display">
                <Card
                  number={number}
                  name={name}
                  expiry={expiry}
                  cvc={cvc}
                  focused={focused}
                  callback={this.handleCallback}
                />
              </div>

              <form className="payment-form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>
                    <FaCreditCard /> Card Number
                  </label>
                  <input
                    type="tel"
                    name="number"
                    placeholder="1234 5678 9012 3456"
                    pattern="[\d| ]{16,22}"
                    maxLength="19"
                    value={number}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="JOHN DOE"
                    value={name}
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="tel"
                      name="expiry"
                      placeholder="MM/YY"
                      pattern="\d\d/\d\d"
                      maxLength="5"
                      value={expiry}
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>CVC</label>
                    <input
                      type="tel"
                      name="cvc"
                      placeholder="123"
                      pattern="\d{3,4}"
                      maxLength="4"
                      value={cvc}
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="payment-submit-btn">
                  <FaLock /> Complete Payment ₹{summary.total}
                </button>

                <div className="security-info">
                  <FaShieldAlt />
                  <span>Your payment is secured with 256-bit encryption</span>
                </div>
              </form>
            </div>

            {/* Booking Summary */}
            <div className="summary-section">
              <h2 className="summary-title">Booking Summary</h2>

              <div className="trip-details">
                <div className="detail-row">
                  <span className="detail-label">From</span>
                  <span className="detail-value">{summary.from}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">To</span>
                  <span className="detail-value">{summary.to}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label"><FaCalendarAlt /> Date</span>
                  <span className="detail-value">{summary.date}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label"><FaUsers /> Passengers</span>
                  <span className="detail-value">{summary.seats.length}</span>
                </div>
              </div>

              {summary.passengers.length > 0 && (
                <div className="passengers-summary">
                  <h3>Passengers</h3>
                  {summary.passengers.map((name, idx) => (
                    <div key={idx} className="passenger-row">
                      <span>{name}</span>
                      <span className="seat-badge">{summary.seats[idx]}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Base Fare ({summary.seats.length} seats)</span>
                  <span>₹{summary.subtotal}</span>
                </div>
                <div className="price-row">
                  <span>Tax (5%)</span>
                  <span>₹{summary.tax}</span>
                </div>
                <div className="price-row total">
                  <span>Total Amount</span>
                  <span>₹{summary.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
