import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <section className="contact-page section-padding  pt-25">
        <div className="container">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg mb-4">We’d love to hear from you. Reach us via the form below or at our registered office.</p>
          <form className="max-w-xl">
            <input type="text" placeholder="Name" className="w-full border p-2 mb-3" />
            <input type="email" placeholder="Email" className="w-full border p-2 mb-3" />
            <textarea rows="4" placeholder="Message" className="w-full border p-2 mb-3"></textarea>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
