import React from 'react';
import '../styles/GoalProgress.css';

const GoalProgress = () => {
  return (
    <div className="goal-progress">
      <h2>Today's Goal</h2>
      <div className="progress-bar">
        <div className="progress" style={{ width: '75%' }}></div>
      </div>
      <p>Reduce losses by 15%</p>
    </div>
  );
};

export default GoalProgress;



