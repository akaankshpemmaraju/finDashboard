import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedBank, setSelectedBank] = useState(null);
  const [showBankLinking, setShowBankLinking] = useState(false);
  
  const banks = [
    { id: 1, name: 'Chase', icon: '🏦' },
    { id: 2, name: 'Bank of America', icon: '🏦' },
    { id: 3, name: 'Wells Fargo', icon: '🏦' },
    { id: 4, name: 'Citi', icon: '🏦' },
    { id: 5, name: 'Capital One', icon: '🏦' },
    { id: 6, name: 'Other', icon: '➕' },
  ];
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (!showBankLinking) {
        setShowBankLinking(true);
      } else if (selectedBank) {
        // In a real app, this would handle authentication and bank linking
        onLogin();
      } else {
        setErrors({ bank: 'Please select a bank to link' });
      }
    }
  };
  
  const handleBankSelect = (bankId) => {
    setSelectedBank(bankId);
    setErrors({ ...errors, bank: undefined });
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <h1>FinPort</h1>
          <p>Your Financial Portfolio Dashboard</p>
        </div>
        
        {!showBankLinking ? (
          <>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>
              
              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="form-error">{errors.password}</div>}
              </div>
              
              <div className="login-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              
              <button type="submit" className="login-button">Log In</button>
            </form>
            
            <div className="signup-prompt">
              Don't have an account? <a href="#" className="signup-link">Sign up</a>
            </div>
          </>
        ) : (
          <div className="bank-link-section">
            <h2 className="bank-link-title">Link Your Bank Account</h2>
            <p>Select your bank to connect your accounts:</p>
            
            <div className="bank-options">
              {banks.map((bank) => (
                <div
                  key={bank.id}
                  className={`bank-option ${selectedBank === bank.id ? 'selected' : ''}`}
                  onClick={() => handleBankSelect(bank.id)}
                >
                  <div className="bank-icon">{bank.icon}</div>
                  <div className="bank-name">{bank.name}</div>
                </div>
              ))}
            </div>
            
            {errors.bank && <div className="form-error">{errors.bank}</div>}
            
            <button 
              className="login-button" 
              onClick={handleSubmit}
              disabled={!selectedBank}
            >
              Connect Bank
            </button>
            
            <button 
              className="bank-link-button" 
              onClick={() => setShowBankLinking(false)}
              style={{ marginTop: '10px' }}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
