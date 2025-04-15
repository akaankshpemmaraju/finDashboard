import React from 'react';
import Card from './Card';
import ProgressBar from './ProgressBar';
import '../styles/GoalCard.css';

const GoalCard = ({ 
  name, 
  icon, 
  targetDate, 
  currentAmount, 
  targetAmount,
  onAddFunds,
  onEdit
}) => {
  return (
    <Card className="goal-card">
      <div className="goal-card-header">
        <div className="goal-icon">
          {icon}
        </div>
        <div className="goal-info">
          <h4 className="goal-name">{name}</h4>
          {targetDate && <div className="goal-date">Target: {targetDate}</div>}
        </div>
      </div>
      
      <ProgressBar 
        title="Savings Progress"
        currentValue={currentAmount}
        targetValue={targetAmount}
      />
      
      <div className="goal-actions">
        <button className="goal-action-button goal-add-button" onClick={onAddFunds}>
          Add Funds
        </button>
        <button className="goal-action-button goal-edit-button" onClick={onEdit}>
          Edit
        </button>
      </div>
    </Card>
  );
};

export const AddGoalCard = ({ onClick }) => {
  return (
    <div className="card add-goal-card" onClick={onClick}>
      <div className="add-goal-icon">+</div>
      <div className="add-goal-text">Add New Goal</div>
    </div>
  );
};

export default GoalCard;
