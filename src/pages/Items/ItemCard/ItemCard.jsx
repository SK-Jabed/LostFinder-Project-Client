import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  const {
    _id,
    postType,
    thumbnail,
    title,
    category,
    dateLost,
    location,
    description,
  } = item || {};

  return (
    <div className="relative flex flex-col bg-white dark:bg-gray-900 shadow-md border border-slate-200 rounded-lg w-full sm:max-w-sm lg:max-w-md mx-auto overflow-hidden">
      {/* Thumbnail Section */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={thumbnail}
          alt="card-thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-3 bg-cyan-600 py-1 px-2.5 rounded-full text-xs text-white w-max">
          {category}
        </div>
        <h3 className="text-xl font-bold mt-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-400 mt-2">{description}</p>
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          <p>Lost Date: {format(new Date(dateLost), "P")}</p>
          <p>Post Type: {postType}</p>
          <p>Location: {location}</p>
        </div>
      </div>

      {/* Button Section */}
      <div className="mt-auto">
        <button
          onClick={() => navigate(`/items/${_id}`)}
          class="font-lato my-4 flex justify-center gap-2 items-center mx-2 shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto border-gray-200 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group active:scale-90"
          type="submit"
        >
          View Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 19"
            class="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-gray-700 p-2 rotate-45"
          >
            <path
              class="fill-gray-800 group-hover:fill-gray-800"
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ItemCard;