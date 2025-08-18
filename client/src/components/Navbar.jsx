import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo2 from '../assets/neads-logo.png'; // website logo
import '../styles/Navbar.css'; // css file

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]); 

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      >
        <div className="navbar-container">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="navbar-logo"
          >
            <Link to="/">
              <img
                src={logo2}
                alt="NEADS Logo"
                className="navbar-logo-img"
              />
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <button
            className="navbar-mobile-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`navbar-mobile-icon ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            <Link to="/about" className="navbar-link">About</Link>
            <Link to="/services" className="navbar-link">Services</Link>
            <Link to="/blog" className="navbar-link">Blog</Link>
  

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className={`navbar-contact-button ${scrolled ? 'scrolled' : ''}`}
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`navbar-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/about" className="navbar-mobile-link" onClick={toggleMobileMenu}>About</Link>
          <Link to="/services" className="navbar-mobile-link" onClick={toggleMobileMenu}>Services</Link>
          <Link to="/blog" className="navbar-mobile-link" onClick={toggleMobileMenu}>Blog</Link>
          <Link to="/contact" className="navbar-mobile-contact-button" onClick={toggleMobileMenu}>Contact Us</Link>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;