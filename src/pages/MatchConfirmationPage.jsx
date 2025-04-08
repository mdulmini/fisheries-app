import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import styles from '../styles/MatchConfirmationPage.module.css';

const MatchConfirmationPage = () => {
  const location = useLocation();
  const { buyerName } = location.state || {};

  const buyerDetails = {
    name: buyerName || 'Unknown Buyer',
    quantity: buyerName === 'Galle Fresh Market' ? '10 kg Crabs' : buyerName === 'Colombo Seafood Export' ? '25 kg Tuna' : '15 kg Crab',
    price: buyerName === 'Galle Fresh Market' ? '3000' : buyerName === 'Colombo Seafood Export' ? '950' : '1200',
    freshness: buyerName === 'Galle Fresh Market' ? 'Same Day' : buyerName === 'Colombo Seafood Export' ? 'Within 12h' : 'Same Day',
  };

  return (
    <div className={styles.matchConfirmationPage}>
      <header className={styles.header}>
        <div className={styles.logo}>LOGO</div>
        <Link to="/buyers" className={styles.backLink}>
          <FaArrowLeft /> Back to Buyers
        </Link>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.confirmationContainer}>
          <FaCheckCircle className={styles.successIcon} />
          <h1>Match Confirmed!</h1>
          <p>You have successfully matched with <strong>{buyerDetails.name}</strong>.</p>
          <div className={styles.buyerDetails}>
            <h2>Buyer Details</h2>
            <div className={styles.detailCard}>
              <div className={styles.detail}>
                <span>Required</span>
                <span>{buyerDetails.quantity}</span>
              </div>
              <div className={styles.detail}>
                <span>Price/kg</span>
                <span>LKR {buyerDetails.price}</span>
              </div>
              <div className={styles.detail}>
                <span>Freshness</span>
                <span>{buyerDetails.freshness}</span>
              </div>
            </div>
          </div>
          <Link to="/buyers" className={styles.backBtn}>Back to Buyers</Link>
        </div>
      </main>
    </div>
  );
};

export default MatchConfirmationPage;