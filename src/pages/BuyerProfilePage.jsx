import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import styles from '../styles/BuyerProfilePage.module.css';
import logo from '../assets/logo.png';

const BuyerProfilePage = () => {
  const navigate = useNavigate();

  
  const [buyer, setBuyer] = useState({
    name: 'John Doe',
    email: 'john.doe@fisheries.lk',
    mobile: '0771234567',
    address: '123, Colombo Road, Colombo, Sri Lanka',
    profilePicture: 'src/assets/michael.jpg',
  });


  const [orders, setOrders] = useState([]);

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...buyer });

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('customerOrders')) || [];
    setOrders(savedOrders.slice(0, 3)); 
  }, []);

  
  const handleEditProfile = () => {
    setFormData({ ...buyer });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  
  const handleSaveProfile = () => {
    setBuyer({ ...formData });
    setIsModalOpen(false);
  };

  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.profilePage}>
      <header className={styles.header}>
        <div className={styles.logo}><img src={logo} alt="Fisheries Logo" /></div>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <button onClick={() => navigate('/buyer-home')}>Home</button>
            <button onClick={() => navigate('/buyer-products')}>Products</button>
            <button onClick={() => navigate('/buyer-orders')}>Orders</button>
            <button onClick={() => navigate('/buyer-profile')}>Profile</button>
          </div>
        </nav>
      </header>

      <section className={styles.profileSection}>
        <h2>My Profile</h2>
        <div className={styles.profileContainer}>
          <div className={styles.profileCard}>
            <img
              src={buyer.profilePicture}
              alt="Profile"
              className={styles.profilePicture}
            />
            <div className={styles.profileDetails}>
              <h3>{buyer.name}</h3>
              <p><strong>Email:</strong> {buyer.email}</p>
              <p><strong>Mobile:</strong> {buyer.mobile}</p>
              <p><strong>Address:</strong> {buyer.address}</p>
              <button
                className={styles.editBtn}
                onClick={handleEditProfile}
              >
                <FaEdit /> Edit Profile
              </button>
            </div>
          </div>

          <div className={styles.orderSummary}>
            <h3>Recent Orders</h3>
            {orders.length === 0 ? (
              <p>No recent orders found.</p>
            ) : (
              <div className={styles.ordersList}>
                {orders.map((order) => (
                  <div key={order.id} className={styles.orderItem}>
                    <div className={styles.orderInfo}>
                      <p><strong>Order ID:</strong> {order.id}</p>
                      <p><strong>Total:</strong> {order.total}</p>
                      <p><strong>Date:</strong> {order.orderDate}</p>
                    </div>
                    <div className={styles.orderProducts}>
                      {order.items.map((item, index) => (
                        <span key={index} className={styles.productName}>
                          {item.name} (x{item.quantity})
                          {index < order.items.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              className={styles.viewAllBtn}
              onClick={() => navigate('/buyer-orders')}
            >
              View All Orders
            </button>
          </div>
        </div>
      </section>

     
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Edit Profile</h3>
            <div className={styles.formGroup}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Mobile:</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
              {formData.profilePicture && (
                <img
                  src={formData.profilePicture}
                  alt="Preview"
                  className={styles.previewImage}
                />
              )}
            </div>
            <div className={styles.modalActions}>
              <button className={styles.saveBtn} onClick={handleSaveProfile}>
                Save
              </button>
              <button className={styles.cancelBtn} onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <div className={styles.footerSection}>
          <h4>About Us</h4>
          <p>Your trusted source for premium seafood, delivering fresh catches daily to your business.</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul>
            <li><button onClick={() => navigate('/buyer-home')}>Home</button></li>
            <li><button onClick={() => navigate('/buyer-products')}>Products</button></li>
            <li><button onClick={() => navigate('/buyer-orders')}>Orders</button></li>
            <li><button onClick={() => navigate('/buyer-profile')}>Profile</button></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h4>Contact</h4>
          <p>📧 info@fisheries.lk</p>
          <p>📞 +94 11 234 5678</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <img src="src/assets/facebook.png" alt="Facebook" />
            <img src="src/assets/twitter.png" alt="Twitter" />
            <img src="src/assets/instagram.png" alt="Instagram" />
            <img src="src/assets/linkedin.png" alt="Linkedin" />
          </div>
        </div>
        <p className={styles.copyright}>© 2025 Fisheries Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BuyerProfilePage;

