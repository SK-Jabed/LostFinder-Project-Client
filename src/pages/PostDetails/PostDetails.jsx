// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// import { format } from "date-fns";
// import axios from "axios";

// const PostDetails = () => {
//   const { id } = useParams();
// //   const { user } = useContext(AuthContext);
// //   const [startDate, setStartDate] = useState(new Date());
//   const [item, setItem] = useState({});
// //   const navigate = useNavigate();

//   const fetchItemData = async () => {
//     const { data } = await axios.get(
//       `${import.meta.env.VITE_API_URL}/item/${id}`
//     );
//     setItem(data);
//     // setStartDate(new Date(data.dateLost));
//   };

//   useEffect(() => {
//     fetchItemData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const {
//     _id,
//     postType,
//     thumbnail,
//     title,
//     category,
//     dateLost,
//     location,
//     // postedAt,
//     description,
//     contactInfo
//   } = item || {};

//   return (
//     <div className="container px-8 my-8 mx-auto">
//       {/* Job Details */}
//       <div className="px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
//         <div className="flex items-center justify-between">
//           {dateLost && (
//             <span className="text-sm font-light text-gray-800 ">
//               Date: {format(new Date(dateLost), "P")}
//             </span>
//           )}
//           <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
//             {category}
//           </span>
//         </div>

//         <div>
//           <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
//             {title}
//           </h1>

//           <p className="mt-2 text-lg text-gray-600 ">{description}</p>
//           <p className="mt-6 text-sm font-bold text-gray-600 ">Contact Info:</p>
//           <div className="flex items-center gap-5">
//             <div>
//               <p className="mt-2 text-sm text-gray-600 ">
//                 Name: {contactInfo?.name}
//               </p>
//               <p className="mt-2 text-sm  text-gray-600 ">
//                 Email: {contactInfo?.email}
//               </p>
//             </div>
//             <div className="rounded-full object-cover overflow-hidden w-14 h-14">
//               <img src={contactInfo?.photo} alt="" />
//             </div>
//           </div>
//           <p className="mt-6 text-lg font-bold text-gray-600 ">
//             {location}
//           </p>
//           <p className="mt-6 text-lg font-bold text-gray-600 ">
//             {postType}
//           </p>
//           <button className="btn">
//             {postType === "Lost" ? "Found This!" : "This is Mine!"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostDetails;


