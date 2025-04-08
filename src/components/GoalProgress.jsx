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



/*import React, { useState, useEffect } from 'react';
import '../styles/GoalProgress.css';

const GoalProgress = () => {
  const [progress, setProgress] = useState(50); // Initial progress (50%)
  const targetGoal = 100; // 100% target
  const goalText = 'Reduce losses by 15%';

  useEffect(() => {
    // Simulate progress update (e.g., from an API or user action)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= targetGoal) {
          clearInterval(interval);
          alert('Goal Achieved: Reduced losses by 15%!');
          return targetGoal;
        }
        return prev + 10; // Increment progress
      });
    }, 3000); // Update every 3 seconds for demo

    return () => clearInterval(interval);
  }, [targetGoal]);

  return (
    <div className="goal-progress">
      <h2>Today's Goal</h2>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{goalText}</p>
    </div>
  );
};

export default GoalProgress;*/

