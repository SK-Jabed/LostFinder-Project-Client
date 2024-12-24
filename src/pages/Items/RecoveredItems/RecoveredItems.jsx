// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const RecoveredItems = () => {
//   const [recoveredItems, setRecoveredItems] = useState([]);

//   useEffect(() => {
//     const fetchRecoveredItems = async () => {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/recoveries`
//       );
//       setRecoveredItems(data);
//     };
//     fetchRecoveredItems();
//   }, []);
//     console.log(recoveredItems);
//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-bold">Recovered Items</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {recoveredItems.map((item) => (
//           <div
//             key={item._id}
//             className="border border-gray-300 p-4 rounded-md shadow-md"
//           >
//             <p>Recovered at: {item.recoveredLocation}</p>
//             <p>Date: {new Date(item.recoveredDate).toLocaleDateString()}</p>
//             <p>Recovered by: {item.recoveredBy?.name}</p>
//             <p>Recovered by: {item.recoveredBy?.email}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecoveredItems;




import React, { useState, useEffect } from "react";
import axios from "axios";

const RecoveredItems = () => {
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [isTableLayout, setIsTableLayout] = useState(false); // State to toggle layout

  useEffect(() => {
    const fetchRecoveredItems = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/recoveries`
      );
      setRecoveredItems(data);
    };
    fetchRecoveredItems();
  }, []);

  // Toggle layout handler
  const toggleLayout = () => {
    setIsTableLayout(!isTableLayout);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Recovered Items</h1>
        <button
          onClick={toggleLayout}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isTableLayout ? "Show Card Layout" : "Show Table Layout"}
        </button>
      </div>

      {/* Conditional Rendering for Layout */}
      {isTableLayout ? (
        // Table Layout
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">
                  Recovered By
                </th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {recoveredItems.map((item) => (
                <tr key={item._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.recoveredLocation}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(item.recoveredDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.recoveredBy?.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.recoveredBy?.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Card Layout
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recoveredItems.map((item) => (
            <div
              key={item._id}
              className="border border-gray-300 p-4 rounded-md shadow-md"
            >
              <p>Recovered at: {item.recoveredLocation}</p>
              <p>Date: {new Date(item.recoveredDate).toLocaleDateString()}</p>
              <p>Recovered by: {item.recoveredBy?.name}</p>
              <p>Email: {item.recoveredBy?.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecoveredItems;
