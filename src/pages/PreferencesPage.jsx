import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import styles from '../styles/PreferencesPage.module.css';

const PreferencesPage = () => {
  const [preferences, setPreferences] = useState({
    notifications: true,
    language: 'English',
    distanceUnit: 'km',
  });

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSavePreferences = () => {
    alert('Preferences saved!');
    console.log('Saved preferences:', preferences);
  };

  return (
    <div className={styles.preferencesPage}>
      <header className={styles.header}>
        <div className={styles.logo}>LOGO</div>
        <Link to="/buyers" className={styles.backLink}>
          <FaArrowLeft /> Back to Buyers
        </Link>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.preferencesContainer}>
          <h1>Preferences</h1>
          <div className={styles.preferenceGroup}>
            <label className={styles.switchLabel}>
              <span>Enable Notifications</span>
              <div className={styles.switch}>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={preferences.notifications}
                  onChange={handlePreferenceChange}
                />
                <span className={styles.slider}></span>
              </div>
            </label>
          </div>
          <div className={styles.preferenceGroup}>
            <label>Language</label>
            <select
              name="language"
              value={preferences.language}
              onChange={handlePreferenceChange}
              className={styles.selectInput}
            >
              <option>English</option>
              <option>Sinhala</option>
              <option>Tamil</option>
            </select>
          </div>
          <div className={styles.preferenceGroup}>
            <label>Distance Unit</label>
            <select
              name="distanceUnit"
              value={preferences.distanceUnit}
              onChange={handlePreferenceChange}
              className={styles.selectInput}
            >
              <option>km</option>
              <option>miles</option>
            </select>
          </div>
          <button className={styles.saveBtn} onClick={handleSavePreferences}>
            <FaSave /> Save Preferences
          </button>
        </div>
      </main>
    </div>
  );
};

export default PreferencesPage;