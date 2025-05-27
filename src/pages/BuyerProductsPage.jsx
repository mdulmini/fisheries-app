/*import React, { useState } from 'react';
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

export default BuyerProductsPage;*/





/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import axios from 'axios';
import styles from '../styles/BuyerProductsPage.module.css';
import logo from '../assets/logo.png';

const BuyerProductsPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', bufferStock: '' });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchAlerts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/alerts');
      setAlerts(response.data.alerts);
    } catch (err) {
      console.error('Error fetching alerts:', err);
    }
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    let updatedCartItems = [...cartItems];
    if (existingItem) {
      updatedCartItems = cartItems.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCartItems.push({ ...product, quantity: 1 });
    }
    setCartItems(updatedCartItems);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productToAdd = {
        ...newProduct,
        image: 'src/assets/default-fish.jpg',
      };
      await axios.post('http://localhost:5000/api/products', productToAdd);
      setNewProduct({ name: '', price: '', stock: '', bufferStock: '' });
      fetchProducts();
      fetchAlerts();
      alert('Product added successfully!');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    }
  };

  const handleCancelAddProduct = () => {
    setNewProduct({ name: '', price: '', stock: '', bufferStock: '' });
  };

  const calculateBuffer = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/most-sold');
      const mostSold = response.data;
      const avgDailySales = mostSold.sales / 30; // Assuming 30 days
      const safetyStock = avgDailySales * 0.1;
      const buffer = (avgDailySales * 1) + safetyStock; // Lead Time = 1 day
      alert(`Buffer Stock for ${mostSold.name}: ${buffer.toFixed(2)} kg`);
    } catch (err) {
      console.error('Error calculating buffer:', err);
      alert('Error calculating buffer stock');
    }
  };

  const handleViewCart = () => {
    navigate('/shopping-cart', { state: { cartItems } });
  };

  return (
    <div className={styles.buyerProductsPage}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Fisheries Logo" />
        </div>
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
        {alerts.length > 0 && (
          <div className={styles.alerts}>
            {alerts.map((alert, index) => (
              <p key={index}>{alert.message}</p>
            ))}
          </div>
        )}
        <button onClick={calculateBuffer} className={styles.calculateBufferBtn}>
          Calculate Buffer Stock
        </button>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product._id} className={styles.productCard}>
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
              <p className={styles.price}>LKR {product.price.toFixed(2)}/kg</p>
              <button
                className={styles.addToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct} className={styles.addProductForm}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stock (kg)"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Buffer Stock (kg)"
            value={newProduct.bufferStock}
            onChange={(e) => setNewProduct({ ...newProduct, bufferStock: e.target.value })}
            required
          />
          <div className={styles.formButtons}>
            <button type="submit">Add Product</button>
            <button type="button" onClick={handleCancelAddProduct}>Cancel</button>
          </div>
        </form>
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

export default BuyerProductsPage;*/








/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import axios from 'axios';
import styles from '../styles/BuyerProductsPage.module.css';
import logo from '../assets/logo.png';

const BuyerProductsPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', bufferStock: '' });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchAlerts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/alerts');
      setAlerts(response.data.alerts);
    } catch (err) {
      console.error('Error fetching alerts:', err);
    }
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    let updatedCartItems = [...cartItems];
    if (existingItem) {
      updatedCartItems = cartItems.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCartItems.push({ ...product, quantity: 1 });
    }
    setCartItems(updatedCartItems);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productToAdd = {
        ...newProduct,
        image: 'src/assets/default-fish.jpg',
      };
      await axios.post('http://localhost:5000/api/products', productToAdd);
      setNewProduct({ name: '', price: '', stock: '', bufferStock: '' });
      fetchProducts();
      fetchAlerts();
      alert('Product added successfully!');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    }
  };

  const handleCancelAddProduct = () => {
    setNewProduct({ name: '', price: '', stock: '', bufferStock: '' });
  };

  const calculateBuffer = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/buffer');
      const bufferStocks = response.data;
      if (bufferStocks.length === 0) {
        alert('No buffer stock data available.');
        return;
      }
      const message = bufferStocks.map(item => 
        `Buffer Stock for ${item.name}: ${item.bufferStock} kg (Avg Daily Sales: ${item.avgDailySales} kg)`
      ).join('\n');
      alert(message);
    } catch (err) {
      console.error('Detailed error:', err.response ? err.response.data : err.message);
      alert('Failed to calculate buffer stock. Check console for details.');
    }
  };

  const handleViewCart = () => {
    navigate('/shopping-cart', { state: { cartItems } });
  };

  return (
    <div className={styles.buyerProductsPage}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Fisheries Logo" />
        </div>
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
        {alerts.length > 0 && (
          <div className={styles.alerts}>
            {alerts.map((alert, index) => (
              <p key={index}>{alert.message}</p>
            ))}
          </div>
        )}
        <button onClick={calculateBuffer} className={styles.calculateBufferBtn}>
          Calculate Buffer Stock
        </button>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product._id} className={styles.productCard}>
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
              <p className={styles.price}>LKR {product.price.toFixed(2)}/kg</p>
              <button
                className={styles.addToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct} className={styles.addProductForm}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stock (kg)"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Buffer Stock (kg)"
            value={newProduct.bufferStock}
            onChange={(e) => setNewProduct({ ...newProduct, bufferStock: e.target.value })}
            required
          />
          <div className={styles.formButtons}>
            <button type="submit">Add Product</button>
            <button type="button" onClick={handleCancelAddProduct}>Cancel</button>
          </div>
        </form>
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

export default BuyerProductsPage;*/






/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import axios from 'axios';
import styles from '../styles/BuyerProductsPage.module.css';
import logo from '../assets/logo.png';

const BuyerProductsPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', bufferStock: '' });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchAlerts();
    // Poll for alerts every 5 minutes to catch stock changes
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/alerts');
      setAlerts(response.data.alerts);
      // If there are alerts, it means buffer stock was recalculated in the backend
    } catch (err) {
      console.error('Error fetching alerts:', err);
    }
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    let updatedCartItems = [...cartItems];
    if (existingItem) {
      updatedCartItems = cartItems.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCartItems.push({ ...product, quantity: 1 });
    }
    setCartItems(updatedCartItems);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productToAdd = {
        ...newProduct,
        image: '/src/assets/Cod.jpg', // Current image path
        
      };
      await axios.post('http://localhost:5000/api/products', productToAdd);
      setNewProduct({ name: '', price: '', stock: '', bufferStock: '' });
      fetchProducts();
      fetchAlerts();
      alert('Product added successfully! Buffer stock calculated.');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    }
  };

  const handleCancelAddProduct = () => {
    setNewProduct({ name: '', price: '', stock: '', bufferStock: '' });
  };

  const calculateBuffer = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/buffer');
      const bufferStocks = response.data;
      if (bufferStocks.length === 0) {
        alert('No buffer stock data available.');
        return;
      }
      const message = bufferStocks.map(item => 
        `Buffer Stock for ${item.name}: ${item.bufferStock} kg (Avg Daily sales: ${item.avgDailySales} kg)`
      ).join('\n');
      alert(message);
      fetchProducts(); // Refresh products to show updated buffer stock
    }
    catch (err) {
      alert('Failed to calculate buffer stock.Check console for details.');
    }
  
  };

  const handleViewCart = () => {
    navigate('/shopping-cart', { state: { cartItems } });
  };

  return (
    <div className={styles.buyerProductsPage}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Fisheries Logo" />
        </div>
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
        {alerts.length > 0 && (
          <div className={styles.alerts}>
            {alerts.map((alert, index) => (
              <p key={index}>{alert.message}</p>
            ))}
          </div>
        )}
        <button onClick={calculateBuffer} className={styles.calculateBufferBtn}>
          Calculate Buffer Stock
        </button>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product._id} className={styles.productCard}>
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
              <p className={styles.price}>LKR {product.price.toFixed(2)}/kg</p>
              <button
                className={styles.addToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct} className={styles.addProductForm}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stock (kg)"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Buffer Stock (kg)"
            value={newProduct.bufferStock}
            onChange={(e) => setNewProduct({ ...newProduct, bufferStock: e.target.value })}
            required
          />
          <div className={styles.formButtons}>
            <button type="submit">Add Product</button>
            <button type="button" onClick={handleCancelAddProduct}>Cancel</button>
          </div>
        </form>
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

