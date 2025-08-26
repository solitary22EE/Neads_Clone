// src/pages/Services.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // adjust if needed
import { collection, getDocs } from "firebase/firestore";

const Services = () => {
  const [services, setServices] = useState([]);

  // 🔹 Fetch services from Firestore only
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snapshot = await getDocs(collection(db, "services"));
        const firestoreServices = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(firestoreServices);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="services-page bg-gray-50 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            NEADS is dedicated to empowering communities through impactful
            initiatives and sustainable solutions.
          </p>
        </div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg p-8 text-center transition duration-300 transform hover:-translate-y-1"
              >
                <div className="text-5xl mb-4">{service.icon || "✨"}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description || service.desc}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No services available yet.</p>
        )}
      </div>
    </section>
  );
};

export default Services;
