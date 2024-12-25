// import React from "react";
// import { useTheme } from "../providers/ThemeContext";
// import { FaMoon, FaSun } from "react-icons/fa";
// // import { useTheme } from "../context/ThemeContext";

// const ThemeToggle = () => {
//   const { theme, toggleTheme } = useTheme();

//   return (
//     // <button
//     //   onClick={toggleTheme}
//     //   className="relative w-16 h-8 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors duration-300"
//     // >
//     //   <div
//     //     className={`absolute w-6 h-6 bg-white dark:bg-yellow-500 rounded-full shadow-md transform transition-transform duration-300 ${
//     //       theme === "light" ? "translate-x-1" : "translate-x-8"
//     //     }`}
//     //   />
//     //   <FaSun
//     //     className={`absolute left-3 text-gray-500 dark:text-yellow-300 transition-opacity duration-300 ${
//     //       theme === "light" ? "opacity-100" : "opacity-0"
//     //     }`}
//     //   />
//     //   <FaMoon
//     //     className={`absolute right-2 text-gray-500 dark:text-gray-300 transition-opacity duration-300 ${
//     //       theme === "dark" ? "opacity-100" : "opacity-0"
//     //     }`}
//     //   />
//     // </button>
//     // <div
//     //   onClick={toggleTheme}
//     //   className={`relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
//     //     theme === "dark"
//     //       ? "bg-gray-800 border-2 border-gray-500"
//     //       : "bg-yellow-400 border-2 border-yellow-300"
//     //   }`}
//     // >
//     //   <div
//     //     className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
//     //       theme === "dark" ? "translate-x-6" : "translate-x-0"
//     //     }`}
//     //   ></div>
//     // </div>
//     <div>
//       <div
//         onClick={toggleTheme}
//         className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300 ${
//           theme === "dark"
//             ? "bg-gray-800"
//             : "bg-yellow-400 shadow-[0_0_15px_rgba(255,223,88,0.7)]"
//         }`}
//         aria-label="Toggle Theme"
//       >
//         {/* Sliding Icon */}
//         <div
//           className={`w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
//             theme === "dark" ? "translate-x-8" : ""
//           }`}
//         >
//           {theme === "dark" ? (
//             <span className="text-gray-800"><FaMoon /></span>
//           ) : (
//             <span className="text-yellow-500"><FaSun /></span>
//           )}
//         </div>
//       </div>
//     </div>
//     // <button
//     //   onClick={toggleTheme}
//     //   className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
//     // >
//     //   {theme === "dark" ? "Switch to Light 🌞" : "Switch to Dark 🌙"}
//     // </button>
//   );
// };

// export default ThemeToggle;


import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Get theme from localStorage or default to system preference
    return localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? true
      : false;
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      const theme = newMode ? "dark" : "light";

      // Update localStorage and HTML class
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", newMode);

      return newMode;
    });
  };

  useEffect(() => {
    // Ensure the theme is applied on component mount
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <label className="swap swap-rotate">
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={toggleTheme}
        className="sr-only"
      />

      {/* Sun icon for light mode */}
      <svg
        className="swap-on h-10 w-10 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>

      {/* Moon icon for dark mode */}
      <svg
        className="swap-off h-10 w-10 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </svg>
    </label>
  );
};

export default ThemeToggle;
