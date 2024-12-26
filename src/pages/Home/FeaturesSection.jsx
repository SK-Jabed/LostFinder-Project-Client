import React from "react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Real-Time Updates",
      description: "Stay informed with instant updates and notifications.",
    },
    {
      id: 2,
      title: "Global Access",
      description: "Find or report items from anywhere in the world.",
    },
    {
      id: 3,
      title: "Secure Platform",
      description: "Ensure your data is safe with our secure system.",
    },
  ];

  return (
    <section className="py-12 mb-16 px-4 bg-white dark:bg-gray-800">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Why Choose Us
        </h2>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
          Discover the features that make our platform the best choice for lost
          and found services.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
