import React, { useState } from 'react';
import '../styles/Footer.css';
import logo from '../assets/logo.png';

const Footer = () => {
  const [activeLink, setActiveLink] = useState(''); 

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setActiveLink(targetId); 
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    if (targetId === 'testimonials') {
      setTimeout(() => {
        const statsElement = document.getElementById('stats');
        if (statsElement) {
          statsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="logo"><img src={logo} alt="Fisheries Logo" /></div>
          <p>Empowering Sri Lankan fishing communities with technology.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
          <li>
              <a
                href="#hero"
                className={activeLink === 'hero' ? 'active' : ''}
                onClick={(e) => handleScroll(e, 'hero')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#features"
                className={activeLink === 'features' ? 'active' : ''}
                onClick={(e) => handleScroll(e, 'features')}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className={activeLink === 'testimonials' ? 'active' : ''}
                onClick={(e) => handleScroll(e, 'testimonials')}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={activeLink === 'contact' ? 'active' : ''}
                onClick={(e) => handleScroll(e, 'contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@example.com</p>
          <p>Phone: +94 123 456 789</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <img src="src/assets/facebook.png" alt="Facebook" />
            <img src="src/assets/twitter.png" alt="Twitter" />
            <img src="src/assets/instagram.png" alt="Instagram" />
            <img src="src/assets/linkedin.png" alt="Linkedin" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Fisheries Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;



