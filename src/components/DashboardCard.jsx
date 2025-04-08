import React from 'react';
import { FaBox, FaDollarSign, FaClock, FaUsers } from 'react-icons/fa';
import '../styles/DashboardCard.css';

const DashboardCard = ({ title, value, change }) => {
  return (
    <div className="dashboard-card">
      {title === 'Total Inventory' && <FaBox className="card-icon" />}
      {title === 'Average Price' && <FaDollarSign className="card-icon" />}
      {title === 'Pending Orders' && <FaClock className="card-icon" />}
      {title === 'Active Buyers' && <FaUsers className="card-icon" />}
      <div className="card-content">
        <h3>{title}</h3>
        <p className="card-value">{value}</p>
        <p className="card-change">{change}</p>
      </div>
    </div>
  );
};

export default DashboardCard;