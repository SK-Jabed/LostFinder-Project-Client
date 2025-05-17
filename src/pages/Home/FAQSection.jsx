import React, { useState } from "react";
import { motion } from "framer-motion";




const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does LostFinder work?",
      answer:
        "LostFinder uses advanced AI algorithms to help you reconnect with your lost items or finders. You can upload images, add descriptions, and search for matches easily.",
    },
    {
      question: "Is LostFinder free to use?",
      answer:
        "Yes! LostFinder is completely free. Our goal is to help users find their lost belongings without any cost.",
    },
    {
      question: "Can I search by location?",
      answer:
        "Absolutely! LostFinder allows you to filter your searches based on location to narrow down results efficiently.",
    },
    {
      question: "Is my personal data secure?",
      answer:
        "Yes, we prioritize your privacy and security. All data is encrypted and securely stored to protect your information.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-11/12 mx-auto py-16">
      {/* Title and Description */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Have questions about LostFinder? We've got answers to the most common
          inquiries below.
        </p>
      </motion.div>

      {/* FAQ List */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg cursor-pointer transition-transform duration-300"
            whileHover={{ scale: 1.02 }}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {faq.question}
              </h3>
              <span
                className={`transform transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>
            {activeIndex === index && (
              <motion.p
                className="mt-4 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FAQSection;