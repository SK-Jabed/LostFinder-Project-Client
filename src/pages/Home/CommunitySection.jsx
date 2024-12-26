import React from "react";
import { motion } from "framer-motion";

const CommunitySection = () => {
  return (
    <section className="py-12 px-4 bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Join Our Vibrant Community
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Be a part of a global network of individuals helping others find what
          they’ve lost and connect to those in need.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <motion.button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            whileHover={{ scale: 1.1 }}
          >
            Learn More
          </motion.button>
          <motion.button
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white"
            whileHover={{ scale: 1.1 }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CommunitySection;
