import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import LineChart from '../components/LineChart';
import InvestmentCard from '../components/InvestmentCard';
import AssetAllocationCard from '../components/AssetAllocationCard';
import { useStockData, formatChartData, calculatePriceChange } from '../utils/stockUtils';
import '../styles/InvestmentPortfolio.css';

const InvestmentPortfolio = () => {
  // Mock portfolio data
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [portfolioChange, setPortfolioChange] = useState(0);
  const [activePeriod, setActivePeriod] = useState('1M');
  
  // Mock investments data with real symbols
  const [investments, setInvestments] = useState([
    {
      id: 1,
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currentPrice: 0,
      priceChange: 0,
      percentChange: 0,
      shares: 5,
      value: 0,
      costBasis: 850.25
    },
    {
      id: 2,
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      currentPrice: 0,
      priceChange: 0,
      percentChange: 0,
      shares: 2,
      value: 0,
      costBasis: 790.50
    },
    {
      id: 3,
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      currentPrice: 0,
      priceChange: 0,
      percentChange: 0,
      shares: 4,
      value: 0,
      costBasis: 740.80
    }
  ]);
  
  // Fetch data for portfolio chart
  const { loading: portfolioLoading, stockData: portfolioData } = useStockData('SPY', '1d', '6mo');
  const portfolioChartData = formatChartData(portfolioData);
  
  // Fetch data for individual stocks
  const fetchStockData = async () => {
    const updatedInvestments = [...investments];
    let totalValue = 0;
    let totalChange = 0;
    
    for (let i = 0; i < updatedInvestments.length; i++) {
      const investment = updatedInvestments[i];
      try {
        const data = await useStockData(investment.symbol, '1d', '1mo').stockData;
        
        if (data && data.meta) {
          const currentPrice = data.meta.regularMarketPrice;
          const { change, percentage } = calculatePriceChange(data);
          const value = currentPrice * investment.shares;
          
          updatedInvestments[i] = {
            ...investment,
            currentPrice,
            priceChange: change,
            percentChange: percentage,
            value
          };
          
          totalValue += value;
          totalChange += (value * percentage / 100);
        }
      } catch (error) {
        console.error(`Error fetching data for ${investment.symbol}:`, error);
      }
    }
    
    setInvestments(updatedInvestments);
    setPortfolioValue(totalValue);
    setPortfolioChange((totalChange / totalValue) * 100);
  };
  
  useEffect(() => {
    fetchStockData();
  }, []);
  
  // Mock asset allocation data
  const assetAllocation = [
    { name: 'Equity', value: 2000, color: '#00C805' },
    { name: 'S&P 500', value: 1000, color: '#4A90E2' },
    { name: 'Bonds', value: 500, color: '#F5A623' },
    { name: 'Cash', value: 250, color: '#9013FE' }
  ];
  
  const totalAllocation = assetAllocation.reduce((sum, item) => sum + item.value, 0);
  
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  
  const handleBuy = (investment) => {
    setSelectedInvestment(investment);
    setShowBuyModal(true);
  };
  
  const handleSell = (investment) => {
    setSelectedInvestment(investment);
    setShowSellModal(true);
  };
  
  const handlePeriodChange = (period) => {
    setActivePeriod(period);
    // In a real app, this would fetch new data for the selected period
  };
  
  // Mock function to buy shares
  const buyShares = (investmentId, quantity) => {
    setInvestments(investments.map(investment => {
      if (investment.id === investmentId) {
        const newShares = investment.shares + quantity;
        const newValue = investment.currentPrice * newShares;
        const newCostBasis = investment.costBasis + (investment.currentPrice * quantity);
        return { ...investment, shares: newShares, value: newValue, costBasis: newCostBasis };
      }
      return investment;
    }));
    
    // Update portfolio value
    const newPortfolioValue = investments.reduce((sum, investment) => {
      if (investment.id === investmentId) {
        return sum + (investment.currentPrice * quantity);
      }
      return sum + investment.value;
    }, portfolioValue);
    
    setPortfolioValue(newPortfolioValue);
    setShowBuyModal(false);
    setSelectedInvestment(null);
  };
  
  // Mock function to sell shares
  const sellShares = (investmentId, quantity) => {
    setInvestments(investments.map(investment => {
      if (investment.id === investmentId && investment.shares >= quantity) {
        const newShares = investment.shares - quantity;
        const newValue = investment.currentPrice * newShares;
        const costBasisPerShare = investment.costBasis / investment.shares;
        const newCostBasis = costBasisPerShare * newShares;
        return { ...investment, shares: newShares, value: newValue, costBasis: newCostBasis };
      }
      return investment;
    }));
    
    // Update portfolio value
    const newPortfolioValue = investments.reduce((sum, investment) => {
      if (investment.id === investmentId) {
        return sum - (investment.currentPrice * quantity);
      }
      return sum + investment.value;
    }, portfolioValue);
    
    setPortfolioValue(newPortfolioValue);
    setShowSellModal(false);
    setSelectedInvestment(null);
  };
  
  return (
    <div className="investment-portfolio">
      <Header />
      
      <div className="portfolio-container">
        <div className="portfolio-header">
          <h1>Investment Portfolio</h1>
          <p>Track and manage your investments</p>
        </div>
        
        <div className="portfolio-summary">
          <Card className="portfolio-value-card">
            <div className="portfolio-value-header">
              <h2>Portfolio Value</h2>
              <div className="portfolio-amount">${portfolioValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <div className={`portfolio-change ${portfolioChange >= 0 ? 'portfolio-change-positive' : 'portfolio-change-negative'}`}>
                {portfolioChange >= 0 ? '↑' : '↓'} {Math.abs(portfolioChange).toFixed(2)}% Today
              </div>
            </div>
          </Card>
          
          <Card className="portfolio-chart-card">
            {portfolioLoading ? (
              <div>Loading chart data...</div>
            ) : (
              <LineChart 
                data={portfolioChartData || {
                  labels: [],
                  datasets: [{
                    label: 'Portfolio',
                    data: [],
                    borderColor: '#00C805',
                    backgroundColor: 'rgba(0, 200, 5, 0.1)',
                  }]
                }}
                title="Portfolio Performance"
                value={portfolioValue}
                change={portfolioChange}
                periods={['1D', '1W', '1M', '3M', '1Y', 'All']}
                activePeriod={activePeriod}
                onPeriodChange={handlePeriodChange}
              />
            )}
          </Card>
        </div>
        
        <div className="portfolio-sections">
          <div className="investments-section">
            <div className="section-header">
              <h2>Your Investments</h2>
              <a href="#" className="view-all">View All</a>
            </div>
            
            <div className="investments-list">
              {investments.map(investment => (
                <InvestmentCard 
                  key={investment.id}
                  symbol={investment.symbol}
                  name={investment.name}
                  currentPrice={investment.currentPrice}
                  priceChange={investment.priceChange}
                  percentChange={investment.percentChange}
                  shares={investment.shares}
                  value={investment.value}
                  costBasis={investment.costBasis}
                  onBuy={() => handleBuy(investment)}
                  onSell={() => handleSell(investment)}
                />
              ))}
            </div>
          </div>
          
          <div className="allocation-section">
            <div className="section-header">
              <h2>Asset Allocation</h2>
            </div>
            
            <div className="allocation-cards">
              <AssetAllocationCard 
                allocations={assetAllocation}
                totalValue={totalAllocation}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Buy Modal (simplified) */}
      {showBuyModal && selectedInvestment && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Buy {selectedInvestment.symbol}</h3>
              <button className="modal-close" onClick={() => {
                setShowBuyModal(false);
                setSelectedInvestment(null);
              }}>×</button>
            </div>
            
            <div className="modal-body">
              <div>
                <div>Current Price: ${selectedInvestment.currentPrice.toFixed(2)}</div>
                <div>Available Cash: $2,500.00</div>
              </div>
              
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>Number of Shares</label>
                <input type="number" className="form-control" placeholder="Enter quantity" min="1" />
              </div>
              
              <div style={{ marginTop: '10px' }}>
                <div>Estimated Cost: ${(selectedInvestment.currentPrice * 1).toFixed(2)}</div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-primary" 
                onClick={() => {
                  // In a real app, we would get the quantity from the input
                  buyShares(selectedInvestment.id, 1);
                }}
              >
                Buy Shares
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Sell Modal (simplified) */}
      {showSellModal && selectedInvestment && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Sell {selectedInvestment.symbol}</h3>
              <button className="modal-close" onClick={() => {
                setShowSellModal(false);
                setSelectedInvestment(null);
              }}>×</button>
            </div>
            
            <div className="modal-body">
              <div>
                <div>Current Price: ${selectedInvestment.currentPrice.toFixed(2)}</div>
                <div>Shares Owned: {selectedInvestment.shares}</div>
              </div>
              
              <div className="form-group" style={{ marginTop: '20px' }}>
                <label>Number of Shares to Sell</label>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="Enter quantity" 
                  min="1" 
                  max={selectedInvestment.shares} 
                />
              </div>
              
              <div style={{ marginTop: '10px' }}>
                <div>Estimated Proceeds: ${(selectedInvestment.currentPrice * 1).toFixed(2)}</div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-primary" 
                onClick={() => {
                  // In a real app, we would get the quantity from the input
                  sellShares(selectedInvestment.id, 1);
                }}
                disabled={selectedInvestment.shares < 1}
              >
                Sell Shares
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPortfolio;
