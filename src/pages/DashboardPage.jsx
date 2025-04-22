import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Chart from '../components/Chart';
import DashboardCard from '../components/DashboardCard';
import GoalProgress from '../components/GoalProgress';
import { FaFish, FaBox, FaUser, FaSync, FaDollarSign, FaBell } from 'react-icons/fa';
import '../styles/DashboardPage.css';



const DashboardPage = () => {
  const [showAll, setShowAll] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  const recentActivities = [
    { icon: <FaFish />, text: 'Sold 200kg Tuna', time: '2 hours ago', value: 'LKR 48,000' },
    { icon: <FaBox />, text: 'New Stock Added', time: '5 hours ago', value: '350kg' },
    { icon: <FaUser />, text: 'New Buyer Registration', time: '1 day ago', value: 'Buyer ID: 123' },
    { icon: <FaFish />, text: 'Sold 150kg Salmon', time: '2 days ago', value: 'LKR 35,000' },
    { icon: <FaBox />, text: 'New Stock Added', time: '3 days ago', value: '200kg' },
  ];

  const displayedActivities = showAll ? recentActivities : recentActivities.slice(0, 3);

  const cards = [
    { title: 'Total Inventory', value: '2,450 kg', change: '+12% from last week', icon: <FaFish /> },
    { title: 'Average Price', value: 'LKR 3,480', change: "Today's earnings", icon: <FaDollarSign /> },
    { title: 'Pending Orders', value: '18', change: '5 new today', icon: <FaBox /> },
    { title: 'Active Buyers', value: '126', change: '8 new this week', icon: <FaUser /> },
  ];

  const handleSyncData = () => {
    console.log('Syncing data...');
    alert('Data synced successfully!');
  };

  const handleNotificationClick = () => {
    alert('You have new notifications!');
    setNotificationCount(0);
  };

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Welcome to your Fisher dashboard</h1>
          <div className="header-actions">
            <select defaultValue="English" className="language-select">
              <option>English</option>
              <option>Sinhala</option>
              <option>Tamil</option>
            </select>
            <button className="notification-btn" onClick={handleNotificationClick}>
              <FaBell className="notification-icon" />
              {notificationCount > 0 && (
                <span className="notification-count">{notificationCount}</span>
              )}
            </button>
            <div className="user-profile">
              <img src="src/assets/ravi.jpg" alt="User" />
            </div>
          </div>
        </header>
        <div className="dashboard-cards">
          {cards.map((card, index) => (
            <div key={index} className="dashboard-card">
              <div className="card-icon">{card.icon}</div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.value}</p>
                <span>{card.change}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="dashboard-main">
          <div className="catch-overview">
            <h2>Catch Overview</h2>
            <Chart />
          </div>
          <div className="dashboard-sidebar">
            <GoalProgress />
          </div>
        </div>
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          {displayedActivities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">{activity.icon}</div>
              <div className="activity-text">
                <p className="activity-main-text">{activity.text}</p>
                <p className="activity-time">{activity.time}</p>
              </div>
              {activity.value && <span className="activity-value">{activity.value}</span>}
            </div>
          ))}
          <button className="view-all-button" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'View Less' : 'View All'}
          </button>
        </div>
        <button className="sync-data-btn" onClick={handleSyncData}>
          <FaSync className="sync-icon" /> Sync Data
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;


