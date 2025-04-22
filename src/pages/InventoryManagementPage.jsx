import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTrash, FaDownload, FaFish, FaSync, FaExclamationTriangle, FaCheckCircle, FaHourglassHalf, FaBell, FaEdit } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import '../styles/InventoryManagementPage.css';
import logo from '../assets/logo.png';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const InventoryManagementPage = () => {
  const [inventoryData, setInventoryData] = useState([
    {
      product: 'Tuna',
      type: 'Fresh Catch',
      quantity: '450 kg',
      updated: 'Updated 2h ago',
      temperature: '2°C',
      temperatureStatus: 'Optimal',
      humidity: '85%',
      humidityStatus: 'Normal',
      status: 'Safe',
      image: 'src/assets/tuna.png', 
    },
    {
      product: 'Salmon',
      type: 'Fresh Catch',
      quantity: '320 kg',
      updated: 'Updated 4h ago',
      temperature: '5°C',
      temperatureStatus: 'High',
      humidity: '90%',
      humidityStatus: 'High',
      status: 'At Risk',
      image: '/src/assets/salmon.png',
    },
  ]);

  const [notificationCount, setNotificationCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [timeFilter, setTimeFilter] = useState('Last 7 days');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editItem, setEditItem] = useState(null);

  const itemsPerPage = 2; 

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [2, 3, 2.5, 3.5, 2, 1.5, 2],
        fill: true,
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        borderColor: '#007bff',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        max: 4,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const summaryCards = [
    { title: 'Total Stock', value: '2,450 kg', icon: <FaFish />, valueClass: '' },
    { title: 'At Risk', value: '120 kg', icon: <FaExclamationTriangle />, valueClass: 'warning' },
    { title: 'Safe Stock', value: '2,330 kg', icon: <FaCheckCircle />, valueClass: 'success' },
    { title: 'Average Storage Time', value: '36h', icon: <FaHourglassHalf />, valueClass: '' },
  ];

 
  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All Types' || item.type === typeFilter;
    const matchesTime = timeFilter === 'Last 7 days' || (timeFilter === 'Last 30 days' && item.updated.includes('4h ago')); // Simplified time filter
    return matchesSearch && matchesType && matchesTime;
  });


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSyncData = () => {
    console.log('Syncing data...');
    alert('Data synced successfully!');
  };

  const handleNotificationClick = () => {
    alert('You have new notifications!');
    setNotificationCount(0);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleTypeFilter = (e) => {
    setTypeFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleTimeFilter = (e) => {
    setTimeFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleAddNewCatch = (newItem) => {
    setInventoryData([...inventoryData, newItem]);
    setShowAddForm(false);
  };

  const handleExport = () => {
    const csv = [
      ['Product', 'Quantity', 'Temperature', 'Humidity', 'Status'],
      ...inventoryData.map(item => [
        item.product,
        item.quantity,
        item.temperature,
        item.humidity,
        item.status,
      ]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = (index) => {
    const updatedData = inventoryData.filter((_, i) => i !== index);
    setInventoryData(updatedData);
  };

  const handleEdit = (index) => {
    setEditItem({ ...inventoryData[index], index });
    setShowEditForm(true);
  };

  const handleUpdate = (updatedItem) => {
    const updatedData = inventoryData.map((item, i) =>
      i === updatedItem.index ? { ...updatedItem, updated: `Updated ${new Date().getHours()}h ago` } : item
    );
    setInventoryData(updatedData);
    setShowEditForm(false);
    setEditItem(null);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="inventory-management-page">
      <header className="header">
        <div className="logo"><img src={logo} alt="Fisheries Logo" /></div>
        <nav className="nav">
          <Link to="/dashboard" className="nav-link">Back to Dashboard</Link>
        </nav>
        <div className="header-actions">
          <button className="sync-data-btn" onClick={handleSyncData}>
            <FaSync className="sync-icon" /> Sync Data
          </button>
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
        <h1>Inventory Management</h1>
        <p>Track & manage your catch inventory</p>

        <div className="summary-cards">
          {summaryCards.map((card, index) => (
            <div key={index} className="card">
              <div className="card-icon">{card.icon}</div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <p className={`card-value ${card.valueClass}`}>{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="current-inventory">
          <div className="table-header">
            <h2>Current Inventory</h2>
            <p>A list of all catches in your inventory including their quantity and status</p>
            <div className="table-actions">
              <div className="search-bar">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              <select value={typeFilter} onChange={handleTypeFilter}>
                <option>All Types</option>
                <option>Fresh Catch</option>
                <option>Processed</option>
              </select>
              <select value={timeFilter} onChange={handleTimeFilter}>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
              <button className="add-new-catch" onClick={() => setShowAddForm(true)}>
                + Add New Catch
              </button>
              <button className="export-btn" onClick={handleExport}>
                <FaDownload /> Export
              </button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Temperature</th>
                <th>Humidity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="product-info">
                      <img
                        src={`/assets/${item.product.toLowerCase()}.png`}
                        alt={item.product}
                        onError={(e) => (e.target.src = '/assets/placeholder.png')}
                      />
                      <div>
                        <p>{item.product}</p>
                        <span>{item.type}</span>
                        <span>{item.updated}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td className={item.temperatureStatus.toLowerCase()}>{item.temperature}</td>
                  <td className={item.humidityStatus.toLowerCase()}>{item.humidity}</td>
                  <td>
                    <span className={`status ${item.status.toLowerCase().replace(' ', '-')}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn edit-btn" onClick={() => handleEdit(index)}>
                      <FaEdit />
                    </button>
                    <button className="action-btn" onClick={() => handleDelete(index)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>

        {showAddForm && (
          <AddNewCatchForm onAdd={handleAddNewCatch} onClose={() => setShowAddForm(false)} />
        )}

        {showEditForm && (
          <EditCatchForm
            item={editItem}
            onUpdate={handleUpdate}
            onClose={() => setShowEditForm(false)}
          />
        )}

        <div className="temperature-monitoring">
          <h2>Temperature Monitoring</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      </main>
    </div>
  );
};


const AddNewCatchForm = ({ onAdd, onClose }) => {
  const [newItem, setNewItem] = useState({
    product: '',
    type: 'Fresh Catch',
    quantity: '',
    temperature: '',
    humidity: '',
    status: 'Safe',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...newItem,
      updated: `Updated ${new Date().getHours()}h ago`,
      temperatureStatus: newItem.temperature <= 3 ? 'Optimal' : 'High',
      humidityStatus: newItem.humidity <= 85 ? 'Normal' : 'High',
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Catch</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Product:
            <input
              type="text"
              value={newItem.product}
              onChange={(e) => setNewItem({ ...newItem, product: e.target.value })}
              required
            />
          </label>
          <label>
            Type:
            <select
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
            >
              <option>Fresh Catch</option>
              <option>Processed</option>
            </select>
          </label>
          <label>
            Quantity (kg):
            <input
              type="text"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              required
            />
          </label>
          <label>
            Temperature (°C):
            <input
              type="number"
              value={newItem.temperature}
              onChange={(e) => setNewItem({ ...newItem, temperature: e.target.value })}
              required
            />
          </label>
          <label>
            Humidity (%):
            <input
              type="number"
              value={newItem.humidity}
              onChange={(e) => setNewItem({ ...newItem, humidity: e.target.value })}
              required
            />
          </label>
          <label>
            Status:
            <select
              value={newItem.status}
              onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
            >
              <option>Safe</option>
              <option>At Risk</option>
            </select>
          </label>
          <div className="modal-actions">
            <button type="submit">Add</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};


const EditCatchForm = ({ item, onUpdate, onClose }) => {
  const [editItem, setEditItem] = useState(item);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editItem);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Catch</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Product:
            <input
              type="text"
              value={editItem.product}
              onChange={(e) => setEditItem({ ...editItem, product: e.target.value })}
              required
            />
          </label>
          <label>
            Type:
            <select
              value={editItem.type}
              onChange={(e) => setEditItem({ ...editItem, type: e.target.value })}
            >
              <option>Fresh Catch</option>
              <option>Processed</option>
            </select>
          </label>
          <label>
            Quantity (kg):
            <input
              type="text"
              value={editItem.quantity}
              onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
              required
            />
          </label>
          <label>
            Temperature (°C):
            <input
              type="number"
              value={editItem.temperature}
              onChange={(e) => setEditItem({ ...editItem, temperature: e.target.value })}
              required
            />
          </label>
          <label>
            Humidity (%):
            <input
              type="number"
              value={editItem.humidity}
              onChange={(e) => setEditItem({ ...editItem, humidity: e.target.value })}
              required
            />
          </label>
          <label>
            Status:
            <select
              value={editItem.status}
              onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
            >
              <option>Safe</option>
              <option>At Risk</option>
            </select>
          </label>
          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryManagementPage;


