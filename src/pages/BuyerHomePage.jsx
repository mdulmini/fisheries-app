import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from '../styles/BuyerHomePage.module.css';
import logo from '../assets/logo.png';

const BuyerHomePage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    { name: 'Premium Tuna', image: 'src/assets/Premium Tuna.jpg' },
    { name: 'King Prawns', image: 'src/assets/King Prawns.jpg' },
    { name: 'Fresh Salmon', image: 'src/assets/Fresh Salmon.jpg' },
    { name: 'Tiger Prawns', image: 'src/assets/Tiger Prawns.jpg' },
    { name: 'Mackerel', image: 'src/assets/Mackerel.jpg' },
    { name: 'Herring', image: 'src/assets/Herring.jpg' },
    { name: 'Cod', image: 'src/assets/Cod.jpg' },
    { name: 'Tilapia', image: 'src/assets/Tilapia.jpg' },
    { name: 'Haddock', image: 'src/assets/Haddock.jpg' },
    { name: 'Crab', image: 'src/assets/Crab.jpg' },
    { name: 'Sardine', image: 'src/assets/Sardine.jpg' },
    { name: 'Halibut', image: 'src/assets/Halibut.jpg' },
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalPages]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    alert(`${product.name} added to cart!`);
  };

  const handleViewCart = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
    } else {
      alert(`Cart Items:\n${cartItems.map(item => item.name).join('\n')}`);
    }
  };

  const handleShopNow = () => {
    navigate('/buyer-products');
  };

  const handleViewDetails = () => {
    alert('Special Offer Details: Get 10% off on bulk orders above 50kg. Contact us for more info!');
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  const startIndex = currentIndex * itemsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.buyerHomePage}>
      
      <header className={styles.header}>
        <div className={styles.logo}><img src={logo} alt="Fisheries Logo" /></div>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <button>Home</button>
            <button onClick={() => navigate('/buyer-products')}>Products</button>
            <button onClick={() => navigate('/buyer-orders')}>Orders</button>
            <button onClick={() => navigate('/buyer-profile')}>Profile</button>
          </div>
          <button className={styles.cartBtn} onClick={handleViewCart}>
            <FaShoppingCart /> Cart
          </button>
        </nav>
      </header>

     
      <section className={styles.hero}>
        <h1>Welcome back!.</h1>
        <p>Dive into today’s fresh catches and market updates.</p>
        <button className={styles.shopNowBtn} onClick={handleShopNow}>
          Shop Now
        </button>
      </section>

     
      <section className={styles.specialOffer}>
        <h2>Special Offer!</h2>
        <p>Get 10% off on bulk orders above 50kg</p>
        <button className={styles.viewDetailsBtn} onClick={handleViewDetails}>
          View Details
        </button>
      </section>

      
      <section className={styles.ourProducts}>
        <h2>Our Products</h2>
        <div className={styles.carouselContainer}>
          <button className={styles.arrowBtn} onClick={handlePrev}>
            <FaChevronLeft />
          </button>
          <div className={styles.productsGrid}>
            {displayedProducts.map((product, index) => (
              <div key={index} className={styles.productCard}>
                <div className={styles.imageWrapper}>
                  <img src={product.image} alt={product.name} className={styles.productImage} />
                </div>
                <h3>{product.name}</h3>
              </div>
            ))}
          </div>
          <button className={styles.arrowBtn} onClick={handleNext}>
            <FaChevronRight />
          </button>
        </div>
        <div className={styles.carouselDots}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            ></span>
          ))}
        </div>
        <button className={styles.moreProductsBtn} onClick={() => navigate('/buyer-products')}>
          More Products
        </button>
      </section>

      
      <footer className={styles.footer}>
        <div className={styles.footerSection}>
          <h4>About Us</h4>
          <p>Your trusted source for premium seafood, delivering fresh catches daily to your business.</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul>
            <li><button>Home</button></li>
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

export default BuyerHomePage;
