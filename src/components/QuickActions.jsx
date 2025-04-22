import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaChartLine } from 'react-icons/fa';
import '../styles/QuickActions.css';

const QuickActions = () => {
  const navigate = useNavigate();

  const handleAddStock = () => {
    setShowAddStockForm(true);
  };

  const handleFindBuyers = () => {
    setShowFindBuyers(true);
  };

  const handleViewMarketPrices = () => {
    navigate('/market-prices');
  };


  return (
    <div className="quick-actions">
      <h2>Quick Actions</h2>
      <button className="action-button primary" onClick={handleAddStock}>
        <FaPlus className="action-icon" /> Add New Stock
      </button>
      <button className="action-button" onClick={handleFindBuyers}>
        <FaSearch className="action-icon" /> Find Buyers
      </button>
      <button className="action-button" onClick={handleViewMarketPrices}>
        <FaChartLine className="action-icon" /> View Market Prices
      </button>
    </div>
  );
};

export default QuickActions;