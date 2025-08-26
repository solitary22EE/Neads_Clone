// src/components/Services.jsx
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";

const Services = () => {
  const animateStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const animateUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const services = [
    {
      title: "Water Supply & IWRM",
      icon: "💧",
      desc: "Integrated Water Resource Management for sustainable water solutions.",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Sanitation & Hygiene",
      icon: "🧼",
      desc: "Promoting environmental hygiene and sanitation practices.",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Waste Management",
      icon: "🗑️",
      desc: "Effective solid and liquid waste management systems.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Women in Development",
      icon: "👩",
      desc: "Empowering women through various development initiatives.",
      color: "from-pink-500 to-pink-600"
    },
    {
      title: "Capacity Building",
      icon: "📚",
      desc: "Skill enhancement and training programs.",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Livelihood Support",
      icon: "🤝",
      desc: "Promoting and supporting sustainable livelihoods.",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <SectionTitle title="Our Key Focus Areas" subtitle="MAKING A DIFFERENCE IN MULTIPLE SECTORS" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animateStagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {services.map((item, index) => (
            <motion.div
              key={index}
              variants={animateUp}
              whileHover={{ y: -10 }}
              className={`bg-gradient-to-br ${item.color} text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all`}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h4 className="text-xl font-bold mb-3">{item.title}</h4>
              <p className="text-neutral-200">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
