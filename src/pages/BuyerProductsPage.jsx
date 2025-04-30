import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import styles from '../styles/BuyerProductsPage.module.css';
import logo from '../assets/logo.png';

const BuyerProductsPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const products = [
    { id: 1, name: 'Premium Tuna', price: '2500.00', image: 'src/assets/Premium Tuna.jpg' },
    { id: 2, name: 'King Prawns', price: '3000.00', image: 'src/assets/King Prawns.jpg' },
    { id: 3, name: 'Fresh Salmon', price: '3500.00', image: 'src/assets/Fresh Salmon.jpg' },
    { id: 4, name: 'Tiger Prawns', price: '2800.00', image: 'src/assets/Tiger Prawns.jpg' },
    { id: 5, name: 'Mackerel', price: '1200.00', image: 'src/assets/Mackerel.jpg' },
    { id: 6, name: 'Herring', price: '1000.00', image: 'src/assets/Herring.jpg' },
    { id: 7, name: 'Cod', price: '3200.00', image: 'src/assets/Cod.jpg' },
    { id: 8, name: 'Tilapia', price: '900.00', image: 'src/assets/Tilapia.jpg' },
    { id: 9, name: 'Haddock', price: '3000.00', image: 'src/assets/Haddock.jpg' },
    { id: 10, name: 'Crab', price: '2000.00', image: 'src/assets/Crab.jpg' },
    { id: 11, name: 'Sardine', price: '800.00', image: 'src/assets/Sardine.jpg' },
    { id: 12, name: 'Halibut', price: '3400.00', image: 'src/assets/Halibut.jpg' },
  ];

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    let updatedCartItems;

    if (existingItem) {
      updatedCartItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCartItems);
  };

  const handleViewCart = () => {
    navigate('/buyer-cart', { state: { cartItems } });
  };

  return (
    <div className={styles.buyerProductsPage}>
      <header className={styles.header}>
        <div className={styles.logo}><img src={logo} alt="Fisheries Logo" /></div>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <button onClick={() => navigate('/buyer-home')}>Home</button>
            <button>Products</button>
            <button onClick={() => navigate('/buyer-orders')}>Orders</button>
            <button onClick={() => navigate('/buyer-profile')}>Profile</button>
          </div>
          <div className={styles.cartWrapper}>
            <button className={styles.cartBtn} onClick={handleViewCart}>
              <FaShoppingCart /> Cart
            </button>
            {cartItems.length > 0 && (
              <span className={styles.cartCount}>{cartItems.length}</span>
            )}
          </div>
        </nav>
      </header>

      <section className={styles.productsSection}>
        <h2>All Products</h2>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img src={product.image} alt={product.name} className={styles.productImage} />
              </div>
              <h3>{product.name}</h3>
              <div className={styles.starRating}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={styles.star} />
                ))}
              </div>
              <p className={styles.reviews}>
                <span className={styles.reviewsText}>0 reviews</span>
                <span className={styles.stockText}>In Stock</span>
              </p>
              <p className={styles.price}>LKR {product.price}/kg</p>
              <button
                className={styles.addToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
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
            <li><button>Products</button></li>
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

export default BuyerProductsPage;


