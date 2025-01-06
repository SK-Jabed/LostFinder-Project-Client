// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
// } from "@nextui-org/react";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import useAuth from "../../hooks/useAuth";

// const PostDetails = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const [item, setItem] = useState({});
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [recoveredLocation, setRecoveredLocation] = useState("");
//   const [recoveredDate, setRecoveredDate] = useState(new Date());

//   // Fetch item data
//   useEffect(() => {
//     const fetchItemData = async () => {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/item/${id}`
//       );
//       setItem(data);
//     };
//     fetchItemData();
//   }, [id]);

//   const { postType, title, description, contactInfo } = item;

//   // Submit handler for recovery data
//   const handleRecoverySubmit = async () => {
//     const recoveryData = {
//       recoveredLocation,
//       recoveredDate,
//       //   recoveredBy: contactInfo, // Assuming contactInfo contains logged-in user info
//       recoveredBy: {
//         name: user?.name,
//         email: user?.email,
//         photo: user?.photoURL,
//       },
//     };

//     try {
//       // Save recovery data
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/recoverItem`,
//         recoveryData
//       );

//       // Update item status
//       await axios.put(`${import.meta.env.VITE_API_URL}/updateItem/${id}`, {
//         status: "recovered",
//       });

//       alert("Item marked as recovered successfully!");
//       onClose(); // Close modal after submission
//     } catch (error) {
//       console.error("Error recovering item:", error);
//     }
//   };

//   return (
//     <div className="container px-8 my-8 mx-auto">
//       <div className="px-4 py-7 bg-white rounded-md shadow-md">
//         <h1 className="text-3xl font-semibold">{title}</h1>
//         <p className="mt-2">{description}</p>
//         <div>
//           <h3>Contact Info:</h3>
//           <p>{contactInfo?.name}</p>
//           <p>{contactInfo?.email}</p>
//         </div>

//         <Button className="btn" onPress={onOpen}>
//           {postType === "Lost" ? "Found This!" : "This is Mine!"}
//         </Button>
//       </div>

//       {/* Modal */}
//       <Modal
//         backdrop="blur"
//         size="3xl"
//         scrollBehavior="inside"
//         isOpen={isOpen}
//         onClose={onClose}
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader>Recover Item</ModalHeader>
//               <ModalBody>
//                 <div className="flex gap-3 ">
//                   <div className="w-1/2">
//                     <label className="block mb-2">User Name:</label>
//                     <input
//                       type="text"
//                       defaultValue={user?.displayName}
//                       className="w-full p-2 border rounded"
//                       readOnly
//                     //   value={recoveredLocation}
//                     //   onChange={(e) => setRecoveredLocation(e.target.value)}
//                     />
//                   </div>
//                   <div className="w-1/2">
//                     <label className="block mb-2">User Email:</label>
//                     <input
//                       type="email"
//                       defaultValue={user?.email}
//                       className="w-full p-2 border rounded"
//                       readOnly
//                     //   value={recoveredLocation}
//                     //   onChange={(e) => setRecoveredLocation(e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 <div className="flex gap-3 ">
//                   <div className="w-1/2">
//                     <label className="block mb-2">User Photo:</label>
//                     <input
//                       type="url"
//                       defaultValue={user?.photoURL}
//                       className="w-full p-2 border rounded"
//                       readOnly
//                     //   value={recoveredLocation}
//                     //   onChange={(e) => setRecoveredLocation(e.target.value)}
//                     />
//                   </div>
//                   <div className="w-1/2">
//                     <label className="block mb-2">Recovered Location:</label>
//                     <input
//                       type="text"
//                       placeholder="Enter recovered location"
//                       className="w-full p-2 border rounded"
//                       value={recoveredLocation}
//                       onChange={(e) => setRecoveredLocation(e.target.value)}
//                     />
//                   </div>
//                 </div>
//                 <label className=" mt-4 mb-2">Recovered Date:</label>
//                 <DatePicker
//                   selected={recoveredDate}
//                   onChange={(date) => setRecoveredDate(date)}
//                   className="w-full p-2 border rounded"
//                 />
                
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Cancel
//                 </Button>
//                 <Button color="primary" onPress={handleRecoverySubmit}>
//                   Submit
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// };

// export default PostDetails;






import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [item, setItem] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [recoveredLocation, setRecoveredLocation] = useState("");
  const [recoveredDate, setRecoveredDate] = useState(new Date());

  // Fetch item data
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/item/${id}`
        );
        setItem(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };
    fetchItemData();
  }, [id]);

  const { postType, title, description, contactInfo, category, location, dateLost } = item;

  // Submit handler for recovery data
  // const handleRecoverySubmit = async () => {
  //   const recoveryData = {
  //     recoveredLocation,
  //     recoveredDate,
  //     recoveredBy: {
  //       name: user?.displayName,
  //       email: user?.email,
  //       photo: user?.photoURL,
  //     },
  //   };

  //   try {
  //     // Save recovery data
  //     await axios.post(
  //       `${import.meta.env.VITE_API_URL}/recoverItem`,
  //       recoveryData
  //     );

  //     // Update item status
  //     await axios.put(`${import.meta.env.VITE_API_URL}/updateItem/${id}`, {
  //       status: "recovered",
  //     });

  //     // alert("Item marked as recovered successfully!");
  //     Swal.fire({
  //             position: "center",
  //             icon: "success",
  //             title: "Item Has been added to recovered items list.",
  //             showConfirmButton: false,
  //             timer: 1500,
  //           });
  //     onClose();
  //     navigate("/allRecovered");
  //   } catch (error) {
  //     console.error("Error recovering item:", error);
  //   }
  // };

  const handleRecoverySubmit = async () => {
    if (item.status === "recovered") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "This item is already marked as recovered!",
      });
      return;
    }

    const recoveryData = {
      recoveredLocation,
      recoveredDate,
      recoveredBy: {
        name: user?.displayName,
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

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item has been added to recovered items list.",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose();
      navigate("/allRecovered");
    } catch (error) {
      console.error("Error recovering item:", error);
    }
  };


  return (
    <div className="container px-8 my-8 mx-auto dark:bg-gray-900">
      <Helmet>
        <title>Post Details | LostFinder</title>
      </Helmet>
      <div className="px-6 py-8 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {title}
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
        <p className="mt-4 text-gray-600 dark:text-gray-300">{category}</p>
        <p className="mt-4 text-gray-600 dark:text-gray-300">{dateLost}</p>
        <p className="mt-4 text-gray-600 dark:text-gray-300">{location}</p>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Contact Info:
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {contactInfo?.name}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {contactInfo?.email}
          </p>
        </div>

        <div className="mt-8">
          {/* <Button
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            onPress={onOpen}
          >
            {postType === "Lost" ? "Found This!" : "This is Mine!"}
          </Button> */}

          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            onPress={() => {
              if (item.status === "recovered") {
                Swal.fire({
                  icon: "warning",
                  title: "This item is already marked as recovered!",
                  text: "You cannot add it to the recovered items list again.",
                  confirmButtonText: "OK",
                });
                return;
              }
              onOpen(); // Open the modal only if the status is not recovered
            }}
          >
            {postType === "Lost" ? "Found This!" : "This is Mine!"}
          </Button>
        </div>
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
              <ModalHeader className="text-gray-800 dark:text-white">
                Recover Item
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-wrap gap-4">
                  <div className="w-full md:w-1/2">
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">
                      User Name:
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.displayName}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">
                      User Email:
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="w-full md:w-1/2">
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">
                      User Photo:
                    </label>
                    <input
                      type="url"
                      defaultValue={user?.photoURL}
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block mb-2 text-gray-700 dark:text-gray-300">
                      Recovered Location:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter recovered location"
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                      value={recoveredLocation}
                      onChange={(e) => setRecoveredLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">
                    Recovered Date:
                  </label>
                  <DatePicker
                    selected={recoveredDate}
                    onChange={(date) => setRecoveredDate(date)}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="dark:bg-gray-700 dark:text-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleRecoverySubmit}
                  className="dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
                >
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



