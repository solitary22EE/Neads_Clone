// src/components/FeaturedProjects.jsx

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle.jsx";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

// fallback static images
import waterImg from "../assets/waterTap.jpg";
import womenImg from "../assets/women.jpg";
import studentImg from "../assets/students.jpg";

const FeaturedProjects = () => {
  const animateUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // 🔹 Default hardcoded projects
  const defaultProjects = [
    {
      title: "Clean Water Initiative",
      desc: "Providing access to clean drinking water in rural communities",
      img: waterImg,
    },
    {
      title: "Women's Skill Development",
      desc: "Vocational training programs for women's economic empowerment",
      img: womenImg,
    },
    {
      title: "Sanitation Awareness",
      desc: "Community education programs on hygiene and sanitation",
      img: studentImg,
    },
  ];

  const [projects, setProjects] = useState([]);

  // 🔹 Fetch Firestore projects
  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, "projects"));
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProjects();
  }, []);

  // 🔹 Merge Firestore + Default
  const allProjects = [...defaultProjects, ...projects];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Our Featured Projects"
          subtitle="REAL IMPACT, REAL STORIES"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {allProjects.map((project, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animateUp}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all"
            >
              {project.img || project.image ? (
                <img
                  src={project.img || project.image} // img = default, image = from Firestore
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              ) : null}

              <div className="p-6">
                <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                <p className="text-gray-600">{project.desc || project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
