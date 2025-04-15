# Financial Portfolio Dashboard

A Robinhood-style Financial Portfolio Dashboard with user login, financial goals tracking, and investment portfolio visualization.

## Project Overview

This project is a comprehensive financial dashboard web application that allows users to:

1. **Login and link bank accounts** - Secure authentication and bank account integration
2. **Track financial goals** - Create and monitor savings goals for specific purchases (car, PS5, etc.)
3. **Manage investment portfolio** - View asset allocation and track investment performance
4. **Access real-time stock data** - Integration with Yahoo Finance API for up-to-date market information

## Technologies Used

### Frontend
- **React** - JavaScript library for building user interfaces
- **React Router** - For navigation and routing between pages
- **Chart.js & react-chartjs-2** - For data visualization (line charts, pie charts)
- **Bootstrap & React-Bootstrap** - For responsive UI components
- **Axios** - For API requests

### Development Tools
- **Webpack** - Module bundler
- **Babel** - JavaScript compiler
- **npm** - Package manager

### API Integration
- **Yahoo Finance API** - For real-time stock market data

## Project Structure

```
financial-dashboard/
├── public/                  # Static files
│   └── index.html           # HTML template
├── src/                     # Source code
│   ├── components/          # Reusable UI components
│   │   ├── AssetAllocationCard.js
│   │   ├── Card.js
│   │   ├── EnhancedCharts.js
│   │   ├── GoalCard.js
│   │   ├── Header.js
│   │   ├── InvestmentCard.js
│   │   ├── LineChart.js
│   │   ├── ProgressBar.js
│   │   └── StockChart.js
│   ├── hooks/               # Custom React hooks
│   │   └── useStockDataWithCache.js
│   ├── pages/               # Main application pages
│   │   ├── GoalsDashboard.js
│   │   ├── InvestmentPortfolio.js
│   │   └── LoginPage.js
│   ├── services/            # API services
│   │   └── YahooFinanceService.js
│   ├── styles/              # CSS styles
│   │   ├── App.css
│   │   ├── Card.css
│   │   ├── Chart.css
│   │   ├── GoalCard.css
│   │   ├── GoalsDashboard.css
│   │   ├── Header.css
│   │   ├── index.css
│   │   ├── InvestmentCard.css
│   │   ├── InvestmentPortfolio.css
│   │   ├── LoginPage.css
│   │   └── ProgressBar.css
│   ├── utils/               # Utility functions
│   │   └── stockUtils.js
│   ├── App.js               # Main application component
│   └── index.js             # Application entry point
├── .babelrc                 # Babel configuration
├── package.json             # Project dependencies and scripts
├── webpack.config.js        # Webpack configuration
└── README.md                # Project documentation
```

## Features

### 1. Login Page
- User authentication form with validation
- "Remember me" functionality
- Bank account linking interface
- Responsive design for mobile and desktop

### 2. Financial Goals Dashboard
- Overview of total savings progress
- Individual goal cards with progress tracking
- Ability to create new goals
- Add funds to existing goals
- Visualize savings growth over time

### 3. Investment Portfolio
- Portfolio value and performance tracking
- Individual investment cards with real-time data
- Buy and sell functionality
- Asset allocation visualization
- Period selection for performance charts

## Data Visualization

The dashboard includes several types of data visualization:

1. **Line Charts** - For tracking portfolio and investment performance over time
2. **Pie Charts** - For visualizing asset allocation
3. **Progress Bars** - For tracking progress towards financial goals

All charts are interactive and responsive, with period selection for time-based data.

## API Integration

The application integrates with Yahoo Finance API to fetch real-time stock data:

- Stock price information
- Historical price data for charts
- Price change calculations
- Data caching for improved performance

## Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

The UI adapts to different screen sizes while maintaining functionality and usability.

## Deployment Instructions

### Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open http://localhost:3000 in your browser

### Production Build

1. Create a production build:
   ```
   npm run build
   ```
2. The build files will be in the `dist` directory

### Hosting Options

The application can be hosted on various platforms:

1. **Netlify**:
   - Connect your GitHub repository
   - Set build command to `npm run build`
   - Set publish directory to `dist`

2. **Vercel**:
   - Connect your GitHub repository
   - Vercel will automatically detect React and configure the build

3. **GitHub Pages**:
   - Update `package.json` with your GitHub Pages URL
   - Run `npm run build`
   - Deploy the `dist` directory to GitHub Pages

4. **Traditional Web Hosting**:
   - Upload the contents of the `dist` directory to your web server

## Future Enhancements

Potential future improvements:

1. Backend integration for persistent data storage
2. User registration functionality
3. Real bank account integration
4. Transaction history
5. Budget tracking features
6. Mobile app version
7. Notifications for price alerts
8. Portfolio optimization recommendations

## License

This project is licensed under the ISC License.
