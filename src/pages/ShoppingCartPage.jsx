/*import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/ShoppingCartPage.module.css';
import logo from '../assets/logo.png';

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [] } = location.state || { cartItems: [] };

  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {})
  );

  const handleIncreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const handleDecreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = quantities[item.id] || 1;
    return sum + price * quantity;
  }, 0);

  const shipping = 0;
  const total = subtotal + shipping;

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    navigate('/shopping-cart', { state: { cartItems: updatedCart } });
  };

  const handleClearCart = () => {
    navigate('/shopping-cart', { state: { cartItems: [] } });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout', { state: { cartItems, quantities, total } }); // Navigate to checkout page
  };

  return (
    <div className={styles.shoppingCartPage}>
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
            <button className={styles.cartBtn}>
              <FaShoppingCart /> Cart
            </button>
            {cartItems.length > 0 && (
              <span className={styles.cartCount}>{cartItems.length}</span>
            )}
          </div>
        </nav>
      </header>

      <section className={styles.cartSection}>
        <h2>Shopping Cart</h2>
        <div className={styles.cartContainer}>
          <div className={styles.cartItems}>
            <div className={styles.cartHeader}>
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Shipping Cost</span>
              <span>Total</span>
            </div>
            {cartItems.length === 0 ? (
              <p className={styles.emptyCart}>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.productInfo}>
                    <img src={item.image} alt={item.name} className={styles.productImage} />
                    <span>{item.name}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <span>LKR {parseFloat(item.price).toFixed(2)}</span>
                  <div className={styles.quantity}>
                    <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                    <span>{quantities[item.id]}</span>
                    <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                  </div>
                  <span>Free Shipping</span>
                  <span>
                    LKR {(parseFloat(item.price) * quantities[item.id]).toFixed(2)}
                  </span>
                </div>
              ))
            )}
            {cartItems.length > 0 && (
              <button className={styles.clearCartBtn} onClick={handleClearCart}>
                Clear Cart
              </button>
            )}
          </div>

          <div className={styles.orderSummary}>
            <h3>Order Summary</h3>
            <p>Subtotal: <span>LKR {subtotal.toFixed(2)}</span></p>
            <p>Shipping: <span>LKR {shipping.toFixed(2)}</span></p>
            <p className={styles.total}>Total: <span>LKR {total.toFixed(2)}</span></p>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Checkout
            </button>
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

export default ShoppingCartPage;*/






/*import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/ShoppingCartPage.module.css';
import logo from '../assets/logo.png';

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [] } = location.state || { cartItems: [] };
  const [error, setError] = useState('');

  const subtotal = cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item._id !== id);
    navigate('/shopping-cart', { state: { cartItems: updatedCartItems } });
  };

  const handleClearCart = () => {
    navigate('/shopping-cart', { state: { cartItems: [] } });
  };

  const handleBuy = async () => {
    try {
      for (const item of cartItems) {
        await axios.post('http://localhost:5000/api/products/buy', {
          productId: item._id, // Use _id from MongoDB
          quantity: item.quantity
        });
      }
      navigate('/shopping-cart', { state: { cartItems: [] } }); // Clear cart after purchase
      setError('');
      alert('Purchase successful!');
    } catch (err) {
      setError(err.response?.data || 'Error during purchase');
    }
  };

  return (
    <div className={styles.shoppingCartPage}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Fisheries Logo" />
        </div>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <button onClick={() => navigate('/buyer-home')}>Home</button>
            <button onClick={() => navigate('/buyer-products')}>Products</button>
            <button onClick={() => navigate('/buyer-orders')}>Orders</button>
            <button onClick={() => navigate('/buyer-profile')}>Profile</button>
          </div>
        </nav>
      </header>

      <section className={styles.cartSection}>
        <h2>Shopping Cart</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.cartContainer}>
          <div className={styles.cartItems}>
            <div className={styles.cartHeader}>
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Shipping Cost</span>
              <span>Total</span>
            </div>
            {cartItems.length === 0 ? (
              <p className={styles.emptyCart}>Your cart is empty!</p>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className={styles.cartItem}>
                  <div className={styles.productInfo}>
                    <img src={item.image} alt={item.name} className={styles.productImage} />
                    <span>{item.name}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                  <span>LKR {parseFloat(item.price).toFixed(2)}</span>
                  <span>{item.quantity}</span>
                  <span>Free Shipping</span>
                  <span>LKR {(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))
            )}
            {cartItems.length > 0 && (
              <button className={styles.clearCartBtn} onClick={handleClearCart}>
                Clear Cart
              </button>
            )}
          </div>

          <div className={styles.orderSummary}>
            <h3>Order Summary</h3>
            <p>Subtotal: <span>LKR {subtotal.toFixed(2)}</span></p>
            <p>Shipping: <span>LKR {shipping.toFixed(2)}</span></p>
            <p className={styles.total}>Total: <span>LKR {total.toFixed(2)}</span></p>
            <button className={styles.checkoutBtn} onClick={handleBuy}>
              Buy Now
            </button>
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

export default ShoppingCartPage;*/





import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/ShoppingCartPage.module.css';
import logo from '../assets/logo.png';

const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [] } = location.state || { cartItems: [] };

  // Initialize quantities state using _id from cartItems
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item._id] = item.quantity || 1; // Use _id instead of id
      return acc;
    }, {})
  );

  const handleIncreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1, // Increment quantity for the specific product only
    }));
  };

  const handleDecreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1, // Decrement quantity for the specific product only, ensure it doesn't go below 1
    }));
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = quantities[item._id] || 1; // Use _id to get the correct quantity
    return sum + price * quantity;
  }, 0);

   /*const shipping = 0;
   const total = subtotal + shipping;*/

   const calculateShippingCost = (items) => {
    
    const totalItems = items.reduce((sum, item) => sum + (quantities[item._id] || 1), 0);
    return totalItems > 0 ? totalItems * 500 : 0; 
  };
  
  const shipping = calculateShippingCost(cartItems);
  const total = subtotal + shipping;
   
  

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id); // Use _id to filter
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[id]; // Remove the quantity entry for the removed item
      return newQuantities;
    });
    navigate('/shopping-cart', { state: { cartItems: updatedCart } });
  };

  const handleClearCart = () => {
    setQuantities({}); // Clear quantities state
    navigate('/shopping-cart', { state: { cartItems: [] } });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout', { state: { cartItems, quantities, total } });
  };
  
  return (
    <div className={styles.shoppingCartPage}>
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
            <button className={styles.cartBtn}>
              <FaShoppingCart /> Cart
            </button>
            {cartItems.length > 0 && (
              <span className={styles.cartCount}>{cartItems.length}</span>
            )}
          </div>
        </nav>
      </header>

      <section className={styles.cartSection}>
        <h2>Shopping Cart</h2>
        <div className={styles.cartContainer}>
          <div className={styles.cartItems}>
            <div className={styles.cartHeader}>
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Shipping Cost</span>
              <span>Total</span>
            </div>
            {cartItems.length === 0 ? (
              <p className={styles.emptyCart}>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className={styles.cartItem}>
                  <div className={styles.productInfo}>
                    <img src={item.image} alt={item.name} className={styles.productImage} />
                    <span>{item.name}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemoveItem(item._id)} // Use _id
                    >
                      Remove
                    </button>
                  </div>
                  <span>LKR {parseFloat(item.price).toFixed(2)}</span>
                  <div className={styles.quantity}>
                    <button onClick={() => handleDecreaseQuantity(item._id)}>-</button> 
                    <span>{quantities[item._id] || 1}</span>
                    <button onClick={() => handleIncreaseQuantity(item._id)}>+</button> 
                  </div>
                  <span>Free Shipping</span>
                  <span>
                    LKR {(parseFloat(item.price) * (quantities[item._id] || 1)).toFixed(2)}
                  </span>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <button className={styles.clearCartBtn} onClick={handleClearCart}>
                Clear Cart
              </button>
            )}
          </div>

          <div className={styles.orderSummary}>
            <h3>Order Summary</h3>
            <p>Subtotal: <span>LKR {subtotal.toFixed(2)}</span></p>
            <p>Shipping: <span>LKR {shipping.toFixed(2)}</span></p>
            <p className={styles.total}>Total: <span>LKR {total.toFixed(2)}</span></p>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Checkout
            </button>
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

export default ShoppingCartPage;


