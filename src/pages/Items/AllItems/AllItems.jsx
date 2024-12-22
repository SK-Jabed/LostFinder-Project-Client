import axios from "axios";
import React, { useEffect, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";

const AllItems = () => {
  const [items, setItems] = useState([]);

  const fetchAllItems = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/allItems`
    );
    setItems(data);
  };

  useEffect(() => {
    fetchAllItems();
  }, []);

  console.log(items);

  return (
    <div>
      All Items: {items.length}
      <div>
        {
            items.map(item => <ItemCard key={item._id} item={item}></ItemCard>)
        }
      </div>
    </div>
  );
};

export default AllItems;
