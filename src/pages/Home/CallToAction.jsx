import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="py-16 bg-blue-600 text-white dark:bg-blue-800">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold">Take the First Step Now</h2>
        <p className="mt-4 text-lg">
          Join our platform today and make a difference in reuniting people with
          their lost items.
        </p>
        <motion.button
          className="mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          whileHover={{ scale: 1.1 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CallToAction;
