import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFish, FaMapMarkerAlt, FaClock, FaFilter, FaDownload, FaBell, FaUser, FaSyncAlt } from 'react-icons/fa';
import styles from '../styles/TraceabilityCompliancePage.module.css';
import logo from '../assets/logo.png';

const TraceabilityCompliancePage = () => {
  const [fishType, setFishType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [catchDate, setCatchDate] = useState('');
  const [catchTime, setCatchTime] = useState('');
  const [method, setMethod] = useState('');
  const [recentCatches, setRecentCatches] = useState([
    { fishType: 'Tuna', quantity: '10kg', location: 'Colombo Coast', dateTime: 'Oct 15, 2023, 14:30', status: 'Compliant' },
    { fishType: 'Prawns', quantity: '5kg', location: 'Southern Waters', dateTime: 'Oct 14, 2023, 09:15', status: 'Pending Review' },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({ fishType: '', location: '', status: '' });
  const [isSyncing, setIsSyncing] = useState(false);

  const notifications = [
    { id: 1, message: 'New catch logged: Tuna, 10kg', time: '5 mins ago' },
    { id: 2, message: 'Compliance report due in 2 hours', time: '1 hour ago' },
  ];

  const handleLogCatch = (e) => {
    e.preventDefault();
    const newCatch = {
      fishType,
      quantity,
      location,
      dateTime: `${catchDate} ${catchTime}`,
      status: 'Pending Review',
    };
    setRecentCatches([newCatch, ...recentCatches]);
    setFishType('');
    setQuantity('');
    setLocation('');
    setCatchDate('');
    setCatchTime('');
    setMethod('');
  };

  const handleExport = () => {
    const csvData = [
      ['Fish Type', 'Quantity', 'Location', 'Date & Time', 'Status'],
      ...filteredCatches.map(item => [
        item.fishType,
        item.quantity,
        item.location,
        item.dateTime,
        item.status,
      ]),
    ];
    const csv = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'catch-records.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const filteredCatches = recentCatches.filter(catchItem => {
    return (
      (filter.fishType === '' || catchItem.fishType.toLowerCase().includes(filter.fishType.toLowerCase())) &&
      (filter.location === '' || catchItem.location.toLowerCase().includes(filter.location.toLowerCase())) &&
      (filter.status === '' || catchItem.status === filter.status)
    );
  });

  const handleSyncData = async () => {
    setIsSyncing(true);
    try {
      
      const mockResponse = [
        { fishType: 'Salmon', quantity: '8kg', location: 'Northern Waters', dateTime: 'Apr 10, 2025, 10:00', status: 'Compliant' },
        { fishType: 'Cod', quantity: '12kg', location: 'Western Coast', dateTime: 'Apr 09, 2025, 15:45', status: 'Pending Review' },
      ];
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      setRecentCatches(mockResponse);
      alert('Data synced successfully!');
    } catch (error) {
      console.error('Error syncing data:', error);
      alert('Failed to sync data. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className={styles.traceabilityCompliancePage}>
      <header className={styles.header}>
        <div className={styles.logo}><img src={logo} alt="Fisheries Logo" /></div>
        <Link to="/dashboard" className={styles.backLink}>
          ← Back to Dashboard
        </Link>
        <div className={styles.headerIcons}>
          <div className={styles.notificationWrapper}>
            <FaBell
              className={styles.icon}
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {showNotifications && (
              <div className={styles.notificationDropdown}>
                <h3>Notifications</h3>
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div key={notification.id} className={styles.notificationItem}>
                      <p>{notification.message}</p>
                      <span>{notification.time}</span>
                    </div>
                  ))
                ) : (
                  <p>No new notifications</p>
                )}
              </div>
            )}
          </div>
          <FaUser className={styles.icon} />
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.headerSection}>
          <h1>
            Log Your Catch <FaFish className={styles.fishIcon} />
          </h1>
          <p className={styles.subHeader}>Welcome back! Keep your catch legal and traceable.</p>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.formSection}>
            <h2>Log New Catch</h2>
            <form onSubmit={handleLogCatch} className={styles.catchForm}>
              <div className={styles.formGroup}>
                <label>Fish Type</label>
                <select
                  value={fishType}
                  onChange={(e) => setFishType(e.target.value)}
                  required
                >
                  <option value="">Select fish type</option>
                  <option value="Tuna">Tuna</option>
                  <option value="Salmon">Salmon</option>
                  <option value="Cod">Cod</option>
                  <option value="Prawns">Prawns</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Quantity (kg)</label>
                <div className={styles.inputWithIcon}>
                  <FaFish className={styles.inputIcon} />
                  <input
                    type="number"
                    placeholder="Enter weight"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Location</label>
                <div className={styles.inputWithIcon}>
                  <FaMapMarkerAlt className={styles.inputIcon} />
                  <input
                    type="text"
                    placeholder="Select or enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Catch Date & Time</label>
                <div className={styles.dateTimeGroup}>
                  <div className={styles.inputWithIcon}>
                    <FaClock className={styles.inputIcon} />
                    <input
                      type="date"
                      value={catchDate}
                      onChange={(e) => setCatchDate(e.target.value)}
                      required
                    />
                  </div>
                  <input
                    type="time"
                    value={catchTime}
                    onChange={(e) => setCatchTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  required
                >
                  <option value="">Select fishing method</option>
                  <option value="Net">Net</option>
                  <option value="Line">Line</option>
                  <option value="Trap">Trap</option>
                </select>
              </div>

              <button type="submit" className={styles.logBtn}>
                Log Catch
              </button>
            </form>
          </div>

          <div className={styles.complianceSection}>
            <h2>Compliance Status</h2>
            <div className={styles.complianceCard}>
              <div className={styles.complianceHeader}>
                <h3>Overall Compliance</h3>
                <p className={styles.compliancePercentage}>85%</p>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: '85%' }}></div>
              </div>
              <div className={styles.complianceDetails}>
                <p className={styles.compliant}>
                  <span className={styles.statusDotCompliant}></span> MSC Certification: 2 more logs needed
                </p>
                <p className={styles.warning}>
                  <span className={styles.statusDotWarning}></span> Daily report due by 5 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.recentCatchesSection}>
          <div className={styles.recentCatchesHeader}>
            <h2>Recent Catches</h2>
            <div className={styles.recentCatchesActions}>
              <div className={styles.filterWrapper}>
                <button
                  className={styles.filterBtn}
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <FaFilter /> Filter
                </button>
                {showFilter && (
                  <div className={styles.filterDropdown}>
                    <div className={styles.filterGroup}>
                      <label>Fish Type</label>
                      <input
                        type="text"
                        name="fishType"
                        value={filter.fishType}
                        onChange={handleFilterChange}
                        placeholder="Enter fish type"
                      />
                    </div>
                    <div className={styles.filterGroup}>
                      <label>Location</label>
                      <input
                        type="text"
                        name="location"
                        value={filter.location}
                        onChange={handleFilterChange}
                        placeholder="Enter location"
                      />
                    </div>
                    <div className={styles.filterGroup}>
                      <label>Status</label>
                      <select
                        name="status"
                        value={filter.status}
                        onChange={handleFilterChange}
                      >
                        <option value="">All</option>
                        <option value="Compliant">Compliant</option>
                        <option value="Pending Review">Pending Review</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              <button className={styles.exportBtn} onClick={handleExport}>
                <FaDownload /> Export
              </button>
            </div>
          </div>
          {filteredCatches.length > 0 ? (
            filteredCatches.map((catchItem, index) => (
              <div key={index} className={styles.catchCard}>
                <div className={styles.catchDetails}>
                  <h3>{catchItem.fishType}</h3>
                  <p>{catchItem.quantity} - {catchItem.location}</p>
                  <p>{catchItem.dateTime}</p>
                </div>
                <span
                  className={`${styles.status} ${
                    catchItem.status === 'Compliant' ? styles.statusCompliant : styles.statusPending
                  }`}
                >
                  {catchItem.status}
                </span>
              </div>
            ))
          ) : (
            <p>No catches match the filter criteria.</p>
          )}
        </div>

        <button
          className={styles.syncBtn}
          onClick={handleSyncData}
          disabled={isSyncing}
        >
          <FaSyncAlt className={isSyncing ? styles.spin : ''} /> {isSyncing ? 'Syncing...' : 'Sync Data'}
        </button>
      </main>
    </div>
  );
};

export default TraceabilityCompliancePage;