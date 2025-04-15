import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import useStockDataWithCache from '../hooks/useStockDataWithCache';
import { formatChartData, calculatePriceChange } from '../utils/stockUtils';
import '../styles/Chart.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StockChart = ({ 
  symbol,
  title,
  periods = ['1D', '1W', '1M', '3M', '1Y', 'All'],
  defaultPeriod = '1M'
}) => {
  const [activePeriod, setActivePeriod] = useState(defaultPeriod);
  const [interval, setInterval] = useState('1d');
  const [range, setRange] = useState('1mo');
  
  // Map period to Yahoo Finance API parameters
  useEffect(() => {
    switch(activePeriod) {
      case '1D':
        setInterval('5m');
        setRange('1d');
        break;
      case '1W':
        setInterval('15m');
        setRange('5d');
        break;
      case '1M':
        setInterval('1d');
        setRange('1mo');
        break;
      case '3M':
        setInterval('1d');
        setRange('3mo');
        break;
      case '1Y':
        setInterval('1d');
        setRange('1y');
        break;
      case 'All':
        setInterval('1wk');
        setRange('max');
        break;
      default:
        setInterval('1d');
        setRange('1mo');
    }
  }, [activePeriod]);
  
  // Fetch stock data with caching
  const { loading, error, stockData } = useStockDataWithCache(symbol, interval, range);
  
  // Format data for Chart.js
  const chartData = formatChartData(stockData);
  
  // Calculate price change
  const { change, percentage } = calculatePriceChange(stockData);
  
  // Get current price
  const currentPrice = stockData?.meta?.regularMarketPrice || 0;
  
  // Default chart options for Robinhood-style charts
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1E2124',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        bodyFont: {
          size: 14,
        },
        padding: 10,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 6,
          font: {
            size: 10,
          }
        },
        border: {
          display: false,
        }
      },
      y: {
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          display: true,
          font: {
            size: 10,
          },
          callback: function(value) {
            return '$' + value.toFixed(0);
          }
        },
        border: {
          display: false,
        }
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        borderColor: percentage >= 0 ? '#00C805' : '#FF5000',
        fill: 'start',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          if (percentage >= 0) {
            gradient.addColorStop(0, 'rgba(0, 200, 5, 0.2)');
            gradient.addColorStop(1, 'rgba(0, 200, 5, 0)');
          } else {
            gradient.addColorStop(0, 'rgba(255, 80, 0, 0.2)');
            gradient.addColorStop(1, 'rgba(255, 80, 0, 0)');
          }
          return gradient;
        },
      },
      point: {
        radius: 0,
        hoverRadius: 6,
        hitRadius: 30,
        hoverBackgroundColor: percentage >= 0 ? '#00C805' : '#FF5000',
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      
      {currentPrice > 0 && (
        <div className="chart-value">
          ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      )}
      
      {percentage !== 0 && (
        <div className={`chart-change ${percentage >= 0 ? 'chart-change-positive' : 'chart-change-negative'}`}>
          {percentage >= 0 ? '↑' : '↓'} ${Math.abs(change).toFixed(2)} ({Math.abs(percentage).toFixed(2)}%)
        </div>
      )}
      
      <div className="chart-period-selector">
        {periods.map(period => (
          <button
            key={period}
            className={`chart-period-button ${period === activePeriod ? 'active' : ''}`}
            onClick={() => setActivePeriod(period)}
          >
            {period}
          </button>
        ))}
      </div>
      
      {loading ? (
        <div className="chart-loading">Loading chart data...</div>
      ) : error ? (
        <div className="chart-error">Error loading chart: {error}</div>
      ) : chartData ? (
        <Line options={options} data={chartData} />
      ) : (
        <div className="chart-no-data">No data available</div>
      )}
    </div>
  );
};

export default StockChart;
