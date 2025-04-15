import React from 'react';
import '../styles/ProgressBar.css';

const ProgressBar = ({ 
  title, 
  currentValue, 
  targetValue, 
  variant,
  showDetails = true,
  formatValue = (value) => `$${value.toLocaleString()}`
}) => {
  const percentage = Math.min(Math.round((currentValue / targetValue) * 100), 100);
  
  return (
    <div className="progress-container">
      <div className="progress-label">
        <span className="progress-title">{title}</span>
        <span className="progress-value">{percentage}%</span>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className={`progress-bar ${variant ? `progress-bar-${variant}` : ''}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {showDetails && (
        <div className="progress-details">
          <span>{formatValue(currentValue)}</span>
          <span className="progress-target">Goal: {formatValue(targetValue)}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
