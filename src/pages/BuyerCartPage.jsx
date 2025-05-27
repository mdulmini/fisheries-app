/*import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/BuyerCartPage.module.css';
import logo from '../assets/logo.png';

const allProducts = [
  { id: 1, name: 'Premium Tuna', price: '2500.00', image: 'src/assets/Premium Tuna.jpg' },
  { id: 2, name: 'King Prawns', price: '3000.00', image: 'src/assets/King Prawns.jpg' },
  { id: 3, name: 'Fresh Salmon', price: '3500.00', image: 'src/assets/Fresh Salmon.jpg' },
  { id: 4, name: 'Tiger Prawns', price: '2800.00', image: 'src/assets/Tiger Prawns.jpg' },
  { id: 5, name: 'Mackerel', price: '1200.00', image: 'src/assets/Mackerel.jpg' },
  { id: 6, name: 'Herring', price: '1000.00', image: 'src/assets/Herring.jpg' },
  { id: 7, name: 'Cod', price: '3200.00', image: 'src/assets/Cod.jpg' },
  { id: 8, name: 'Tilapia', price: '900.00', image: 'src/assets/Tilapia.jpg' },
  { id: 9, name: 'Haddock', price: '3000.00', image: 'src/assets/Haddock.jpg' },
];

const BuyerCartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems: initialCartItems } = location.state || { cartItems: [] };

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddToCart = () => {
    if (!selectedItem) return;

    const existingItem = cartItems.find(item => item.id === selectedItem.id);
    let updatedCartItems;

    if (existingItem) {
      updatedCartItems = cartItems.map(item =>
        item.id === selectedItem.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      updatedCartItems = [...cartItems, { ...selectedItem, quantity }];
    }

    setCartItems(updatedCartItems);
    setQuantity(1);
    setSelectedItem(null); 

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);

 
    navigate('/buyer-cart', { state: { cartItems: updatedCartItems } });
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setQuantity(1);
  };

  return (
    <div className={styles.buyerCartPage}>
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

      <section className={styles.cartSection}>
        <h2>Your Cart</h2>
        <div className={styles.cartContainer}>
         
          <div className={styles.allProductsList}>
            {allProducts.map((item) => (
              <div
                key={item.id}
                className={`${styles.productItem} ${selectedItem?.id === item.id ? styles.selected : ''}`}
                onClick={() => handleSelectItem(item)}
              >
                <img src={item.image} alt={item.name} className={styles.previewImage} />
                <p className={styles.previewName}>{item.name}</p>
              </div>
            ))}
          </div>

       
          <div className={styles.cartItemsList}>
            {cartItems.length === 0 ? (
              <p className={styles.emptyCartMessage}>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.image} alt={item.name} className={styles.detailImage} />
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <div className={styles.starRating}>
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={styles.star} />
                      ))}
                      <span className={styles.reviewsText}>No reviews</span>
                    </div>
                    <p>
                      <span className={styles.categoryLabel}>Fish Type:</span> {item.name}
                    </p>
                    <p className={styles.stockText}>In Stock</p>
                    <p>
                      <span className={styles.priceLabel}>Price:</span> LKR {item.price}
                    </p>
                    <p>
                      <span className={styles.shippingLabel}>Shipping:</span> Free Shipping
                    </p>
                    <p className={styles.quantityLabel}>Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))
            )}

          
            {selectedItem && (
              <div className={styles.addToCartSection}>
                <div className={styles.quantity}>
                  <button onClick={handleDecreaseQuantity}>-</button>
                  <span>{quantity}</span>
                  <button onClick={handleIncreaseQuantity}>+</button>
                </div>
                <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
            )}

            {showSuccessMessage && (
              <div className={styles.successMessage}>
                You successfully added the product to the cart!
              </div>
            )}
          </div>
        </div>
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

export default BuyerCartPage;*/







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
                        src={item.image || productImages[item.name.toLowerCase()] || productImages['default']}
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