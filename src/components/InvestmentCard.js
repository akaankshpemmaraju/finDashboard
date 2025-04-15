import React from 'react';
import Card from './Card';
import '../styles/InvestmentCard.css';

const InvestmentCard = ({ 
  symbol, 
  name, 
  currentPrice, 
  priceChange, 
  percentChange,
  shares,
  value,
  costBasis,
  onBuy,
  onSell
}) => {
  const isPositive = percentChange >= 0;
  
  return (
    <Card className="investment-card">
      <div className="investment-header">
        <div className="investment-info">
          <h4 className="investment-symbol">{symbol}</h4>
          <div className="investment-name">{name}</div>
        </div>
        <div className="investment-price">
          <div className="investment-current">${currentPrice.toFixed(2)}</div>
          <div className={`investment-change ${isPositive ? 'investment-change-positive' : 'investment-change-negative'}`}>
            {isPositive ? '↑' : '↓'} ${Math.abs(priceChange).toFixed(2)} ({Math.abs(percentChange).toFixed(2)}%)
          </div>
        </div>
      </div>
      
      <div className="investment-details">
        <div className="investment-detail">
          <div className="investment-detail-label">Shares</div>
          <div className="investment-detail-value">{shares}</div>
        </div>
        <div className="investment-detail">
          <div className="investment-detail-label">Value</div>
          <div className="investment-detail-value">${value.toFixed(2)}</div>
        </div>
        <div className="investment-detail">
          <div className="investment-detail-label">Cost Basis</div>
          <div className="investment-detail-value">${costBasis.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="investment-actions">
        <button className="investment-action-button investment-buy-button" onClick={onBuy}>
          Buy
        </button>
        <button className="investment-action-button investment-sell-button" onClick={onSell}>
          Sell
        </button>
      </div>
    </Card>
  );
};

export default InvestmentCard;