export default BuyerProductsPage;*/









/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import axios from 'axios';
import styles from '../styles/BuyerProductsPage.module.css';
import logo from '../assets/logo.png';

const BuyerProductsPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', bufferStock: '' });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchAlerts();
    // Poll for alerts every 5 minutes to catch stock changes
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/alerts');
      setAlerts(response.data.alerts);
      // If there are alerts, it means buffer stock was recalculated in the backend
    } catch (err) {
      console.error('Error fetching alerts:', err);
    }
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    let updatedCartItems = [...cartItems];
    if (existingItem) {
      updatedCartItems = cartItems.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCartItems.push({ ...product, quantity: 1 });
    }
    setCartItems(updatedCartItems);
  };

  // Function to map product name to corresponding image path
  const getProductImagePath = (name) => {
    const productImageMap = {
      'tuna': '/src/assets/Premium Tuna.jpg',
      'prawns': '/src/assets/King Prawns.jpg',
      'catfish': '/src/assets/Catfish.jpg', // Assuming you have a Catfish.jpg
      'salmon': '/src/assets/Fresh Salmon.jpg',
      'cod': '/src/assets/Cod.jpg', 
      'Fresh Salmon': '/src/assets/Fresh Salmon.jpg',
      'Tiger Prawns': '/src/assets/Tiger Prawns.jpg',
      'Mackerel': '/src/assets/Mackerel.jpg',
      'Herring': '/src/assets/Herring.jpg',
      'Tilapia': '/src/assets/Tilapia.jpg',
      'Haddock': '/src/assets/Haddock.jpg',
      'Crab': '/src/assets/Crab.jpg',
      'Sardine': '/src/assets/Sardine.jpg',
      'Halibut': '/src/assets/Halibut.jpg',
    };
    return productImageMap[name.toLowerCase()] || '/src/assets/Cod.jpg'; // Default to Cod image if no match
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productToAdd = {
        ...newProduct,
        image: getProductImagePath(newProduct.name.toLowerCase()), // Dynamically assign image path based on name
      };
      await axios.post('http://localhost:5000/api/products', productToAdd);
      setNewProduct({ name: '', price: '', stock: '', bufferStock: '' });
      fetchProducts();
      fetchAlerts();
      alert('Product added successfully! Buffer stock calculated.');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    }
  };

  const handleCancelAddProduct = () => {
    setNewProduct({ name: '', price: '', stock: '', bufferStock: '' });
  };

  const calculateBuffer = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/buffer');
      const bufferStocks = response.data;
      if (bufferStocks.length === 0) {
        alert('No buffer stock data available.');
        return;
      }
      const message = bufferStocks.map(item => 
        `Buffer Stock for ${item.name}: ${item.bufferStock} kg (Avg Daily sales: ${item.avgDailySales} kg)`
      ).join('\n');
      alert(message);
      fetchProducts(); // Refresh products to show updated buffer stock
    } catch (err) {
      alert('Failed to calculate buffer stock. Check console for details.');
    }
  };

  const handleViewCart = () => {
    navigate('/shopping-cart', { state: { cartItems } });
  };

  return (
    <div className={styles.buyerProductsPage}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Fisheries Logo" />
        </div>
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
        {alerts.length > 0 && (
          <div className={styles.alerts}>
            {alerts.map((alert, index) => (
              <p key={index}>{alert.message}</p>
            ))}
          </div>
        )}
        <button onClick={calculateBuffer} className={styles.calculateBufferBtn}>
          Calculate Buffer Stock
        </button>
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.productImage} 
                  onError={(e) => { e.target.src = '/src/assets/Cod.jpg'; }} // Fallback to Cod image
                />
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
              <p className={styles.price}>LKR {product.price.toFixed(2)}/kg</p>
              <button
                className={styles.addToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct} className={styles.addProductForm}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stock (kg)"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Buffer Stock (kg)"
            value={newProduct.bufferStock}
            onChange={(e) => setNewProduct({ ...newProduct, bufferStock: e.target.value })}
            required
          />
          <div className={styles.formButtons}>
            <button type="submit">Add Product</button>
            <button type="button" onClick={handleCancelAddProduct}>Cancel</button>
          </div>
        </form>
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

