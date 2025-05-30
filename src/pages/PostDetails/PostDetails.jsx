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

  const {
    postType,
    title,
    description,
    contactInfo,
    category,
    location,
    dateLost,
  } = item;


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
    <div className="container my-8 mx-auto dark:bg-gray-900">
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
              onOpen();
            }}
          >
            {postType === "Lost" ? "Found This!" : "This is Mine!"}
          </Button>
        </div>
      </div>

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
                  className=" text-white bg-red-500 hover:bg-red-700"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleRecoverySubmit}
                  className="bg-green-500 text-white hover:bg-green-700"
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
