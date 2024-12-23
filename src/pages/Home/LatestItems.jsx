// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import ItemCard from '../Items/ItemCard/ItemCard';

// const LatestItems = () => {
//       const [items, setItems] = useState([]);

//       const fetchAllItems = async () => {
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API_URL}/allItems`
//         );
//         setItems(data);
//       };

//       useEffect(() => {
//         fetchAllItems();
//       }, []);

//       console.log(items);
//     return (
//       <div>
//         Latest Items are here
//         <div>
//           {items.map((item) => (
//             <ItemCard key={item._id} item={item}></ItemCard>
//           ))}
//         </div>
//       </div>
//     );
// };

// export default LatestItems;



import axios from "axios";
import React, { useEffect, useState } from "react";
import ItemCard from "../Items/ItemCard/ItemCard";

const LatestItems = () => {
  const [items, setItems] = useState([]);

  const fetchLatestItems = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/latestItems`
    );
    setItems(data);
  };

  useEffect(() => {
    fetchLatestItems();
  }, []);

  return (
    <div>
      <h2>Latest Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          className="btn btn-primary"
          onClick={() => {
            // Navigate to the Lost & Found Items page
            window.location.href = "/allItems";
          }}
        >
          See All Items
        </button>
      </div>
    </div>
  );
};

export default LatestItems;




// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import ItemCard from "../Items/ItemCard/ItemCard";
// import { useNavigate } from "react-router-dom";

// const LatestItems = () => {
//   const [items, setItems] = useState([]);
//   const navigate = useNavigate();

//   // Fetch latest 6 items
//   const fetchLatestItems = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/latestItems`
//       );
//       setItems(data);
//     } catch (error) {
//       console.error("Error fetching latest items:", error);
//     }
//   };

//   useEffect(() => {
//     fetchLatestItems();
//   }, []);

//   return (
//     <div className="container mx-auto my-10">
//       <h2 className="text-2xl font-bold mb-6">Latest Find & Lost Items</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {items.map((item) => (
//           <ItemCard key={item._id} item={item} />
//         ))}
//       </div>
//       {/* See All Button */}
//       <div className="mt-8 text-center">
//         <button
//           onClick={() => navigate("/allItems")}
//           className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
//         >
//           See All Items
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LatestItems;