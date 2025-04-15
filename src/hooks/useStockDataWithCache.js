import { useState, useEffect } from 'react';

// Simple caching mechanism for API responses
const cache = new Map();
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

const useStockDataWithCache = (symbol, interval = '1d', range = '1mo') => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Create a cache key based on the parameters
        const cacheKey = `${symbol}-${interval}-${range}`;
        
        // Check if we have a valid cached response
        const cachedData = cache.get(cacheKey);
        if (cachedData && (Date.now() - cachedData.timestamp < CACHE_EXPIRY)) {
          setStockData(cachedData.data);
          setError(null);
          setLoading(false);
          return;
        }
        
        // If no valid cache, fetch from API
        const response = await import('../services/YahooFinanceService').then(module => {
          return module.default.getStockChart(symbol, interval, range);
        });
        
        // Store in cache with timestamp
        cache.set(cacheKey, {
          data: response,
          timestamp: Date.now()
        });
        
        setStockData(response);
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

export default useStockDataWithCache;
