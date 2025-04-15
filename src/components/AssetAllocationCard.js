import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from './Card';
import '../styles/InvestmentCard.css';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ 
  data, 
  title,
  showLegend = false
}) => {
  // Default options for Robinhood-style pie charts
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'right',
        labels: {
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        }
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
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = context.parsed || 0;
            return `${label}: $${value.toLocaleString()} (${(percentage * 100).toFixed(1)}%)`;
          }
        }
      },
    },
    cutout: '60%',
    borderWidth: 0,
  };

  return (
    <div className="pie-chart-container">
      {title && <h3 className="chart-title">{title}</h3>}
      <Pie data={data} options={options} />
    </div>
  );
};

const AssetAllocationCard = ({ 
  allocations,
  totalValue
}) => {
  // Prepare data for pie chart
  const data = {
    labels: allocations.map(item => item.name),
    datasets: [
      {
        data: allocations.map(item => item.value),
        backgroundColor: allocations.map(item => item.color),
        hoverBackgroundColor: allocations.map(item => item.color),
      },
    ],
  };

  return (
    <Card title="Asset Allocation">
      <PieChart data={data} />
      
      <div className="allocation-legend">
        {allocations.map((item, index) => (
          <div key={index} className="allocation-item">
            <div className="allocation-color" style={{ backgroundColor: item.color }}></div>
            <span className="allocation-label">{item.name}</span>
            <span className="allocation-value">{((item.value / totalValue) * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AssetAllocationCard;
