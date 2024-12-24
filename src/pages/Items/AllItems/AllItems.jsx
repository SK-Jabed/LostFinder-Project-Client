import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemCard from "../ItemCard/ItemCard";

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Items</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or location"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <p>All Items: {filteredItems.length}</p>
      
      {filteredItems.length === 0 && (
        <p className="text-gray-500">No items found for the search query.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllItems;
