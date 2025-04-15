import React, { useState, useEffect } from 'react';
import YahooFinanceService from '../services/YahooFinanceService';

// This is a utility hook to fetch stock data
const useStockData = (symbol, interval = '1d', range = '1mo') => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await YahooFinanceService.getStockChart(symbol, interval, range);
        setStockData(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching data for ${symbol}:`, err);
        setError(err.message || 'Failed to fetch stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, interval, range]);

  return { loading, error, stockData };
};

// Function to format chart data for Chart.js
const formatChartData = (stockData) => {
  if (!stockData || !stockData.timestamp || !stockData.indicators?.quote?.[0]?.close) {
    return null;
  }

  const timestamps = stockData.timestamp;
  const closePrices = stockData.indicators.quote[0].close;
  
  // Format dates for x-axis labels
  const labels = timestamps.map(timestamp => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  // Create dataset for Chart.js
  return {
    labels,
    datasets: [
      {
        label: stockData.meta?.symbol || 'Stock Price',
        data: closePrices,
        borderColor: '#00C805',
        backgroundColor: 'rgba(0, 200, 5, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };
};

// Calculate price change and percentage
const calculatePriceChange = (stockData) => {
  if (!stockData || !stockData.meta) return { change: 0, percentage: 0 };
  
  const currentPrice = stockData.meta.regularMarketPrice;
  const previousClose = stockData.meta.previousClose;
  
  const change = currentPrice - previousClose;
  const percentage = (change / previousClose) * 100;
  
  return { change, percentage };
};

export { useStockData, formatChartData, calculatePriceChange };
