import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import styles from '../styles/SalesReportsPage.module.css';
import logo from '../assets/logo.png';

const SalesReportsPage = () => {
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [productCategory, setProductCategory] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const handleProductCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  const handleGenerateReport = () => {
    
    let filteredSales = [
      { date: '2025-04-01', product: 'Tuna', quantity: 150, revenue: 4500 },
      { date: '2025-04-02', product: 'Salmon', quantity: 120, revenue: 3600 },
      { date: '2025-04-03', product: 'Cod', quantity: 80, revenue: 2000 },
      { date: '2025-04-04', product: 'Shrimp', quantity: 50, revenue: 1500 },
    ];

    
    if (productCategory !== 'All') {
      filteredSales = filteredSales.filter(item => item.product === productCategory);
    }

    if (startDate && endDate) {
      filteredSales = filteredSales.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    }

    const totalRevenue = filteredSales.reduce((sum, item) => sum + item.revenue, 0);
    const totalQuantity = filteredSales.reduce((sum, item) => sum + item.quantity, 0);
    const topProduct = filteredSales.reduce((prev, current) => 
      prev.revenue > current.revenue ? prev : current, filteredSales[0] || { product: 'N/A', revenue: 0 }
    );

    const generatedData = {
      timeRange,
      sales: filteredSales,
      totalRevenue,
      totalQuantity,
      topProduct: topProduct.product,
      productDistribution: filteredSales.map(item => ({
        name: item.product,
        value: item.revenue,
      })),
    };
    setReportData(generatedData);
  };

  const handleDownloadCSV = () => {
    if (!reportData) return;

    const csvData = [
      ['Date', 'Product', 'Quantity', 'Revenue'],
      ...reportData.sales.map(item => [
        item.date,
        item.product,
        item.quantity,
        item.revenue,
      ]),
      ['Total Revenue', '', '', reportData.totalRevenue],
    ];

    const csv = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-report-${timeRange}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    if (!reportData) return;

    const doc = new jsPDF();
    doc.text(`Sales Report - LKR {reportData.timeRange}`, 14, 20);
    doc.autoTable({
      startY: 30,
      head: [['Date', 'Product', 'Quantity', 'Revenue']],
      body: reportData.sales.map(item => [
        item.date,
        item.product,
        item.quantity,
        item.revenue,
      ]),
      foot: [['Total Revenue', '', '', reportData.totalRevenue]],
    });
    doc.save(`sales-report-LKR {timeRange}.pdf`);
  };

  const COLORS = ['#4A90E2', '#50E3C2', '#F5A623', '#D0021B'];

  return (
    <div className={styles.salesReportsPage}>
      <header className={styles.header}>
        <div className={styles.logo}><img src={logo} alt="Fisheries Logo" /></div>
        <nav className={styles.nav}>
          <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
          <Link to="/sales-reports" className={styles.navLink}>Report</Link>
          <Link to="/analytics" className={styles.navLink}>Analytics</Link>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.headerSection}>
          <h1>Sales Reports</h1>
          <div className={styles.actions}>
            <select value={timeRange} onChange={handleTimeRangeChange} className={styles.timeRangeSelect}>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
            <select value={productCategory} onChange={handleProductCategoryChange} className={styles.timeRangeSelect}>
              <option>All</option>
              <option>Tuna</option>
              <option>Salmon</option>
              <option>Cod</option>
              <option>Shrimp</option>
            </select>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.dateInput}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.dateInput}
            />
            <button className={styles.generateBtn} onClick={handleGenerateReport}>
              Generate Report
            </button>
          </div>
        </div>

        {reportData ? (
          <>
            <div className={styles.summaryCards}>
              <div className={styles.card}>
                <h3>Total Revenue</h3>
                <p className={styles.cardValue}>LKR {reportData.totalRevenue.toLocaleString()}</p>
              </div>
              <div className={styles.card}>
                <h3>Total Quantity</h3>
                <p className={styles.cardValue}>{reportData.totalQuantity}</p>
              </div>
              <div className={styles.card}>
                <h3>Top Product</h3>
                <p className={styles.cardValue}>{reportData.topProduct}</p>
              </div>
            </div>

            <div className={styles.chartsSection}>
              <div className={styles.chartCard}>
                <h2>Revenue by Product</h2>
                <div className={styles.chart}>
                  <BarChart width={500} height={300} data={reportData.sales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="product" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#4A90E2" />
                  </BarChart>
                </div>
              </div>
              <div className={styles.chartCard}>
                <h2>Product Distribution</h2>
                <div className={styles.chart}>
                  <PieChart width={300} height={300}>
                    <Pie
                      data={reportData.productDistribution}
                      cx={150}
                      cy={150}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {reportData.productDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
              </div>
            </div>

            <div className={styles.reportSection}>
              <div className={styles.reportHeader}>
                <h2>Sales Report - {reportData.timeRange}</h2>
                <div className={styles.exportButtons}>
                  <button className={styles.downloadBtn} onClick={handleDownloadCSV}>
                    <FaDownload className={styles.downloadIcon} /> CSV
                  </button>
                  <button className={styles.downloadBtn} onClick={handleDownloadPDF}>
                    <FaFilePdf className={styles.downloadIcon} /> PDF
                  </button>
                </div>
              </div>
              <table className={styles.reportTable}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Revenue(LKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.sales.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.product}</td>
                      <td>{item.quantity}</td>
                      <td>{item.revenue}</td>
                    </tr>
                  ))}
                  <tr className={styles.totalRow}>
                    <td colSpan="3">Total Revenue</td>
                    <td>LKR {reportData.totalRevenue.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className={styles.placeholder}>
            <p>Select filters and click "Generate Report" to view the sales report.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SalesReportsPage;