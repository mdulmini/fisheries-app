import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleNavClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 70; 
      const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = sectionPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo">
        <img src={logo} alt="Fisheries Logo" />
      </div>
      <nav className="nav-links">
        {isHomePage ? (
          <>
            <a href="#hero" onClick={() => handleNavClick('hero')} className="nav-link">
              Home
            </a>
            <a href="#features" onClick={() => handleNavClick('features')} className="nav-link">
              Features
            </a>
            <a href="#about" onClick={() => handleNavClick('about')} className="nav-link">
              About
            </a>
            <a href="#contact" onClick={() => handleNavClick('contact')} className="nav-link">
              Contact
            </a>
          </>
        ) : (
          <>
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/#features" className="nav-link">
              Features
            </a>
            <a href="/#about" className="nav-link">
              About
            </a>
            <a href="/#contact" className="nav-link">
              Contact
            </a>
          </>
        )}
      </nav>
      <div className="header-actions">
        <select className="language-selector">
          <option value="en">English</option>
          <option value="si">Sinhala</option>
          <option value="ta">Tamil</option>
        </select>
        <button className="sign-in-btn" onClick={handleSignInClick}>
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;