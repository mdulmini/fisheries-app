import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/CheckoutPage.module.css';
import logo from '../assets/logo.png';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [], quantities = {}, total = 0 } = location.state || {};

  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [showOrderSuccessPopup, setShowOrderSuccessPopup] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const [creditCardDetails, setCreditCardDetails] = useState({
    cardNumber: '',
    expires: '',
    csc: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: 'Sri Lanka',
    postalCode: '',
    mobile: '',
    shipToBilling: false,
    confirmLegalAge: false,
  });

  const countries = [
    { name: 'Afghanistan', flag: '🇦🇫' },
    { name: 'Albania', flag: '🇦🇱' },
    { name: 'Algeria', flag: '🇩🇿' },
    { name: 'Andorra', flag: '🇦🇩' },
    { name: 'Angola', flag: '🇦🇴' },
    { name: 'Argentina', flag: '🇦🇷' },
    { name: 'Armenia', flag: '🇦🇲' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Austria', flag: '🇦🇹' },
    { name: 'Azerbaijan', flag: '🇦🇿' },
    { name: 'Bahamas', flag: '🇧🇸' },
    { name: 'Bahrain', flag: '🇧🇭' },
    { name: 'Bangladesh', flag: '🇧🇩' },
    { name: 'Barbados', flag: '🇧🇧' },
    { name: 'Belarus', flag: '🇧🇾' },
    { name: 'Belgium', flag: '🇧🇪' },
    { name: 'Belize', flag: '🇧🇿' },
    { name: 'Benin', flag: '🇧🇯' },
    { name: 'Bhutan', flag: '🇧🇹' },
    { name: 'Bolivia', flag: '🇧🇴' },
    { name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
    { name: 'Botswana', flag: '🇧🇼' },
    { name: 'Brazil', flag: '🇧🇷' },
    { name: 'Brunei', flag: '🇧🇳' },
    { name: 'Bulgaria', flag: '🇧🇬' },
    { name: 'Burkina Faso', flag: '🇧🇫' },
    { name: 'Burundi', flag: '🇧🇮' },
    { name: 'Cambodia', flag: '🇰🇭' },
    { name: 'Cameroon', flag: '🇨🇴' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Cape Verde', flag: '🇨🇻' },
    { name: 'Central African Republic', flag: '🇨🇫' },
    { name: 'Chad', flag: '🇹🇩' },
    { name: 'Chile', flag: '🇨🇱' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'Colombia', flag: '🇨🇴' },
    { name: 'Comoros', flag: '🇰🇴' },
    { name: 'Congo (Congo-Brazzaville)', flag: '🇨🇬' },
    { name: 'Costa Rica', flag: '🇨🇷' },
    { name: 'Croatia', flag: '🇭🇷' },
    { name: 'Cuba', flag: '🇨🇺' },
    { name: 'Cyprus', flag: '🇨🇾' },
    { name: 'Czech Republic', flag: '🇨🇿' },
    { name: 'Denmark', flag: '🇩🇰' },
    { name: 'Djibouti', flag: '🇩🇯' },
    { name: 'Dominica', flag: '🇩🇴' },
    { name: 'Dominican Republic', flag: '🇩🇴' },
    { name: 'Ecuador', flag: '🇪🇨' },
    { name: 'Egypt', flag: '🇪🇬' },
    { name: 'El Salvador', flag: '🇸🇻' },
    { name: 'Equatorial Guinea', flag: '🇬🇶' },
    { name: 'Eritrea', flag: '🇪🇷' },
    { name: 'Estonia', flag: '🇪🇪' },
    { name: 'Eswatini', flag: '🇸🇿' },
    { name: 'Ethiopia', flag: '🇪🇹' },
    { name: 'Fiji', flag: '🇫🇯' },
    { name: 'Finland', flag: '🇫🇮' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Gabon', flag: '🇬🇦' },
    { name: 'Gambia', flag: '🇬🇴' },
    { name: 'Georgia', flag: '🇬🇪' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: "Ghana", flag: "🇬🇭" },
    { name: "Greece", flag: "🇬🇷" },
    { name: "Grenada", flag: "🇬🇩" },
    { name: "Guatemala", flag: "🇬🇹" },
    { name: "Guinea", flag: "🇬🇳" },
    { name: "Guinea-Bissau", flag: "🇬🇼" },
    { name: "Guyana", flag: "🇬🇾" },
    { name: "Haiti", flag: "🇭🇹" },
    { name: "Honduras", flag: "🇭🇳" },
    { name: "Hungary", flag: "🇭🇺" },
    { name: "Iceland", flag: "🇮🇸" },
    { name: "India", flag: "🇮🇳" },
    { name: "Indonesia", flag: "🇮🇩" },
    { name: "Iran", flag: "🇮🇷" },
    { name: "Iraq", flag: "🇮🇶" },
    { name: "Ireland", flag: "🇮🇪" },
    { name: "Israel", flag: "🇮🇱" },
    { name: "Italy", flag: "🇮🇹" },
    { name: "Jamaica", flag: "🇯🇲" },
    { name: "Japan", flag: "🇯🇵" },
    { name: "Jordan", flag: "🇯🇴" },
    { name: "Kazakhstan", flag: "🇰🇿" },
    { name: "Kenya", flag: "🇰🇪" },
    { name: "Kiribati", flag: "🇰🇮" },
    { name: "Kuwait", flag: "🇰🇼" },
    { name: "Kyrgyzstan", flag: "🇰🇬" },
    { name: "Laos", flag: "🇱🇦" },
    { name: "Latvia", flag: "🇱🇻" },
    { name: "Lebanon", flag: "🇱🇧" },
    { name: "Lesotho", flag: "🇱🇸" },
    { name: "Liberia", flag: "🇱🇷" },
    { name: "Libya", flag: "🇱🇾" },
    { name: "Liechtenstein", flag: "🇱🇮" },
    { name: "Lithuania", flag: "🇱🇹" },
    { name: "Luxembourg", flag: "🇱🇺" },
    { name: "Madagascar", flag: "🇲🇬" },
    { name: "Malawi", flag: "🇲🇼" },
    { name: "Malaysia", flag: "🇲🇾" },
    { name: "Maldives", flag: "🇲🇻" },
    { name: "Mali", flag: "🇲🇱" },
    { name: "Malta", flag: "🇲🇹" },
    { name: "Marshall Islands", flag: "🇲🇭" },
    { name: "Mauritania", flag: "🇲🇷" },
    { name: "Mauritius", flag: "🇲🇺" },
    { name: "Mexico", flag: "🇲🇽" },
    { name: "Micronesia", flag: "🇫🇲" },
    { name: "Moldova", flag: "🇲🇩" },
    { name: "Monaco", flag: "🇲🇨" },
    { name: "Mongolia", flag: "🇲🇳" },
    { name: "Montenegro", flag: "🇲🇪" },
    { name: "Morocco", flag: "🇲🇦" },
    { name: "Mozambique", flag: "🇲🇿" },
    { name: "Myanmar", flag: "🇲🇲" },
    { name: "Namibia", flag: "🇳🇦" },
    { name: "Nauru", flag: "🇳🇷" },
    { name: "Nepal", flag: "🇳🇵" },
    { name: "Netherlands", flag: "🇳🇱" },
    { name: "New Zealand", flag: "🇳🇿" },
    { name: "Nicaragua", flag: "🇳🇮" },
    { name: "Niger", flag: "🇳🇪" },
    { name: "Nigeria", flag: "🇳🇬" },
    { name: "North Korea", flag: "🇰🇵" },
    { name: "North Macedonia", flag: "🇲🇰" },
    { name: "Norway", flag: "🇳🇴" },
    { name: "Oman", flag: "🇴🇲" },
    { name: "Pakistan", flag: "🇵🇰" },
    { name: "Palau", flag: "🇵🇼" },
    { name: "Palestine", flag: "🇵🇸" },
    { name: "Panama", flag: "🇵🇦" },
    { name: "Papua New Guinea", flag: "🇵🇬" },
    { name: "Paraguay", flag: "🇵🇾" },
    { name: "Peru", flag: "🇵🇪" },
    { name: "Philippines", flag: "🇵🇭" },
    { name: "Poland", flag: "🇵🇱" },
    { name: "Portugal", flag: "🇵🇹" },
    { name: "Qatar", flag: "🇶🇦" },
    { name: "Romania", flag: "🇷🇴" },
    { name: "Russia", flag: "🇷🇺" },
    { name: "Rwanda", flag: "🇷🇼" },
    { name: "Saint Kitts and Nevis", flag: "🇰🇳" },
    { name: "Saint Lucia", flag: "🇱🇨" },
    { name: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
    { name: "Samoa", flag: "🇼🇸" },
    { name: "San Marino", flag: "🇸🇲" },
    { name: "Sao Tome and Principe", flag: "🇸🇹" },
    { name: "Saudi Arabia", flag: "🇸🇦" },
    { name: "Senegal", flag: "🇸🇳" },
    { name: "Serbia", flag: "🇷🇸" },
    { name: "Seychelles", flag: "🇸🇨" },
    { name: "Sierra Leone", flag: "🇸🇱" },
    { name: "Singapore", flag: "🇸🇬" },
    { name: "Slovakia", flag: "🇸🇰" },
    { name: "Slovenia", flag: "🇸🇮" },
    { name: "Solomon Islands", flag: "🇸🇧" },
    { name: "Somalia", flag: "🇸🇴" },
    { name: "South Africa", flag: "🇿🇦" },
    { name: "South Korea", flag: "🇰🇷" },
    { name: "South Sudan", flag: "🇸🇸" },
    { name: "Spain", flag: "🇪🇸" },
    { name: "Sri Lanka", flag: "🇱🇰" },
    { name: "Sudan", flag: "🇸🇩" },
    { name: "Suriname", flag: "🇸🇷" },
    { name: "Sweden", flag: "🇸🇪" },
    { name: "Switzerland", flag: "🇨🇭" },
    { name: "Syria", flag: "🇸🇾" },
    { name: "Taiwan", flag: "🇹🇼" },
    { name: "Tajikistan", flag: "🇹🇯" },
    { name: "Tanzania", flag: "🇹🇿" },
    { name: "Thailand", flag: "🇹🇭" },
    { name: "Timor-Leste", flag: "🇹🇱" },
    { name: "Togo", flag: "🇹🇬" },
    { name: "Tonga", flag: "🇹🇴" },
    { name: "Trinidad and Tobago", flag: "🇹🇹" },
    { name: "Tunisia", flag: "🇹🇳" },
    { name: "Turkey", flag: "🇹🇷" },
    { name: "Turkmenistan", flag: "🇹🇲" },
    { name: "Tuvalu", flag: "🇹🇻" },
    { name: "Uganda", flag: "🇺🇬" },
    { name: "Ukraine", flag: "🇺🇦" },
    { name: "United Arab Emirates", flag: "🇦🇪" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "United States", flag: "🇺🇸" },
    { name: "Uruguay", flag: "🇺🇾" },
    { name: "Uzbekistan", flag: "🇺🇿" },
    { name: "Vanuatu", flag: "🇻🇺" },
    { name: "Vatican City", flag: "🇻🇦" },
    { name: "Venezuela", flag: "🇻🇪" },
    { name: "Vietnam", flag: "🇻🇳" },
    { name: "Yemen", flag: "🇾🇪" },
    { name: "Zambia", flag: "🇿🇲" },
    { name: "Zimbabwe", flag: "🇿🇼" },
  ];

  const handleCardPayment = () => {
    setShowCreditCardForm(!showCreditCardForm);
  };

  const handleCreditCardInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCreditCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreditCardSubmit = (e) => {
    e.preventDefault();
    if (!creditCardDetails.confirmLegalAge) {
      alert('Please confirm that you are of legal age and agree to the PayPal Privacy Statement.');
      return;
    }

    const order = {
      id: Date.now(),
      items: cartItems.map(item => ({
        name: item.name,
        quantity: quantities[item.id],
        price: `LKR ${(parseFloat(item.price) * quantities[item.id]).toFixed(2)}`,
      })),
      total: `LKR ${total.toFixed(2)}`,
      orderDate: new Date().toLocaleString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem('customerOrders')) || [];
    existingOrders.push(order);
    localStorage.setItem('customerOrders', JSON.stringify(existingOrders));

    setShowOrderSuccessPopup(true);
  };

  const handlePopupClose = () => {
    setShowOrderSuccessPopup(false);
    setShowSuccessNotification(true);
  };

  useEffect(() => {
    if (showSuccessNotification) {
      const timer = setTimeout(() => {
        setShowSuccessNotification(false);
        navigate('/buyer-orders', { state: { cartItems } });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessNotification, navigate, cartItems]);

  return (
    <div className={styles.checkoutPage}>
      {showSuccessNotification && (
        <div className={styles.successNotification}>
          <span className={styles.successIcon}>✔</span>
          <span>Order saved successfully!</span>
        </div>
      )}

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
            <button className={styles.cartBtn} disabled>
              <FaShoppingCart /> Cart
            </button>
            {cartItems.length > 0 && (
              <span className={styles.cartCount}>{cartItems.length}</span>
            )}
          </div>
        </nav>
      </header>

      <section className={styles.checkoutSection}>
        <h2>Checkout Page</h2>
        <div className={styles.checkoutContainer}>
          <div className={styles.paymentSection}>
            <h3>
              <span className={styles.icon}>🛒</span> Pay with PayPal
            </h3>
            <span className={styles.paypalLabel}>PayPal</span>
            <button className={styles.cardBtn} onClick={handleCardPayment}>
              Debit or Credit Card
            </button>
            {showCreditCardForm && (
              <form className={styles.creditCardForm} onSubmit={handleCreditCardSubmit}>
                <div className={styles.creditCardFormGroup}>
                  <label>Card number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={creditCardDetails.cardNumber}
                    onChange={handleCreditCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className={styles.creditCardFormRow}>
                  <div className={styles.creditCardFormGroup}>
                    <label>Expires</label>
                    <input
                      type="text"
                      name="expires"
                      value={creditCardDetails.expires}
                      onChange={handleCreditCardInputChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className={styles.creditCardFormGroup}>
                    <label>CSC</label>
                    <input
                      type="text"
                      name="csc"
                      value={creditCardDetails.csc}
                      onChange={handleCreditCardInputChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                <h3>Billing Address</h3>
                <div className={styles.creditCardFormRow}>
                  <div className={styles.creditCardFormGroup}>
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={creditCardDetails.firstName}
                      onChange={handleCreditCardInputChange}
                      required
                    />
                  </div>
                  <div className={styles.creditCardFormGroup}>
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={creditCardDetails.lastName}
                      onChange={handleCreditCardInputChange}
                      required
                    />
                  </div>
                </div>
                <div className={styles.creditCardFormGroup}>
                  <label>Address Line 1</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={creditCardDetails.addressLine1}
                    onChange={handleCreditCardInputChange}
                    required
                  />
                </div>
                <div className={styles.creditCardFormGroup}>
                  <label>Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={creditCardDetails.addressLine2}
                    onChange={handleCreditCardInputChange}
                  />
                </div>
                <div className={styles.creditCardFormGroup}>
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={creditCardDetails.city}
                    onChange={handleCreditCardInputChange}
                    required
                  />
                </div>
                <div className={styles.creditCardFormRow}>
                  <div className={styles.creditCardFormGroup}>
                    <label>Country</label>
                    <select
                      name="country"
                      value={creditCardDetails.country}
                      onChange={handleCreditCardInputChange}
                      required
                    >
                      {countries.map((country) => (
                        <option key={country.name} value={country.name}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.creditCardFormGroup}>
                    <label>Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={creditCardDetails.postalCode}
                      onChange={handleCreditCardInputChange}
                      required
                    />
                  </div>
                </div>
                <div className={styles.creditCardFormGroup}>
                  <label>Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={creditCardDetails.mobile}
                    onChange={handleCreditCardInputChange}
                    required
                  />
                </div>
                <div className={styles.creditCardFormCheckbox}>
                  <input
                    type="checkbox"
                    name="shipToBilling"
                    checked={creditCardDetails.shipToBilling}
                    onChange={handleCreditCardInputChange}
                  />
                  <label>Ship to billing address</label>
                </div>
                <div className={styles.creditCardFormCheckbox}>
                  <input
                    type="checkbox"
                    name="confirmLegalAge"
                    checked={creditCardDetails.confirmLegalAge}
                    onChange={handleCreditCardInputChange}
                    required
                  />
                  <label>
                    I confirm that I am of the legal age and agree to the PayPal Privacy Statement
                  </label>
                </div>
                <button type="submit" className={styles.creditCardSubmitBtn}>
                  Pay LKR {total.toFixed(2)}
                </button>
                <p className={styles.poweredBy}>Powered by PayPal</p>
              </form>
            )}
          </div>

          <div className={styles.addressAndItems}>
            <div className={styles.addressSection}>
              <h3>Shipping Address</h3>
              <p><span className={styles.icon}>📍</span> Address: test addresses for user test</p>
              <p><span className={styles.icon}>🏛️</span> Province: Colombo</p>
              <p><span className={styles.icon}>📮</span> ZIP Code: 10001350</p>
              <p><span className={styles.icon}>📞</span> Mobile Number: 0771234567</p>
            </div>

            <div className={styles.itemsSection}>
              <h3>Cart Items</h3>
              {cartItems.length === 0 ? (
                <p>No items in cart.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <span>{item.name}</span>
                    <span className={styles.quantity}>Quantity: {quantities[item.id]}</span>
                    <span>LKR {(parseFloat(item.price) * quantities[item.id]).toFixed(2)}</span>
                  </div>
                ))
              )}
              <div className={styles.total}>
                <h4>Total: LKR {total.toFixed(2)}</h4>
              </div>
            </div>
          </div>
        </div>

        {showOrderSuccessPopup && (
          <div className={styles.orderSuccessPopup}>
            <div className={styles.orderSuccessContent}>
              <h2>Order Successful!</h2>
              <p>Your payment was successful, and the order has been saved.</p>
              <button className={styles.orderSuccessOkBtn} onClick={handlePopupClose}>
                OK
              </button>
            </div>
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

export default CheckoutPage;