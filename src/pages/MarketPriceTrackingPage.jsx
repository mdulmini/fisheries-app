import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import { FaSync, FaBell, FaTrash } from 'react-icons/fa';
import '../styles/MarketPriceTrackingPage.css';
import logo from '../assets/logo.png';


ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const MarketPriceTrackingPage = () => {
  const [notificationCount, setNotificationCount] = useState(3);
  const [selectedPeriod, setSelectedPeriod] = useState('Daily');
  const [fishType, setFishType] = useState('Tuna');
  const [targetPrice, setTargetPrice] = useState('');
  const [smsAlert, setSmsAlert] = useState(false);
  const [alerts, setAlerts] = useState([
    { fishType: 'Tuna', price: '1000' },
    { fishType: 'Swordfish', price: '900' },
    { fishType: 'Prawns', price: '1300' },
  ]);

  const dailyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tuna',
        data: [800, 850, 900, 880, 920, 910, 950],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Swordfish',
        data: [750, 780, 800, 790, 810, 820, 830],
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Mackerel',
        data: [400, 420, 410, 430, 400, 390, 410],
        borderColor: '#ffc107',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const weeklyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Tuna',
        data: [820, 870, 890, 930],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Swordfish',
        data: [760, 790, 800, 820],
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Mackerel',
        data: [410, 420, 400, 415],
        borderColor: '#ffc107',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Tuna',
        data: [830, 860, 900, 940],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Swordfish',
        data: [770, 780, 810, 825],
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Mackerel',
        data: [405, 415, 410, 420],
        borderColor: '#ffc107',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };


  const chartData = selectedPeriod === 'Daily' ? dailyData : selectedPeriod === 'Weekly' ? weeklyData : monthlyData;

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 1200,
        ticks: {
          stepSize: 200,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const liveMarketUpdates = [
    { fishType: 'Tuna', price: '950', change: '+5.2%' },
    { fishType: 'Swordfish', price: '850', change: '-2.1%' },
    { fishType: 'Mackerel', price: '450', change: '+3.8%' },
    { fishType: 'Prawns', price: '1200', change: '+1.5%' },
  ];

  const handleSyncData = () => {
    alert('Data synced successfully!');
  };

  const handleNotificationClick = () => {
    alert('You have new notifications!');
    setNotificationCount(0);
  };

  const handleSetAlert = () => {
    if (targetPrice) {
      setAlerts([...alerts, { fishType, price: targetPrice }]);
      setTargetPrice('');
      setSmsAlert(false);
      alert('Price alert set successfully!');
    } else {
      alert('Please enter a target price!');
    }
  };

  const handleDeleteAlert = (index) => {
    setAlerts(alerts.filter((_, i) => i !== index));
  };

  return (
    <div className="market-price-tracking-page">
      <header className="header">
        <div className="logo"><img src={logo} alt="Fisheries Logo" /></div>
        <nav className="nav">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/reports" className="nav-link">Reports</Link>
        </nav>
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

      <main className="main-content">
        <h1>Market Price Tracking</h1>
        <button className="sync-data-btn" onClick={handleSyncData}>
          <FaSync className="sync-icon" /> Sync Data
        </button>

        <div className="price-overview">
          <h2>Price Overview</h2>
          <div className="period-tabs">
            <button
              className={selectedPeriod === 'Daily' ? 'active' : ''}
              onClick={() => setSelectedPeriod('Daily')}
            >
              Daily
            </button>
            <button
              className={selectedPeriod === 'Weekly' ? 'active' : ''}
              onClick={() => setSelectedPeriod('Weekly')}
            >
              Weekly
            </button>
            <button
              className={selectedPeriod === 'Monthly' ? 'active' : ''}
              onClick={() => setSelectedPeriod('Monthly')}
            >
              Monthly
            </button>
          </div>
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="price-alert">
          <h2>Price Alert</h2>
          <div className="alert-form">
            <label>
              Fish Type
              <select value={fishType} onChange={(e) => setFishType(e.target.value)}>
                <option>Tuna</option>
                <option>Swordfish</option>
                <option>Mackerel</option>
                <option>Prawns</option>
              </select>
            </label>
            <label>
              Target Price (LKR/kg)
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder="Enter Price"
              />
            </label>
            <div className="alert-options">
              <label>
                <input
                  type="checkbox"
                  checked={smsAlert}
                  onChange={() => setSmsAlert(!smsAlert)}
                />
                SMS Alert
              </label>
            </div>
            <button
              className="set-alert-btn"
              onClick={handleSetAlert}
              disabled={!targetPrice} 
            >
              Set Alert
            </button>
          </div>
          <h3>Active Alerts</h3>
          <div className="active-alerts">
            {alerts.map((alert, index) => (
              <div key={index} className="alert-item">
                <p>
                  {alert.fishType} Alert at LKR {alert.price}/kg
                </p>
                <button onClick={() => handleDeleteAlert(index)}>
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="live-market-updates">
          <h2>Live Market Updates</h2>
          <div className="updates-grid">
            {liveMarketUpdates.map((update, index) => (
              <div key={index} className="update-card">
                <p>{update.fishType}</p>
                <p className="price">LKR {update.price}/kg</p>
                <p className={update.change.startsWith('+') ? 'positive' : 'negative'}>
                  {update.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketPriceTrackingPage;