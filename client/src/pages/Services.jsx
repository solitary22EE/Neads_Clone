import React from "react";
import Navbar from "../components/Navbar";
import ServicesSection from "../components/ServicesSection";
import Footer from "../components/Footer";

const Services = () => {
  return (
    <>
      <Navbar />
      <section className="services-page section-padding">
        <div className="container">
          <h1 className="text-3xl font-bold mb-4">Our Services</h1>
          <ServicesSection />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;
