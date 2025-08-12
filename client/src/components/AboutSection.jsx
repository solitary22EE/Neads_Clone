import React from "react";

const AboutSection = () => {
  return (
    <section className="about-section py-16 bg-gray-50" id="about">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          About NEADS
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto">
          North East Affected Area Development Society (NEADS) is a grassroots non-governmental organization based in Jorhat, Assam. We work towards sustainable rural development, disaster preparedness, and the empowerment of marginalized communities through inclusive and community-driven initiatives.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
