import React, { useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import GoalCard, { AddGoalCard } from '../components/GoalCard';
import LineChart from '../components/LineChart';
import '../styles/GoalsDashboard.css';

const GoalsDashboard = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'New Car',
      icon: '🚗',
      targetDate: 'Dec 2025',
      currentAmount: 5000,
      targetAmount: 25000
    },
    {
      id: 2,
      name: 'PlayStation 5',
      icon: '🎮',
      targetDate: 'Aug 2025',
      currentAmount: 300,
      targetAmount: 500
    },
    {
      id: 3,
      name: 'Vacation',
      icon: '✈️',
      targetDate: 'Jul 2025',
      currentAmount: 1200,
      targetAmount: 3000
    }
  ]);
  
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showFundModal, setShowFundModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  
  // Mock data for the chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Savings',
        data: [2000, 3500, 4200, 5100, 6000, 6500],
        borderColor: '#00C805',
        backgroundColor: 'rgba(0, 200, 5, 0.1)',
      },
    ],
  };
  
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const savingsPercentage = (totalSaved / totalTarget) * 100;
  
  const handleAddGoal = () => {
    setShowAddGoalModal(true);
  };
  
  const handleAddFunds = (goal) => {
    setSelectedGoal(goal);
    setShowFundModal(true);
  };
  
  const handleEditGoal = (goal) => {
    setSelectedGoal(goal);
    setShowAddGoalModal(true);
  };
  
  // Mock function to add a new goal
  const addNewGoal = (newGoal) => {
    setGoals([...goals, { ...newGoal, id: goals.length + 1 }]);
    setShowAddGoalModal(false);
  };
  
  // Mock function to add funds to a goal
  const addFundsToGoal = (goalId, amount) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newAmount = Math.min(goal.currentAmount + amount, goal.targetAmount);
        return { ...goal, currentAmount: newAmount };
      }
      return goal;
    }));
    setShowFundModal(false);
    setSelectedGoal(null);
  };
  
  return (
    <div className="goals-dashboard">
      <Header />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Financial Goals</h1>
          <p>Track and manage your savings goals</p>
        </div>
        
        <div className="dashboard-summary">
          <Card className="summary-card">
            <div className="summary-header">
              <h2>Total Savings</h2>
              <div className="summary-amount">${totalSaved.toLocaleString()}</div>
              <div className="summary-subtitle">of ${totalTarget.toLocaleString()} goal</div>
            </div>
            
            <div className="progress-container">
              <div className="progress-bar-container">
                <div 
                  className="progress-bar"
                  style={{ width: `${savingsPercentage}%` }}
                ></div>
              </div>
              <div className="progress-percentage">{savingsPercentage.toFixed(1)}%</div>
            </div>
          </Card>
          
          <Card className="chart-card">
            <LineChart 
              data={chartData}
              title="Savings Growth"
              value={totalSaved}
              change={8.3}
              periods={['1M', '3M', '6M', '1Y', 'All']}
              activePeriod="6M"
              onPeriodChange={() => {}}
            />
          </Card>
        </div>
        
        <div className="goals-section">
          <div className="section-header">
            <h2>Your Goals</h2>
          </div>
          
          <div className="goals-grid">
            {goals.map(goal => (
              <GoalCard 
                key={goal.id}
                name={goal.name}
                icon={goal.icon}
                targetDate={goal.targetDate}
                currentAmount={goal.currentAmount}
                targetAmount={goal.targetAmount}
                onAddFunds={() => handleAddFunds(goal)}
                onEdit={() => handleEditGoal(goal)}
              />
            ))}
            
            <AddGoalCard onClick={handleAddGoal} />
          </div>
        </div>
      </div>
      
      {/* Add Goal Modal (simplified) */}
      {showAddGoalModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>{selectedGoal ? 'Edit Goal' : 'Add New Goal'}</h3>
              <button className="modal-close" onClick={() => {
                setShowAddGoalModal(false);
                setSelectedGoal(null);
              }}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Goal Name</label>
                <input type="text" className="form-control" defaultValue={selectedGoal?.name || ''} />
              </div>
              
              <div className="form-group">
                <label>Target Amount</label>
                <input type="number" className="form-control" defaultValue={selectedGoal?.targetAmount || ''} />
              </div>
              
              <div className="form-group">
                <label>Target Date</label>
                <input type="text" className="form-control" defaultValue={selectedGoal?.targetDate || ''} />
              </div>
              
              <div className="form-group">
                <label>Icon</label>
                <select className="form-control" defaultValue={selectedGoal?.icon || '🎯'}>
                  <option value="🎯">🎯 Goal</option>
                  <option value="🚗">🚗 Car</option>
                  <option value="🏠">🏠 House</option>
                  <option value="🎓">🎓 Education</option>
                  <option value="✈️">✈️ Travel</option>
                  <option value="💻">💻 Tech</option>
                  <option value="🎮">🎮 Gaming</option>
                </select>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-primary" 
                onClick={() => {
                  // In a real app, we would validate and save the form data
                  addNewGoal({
                    name: 'New Goal',
                    icon: '🎯',
                    targetDate: 'Dec 2025',
                    currentAmount: 0,
                    targetAmount: 1000
                  });
                }}
              >
                {selectedGoal ? 'Save Changes' : 'Add Goal'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Funds Modal (simplified) */}
      {showFundModal && selectedGoal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Add Funds to {selectedGoal.name}</h3>
              <button className="modal-close" onClick={() => {
                setShowFundModal(false);
                setSelectedGoal(null);
              }}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="goal-progress-info">
                <div>Current: ${selectedGoal.currentAmount}</div>
                <div>Target: ${selectedGoal.targetAmount}</div>
                <div>Remaining: ${selectedGoal.targetAmount - selectedGoal.currentAmount}</div>
              </div>
              
              <div className="form-group">
                <label>Amount to Add</label>
                <input type="number" className="form-control" placeholder="Enter amount" />
              </div>
              
              <div className="quick-amounts">
                <button className="quick-amount-btn">$10</button>
                <button className="quick-amount-btn">$25</button>
                <button className="quick-amount-btn">$50</button>
                <button className="quick-amount-btn">$100</button>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-primary" 
                onClick={() => {
                  // In a real app, we would get the amount from the input
                  addFundsToGoal(selectedGoal.id, 100);
                }}
              >
                Add Funds
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsDashboard;
