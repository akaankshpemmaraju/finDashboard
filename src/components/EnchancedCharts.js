import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from './Card';
import '../styles/InvestmentCard.css';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const EnhancedPieChart = ({ 
  data, 
  title,
  showLegend = false,
  height = 200
}) => {
  // Enhanced options for Robinhood-style pie charts
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
            const total = context.chart.getDatasetMeta(0).total;
            const percentage = (value / total) * 100;
            return `${label}: $${value.toLocaleString()} (${percentage.toFixed(1)}%)`;
          }
        }
      },
    },
    cutout: '60%',
    borderWidth: 0,
    animation: {
      animateRotate: true,
      animateScale: true
    }
  };

  return (
    <div style={{ height: `${height}px`, position: 'relative' }}>
      {title && <h3 className="chart-title">{title}</h3>}
      <Pie data={data} options={options} />
    </div>
  );
};

const EnhancedAssetAllocationCard = ({ 
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
        borderWidth: 0,
        hoverOffset: 10
      },
    ],
  };

  return (
    <Card title="Asset Allocation">
      <EnhancedPieChart data={data} height={250} />
      
      <div className="allocation-legend">
        {allocations.map((item, index) => (
          <div key={index} className="allocation-item">
            <div className="allocation-color" style={{ backgroundColor: item.color }}></div>
            <span className="allocation-label">{item.name}</span>
            <span className="allocation-value">
              ${item.value.toLocaleString()} ({((item.value / totalValue) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export { EnhancedPieChart, EnhancedAssetAllocationCard };