import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../providers/AuthProvider";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());

  // Fetch item data
  useEffect(() => {
    const fetchItemData = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/item/${id}`
      );
      setItem(data);
    };
    fetchItemData();
  }, [id]);

  const { postType, title, description, contactInfo } = item;

  // Submit handler for recovery data
  const handleRecoverySubmit = async () => {
    const recoveryData = {
      recoveredLocation,
      recoveredDate,
      //   recoveredBy: contactInfo, // Assuming contactInfo contains logged-in user info
      recoveredBy: {
        name: user?.name,
        email: user?.email,
        photo: user?.photoURL,
      },
    };

    try {
      // Save recovery data
      await axios.post(
        `${import.meta.env.VITE_API_URL}/recoverItem`,
        recoveryData
      );

      // Update item status
      await axios.put(`${import.meta.env.VITE_API_URL}/updateItem/${id}`, {
        status: "recovered",
      });

      alert("Item marked as recovered successfully!");
      onClose(); // Close modal after submission
    } catch (error) {
      console.error("Error recovering item:", error);
    }
  };

  return (
    <div className="container px-8 my-8 mx-auto">
      <div className="px-4 py-7 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="mt-2">{description}</p>
        <div>
          <h3>Contact Info:</h3>
          <p>{contactInfo?.name}</p>
          <p>{contactInfo?.email}</p>
        </div>

        <Button className="btn" onPress={onOpen}>
          {postType === "Lost" ? "Found This!" : "This is Mine!"}
        </Button>
      </div>

      {/* Modal */}
      <Modal
        backdrop="blur"
        size="3xl"
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Recover Item</ModalHeader>
              <ModalBody>
                <div className="flex gap-3 ">
                  <div className="w-1/2">
                    <label className="block mb-2">User Name:</label>
                    <input
                      type="text"
                      defaultValue={user?.displayName}
                      className="w-full p-2 border rounded"
                      readOnly
                    //   value={recoveredLocation}
                    //   onChange={(e) => setRecoveredLocation(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-2">User Email:</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full p-2 border rounded"
                      readOnly
                    //   value={recoveredLocation}
                    //   onChange={(e) => setRecoveredLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-3 ">
                  <div className="w-1/2">
                    <label className="block mb-2">User Photo:</label>
                    <input
                      type="url"
                      defaultValue={user?.photoURL}
                      className="w-full p-2 border rounded"
                      readOnly
                    //   value={recoveredLocation}
                    //   onChange={(e) => setRecoveredLocation(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block mb-2">Recovered Location:</label>
                    <input
                      type="text"
                      placeholder="Enter recovered location"
                      className="w-full p-2 border rounded"
                      value={recoveredLocation}
                      onChange={(e) => setRecoveredLocation(e.target.value)}
                    />
                  </div>
                </div>
                <label className=" mt-4 mb-2">Recovered Date:</label>
                <DatePicker
                  selected={recoveredDate}
                  onChange={(date) => setRecoveredDate(date)}
                  className="w-full p-2 border rounded"
                />
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleRecoverySubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PostDetails;




// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Modal, Button } from "@nextui-org/react";
// import { format } from "date-fns";
// import { AuthContext } from "../../providers/AuthProvider";

// const PostDetails = () => {
//   const { id } = useParams();
//   const [item, setItem] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [recoveredLocation, setRecoveredLocation] = useState("");
//   const [recoveredDate, setRecoveredDate] = useState(new Date());
// //   const [loading, setLoading] = useState(false);
// //   const user = {
// //     name: "John Doe",
// //     email: "john.doe@example.com",
// //     image: "/user.png",
// //   }; // Replace with actual user data from context/auth

//     const { user, loading, setLoading } = useContext(AuthContext);

//   const fetchItemData = async () => {
//     const { data } = await axios.get(
//       `${import.meta.env.VITE_API_URL}/item/${id}`
//     );
//     setItem(data);
//   };

//   useEffect(() => {
//     fetchItemData();
//   }, [id]);

//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const recoveredData = {
//         itemId: item._id,
//         recoveredLocation,
//         recoveredDate: format(recoveredDate, "yyyy-MM-dd"),
//         recoveredBy: { name: user.name, email: user.email, image: user.image },
//       };

//       // Update the database
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/recoverItem`,
//         recoveredData
//       );
//       if (response.data.success) {
//         await axios.put(
//           `${import.meta.env.VITE_API_URL}/updateItem/${item._id}`,
//           { status: "recovered" }
//         );
//         alert("Item status updated to 'recovered'.");
//         setIsModalOpen(false);
//       } else {
//         alert("This item is already recovered!");
//       }
//     } catch (error) {
//       console.error("Error recovering item:", error);
//       alert("Failed to recover the item.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const {
//     thumbnail,
//     title,
//     category,
//     dateLost,
//     location,
//     description,
//     contactInfo,
//     postType,
//   } = item || {};

//   return (
//     <div className="container px-8 my-8 mx-auto">
//       <div className="px-4 py-7 bg-white rounded-md shadow-md">
//         <div className="flex items-center justify-between">
//           {dateLost && (
//             <span className="text-sm font-light text-gray-800 ">
//               Date: {format(new Date(dateLost), "P")}
//             </span>
//           )}
//           <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
//             {category}
//           </span>
//         </div>
//         <div>
//           <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
//             {title}
//           </h1>
//           <p className="mt-2 text-lg text-gray-600 ">{description}</p>
//           <p className="mt-6 text-sm font-bold text-gray-600 ">Contact Info:</p>
//           <div className="flex items-center gap-5">
//             <div>
//               <p className="mt-2 text-sm text-gray-600 ">
//                 Name: {contactInfo?.name}
//               </p>
//               <p className="mt-2 text-sm text-gray-600 ">
//                 Email: {contactInfo?.email}
//               </p>
//             </div>
//             <div className="rounded-full object-cover overflow-hidden w-14 h-14">
//               <img src={contactInfo?.photo} alt="Contact" />
//             </div>
//           </div>
//           <p className="mt-6 text-lg font-bold text-gray-600 ">{location}</p>
//           <p className="mt-6 text-lg font-bold text-gray-600 ">{postType}</p>
//           <button className="btn" onClick={handleOpenModal}>
//             {postType === "Lost" ? "Found This!" : "This is Mine!"}
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       <Modal open={isModalOpen} onClose={handleCloseModal}>
//         <Modal.Header>
//           <h2>Recover Item</h2>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Recovered Location
//               </label>
//               <input
//                 type="text"
//                 className="input input-bordered w-full"
//                 placeholder="Enter recovered location"
//                 value={recoveredLocation}
//                 onChange={(e) => setRecoveredLocation(e.target.value)}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Recovered Date
//               </label>
//               <DatePicker
//                 selected={recoveredDate}
//                 onChange={(date) => setRecoveredDate(date)}
//                 className="input input-bordered w-full"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Recovered By
//               </label>
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={user.image}
//                   alt="User"
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <p className="font-semibold">{user.name}</p>
//                   <p className="text-sm">{user.email}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button auto flat color="error" onClick={handleCloseModal}>
//             Cancel
//           </Button>
//           <Button auto onClick={handleSubmit} disabled={loading}>
//             {loading ? "Submitting..." : "Submit"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default PostDetails;