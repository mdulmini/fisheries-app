/*import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">LOGO</div>
      <nav className="sidebar-nav">
        <a href="/dashboard" className="sidebar-link active">
          <span className="icon">📊</span> Dashboard
        </a>
        <a href="/inventory" className="sidebar-link">
          <span className="icon">🐟</span> Inventory
        </a>
        <a href="/market-prices" className="sidebar-link">
          <span className="icon">💰</span> Market Prices
        </a>
        <a href="/buyers" className="sidebar-link">
          <span className="icon">👥</span> Buyers
        </a>
        <a href="/orders" className="sidebar-link">
          <span className="icon">📦</span> Orders
        </a>
        <a href="/analytics" className="sidebar-link">
          <span className="icon">📈</span> Analytics
        </a>
        <a href="/compliance" className="sidebar-link">
          <span className="icon">📋</span> Compliance
        </a>
        <a href="/settings" className="sidebar-link">
          <span className="icon">⚙️</span> Settings
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;*/


import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { FaChartBar, FaFish, FaDollarSign, FaUsers, FaBox, FaChartLine, FaFileAlt, FaCog } from 'react-icons/fa'; // Importing icons
import '../styles/Sidebar.css';

const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="sidebar-logo">LOGO</div>
      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaChartBar className="sidebar-icon" /> Dashboard
        </NavLink>
        <NavLink
          to="/inventory"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaFish className="sidebar-icon" /> Inventory
        </NavLink>
        <NavLink
          to="/market-prices"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaDollarSign className="sidebar-icon" /> Market Prices
        </NavLink>
        <NavLink
          to="/buyers"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaUsers className="sidebar-icon" /> Buyers
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaBox className="sidebar-icon" /> Orders
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaChartLine className="sidebar-icon" /> Analytics
        </NavLink>
        <NavLink
          to="/compliance"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaFileAlt className="sidebar-icon" /> Compliance
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaCog className="sidebar-icon" /> Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
