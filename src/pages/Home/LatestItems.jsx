import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../Items/ItemCard/ItemCard";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";

const LatestItems = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestItems = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/latestItems`
        );
        setItems(data);
      } catch (error) {
        console.error("Error fetching latest items:", error);
      }
    };

    fetchLatestItems();
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="container mx-auto mb-16 mt-20 px-4">
      {/* Section Title and Description */}
      <div className="text-center mb-8">
        <h2
          className="text-4xl font-extrabold text-gray-800 dark:text-white"
          data-aos="fade-up"
        >
          Discover Latest Finds and Lost Items
        </h2>
        <p
          className="text-gray-600 text-base dark:text-gray-200 mt-2 max-w-xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Stay updated with the most recent lost or found items. Help reunite
          owners with their belongings or find what you’ve misplaced!
        </p>
      </div>

      {/* Cards Section */}

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>

      {/* See All Items Button */}
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/allItems")}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-transform transform hover:scale-105"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          See All Items
        </button>
      </div>
    </section>
  );
};

export default LatestItems;
