import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const UpdateItem = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [itemData, setItem] = useState({});
  const navigate = useNavigate();

  const fetchItemData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/item/${id}`
    );
    setItem(data);
    setStartDate(new Date(data.dateLost));
  };

  useEffect(() => {
    fetchItemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const postType = form.postType.value;
    const thumbnail = form.thumbnail.value;
    const title = form.title.value;
    const category = form.category.value;
    const dateLost = startDate;
    const location = form.location.value;
    const name = form.name.value;
    const email = form.email.value;
    const description = form.description.value;

    const formData = {
      postType,
      thumbnail,
      title,
      category,
      dateLost,
      location,
      contactInfo: {
        email,
        name,
        photo: user?.photoURL,
      },
      postedAt: new Date(),
      description,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/updateItem/${id}`,
        formData
      );
      form.reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item Has been updated.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/myItems");
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error! Something went wrong...",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <Helmet>
        <title>Update Item | LostFinder</title>
      </Helmet>
      <section className="p-6 mx-auto bg-white dark:bg-gray-800 shadow-md rounded-md w-full max-w-3xl">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Update Lost or Found Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="postType"
                className="block text-sm text-gray-600 dark:text-gray-400"
              >
                Post Type
              </label>
              <select
                id="postType"
                name="postType"
                defaultValue={itemData.postType}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm text-gray-600 dark:text-gray-400"
              >
                Thumbnail URL
              </label>
              <input
                id="thumbnail"
                name="thumbnail"
                type="url"
                defaultValue={itemData.thumbnail}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="title"
                className="block text-sm text-gray-600 dark:text-gray-400"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={itemData.title}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm text-gray-600 dark:text-gray-400"
              >
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                defaultValue={itemData.category}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="dateLost"
                className="block text-sm text-gray-600 dark:text-gray-400"
              >
                Date Lost/Found
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm text-gray-600 dark:text-gray-400"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                defaultValue={itemData.location}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-gray-600 dark:text-gray-400"
              >
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user?.displayName}
                readOnly
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-600 dark:text-gray-400"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={user?.email}
                readOnly
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm text-gray-600 dark:text-gray-400"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              defaultValue={itemData.description}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
            ></textarea>
          </div>
          <div className="flex justify-end mt-6">
            <button className="disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateItem;