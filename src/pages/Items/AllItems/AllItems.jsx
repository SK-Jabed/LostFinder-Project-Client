import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../ItemCard/ItemCard";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllItems = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/allItems`
    );
    setItems(data);
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-11/12 mx-auto p-4 mt-10">
      <Helmet>
        <title>All Items | LostFinder</title>
      </Helmet>

      {/* Page Title and Description */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          All Lost and Found Items
        </h1>
        <p className="mt-2 text-base font-medium text-gray-600 dark:text-gray-300">
          Browse through all the reported lost and found items. Use the search
          bar to quickly find items by title or location.
        </p>
      </motion.div>

      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6"
      >
        <input
          type="text"
          placeholder="🔍 Search by title or location"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      {/* Items Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-gray-700 dark:text-gray-300 mb-4"
      >
        Total Items Found:{" "}
        <span className="font-semibold">{filteredItems.length}</span>
      </motion.p>

      {/* No Items Found Message */}
      {filteredItems.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-500 text-center"
        >
          No items found for the search query.
        </motion.p>
      )}

      {/* Items Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredItems.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ItemCard item={item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AllItems;
