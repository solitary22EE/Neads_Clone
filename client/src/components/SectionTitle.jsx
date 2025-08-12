//SectionTitle.jsx


import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, light = false }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <span className={`text-sm font-semibold tracking-wider uppercase ${light ? 'text-blue-200' : 'text-blue-600'}`}>
        {subtitle}
      </span>
      <h2 className={`text-3xl md:text-4xl font-bold mt-2 ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <div className={`w-16 h-1 mx-auto mt-4 ${light ? 'bg-white' : 'bg-blue-600'}`}></div>
    </motion.div>
  );
};

export default SectionTitle;