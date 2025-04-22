import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { FaDownload, FaDollarSign, FaShoppingCart, FaClipboardList, FaFish } from 'react-icons/fa';
import styles from '../styles/SalesAnalyticsPage.module.css';
import logo from '../assets/logo.png';

const SalesAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [activeTab, setActiveTab] = useState('Weekly');
  const [salesData, setSalesData] = useState({
    Daily: [],
    Weekly: [],
    Monthly: [],
  });
  const [productData, setProductData] = useState([]);

  
  const initialSalesData = {
    Daily: [
      { day: 'Mon', sales: 600 },
      { day: 'Tue', sales: 700 },
      { day: 'Wed', sales: 650 },
      { day: 'Thu', sales: 900 },
      { day: 'Fri', sales: 1200 },
      { day: 'Sat', sales: 1100 },
      { day: 'Sun', sales: 1300 },
    ],
    Weekly: [
      { week: 'Week 1', sales: 4000 },
      { week: 'Week 2', sales: 4500 },
      { week: 'Week 3', sales: 5000 },
      { week: 'Week 4', sales: 6000 },
    ],
    Monthly: [
      { month: 'Jan', sales: 15000 },
      { month: 'Feb', sales: 16000 },
      { month: 'Mar', sales: 17000 },
      { month: 'Apr', sales: 18000 },
    ],
  };

  
  const initialProductData = [
    { name: 'Salmon', value: 40 },
    { name: 'Tuna', value: 32 },
    { name: 'Cod', value: 15 },
    { name: 'Shrimp', value: 8 },
    { name: 'Others', value: 5 },
  ];

  const COLORS = ['#4A90E2', '#50E3C2', '#F5A623', '#D0021B', '#BD10E0'];

  
  const fetchDataForTimeRange = (range) => {
    console.log(`Fetching data for LKR {range}`);
    let updatedSalesData = { ...initialSalesData };
    let updatedProductData = [...initialProductData];

    if (range === 'Last 30 Days') {
      updatedSalesData.Daily = updatedSalesData.Daily.map(item => ({
        ...item,
        sales: item.sales * 1.2,
      }));
      updatedProductData = updatedProductData.map(item => ({
        ...item,
        value: item.value * 1.1,
      }));
    } else if (range === 'Last 90 Days') {
      updatedSalesData.Daily = updatedSalesData.Daily.map(item => ({
        ...item,
        sales: item.sales * 1.5,
      }));
      updatedProductData = updatedProductData.map(item => ({
        ...item,
        value: item.value * 1.3,
      }));
    }

    setSalesData(updatedSalesData);
    setProductData(updatedProductData);
  };

  useEffect(() => {
    fetchDataForTimeRange(timeRange);
  }, [timeRange]);

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleExportData = () => {
    const data = [
      ['Metric', 'Value'],
      ['Total Revenue', 'LKR 1,500,000'],
      ['Total Orders', '1,463'],
      ['Average Order Value', 'LKR 125,000'],
      ['Top Product', 'Fresh Tuna'],
    ];
    const csv = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales-analytics.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.salesAnalyticsPage}>
      <header className={styles.header}>
        <div className={styles.logo}><img src={logo} alt="Fisheries Logo" /></div>
        <nav className={styles.nav}>
          <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
          <Link to="/sales-reports" className={styles.navLink}>Report</Link> {/* Updated path */}
          <Link to="/analytics" className={styles.navLink}>Analytics</Link>
        </nav>
        <div className={styles.headerActions}>
          <select value={timeRange} onChange={handleTimeRangeChange} className={styles.timeRangeSelect}>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
          <button className={styles.exportBtn} onClick={handleExportData}>
            <FaDownload className={styles.exportIcon} /> Export Data
          </button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FaDollarSign />
            </div>
            <div className={styles.statDetails}>
              <h3>Total Revenue</h3>
              <p className={styles.statValue}>LKR 1,500,000</p>
              <p className={styles.statChange}>+12.5% vs last month</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FaShoppingCart />
            </div>
            <div className={styles.statDetails}>
              <h3>Total Orders</h3>
              <p className={styles.statValue}>1,463</p>
              <p className={styles.statChange}>+8.2% vs last month</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FaClipboardList />
            </div>
            <div className={styles.statDetails}>
              <h3>Average Order Value</h3>
              <p className={styles.statValue}>LKR 125,000</p>
              <p className={styles.statChange} data-negative="true">-2.3% vs last month</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FaFish />
            </div>
            <div className={styles.statDetails}>
              <h3>Top Product</h3>
              <p className={styles.statValue}>Fresh Tuna</p>
              <p className={styles.statChange}>32% of total</p>
            </div>
          </div>
        </div>

        <div className={styles.charts}>
          <div className={styles.salesTrend}>
            <div className={styles.salesTrendHeader}>
              <h2>Sales Trend</h2>
              <div className={styles.timeTabs}>
                {['Daily', 'Weekly', 'Monthly'].map(tab => (
                  <button
                    key={tab}
                    className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                    onClick={() => handleTabChange(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.chartPlaceholder}>
              <LineChart
                width={600}
                height={300}
                data={salesData[activeTab]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={activeTab === 'Daily' ? 'day' : activeTab === 'Weekly' ? 'week' : 'month'} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#4A90E2" fill="#4A90E2" />
              </LineChart>
            </div>
          </div>

          <div className={styles.productDistribution}>
            <h2>Product Distribution</h2>
            <div className={styles.chartContainer}>
              <PieChart width={300} height={300}>
                <Pie
                  data={productData}
                  cx={150}
                  cy={150}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-LKR{index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className={styles.legend}>
              {productData.map((entry, index) => (
                <div key={entry.name} className={styles.legendItem}>
                  <span
                    className={styles.legendColor}
                    style={{ backgroundColor: COLORS[index] }}
                  ></span>
                  {entry.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.insights}>
          <h2>All Insights</h2>
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>
              <img src="src/assets/stock-icon.jpg" alt="Stock Icon" />
            </div>
            <div className={styles.insightDetails}>
              <h3>Stock Recommendation</h3>
              <p>Increase Tuna inventory by 15% next month based on historical data and seasonal trends.</p>
            </div>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>
              <img src="src/assets/sales-icon.jpg" alt="Sales Icon" />
            </div>
            <div className={styles.insightDetails}>
              <h3>Sales Optimization</h3>
              <p>Consider running promotions between 2-4 PM to boost afternoon sales period.</p>
            </div>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightIcon}>
              <img src="src/assets/pricing-icon.jpg" alt="Pricing Icon" />
            </div>
            <div className={styles.insightDetails}>
              <h3>Pricing Strategy</h3>
              <p>5% price reduction on shrimp could increase sales volume by est. 20%.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalesAnalyticsPage;