import React from 'react';
import '../styles/StatsSection.css';

const StatsSection = () => {
  return (
    <section className="stats">
      <h2>Our Growing Network</h2>
      <div className="stats-container">
        <div className="stats-map">
          <img src="src/assets/map.jpg" alt="Map of Sri Lanka" />
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>500+</h3>
            <p>Active Fishers</p>
          </div>
          <div className="stat-card">
            <h3>15%</h3>
            <p>Less Waste</p>
          </div>
          <div className="stat-card">
            <h3>25%</h3>
            <p>More Sales</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

