import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; 
import logo from '../assets/neads-logo.png'
import { FaWhatsapp, FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="footer-content"
        >
          <motion.div variants={fadeIn} className="footer-brand">
            <Link to="/" className="footer-logo">
              <img 
                src={logo} 
                alt="NEADS Logo" 
                className="footer-logo-img"
              />
            </Link>
            <p className="footer-description">
              Empowering communities through sustainable development initiatives.
            </p>
            <div className="footer-social">
            <a 
    key="whatsapp" 
    href="#" 
    className="footer-social-link"
    aria-label="whatsapp"
  >
    <span className="sr-only">whatsapp</span>
    <FaWhatsapp className="footer-social-icon" />
  </a>

  {/* Instagram */}
  <a 
    key="instagram" 
    href="#" 
    className="footer-social-link"
    aria-label="instagram"
  >
    <span className="sr-only">instagram</span>
    <FaInstagram className="footer-social-icon" />
  </a>

  {/* Email */}
  <a 
    key="email" 
    href="mailto:example@example.com" 
    className="footer-social-link"
    aria-label="email"
  >
    <span className="sr-only">email</span>
    <FaEnvelope className="footer-social-icon" />
  </a>

  {/* Phone */}
  <a 
    key="phone" 
    href="tel:+1234567890" 
    className="footer-social-link"
    aria-label="phone"
  >
    <span className="sr-only">phone</span>
    <FaPhone className="footer-social-icon" />
  </a>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="footer-contact">
            <h3 className="footer-heading">Contact Info</h3>
            <address className="footer-address">
              <p>First floor PAG Tower Chinakkal Sirhind Nagar, Cherushola (Po),Chenakkal, Kottakkal, Malappuram  Kerala  676510</p>
              <p></p>
              <p>Phone: +91 9746537250</p>
            </address>
          </motion.div>

          <motion.div variants={fadeIn} className="footer-map">
            <h3 className="footer-heading">Our Location</h3>
            <div className="map-container">
      <iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841104225539!2d76.0053724!3d10.9746924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU4JzI4LjkiTiA3NsKwMDAnMjguNiJF!5e0!3m2!1sen!2sus!4v1623861234567!5m2!1sen!2sus" 
  width="100%" 
  height="150" 
  
  allowfullscreen="" 
  loading="lazy" 
  title="Location at 10°58'28.9E"
></iframe>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="footer-copyright"
        >
          <p>&copy; {new Date().getFullYear()} NeadsIndia. All rights reserved. Developed by Neuraq Technologies</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;