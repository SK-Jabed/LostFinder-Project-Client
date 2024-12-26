import React from "react";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const testimonials = [
    { name: "Alice", text: "I found my lost wallet thanks to this platform!" },
    { name: "Bob", text: "Great community and very helpful interface!" },
    {
      name: "Charlie",
      text: "The best experience ever in recovering my lost phone!",
    },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          What Our Users Say
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white shadow-md rounded-lg dark:bg-gray-700"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-600 dark:text-gray-300">
                "{testimonial.text}"
              </p>
              <p className="mt-4 text-gray-800 font-semibold dark:text-white">
                - {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
