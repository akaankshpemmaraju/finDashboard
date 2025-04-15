import axios from 'axios';

class YahooFinanceService {
  constructor() {
    this.baseUrl = '/api/yahoo-finance';
  }

  // Fetch stock chart data
  async getStockChart(symbol, interval = '1d', range = '1mo') {
    try {
      // In a real implementation, this would call the actual Yahoo Finance API
      // For now, we'll simulate the API call with our data API module
      const response = await this.fetchStockData(symbol, interval, range);
      return response;
    } catch (error) {
      console.error('Error fetching stock chart data:', error);
      throw error;
    }
  }

  // Fetch stock holders data
  async getStockHolders(symbol) {
    try {
      // In a real implementation, this would call the actual Yahoo Finance API
      // For now, we'll simulate the API call with our data API module
      const response = await this.fetchStockHolders(symbol);
      return response;
    } catch (error) {
      console.error('Error fetching stock holders data:', error);
      throw error;
    }
  }

  // Simulate API call using our data API module
  async fetchStockData(symbol, interval, range) {
    // This would be replaced with actual API calls in production
    // For now, we'll return mock data
    return {
      meta: {
        currency: 'USD',
        symbol: symbol,
        regularMarketPrice: this.getRandomPrice(symbol),
        previousClose: this.getRandomPrice(symbol) - (Math.random() * 5).toFixed(2),
      },
      timestamp: this.generateTimestamps(range),
      indicators: {
        quote: [{
          close: this.generatePriceData(symbol, range),
          open: this.generatePriceData(symbol, range),
          high: this.generatePriceData(symbol, range, 1.02),
          low: this.generatePriceData(symbol, range, 0.98),
          volume: this.generateVolumeData(range)
        }]
      }
    };
  }

  // Helper method to generate random price based on symbol
  getRandomPrice(symbol) {
    const basePrice = {
      'AAPL': 178.72,
      'MSFT': 412.65,
      'AMZN': 182.30,
      'GOOGL': 150.77,
      'META': 485.58,
      'TSLA': 172.82,
      'NVDA': 881.86,
    }[symbol] || 100;
    
    return basePrice + (Math.random() * 10 - 5);
  }

  // Helper method to generate timestamps
  generateTimestamps(range) {
    const now = new Date();
    const timestamps = [];
    let dataPoints = 30;
    
    if (range === '1d') dataPoints = 24;
    else if (range === '5d') dataPoints = 5;
    else if (range === '1mo') dataPoints = 30;
    else if (range === '3mo') dataPoints = 90;
    else if (range === '6mo') dataPoints = 180;
    else if (range === '1y') dataPoints = 365;
    
    for (let i = dataPoints; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      timestamps.push(Math.floor(date.getTime() / 1000));
    }
    
    return timestamps;
  }

  // Helper method to generate price data
  generatePriceData(symbol, range, multiplier = 1) {
    const basePrice = this.getRandomPrice(symbol);
    const timestamps = this.generateTimestamps(range);
    const prices = [];
    
    let currentPrice = basePrice;
    for (let i = 0; i < timestamps.length; i++) {
      // Add some random variation
      const change = (Math.random() * 2 - 1) * (basePrice * 0.02);
      currentPrice += change;
      prices.push(currentPrice * multiplier);
    }
    
    return prices;
  }

  // Helper method to generate volume data
  generateVolumeData(range) {
    const timestamps = this.generateTimestamps(range);
    const volumes = [];
    
    for (let i = 0; i < timestamps.length; i++) {
      volumes.push(Math.floor(Math.random() * 10000000) + 1000000);
    }
    
    return volumes;
  }
}

export default new YahooFinanceService();
