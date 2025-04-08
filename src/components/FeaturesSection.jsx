import React from 'react';
import '../styles/FeaturesSection.css';

const FeaturesSection = () => {
  return (
    <section className="features">
      <h2>Features that empower you</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🏠</div>
          <h3>Inventory Management</h3>
          <p>
            Track stock levels and reduce spoilage with our smart inventory system. Get alerts and insights to optimize your operations.
          </p>

        </div>
        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>Market Prices</h3>
          <p>
            Stay updated with real-time market prices and historical price trends to make informed selling decisions.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🤝</div>
          <h3>Direct Sales</h3>
          <p>
            Connect directly with buyers and maximize your profits by eliminating intermediaries.
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default FeaturesSection;



