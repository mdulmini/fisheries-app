/*import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/BuyerOrdersPage.module.css';
import logo from '../assets/logo.png';

const OrdersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [] } = location.state || {};
  const [orders, setOrders] = useState([]);

 
  const productImages = {
    'Premium Tuna': 'src/assets/Premium Tuna.jpg' ,
    'King Prawns' : 'src/assets/King Prawns.jpg' ,
    'Fresh Salmon': 'src/assets/Fresh Salmon.jpg' ,
    'Tiger Prawns': 'src/assets/Tiger Prawns.jpg' ,
    'Mackerel': 'src/assets/Mackerel.jpg' ,
    'Herring': 'src/assets/Herring.jpg' ,
    'Cod': 'src/assets/Cod.jpg' ,
    'Tilapia': 'src/assets/Tilapia.jpg' ,
    'Haddock': 'src/assets/Haddock.jpg' ,
    'Crab': 'src/assets/Crab.jpg' ,
    'Sardine': 'src/assets/Sardine.jpg',
    'Halibut': 'src/assets/Halibut.jpg' ,
  };

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('customerOrders')) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className={styles.ordersPage}>
      <header className={styles.header}>
        <div className={styles.logo}><img src={logo} alt="Fisheries Logo" /></div>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <button onClick={() => navigate('/buyer-home')}>Home</button>
            <button onClick={() => navigate('/buyer-products')}>Products</button>
            <button onClick={() => navigate('/buyer-orders')}>Orders</button>
            <button onClick={() => navigate('/buyer-profile')}>Profile</button>
          </div>
          <div className={styles.cartWrapper}>
            <button
              className={styles.cartBtn}
              onClick={() => navigate('/shopping-cart', { state: { cartItems } })}
            >
              <FaShoppingCart /> Cart
            </button>
            {cartItems.length > 0 && (
              <span className={styles.cartCount}>{cartItems.length}</span>
            )}
          </div>
        </nav>
      </header>

      <section className={styles.ordersSection}>
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className={styles.ordersGrid}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderDetails}>
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Total Amount:</strong> {order.total}</p>
                  <p><strong>Payment Method:</strong> PayPal</p>
                  <p>
                    <strong>Order Status:</strong>
                    <span className={styles.statusShipped}> Shipped</span>
                  </p>
                  <p><strong>Placed On:</strong> {order.orderDate}</p>
                </div>
                <div className={styles.orderItems}>
                  <p><strong>Products:</strong></p>
                  {order.items.map((item, index) => (
                    <div key={index} className={styles.orderItem}>
                      <img
                        src={productImages[item.name] || productImages['default']}
                        alt={item.name}
                        className={styles.productImage}
                        onError={(e) => (e.target.src = productImages['default'])}
                      />
                      <div>
                        <p>{item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

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

export default OrdersPage;*/








/*import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/BuyerOrdersPage.module.css';
import logo from '../assets/logo.png';

const OrdersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [] } = location.state || {};
  const [orders, setOrders] = useState([]);

  const productImages = {
    'prawns': '/src/assets/King Prawns.jpg',
    'tuna': '/src/assets/Premium Tuna.jpg',
    'salmon': '/src/assets/Fresh Salmon.jpg',
    'mackerel': '/src/assets/Mackerel.jpg',
    'herring': '/src/assets/Herring.jpg',
    'cod': '/src/assets/Cod.jpg',
    'tilapia': '/src/assets/Tilapia.jpg',
    'haddock': '/src/assets/Haddock.jpg',
    'crab': '/src/assets/Crab.jpg',
    'sardine': '/src/assets/Sardine.jpg',
    'halibut': '/src/assets/Halibut.jpg',
    'default': '/src/assets/Cod.jpg',
  };

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('customerOrders')) || [];
    setOrders(savedOrders);
  }, []);

  // Function to determine quantity from cartItems or order items
  const getQuantity = (itemName, orderItems) => {
    const item = orderItems.find(i => i.name.toLowerCase() === itemName.toLowerCase());
    return item && item.quantity ? item.quantity : 'N/A';
  };

  return (
    <div className={styles.ordersPage}>
      <header className={styles.header}>
        <div className={styles.logo}><img src={logo} alt="Fisheries Logo" /></div>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <button onClick={() => navigate('/buyer-home')}>Home</button>
            <button onClick={() => navigate('/buyer-products')}>Products</button>
            <button onClick={() => navigate('/buyer-orders')}>Orders</button>
            <button onClick={() => navigate('/buyer-profile')}>Profile</button>
          </div>
          <div className={styles.cartWrapper}>
            <button
              className={styles.cartBtn}
              onClick={() => navigate('/buyer-cart', { state: { cartItems } })}
            >
              <FaShoppingCart /> Cart
            </button>
            {cartItems.length > 0 && (
              <span className={styles.cartCount}>{cartItems.length}</span>
            )}
          </div>
        </nav>
      </header>

      <section className={styles.ordersSection}>
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className={styles.ordersGrid}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderDetails}>
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Total Amount:</strong> LKR {isNaN(parseFloat(order.total)) ? 'N/A' : parseFloat(order.total).toFixed(2)}</p>
                  <p><strong>Payment Method:</strong> PayPal</p>
                  <p>
                    <strong>Order Status:</strong>
                    <span className={styles.statusShipped}> Shipped</span>
                  </p>
                  <p><strong>Placed On:</strong> {order.orderDate}</p>
                </div>
                <div className={styles.orderItems}>
                  <p><strong>Products:</strong></p>
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <div key={index} className={styles.orderItem}>
                        <img
                          src={productImages[item.name.toLowerCase()] || productImages['default']}
                          alt={item.name}
                          className={styles.productImage}
                          onError={(e) => (e.target.src = productImages['default'])}
                        />
                        <div>
                          <p>{item.name}</p>
                          <p>Quantity: {getQuantity(item.name, order.items)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No products listed for this order.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

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
            <img src="/src/assets/facebook.png" alt="Facebook" />
            <img src="/src/assets/twitter.png" alt="Twitter" />
            <img src="/src/assets/instagram.png" alt="Instagram" />
            <img src="/src/assets/linkedin.png" alt="Linkedin" />
          </div>
        </div>
        <p className={styles.copyright}>© 2025 Fisheries Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OrdersPage;*/


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/BuyerOrdersPage.module.css';
import logo from '../assets/logo.png';

const OrdersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [] } = location.state || {};
  const [orders, setOrders] = useState([]);

  const productImages = {
    'premium tuna': '/src/assets/Premium Tuna.jpg',
    'king prawns': '/src/assets/King Prawns.jpg',
    'fresh salmon': '/src/assets/Fresh Salmon.jpg',
    'tiger prawns': '/src/assets/Tiger Prawns.jpg',
    'mackerel': '/src/assets/Mackerel.jpg',
    'herring': '/src/assets/Herring.jpg',
    'cod': '/src/assets/Cod.jpg',
    'tilapia': '/src/assets/Tilapia.jpg',
    'haddock': '/src/assets/Haddock.jpg',
    'crab': '/src/assets/Crab.jpg',
    'sardine': '/src/assets/Sardine.jpg',
    'halibut': '/src/assets/Halibut.jpg',
    'prawns': '/src/assets/King Prawns.jpg', // Added for "prawns"
    'catfish': '/src/assets/Catfish.jpg', // Added for "catfish"
    'default': '/src/assets/Cod.jpg', // Default image for fallback
  };

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('customerOrders')) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className={styles.ordersPage}>
      <header className={styles.header}>
        <div className={styles.logo}><img src={logo} alt="Fisheries Logo" /></div>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <button onClick={() => navigate('/buyer-home')}>Home</button>
            <button onClick={() => navigate('/buyer-products')}>Products</button>
            <button onClick={() => navigate('/buyer-orders')}>Orders</button>
            <button onClick={() => navigate('/buyer-profile')}>Profile</button>
          </div>
          <div className={styles.cartWrapper}>
            <button
              className={styles.cartBtn}
              onClick={() => navigate('/buyer-cart', { state: { cartItems } })}
            >
              <FaShoppingCart /> Cart
            </button>
            {cartItems.length > 0 && (
              <span className={styles.cartCount}>{cartItems.length}</span>
            )}
          </div>
        </nav>
      </header>

      <section className={styles.ordersSection}>
        <h2>My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className={styles.ordersGrid}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderDetails}>
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Total Amount:</strong> LKR {parseFloat(order.total).toFixed(2)}</p>
                  <p><strong>Payment Method:</strong> PayPal</p>
                  <p>
                    <strong>Order Status:</strong>
                    <span className={styles.statusShipped}> Shipped</span>
                  </p>
                  <p><strong>Placed On:</strong> {order.orderDate}</p>
                </div>
                <div className={styles.orderItems}>
                  <p><strong>Products:</strong></p>
                  {order.items.map((item, index) => (
                    <div key={index} className={styles.orderItem}>
                      <img
                        src={
                          item.image ||
                          productImages[item.name.toLowerCase().trim()] ||
                          productImages['default']
                        }
                        alt={item.name}
                        className={styles.productImage}
                        onError={(e) => (e.target.src = productImages['default'])}
                      />
                      <div>
                        <p>{item.name}</p>
                        <p>Quantity: {item.quantity || 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

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
            <img src="/src/assets/facebook.png" alt="Facebook" />
            <img src="/src/assets/twitter.png" alt="Twitter" />
            <img src="/src/assets/instagram.png" alt="Instagram" />
            <img src="/src/assets/linkedin.png" alt="Linkedin" />
          </div>
        </div>
        <p className={styles.copyright}>© 2025 Fisheries Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OrdersPage;