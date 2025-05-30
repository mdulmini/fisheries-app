import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSync, FaBell, FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf'; 
import autoTable from 'jspdf-autotable';
import '../styles/ReportsPage.css';
import logo from '../assets/logo.png';

const ReportsPage = () => {
  const [notificationCount, setNotificationCount] = useState(3);

  const reportData = [
    { fishType: 'Tuna', price: '950', change: '+5.2%', date: '2025-04-05' },
    { fishType: 'Swordfish', price: '850', change: '-2.1%', date: '2025-04-05' },
    { fishType: 'Mackerel', price: '450', change: '+3.8%', date: '2025-04-05' },
    { fishType: 'Prawns', price: '1200', change: '+1.5%', date: '2025-04-05' },
  ];

  const handleSyncData = () => {
    alert('Data synced successfully!');
  };

  const handleNotificationClick = () => {
    alert('You have new notifications!');
    setNotificationCount(0);
  };

  const handleGenerateReport = () => {
    try {
      
      const doc = new jsPDF();

      
      autoTable(doc, {
        head: [['Fish Type', 'Price ($/kg)', 'Change', 'Date']],
        body: reportData.map(item => [
          item.fishType,
          `$${item.price}`,
          item.change,
          item.date,
        ]),
        startY: 30,
        theme: 'striped',
        headStyles: { fillColor: [0, 123, 255] }, 
        styles: { fontSize: 10 },
      });

      
      doc.setFontSize(18);
      doc.text('Market Price Report', 20, 20);
      doc.save('market-price-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate the report. Please check the console for more details.');
    }
  };

  return (
    <div className="reports-page">
      <header className="header">
        <div className="logo"><img src={logo} alt="Fisheries Logo" /></div>
        <nav className="nav">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/market-prices" className="nav-link">Market Prices</Link>
          <Link to="/reports" className="nav-link active">Reports</Link>
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
        <h1>Market Price Reports</h1>
        <button className="sync-data-btn" onClick={handleSyncData}>
          <FaSync className="sync-icon" /> Sync Data
        </button>

        <div className="report-section">
          <div className="report-header">
            <h2>Price History</h2>
            <button className="generate-report-btn" onClick={handleGenerateReport}>
              <FaDownload /> Generate Report
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Fish Type</th>
                <th>Price ($/kg)</th>
                <th>Change</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index}>
                  <td>{item.fishType}</td>
                  <td>${item.price}</td>
                  <td className={item.change.startsWith('+') ? 'positive' : 'negative'}>
                    {item.change}
                  </td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;

