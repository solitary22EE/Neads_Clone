import React, { useEffect } from 'react';
import '../styles/Hero.css';
import heroImage from '/assets/hero-bg.jpg'; // Hero background

const HeroSection = () => {
  useEffect(() => {
    const el = document.querySelector('.hero-content');
    el.classList.add('loaded');
  }, []);

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1>NATIONAL EMPOWERMENT AND DEVELOPMENT AGENCY</h1>
        <p>Empowering communities in North‑East India</p>
        <div className="hero-btns">
          <a href="#about" className="btn hero-btn">About Us</a>
          <a href="#services" className="btn hero-btn-outline">Our Services</a>
        </div>
      </div>
      <div className="scroll-arrow" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        ↓
      </div>
    </section>
  );
};

export default HeroSection;
