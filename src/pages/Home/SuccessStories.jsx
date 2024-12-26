import React from "react";
import { motion } from "framer-motion";

const SuccessStories = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="text-center space-y-6" data-aos="fade-up">
      <h2 className="text-3xl font-bold text-gray-800">Success Stories</h2>
      <p className="text-gray-600 max-w-xl mx-auto">
        Hear from people who successfully reunited with their lost belongings.
      </p>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {[
          "I found my lost wallet through this platform!",
          "Thank you for helping me get back my laptop.",
          "I never thought I’d see my passport again!",
        ].map((story, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <blockquote className="text-gray-600">{story}</blockquote>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SuccessStories;
