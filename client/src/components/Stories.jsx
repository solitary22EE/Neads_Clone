// src/components/Stories.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";
import { db } from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const Stories = () => {
  const animateStagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const animateUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const [stories, setStories] = useState([]);


  useEffect(() => {
    const q = query(collection(db, "stories"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setStories(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Success Stories"
          subtitle="IMPACT IN THE WORDS OF THOSE WE SERVE"
          light
        />

        {/* Stories Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animateStagger}
          className="grid md:grid-cols-3 gap-8 mt-12"
        >
          {stories.length === 0 ? (
            <p className="text-center col-span-3">No stories available yet.</p>
          ) : (
            stories.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={animateUp}
                className="bg-white/10 p-8 rounded-xl backdrop-blur-sm border border-white/20"
              >
                <div className="text-xl mb-6 leading-relaxed">
                  "{testimonial.quote || "Loading..."}"
                </div>
                <div className="font-bold">
                  {testimonial.author || "Anonymous"}
                </div>
                <div className="text-white/80">
                  {testimonial.role || "Community Member"}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Stories;
