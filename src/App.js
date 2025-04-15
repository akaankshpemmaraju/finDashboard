import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import GoalsDashboard from './pages/GoalsDashboard';
import InvestmentPortfolio from './pages/InvestmentPortfolio';
import './styles/App.css';

function App() {
  // Simple authentication state (would be replaced with proper auth in production)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="app">
      <Routes>
        <Route 
          path="/" 
          element={
            !isAuthenticated ? 
            <LoginPage onLogin={handleLogin} /> : 
            <Navigate to="/dashboard" />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
            <GoalsDashboard /> : 
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/investments" 
          element={
            isAuthenticated ? 
            <InvestmentPortfolio /> : 
            <Navigate to="/" />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
