// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";
// import { Helmet } from "react-helmet-async";

// const AddItem = () => {
//   const { user } = useAuth();
//   const [startDate, setStartDate] = useState(new Date());

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = e.target;
//     const postType = form.postType.value;
//     const thumbnail = form.thumbnail.value;
//     const title = form.title.value;
//     const category = form.category.value;
//     const dateLost = startDate;
//     const location = form.location.value;
//     const name = form.name.value;
//     const email = form.email.value;
//     const description = form.description.value;

//     const formData = {
//       postType,
//       thumbnail,
//       title,
//       category,
//       dateLost,
//       location,
//       contactInfo: {
//         email,
//         name,
//         photo: user?.photoURL,
//       },
//       postedAt: new Date(),
//       description,
//     };

//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/addItems`, formData);
//       form.reset();
//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Item Has been added.",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       navigate("/myItems");
//     } 
//     catch (err) {
//       console.log(err);
//       Swal.fire({
//         position: "center",
//         icon: "error",
//         title: "Error! Adding Operation Failed",
//       });
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
//       <Helmet>
//         <title>Add Item | LostFinder</title>
//       </Helmet>
//       <section className=" p-2 md:p-6 mx-auto bg-white rounded-md shadow-md ">
//         <h2 className="text-lg font-semibold text-gray-700 capitalize ">
//           Add Lost or Found Item
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
//             <div className="flex flex-col gap-2 ">
//               <label className="text-gray-700 " htmlFor="postType">
//                 Post Type
//               </label>
//               <select
//                 name="postType"
//                 id="postType"
//                 className="border p-2 rounded-md"
//               >
//                 <option value="Lost">Lost</option>
//                 <option value="Found">Found</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-gray-700 " htmlFor="thumbnail">
//                 Thumbnail
//               </label>
//               <input
//                 id="thumbnail"
//                 name="thumbnail"
//                 type="url"
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
//               />
//             </div>

//             <div>
//               <label className="text-gray-700 " htmlFor="title">
//                 Title
//               </label>
//               <input
//                 id="title"
//                 name="title"
//                 type="text"
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
//               />
//             </div>

//             <div>
//               <label className="text-gray-700 " htmlFor="category">
//                 Category
//               </label>
//               <input
//                 id="category"
//                 name="category"
//                 type="text"
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
//               />
//             </div>

//             <div className="flex flex-col gap-2 ">
//               <label className="text-gray-700">Date Lost/Found</label>

//               {/* Date Picker Input Field */}
//               <DatePicker
//                 className="border p-2 rounded-md"
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//               />
//             </div>

//             <div>
//               <label className="text-gray-700 " htmlFor="location">
//                 Location
//               </label>
//               <input
//                 id="location"
//                 name="location"
//                 type="text"
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
//               />
//             </div>

//             <div>
//               <label className="text-gray-700 " htmlFor="name">
//                 Name
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 defaultValue={user?.displayName}
//                 readOnly
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
//               />
//             </div>

//             <div>
//               <label className="text-gray-700 " htmlFor="emailAddress">
//                 Email Address
//               </label>
//               <input
//                 id="emailAddress"
//                 type="email"
//                 name="email"
//                 defaultValue={user?.email}
//                 readOnly
//                 className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 mt-4">
//             <label className="text-gray-700 " htmlFor="description">
//               Description
//             </label>
//             <textarea
//               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
//               name="description"
//               id="description"
//             ></textarea>
//           </div>
//           <div className="flex justify-end mt-6">
//             <button className="disabled:cursor-not-allowed px-8 py-2.5 leading-5 text-white transition-colors duration-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
//               Save
//             </button>
//           </div>
//         </form>
//       </section>
//     </div>
//   );
// };

// export default AddItem;





import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const AddItem = () => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

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
      await axios.post(`${import.meta.env.VITE_API_URL}/addItems`, formData);
      form.reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Item has been added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/myItems");
    } catch (err) {
      console.error(err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to add item!",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <Helmet>
        <title>Add Item | LostFinder</title>
      </Helmet>
      <section className="p-6 mx-auto bg-white dark:bg-gray-800 shadow-md rounded-md w-full max-w-3xl">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Add Lost or Found Item
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
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddItem;
