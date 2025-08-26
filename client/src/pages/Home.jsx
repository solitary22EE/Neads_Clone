// Home.jsx

import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle.jsx';
import Banner from '../components/Banner.jsx';
import AboutImg from '../assets/about.jpg';
// import waterImg from '../assets/waterTap.jpg';
// import womenImg from '../assets/women.jpg';
// import StudnetImg from '../assets/students.jpg';
import heroimg from '../assets/hero.jpg';
import '../styles/Home.css';

import { useState } from "react";

import { FiArrowRight, FiUsers, FiDroplet, FiAward, FiBook, FiShield, FiHeart } from 'react-icons/fi';

import Stories from '../components/Stories.jsx';
import FeaturedProjects from '../components/FeaturedProjects.jsx';
import Services from '../components/Services.jsx';

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const animateStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const animateUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const scaleUp = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } }
  };

  const [stories, setStories] = useState([
    {
      quote: "NEADS transformed our village with clean water access. Our children are healthier now.",
      author: "Ramesh Kumar",
      role: "Village Leader",
    },
    {
      quote: "The women's training program gave me skills to start my own tailoring business.",
      author: "Sunita Devi",
      role: "Entrepreneur",
    },
    {
      quote: "Their sanitation awareness changed our community's hygiene practices dramatically.",
      author: "Dr. Anjali Patel",
      role: "Community Health Worker",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [storyText, setStoryText] = useState("");


  const addStoryHandler = () => {
    if (storyText.trim() === "") return;
    const newStory = {
      quote: storyText,
      author: "Anonymous", // defalut author name
      role: "Community Member",
    };
    setStories([newStory, ...stories]);
    setStoryText("");
    setShowForm(false);
  };

  return (
    <div className="pt-24">
      <Banner />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-0 left-0 w-full h-full bg-[url('${heroimg}')] bg-cover bg-center opacity-60`} id='background-img'></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={animateStagger}
          className="container mx-auto px-6 z-10"
        >
          <motion.div variants={animateUp} className="max-w-2xl">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Empowering Communities for <span className="text-blue-600">Sustainable</span> Development
            </motion.h1>
            <motion.p
              variants={animateUp}
              className="text-lg md:text-xl text-gray-600 mb-8"
              transition={{ delay: 0.4 }}
            >
              The National Empowerment and Development Agency (NEADS) is committed to community development through sustainable and inclusive growth.
            </motion.p>
            <motion.div
              variants={animateUp}
              className="flex flex-wrap gap-4"
              transition={{ delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg flex items-center gap-2" id='button'
              >
                Our Projects <FiArrowRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors" id='button'
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animateStagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "50+", label: "Projects Completed", icon: <FiAward className="text-3xl" /> },
              { number: "10K+", label: "People Empowered", icon: <FiUsers className="text-3xl" /> },
              { number: "100+", label: "Communities Served", icon: <FiHeart className="text-3xl" /> },
              { number: "7+", label: "Years of Service", icon: <FiShield className="text-3xl" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={animateUp}
                className="bg-gray-50 p-8 rounded-xl text-center"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Who We Are"
            subtitle="PROFILE OF NATIONAL EMPOWERMENT AND DEVELOPMENT AGENCY"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animateStagger}
            className="grid md:grid-cols-2 gap-12 items-center mt-12"
          >
            <motion.div variants={fadeIn}>
              <p className="text-lg text-gray-600 mb-6">
                The National Empowerment and Development Agency (NEADS) is a non-governmental organization, registered as a society under the Societies Registration Act, XXI of 1860 in December 2018 with a commitment to community development.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                The agency emphasizes sustainable and inclusive growth with a focus on water and sanitation, environmental sustainability, and the empowerment of women and marginalized groups.
              </p>
              <p className="text-lg text-gray-600">
                NEADS actively engages in various project implementation, capacity building, and research-driven interventions in partnership with local communities, government departments, and development stakeholders.
              </p>
            </motion.div>
            <motion.div
              variants={scaleUp}
              className="relative h-96 rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={AboutImg}
                alt="Community development"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2 text-white">Our Integrated Approach</h3>
                <p className='text-white'>Addressing essential development sectors for long-term transformation</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-2xl shadow-xl"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <FiAward className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-lg text-white">
                To build empowered and sustainable communities through development initiatives rooted in equity, inclusion, and environmental responsibility.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-600 to-green-800 text-white p-8 rounded-2xl shadow-xl"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <FiBook className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-lg text-white">
                To work with communities and empower deprived groups—particularly women—by promoting sustainable socio-economic development with a strong focus on water, environmental sanitation, and environmental responsibility.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


<Services/>
      {/* Focus Areas */}
      {/* <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Our Key Focus Areas"
            subtitle="MAKING A DIFFERENCE IN MULTIPLE SECTORS"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animateStagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {[
              {
                title: "Water Supply & IWRM",
                icon: <FiDroplet className="text-3xl" />,
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
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={animateUp}
                whileHover={{ y: -10 }}
                className={`bg-gradient-to-br ${item.color} text-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold mb-3 ">{item.title}</h4>
                <p className='text-neutral-200'>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

      {/* Projects Showcase */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Our Featured Projects"
            subtitle="TRANSFORMING COMMUNITIES THROUGH ACTION"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animateStagger}
            className="grid md:grid-cols-3 gap-8 mt-12"
          >
            {[
              {
                title: "Clean Water Initiative",
                desc: "Providing access to clean drinking water in rural communities",
                img: waterImg
              },
              {
                title: "Women's Skill Development",
                desc: "Vocational training programs for women's economic empowerment",
                img: womenImg
              },
              {
                title: "Sanitation Awareness",
                desc: "Community education programs on hygiene and sanitation",
                img: StudnetImg
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={animateUp}
                whileHover={{ scale: 1.02 }}
                className="group overflow-hidden rounded-2xl shadow-lg"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="p-6 bg-white">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h4>
                  <p className="text-gray-600 mb-4">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> */}

<FeaturedProjects/>

<Stories />
{/*
      
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Success Stories"
            subtitle="IMPACT IN THE WORDS OF THOSE WE SERVE"
            light
          />

       
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animateStagger}
            className="grid md:grid-cols-3 gap-8 mt-12"
          >
            {stories.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={animateUp}
                className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/20"
              >
                <div className="text-xl mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </div>
                <div className="font-bold">{testimonial.author}</div>
                <div className="text-white/80">{testimonial.role}</div>
              </motion.div>
            ))}
          </motion.div>

      
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-2 bg-white text-blue-600 rounded-full font-semibold shadow-md hover:bg-blue-100 transition" id='button'
            >
              <span className="text-xl font-bold">+</span>
              Add Your Story
            </button>
          </div>

         
          {showForm && (
            <div className="mt-6 flex flex-col items-center !text-white">
              <textarea
                placeholder="Write your story here..."
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                className="w-full md:w-2/3 p-4 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
              />
              <div className="mt-4 flex gap-4">
                <button
                  onClick={addStoryHandler}
                  className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition" id='button'
                >
                  Add
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-400 transition" id='button'
                >
                  Discard
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
*/}

      {/* Target Groups */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Target Groups"
            subtitle="REACHING THOSE WHO NEED IT MOST"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animateStagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-10"
            id="target-gridcard"
          >
            {[
              "Rural and Urban Communities",
              "Women and Self-Help Groups (SHGs)",
              "Youth and Marginalized Populations",
              "Local Governance Institutions and Development Partners",
            ].map((group, index) => (
              <motion.div
                key={index}
                variants={animateUp}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start sm:items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 sm:mr-4 text-blue-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-gray-800 leading-snug">
                    {group}
                  </h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-neutral-200">
              Join us in our mission to empower communities through sustainable development initiatives.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-blue-600 rounded-full font-bold shadow-lg" id='button'
              >
                Partner With Us
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white rounded-full font-bold" id='button'
              >
                Donate Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;