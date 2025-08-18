import React from "react";


const About = () => {
  return (
    <>
      
      <section className="about-page bg-gray-50 py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn more about our mission, vision, and the work we do to empower communities.
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-6">
            <p className="text-lg leading-relaxed text-gray-700">
              The <strong>National Empowerment and Development Agency (NEADS)</strong> is committed to community development through sustainable and inclusive growth.
              We work tirelessly to create opportunities, build skills, and provide resources that empower individuals and communities to thrive.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Head Office</h2>
              <p className="text-gray-700">
                First floor, PAG Tower, Chinakkal Sirhind Nagar, Cherushola (Po),<br />
                Chenakkal, Kottakkal, Malappuram, Kerala 676510
              </p>
              <p className="mt-2 text-gray-700">
                📞 <strong>Phone:</strong> +91 9746537250
              </p>
            </div>
          </div>
        </div>
      </section>
     
    </>
  );
};

export default About;
