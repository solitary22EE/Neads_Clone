import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Services = () => {
  const services = [
    {
      title: "Community Development",
      description:
        "We work with local communities to promote sustainable growth, empowerment, and skill development.",
      icon: "🌱",
    },
    {
      title: "Education & Training",
      description:
        "Providing quality educational resources and vocational training programs for all age groups.",
      icon: "📚",
    },
    {
      title: "Health & Wellbeing",
      description:
        "Improving access to healthcare facilities and awareness for healthier lifestyles.",
      icon: "💙",
    },
    {
      title: "Women Empowerment",
      description:
        "Supporting women through leadership programs, skill-building, and entrepreneurship initiatives.",
      icon: "👩‍💼",
    },
  ];

  return (
    <>
    
      <section className="services-page bg-gray-50 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              NEADS is dedicated to empowering communities through impactful initiatives and sustainable solutions.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg p-8 text-center transition duration-300 transform hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
   
    </>
  );
};

export default Services;
