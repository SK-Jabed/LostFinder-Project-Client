import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="text-center my-14 space-y-6" data-aos="fade-up">
      <motion.h2
        className="text-3xl dark:text-gray-300 font-bold text-gray-800"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        How It Works
      </motion.h2>
      <p
        className="text-gray-600 dark:text-gray-200 max-w-xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Connect with people to reunite lost items or claim found belongings with
        ease.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        {[
          { title: "Report Lost Items", icon: "🔍" },
          { title: "Post Found Items", icon: "📦" },
          { title: "Reunite & Claim", icon: "🤝" },
        ].map((step, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className="font-semibold text-gray-700">{step.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
