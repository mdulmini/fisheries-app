import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import styles from '../styles/OrderManagementPage.module.css';
import logo from '../assets/logo.png';


const OrderManagementPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [systemStatus, setSystemStatus] = useState('Online');
  const [lastSynced, setLastSynced] = useState('2 mins ago');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({ customer: '', items: '', price: '' });
  const [ordersData, setOrdersData] = useState([
    {
      id: '#ORD-2024-1234',
      customer: 'John Perera',
      items: '2 items - LKR 1560.00',
      status: 'In Transit',
      eta: 'ETA: 35 mins',
    },
    {
      id: '#ORD-2024-1233',
      customer: 'David Fernando',
      items: '1 item - LKR 950.00',
      status: 'Delivered',
      eta: 'Completed at 2:30 PM',
    },
    {
      id: '#ORD-2024-1232',
      customer: 'MD Thambawita',
      items: '3 items - LKR 450.00',
      status: 'Processing',
      eta: 'Created 15 mins ago',
    },
  ]);

  const filteredOrders = ordersData
    .filter(order => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab =
        activeTab === 'All Orders' ||
        (activeTab === 'Pending' && order.status === 'Processing') ||
        (activeTab === 'In Transit' && order.status === 'In Transit') ||
        (activeTab === 'Delivered' && order.status === 'Delivered');
      return matchesSearch && matchesTab;
    });

  const orderStats = {
    totalOrders: ordersData.length,
    inTransit: ordersData.filter(order => order.status === 'In Transit').length,
    delivered: ordersData.filter(order => order.status === 'Delivered').length,
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleNewOrder = () => {
    setShowNewOrderModal(true);
  };

  const handleNewOrderSubmit = (e) => {
    e.preventDefault();
    const newOrderData = {
      id: `#ORD-2024-${Math.floor(Math.random() * 10000)}`,
      customer: newOrder.customer,
      items: `${newOrder.items} - $${newOrder.price}`,
      status: 'Processing',
      eta: 'Created just now',
    };
    setOrdersData(prev => [newOrderData, ...prev]); 
    setShowNewOrderModal(false);
    setNewOrder({ customer: '', items: '', price: '' });
  };

  const handleToggleSmsNotifications = () => {
    setSmsNotifications(prev => !prev);
    alert(`SMS Notifications ${!smsNotifications ? 'Enabled' : 'Disabled'}`);
  };

  const handleTogglePushNotifications = () => {
    setPushNotifications(prev => !prev);
    alert(`Push Notifications ${!pushNotifications ? 'Enabled' : 'Disabled'}`);
  };

  const handleToggleSystemStatus = () => {
    setSystemStatus(prev => (prev === 'Online' ? 'Offline' : 'Online'));
  };

  const handleSyncNow = () => {
    setLastSynced('Just now');
    alert('System synced successfully!');
  };

  return (
    <div className={styles.orderManagementPage}>
      <header className={styles.header}>
        <div className={styles.logo}><img src={logo} alt="Fisheries Logo" /></div>
        <nav className={styles.nav}>
          <Link to="/dashboard" className={styles.navLink}> Back to Dashboard</Link>
        </nav>
        <div className={styles.headerActions}>
          <button className={styles.newOrderBtn} onClick={handleNewOrder}>+ New Order</button>
          <select defaultValue="English" className={styles.languageSelect}>
            <option>English</option>
            <option>Sinhala</option>
            <option>Tamil</option>
          </select>
        </div>
      </header>

      {showNewOrderModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>New Order</h2>
            <form onSubmit={handleNewOrderSubmit}>
              <div className={styles.formGroup}>
                <label>Customer Name</label>
                <input
                  type="text"
                  value={newOrder.customer}
                  onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Items</label>
                <input
                  type="text"
                  value={newOrder.items}
                  onChange={(e) => setNewOrder({ ...newOrder, items: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Price (LKR)</label>
                <input
                  type="number"
                  value={newOrder.price}
                  onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
                  required
                />
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>Create Order</button>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowNewOrderModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className={styles.mainContent}>
        <div className={styles.pageHeader}>
          <div>
            <h1>Order Management</h1>
            <p>Manage and track all orders in one place</p>
          </div>
          <div className={styles.searchBar}>
            <FaSearch />
            <input
              type="text"
              placeholder="Search Orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tabs}>
          {['All Orders', 'Pending', 'In Transit', 'Delivered'].map(tab => (
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
            <div className={styles.recentOrders}>
              <h2>Recent Orders</h2>
              {filteredOrders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                filteredOrders.map((order, index) => (
                  <div key={index} className={styles.orderCard}>
                    <div className={styles.orderInfo}>
                      <h3>{order.id}</h3>
                      <p>{order.customer}</p>
                      <p>{order.items}</p>
                    </div>
                    <div className={styles.orderStatus}>
                      <span className={`${styles.status} ${order.status.toLowerCase().replace(' ', '-')}`}>
                        {order.status}
                      </span>
                      <p>{order.eta}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className={styles.deliveryMap}>
              <h2>Delivery Map</h2>
              <div className={styles.mapPlaceholder}>
                <img
                  src="src/assets/map.jpg"
                  alt="Map"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/250x200?text=Map+Placeholder')}
                />
              </div>
              <p className={styles.activeDeliveries}>Active Deliveries: 12</p>
            </div>
          </div>

          <div className={styles.rightSection}>
            <div className={styles.orderStats}>
              <h2>Order Statistics</h2>
              <div className={styles.stat}>
                <div className={styles.statIcon}>
                  <img src="src/assets/total-orders-icon.jpg" alt="Total Orders Icon" />
                </div>
                <div className={styles.statDetails}>
                  <span>{orderStats.totalOrders}</span>
                  <p>Total Orders</p>
                  <p className={styles.statDescription}>Number of orders placed</p>
                </div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statIcon}>
                  <img src="src/assets/in-transit-icon.jpg" alt="In Transit Icon" />
                </div>
                <div className={styles.statDetails}>
                  <span>{orderStats.inTransit}</span>
                  <p>In Transit</p>
                  <p className={styles.statDescription}>Orders currently in transit</p>
                </div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statIcon}>
                  <img src="src/assets/delivered-icon.png.jpg" alt="Delivered Icon" />
                </div>
                <div className={styles.statDetails}>
                  <span>{orderStats.delivered}</span>
                  <p>Delivered</p>
                  <p className={styles.statDescription}>Orders successfully delivered</p>
                </div>
              </div>
            </div>

            <div className={styles.notifications}>
              <h2>Notifications</h2>
              <div className={styles.notificationOption}>
                <span>SMS Notifications</span>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={smsNotifications}
                    onChange={handleToggleSmsNotifications}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
              <div className={styles.notificationOption}>
                <span>Push Notifications</span>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={pushNotifications}
                    onChange={handleTogglePushNotifications}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </div>

            <div className={styles.systemStatus}>
              <h2>System Status</h2>
              <div className={styles.statusItem}>
                <span>Status</span>
                <button
                  className={`${styles.statusBtn} ${systemStatus === 'Online' ? styles.online : styles.offline}`}
                  onClick={handleToggleSystemStatus}
                >
                  {systemStatus}
                </button>
              </div>
              <div className={styles.statusItem}>
                <span>Last Synced</span>
                <span>{lastSynced}</span>
              </div>
              <div className={styles.statusItem}>
                <span>Connection Status</span>
                <span>Strong</span>
              </div>
              <button className={styles.syncBtn} onClick={handleSyncNow}>Sync Now</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderManagementPage;