import React from 'react';
import { NavLink } from 'react-router-dom'; 
import { FaChartBar, FaFish, FaDollarSign, FaUsers, FaBox, FaChartLine, FaFileAlt, FaCog, FaQuestionCircle } from 'react-icons/fa'; 
import '../styles/Sidebar.css';
import logo from '../assets/logo.png';

const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="sidebar-logo"><img src={logo} alt="Fisheries Logo" /></div>
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
        <NavLink
          to="/help"
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FaQuestionCircle className="sidebar-icon" /> Help
        </NavLink>
        
      </nav>
    </div>
  );
};

export default Sidebar;
