// import React from "react";
// import { motion } from "framer-motion";

// const FeaturesSection = () => {
//   const features = [
//     {
//       id: 1,
//       title: "Real-Time Updates",
//       description: "Stay informed with instant updates and notifications.",
//     },
//     {
//       id: 2,
//       title: "Global Access",
//       description: "Find or report items from anywhere in the world.",
//     },
//     {
//       id: 3,
//       title: "Secure Platform",
//       description: "Ensure your data is safe with our secure system.",
//     },
//   ];

//   return (
//     <section className="py-12 mb-16 px-4 bg-white dark:bg-gray-800">
//       <motion.div
//         className="max-w-7xl mx-auto"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
//           Why Choose Us
//         </h2>
//         <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
//           Discover the features that make our platform the best choice for lost
//           and found services.
//         </p>
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature) => (
//             <motion.div
//               key={feature.id}
//               className="p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700"
//               whileHover={{ scale: 1.05 }}
//             >
//               <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
//                 {feature.title}
//               </h3>
//               <p className="mt-2 text-gray-600 dark:text-gray-300">
//                 {feature.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default FeaturesSection;



import React from "react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Real-Time Updates",
      description:
        "Get instant notifications and stay updated on the status of your lost or found items.",
    },
    {
      id: 2,
      title: "Global Access",
      description:
        "Our platform is accessible worldwide, ensuring your items can be found or reported globally.",
    },
    {
      id: 3,
      title: "Secure Platform",
      description:
        "Your data is protected with our state-of-the-art security system, ensuring peace of mind.",
    },
  ];

  return (
    <section
      className="py-12 mb-16 px-4 bg-gray-50 dark:bg-gray-900"
      data-aos="fade-up"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent text-center">
          Why Choose Us
        </h2>
        <p
          className="mt-4 text-base font-medium text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Explore the key features that make our platform a trusted choice for
          lost and found services.
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="p-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition-shadow"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
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
