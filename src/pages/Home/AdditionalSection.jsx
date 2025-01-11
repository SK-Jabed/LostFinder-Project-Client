import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import additionalAnimation from "../../assets/additional.json"

const AdditionalSection = () => {
  const features = [
    {
      icon: "🔍",
      title: "Image Search",
      description:
        "Quickly find your lost items with our AI-powered image search feature. Upload a photo to discover matches effortlessly.",
    },
    {
      icon: "🛠️",
      title: "Custom Search",
      description:
        "Tailor your search by using filters for item type, location, or date. LostFinder makes rediscovery more personalized.",
    },
    {
      icon: "💡",
      title: "Completely Free",
      description:
        "Enjoy a fully functional platform at no cost. We believe that finding your lost belongings should never come with a price tag.",
    },
  ];

  return (
    <div className="w-10/12 mx-auto py-16">
      {/* Left Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
            Lost & Found
          </h2>
          <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Powered by AI
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            LostFinder is transforming how people reconnect with their lost
            belongings. From image recognition to personalized searches, we've
            got you covered.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Lottie animationData={additionalAnimation} loop className="w-80" />
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg text-center transform hover:scale-105 transition duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AdditionalSection;
