import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaBell, FaSyncAlt, FaMapMarkerAlt, FaCheck, FaComment } from 'react-icons/fa';
import styles from '../styles/BuyerSellerMatchingPage.module.css';

const BuyerSellerMatchingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Matches');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(3);
  const [filters, setFilters] = useState({
    fishType: 'All Types',
    distance: 50,
    priceMin: 0,
    priceMax: 5000,
  });
  const [buyerStatuses, setBuyerStatuses] = useState({
    'Galle Fresh Market': 'Active',
    'Colombo Seafood Export': 'Active',
    'Marina Bay Restaurant': 'Active',
  });
  const [buyersData, setBuyersData] = useState([
    {
      name: 'Galle Fresh Market',
      distance: '2 km away - Galle Harbor',
      quantity: '10 kg Crabs',
      price: '3000',
      freshness: 'Same Day',
      status: 'Active',
    },
    {
      name: 'Colombo Seafood Export',
      distance: '5 km away - Colombo Port',
      quantity: '25 kg Tuna',
      price: '950',
      freshness: 'Within 12h',
      status: 'Active',
    },
    {
      name: 'Marina Bay Restaurant',
      distance: '3 km away - Marina Bay',
      quantity: '15 kg Crab',
      price: '1200',
      freshness: 'Same Day',
      status: 'Active',
    },
  ]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  const filteredBuyers = buyersData
    .filter(buyer => {
      const matchesSearch = buyer.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFishType = filters.fishType === 'All Types' || buyer.quantity.toLowerCase().includes(filters.fishType.toLowerCase());
      const matchesDistance = parseInt(buyer.distance) <= filters.distance;
      const matchesPrice = parseInt(buyer.price) >= filters.priceMin && parseInt(buyer.price) <= filters.priceMax;
      return matchesSearch && matchesFishType && matchesDistance && matchesPrice;
    })
    .sort((a, b) => {
      if (activeTab === 'Distance') return parseInt(a.distance) - parseInt(b.distance);
      if (activeTab === 'Price Range') return parseInt(a.price) - parseInt(b.price);
      if (activeTab === 'Fish Type') return a.quantity.localeCompare(b.quantity);
      if (activeTab === 'Quantity') {
        const qtyA = parseInt(a.quantity.split(' ')[0]);
        const qtyB = parseInt(b.quantity.split(' ')[0]);
        return qtyA - qtyB;
      }
      return 0;
    });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleNotificationClick = () => {
    alert('You have new notifications!');
    setNotificationCount(0);
  };

  const handleToggleStatus = (buyerName) => {
    setBuyerStatuses(prev => ({
      ...prev,
      [buyerName]: prev[buyerName] === 'Active' ? 'Inactive' : 'Active',
    }));
    setBuyersData(prev =>
      prev.map(buyer =>
        buyer.name === buyerName
          ? { ...buyer, status: buyer.status === 'Active' ? 'Inactive' : 'Active' }
          : buyer
      )
    );
  };

  const handleAcceptMatch = (buyerName) => {
    navigate('/match-confirmation', { state: { buyerName } });
  };

  const handleChat = (buyerName) => {
    navigate('/chat', { state: { buyerName } });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    alert('Filters applied!');
    console.log('Applying filters:', filters);
  };

  const handleClearFilters = () => {
    setFilters({
      fishType: 'All Types',
      distance: 50,
      priceMin: 0,
      priceMax: 5000,
    });
    setSearchQuery('');
    alert('Filters cleared!');
  };

  const handleSyncData = () => {
    setIsSyncing(true);
    setSyncMessage('');
    setTimeout(() => {
      const newBuyersData = [
        {
          name: 'Galle Fresh Market',
          distance: '2 km away - Galle Harbor',
          quantity: '12 kg Crabs',
          price: '3200',
          freshness: 'Same Day',
          status: buyerStatuses['Galle Fresh Market'],
        },
        {
          name: 'Colombo Seafood Export',
          distance: '5 km away - Colombo Port',
          quantity: '30 kg Tuna',
          price: '1000',
          freshness: 'Within 12h',
          status: buyerStatuses['Colombo Seafood Export'],
        },
        {
          name: 'Marina Bay Restaurant',
          distance: '3 km away - Marina Bay',
          quantity: '20 kg Crab',
          price: '1300',
          freshness: 'Same Day',
          status: buyerStatuses['Marina Bay Restaurant'],
        },
      ];
      setBuyersData(newBuyersData);
      setIsSyncing(false);
      setSyncMessage('Data synced successfully!');
      setTimeout(() => setSyncMessage(''), 3000);
    }, 2000);
  };

  const handlePreferences = () => {
    navigate('/preferences');
  };

  return (
    <div className={styles.buyerSellerMatchPage}>
      <header className={styles.header}>
        <div className={styles.logo}>LOGO</div>
        <Link to="/dashboard" className={styles.backLink}>
          <FaArrowLeft /> Back to Dashboard
        </Link>
        <div className={styles.headerActions}>
          <div className={styles.searchBar}>
            <FaSearch />
            <input
              type="text"
              placeholder="Search buyers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select defaultValue="English" className={styles.languageSelect}>
            <option>English</option>
            <option>Sinhala</option>
            <option>Tamil</option>
          </select>
          <button className={styles.notificationBtn} onClick={handleNotificationClick}>
            <FaBell className={styles.notificationIcon} />
            {notificationCount > 0 && (
              <span className={styles.notificationCount}>{notificationCount}</span>
            )}
          </button>
          <div className={styles.userProfile}>
            <img src="src/assets/ravi.jpg" alt="User" />
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <h1>Find Buyers</h1>
        <div className={styles.tabs}>
          {['All Matches', 'Distance', 'Price Range', 'Fish Type', 'Quantity'].map(tab => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.leftSection}>
            <div className={styles.buyersList}>
              {filteredBuyers.length === 0 ? (
                <p>No buyers found.</p>
              ) : (
                filteredBuyers.map((buyer, index) => (
                  <div key={index} className={styles.buyerCard}>
                    <div className={styles.buyerStatus}>
                      <button
                        className={`${styles.status} ${buyer.status.toLowerCase() === 'active' ? styles.activeStatus : styles.inactiveStatus}`}
                        onClick={() => handleToggleStatus(buyer.name)}
                      >
                        {buyer.status}
                      </button>
                    </div>
                    <h3>{buyer.name}</h3>
                    <p className={styles.distance}>
                      <FaMapMarkerAlt className={styles.locationIcon} /> {buyer.distance}
                    </p>
                    <div className={styles.buyerDetails}>
                      <div className={styles.detail}>
                        <span>Required</span>
                        <span>{buyer.quantity}</span>
                      </div>
                      <div className={styles.detail}>
                        <span>Price/kg</span>
                        <span>LKR {buyer.price}</span>
                      </div>
                      <div className={styles.detail}>
                        <span>Freshness</span>
                        <span>{buyer.freshness}</span>
                      </div>
                    </div>
                    <div className={styles.actions}>
                      <button
                        className={styles.acceptBtn}
                        onClick={() => handleAcceptMatch(buyer.name)}
                      >
                        <FaCheck /> Accept Match
                      </button>
                      <button
                        className={styles.chatBtn}
                        onClick={() => handleChat(buyer.name)}
                      >
                        <FaComment /> Chat
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.filtersSection}>
              <div className={styles.filtersHeader}>
                <h2>Filters</h2>
                <button className={styles.clearBtn} onClick={handleClearFilters}>Clear all</button>
              </div>
              <div className={styles.filterGroup}>
                <label>Fish Type</label>
                <select
                  name="fishType"
                  value={filters.fishType}
                  onChange={handleFilterChange}
                >
                  <option>All Types</option>
                  <option>Crabs</option>
                  <option>Tuna</option>
                </select>
              </div>
              <div className={styles.filterGroup}>
                <label>Distance (km)</label>
                <div className={styles.rangeInput}>
                  <input
                    type="range"
                    name="distance"
                    min="0"
                    max="100"
                    value={filters.distance}
                    onChange={handleFilterChange}
                  />
                  <span>{filters.distance} km</span>
                </div>
              </div>
              <div className={styles.filterGroup}>
                <label>Price Range (LKR)</label>
                <div className={styles.priceRange}>
                  <input
                    type="number"
                    name="priceMin"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                  />
                  <input
                    type="number"
                    name="priceMax"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
              <button className={styles.applyBtn} onClick={handleApplyFilters}>Apply Filters</button>
              <div className={styles.filterActions}>
                <button
                  className={`${styles.syncDataBtn} ${isSyncing ? styles.syncing : ''}`}
                  onClick={handleSyncData}
                  disabled={isSyncing}
                >
                  <FaSyncAlt className={isSyncing ? styles.spin : ''} /> {isSyncing ? 'Syncing...' : 'Sync Data'}
                </button>
                {syncMessage && <div className={styles.syncMessage}>{syncMessage}</div>}
                <button className={styles.preferencesBtn} onClick={handlePreferences}>
                  Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuyerSellerMatchingPage;