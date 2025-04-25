/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Slide = ({ image, text }) => {
  return (
    <div
      className="w-full bg-center bg-cover h-[38rem] rounded-md"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white">
            {text}
          </h1>
          <br />
          <Link
            to="/addItems"
            className="relative w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-transform transform bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-600 rounded-md shadow-lg lg:w-auto hover:scale-105 focus:outline-none"
          >
            <span className="absolute inset-0 bg-white opacity-10 rounded-md animate-ping"></span>
            <span className="relative text-base font-medium">
              Post Lost & Find Item
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
