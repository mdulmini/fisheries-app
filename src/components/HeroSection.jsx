import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login');
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>From Field to Future: Empowering Sri Lanka's Fisheries Supply Chain</h1>
        <p>
          A powerful platform for small-scale fishers to reduce waste, optimize operations,
          and maximize profits through smart inventory management.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleGetStartedClick}>Get Started</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

