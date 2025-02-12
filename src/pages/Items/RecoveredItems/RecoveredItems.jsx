import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { RiTableFill } from "react-icons/ri";
import { TbLayoutCards } from "react-icons/tb";
import LoadingSpinner from "../../../components/LoadingSpinner";

const RecoveredItems = () => {
    const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [isTableLayout, setIsTableLayout] = useState(false); // State to toggle layout
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchRecoveredItems = async () => {
        setLoading(true)
      const { data } = await axiosSecure.get(`/recoveries/${user?.email}`);
      console.log(data);
      setRecoveredItems(data);
    };
    fetchRecoveredItems();
    setLoading(false)
  }, [user]);

  // Toggle layout handler
  const toggleLayout = () => {
    setIsTableLayout(!isTableLayout);
  };
  console.log(recoveredItems);

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Recovered Items | LostFinder</title>
      </Helmet>
      <div className="flex flex-col md:flex-row gap-1 items-center justify-between mb-4">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
          My Recovered Items
        </h1>
        <button
          onClick={toggleLayout}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-blue-500 transition-transform transform"
        >
          {isTableLayout ? (
            <div className="flex items-center gap-1">
              <p>Show Card Layout</p>
              <TbLayoutCards className="text-xl" />
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <p>Show Table Layout</p>
              <RiTableFill className="text-xl" />
            </div>
          )}
        </button>
      </div>

      {loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : recoveredItems.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not added any recovered items yet.
        </p>
      ) : isTableLayout ? (
        // Table Layout
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 dark:bg-white dark:text-black">
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
              className="border border-gray-300 p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow-md"
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