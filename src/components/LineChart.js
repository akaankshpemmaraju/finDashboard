import React from 'react';
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

const LineChart = ({ 
  data, 
  title, 
  value, 
  change, 
  periods = ['1D', '1W', '1M', '3M', '1Y', 'All'],
  activePeriod = '1M',
  onPeriodChange
}) => {
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
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        border: {
          display: false,
        }
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
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
        borderColor: change >= 0 ? '#00C805' : '#FF5000',
        fill: 'start',
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          if (change >= 0) {
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
        hoverBackgroundColor: change >= 0 ? '#00C805' : '#FF5000',
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
      
      {value && (
        <div className="chart-value">
          ${typeof value === 'number' ? value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value}
        </div>
      )}
      
      {change !== undefined && (
        <div className={`chart-change ${change >= 0 ? 'chart-change-positive' : 'chart-change-negative'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
        </div>
      )}
      
      <div className="chart-period-selector">
        {periods.map(period => (
          <button
            key={period}
            className={`chart-period-button ${period === activePeriod ? 'active' : ''}`}
            onClick={() => onPeriodChange && onPeriodChange(period)}
          >
            {period}
          </button>
        ))}
      </div>
      
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
