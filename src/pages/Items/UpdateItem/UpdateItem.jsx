import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateItem = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [item, setItem] = useState({});
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
      <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Update Lost or Found Item
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {item.postType && (
              <div className="flex flex-col gap-2 ">
                <label className="text-gray-700 " htmlFor="postType">
                  Post Type
                </label>
                <select
                  name="postType"
                  id="postType"
                  defaultValue={item.postType}
                  className="border p-2 rounded-md"
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>
            )}
            <div>
              <label className="text-gray-700 " htmlFor="thumbnail">
                Thumbnail
              </label>
              <input
                id="thumbnail"
                name="thumbnail"
                type="url"
                defaultValue={item.thumbnail}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                defaultValue={item.title}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="category">
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                defaultValue={item.category}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Date Lost</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="location">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                defaultValue={item.location}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user?.displayName}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                defaultValue={user?.email}
                readOnly
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-700 " htmlFor="description">
              Description
            </label>
            <textarea
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              name="description"
              id="description"
              defaultValue={item.description}
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