export default BuyerProductsPage;*/



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import axios from 'axios';
import styles from '../styles/BuyerProductsPage.module.css';
import logo from '../assets/logo.png';

const BuyerProductsPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', bufferStock: '' });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchAlerts();
    // Poll for alerts every 5 minutes to catch stock changes
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/alerts');
      setAlerts(response.data.alerts);
      // If there are alerts, it means buffer stock was recalculated in the backend
    } catch (err) {
      console.error('Error fetching alerts:', err);
    }
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    let updatedCartItems = [...cartItems];
    if (existingItem) {
      updatedCartItems = cartItems.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCartItems.push({ ...product, quantity: 1 });
    }
    setCartItems(updatedCartItems);
  };

  // Function to map product name to corresponding image path
  const getProductImagePath = (name) => {
    const productImageMap = {
      'tuna': '/src/assets/Premium Tuna.jpg',
      'prawns': '/src/assets/King Prawns.jpg',
      'catfish': '/src/assets/Catfish.jpg',
      'salmon': '/src/assets/Fresh Salmon.jpg',
      'cod': '/src/assets/Cod.jpg',
      'fresh salmon': '/src/assets/Fresh Salmon.jpg',
      'tiger prawns': '/src/assets/Tiger Prawns.jpg',
      'mackerel': '/src/assets/Mackerel.jpg',
      'herring': '/src/assets/Herring.jpg',
      'tilapia': '/src/assets/Tilapia.jpg',
      'haddock': '/src/assets/Haddock.jpg',
      'crab': '/src/assets/Crab.jpg',
      'sardine': '/src/assets/Sardine.jpg',
      'halibut': '/src/assets/Halibut.jpg',
    };
    return productImageMap[name.toLowerCase()] || '/src/assets/Cod.jpg'; // Default to Cod image if no match
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const productToAdd = {
        ...newProduct,
        image: getProductImagePath(newProduct.name.toLowerCase()), // Dynamically assign image path based on name
      };
      await axios.post('http://localhost:5000/api/products', productToAdd);
      setNewProduct({ name: '', price: '', stock: '', bufferStock: '' });
      fetchProducts();
      fetchAlerts();
      alert('Product added successfully! Buffer stock calculated.');
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product');
    }
  };

  const handleCancelAddProduct = () => {
    setNewProduct({ name: '', price: '', stock: '', bufferStock: '' });
  };

  const calculateBuffer = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/buffer');
      const bufferStocks = response.data;
      if (bufferStocks.length === 0) {
        alert('No buffer stock data available.');
        return;
      }
      const message = bufferStocks.map(item => 
        `Buffer Stock for ${item.name}: ${item.bufferStock} kg (Avg Daily sales: ${item.avgDailySales} kg)`
      ).join('\n');
      alert(message);
      fetchProducts(); // Refresh products to show updated buffer stock
    } catch (err) {
      alert('Failed to calculate buffer stock. Check console for details.');
    }
  };

  const handleViewCart = () => {
    navigate('/shopping-cart', { state: { cartItems } });
  };

  return (
    <div className={styles.buyerProductsPage}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Fisheries Logo" />
        </div>
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
        {alerts.length > 0 && (
          <div className={styles.alerts}>
            {alerts.map((alert, index) => (
              <p key={index}>{alert.message}</p>
            ))}
          </div>
        )}
     
     
        
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.productImage} 
                  onError={(e) => { e.target.src = '/src/assets/Cod.jpg'; }} // Fallback to Cod image
                />
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
              <p className={styles.price}>LKR {product.price.toFixed(2)}/kg</p>
              <button
                className={styles.addToCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct} className={styles.addProductForm}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Stock (kg)"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Buffer Stock (kg)"
            value={newProduct.bufferStock}
            onChange={(e) => setNewProduct({ ...newProduct, bufferStock: e.target.value })}
            required
          />
          <div className={styles.formButtons}>
            <button type="submit">Add Product</button>
            <button type="button" onClick={handleCancelAddProduct}>Cancel</button>
          </div>
        </form>
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
