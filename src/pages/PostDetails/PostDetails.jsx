import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import axios from "axios";

const PostDetails = () => {
  const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const [startDate, setStartDate] = useState(new Date());
  const [item, setItem] = useState({});
//   const navigate = useNavigate();

  const fetchItemData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/item/${id}`
    );
    setItem(data);
    // setStartDate(new Date(data.dateLost));
  };

  useEffect(() => {
    fetchItemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const {
    _id,
    postType,
    thumbnail,
    title,
    category,
    dateLost,
    location,
    // postedAt,
    description,
    contactInfo
  } = item || {};

  return (
    <div className="container px-8 my-8 mx-auto">
      {/* Job Details */}
      <div className="px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          {dateLost && (
            <span className="text-sm font-light text-gray-800 ">
              Date: {format(new Date(dateLost), "P")}
            </span>
          )}
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
            {category}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
            {title}
          </h1>

          <p className="mt-2 text-lg text-gray-600 ">{description}</p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">Contact Info:</p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm text-gray-600 ">
                Name: {contactInfo?.name}
              </p>
              <p className="mt-2 text-sm  text-gray-600 ">
                Email: {contactInfo?.email}
              </p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img src={contactInfo?.photo} alt="" />
            </div>
          </div>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            {location}
          </p>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            {postType}
          </p>
        </div>
      </div>

      {/* <div className="flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 ">
            Deadline: 28/05/2024
          </span>
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
            Web Development
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
            Web Development
          </h1>

          <p className="mt-2 text-lg text-gray-600 ">
            Dramatically redefine bleeding-edge infrastructures after
            client-focused value. Intrinsicly seize user-centric partnerships
            through out-of-the-box architectures. Distinctively.
          </p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">
            Buyer Details:
          </p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm  text-gray-600 ">
                Name: Programming-Hero Instructors
              </p>
              <p className="mt-2 text-sm  text-gray-600 ">
                Email: instructors@programming-hero.com
              </p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img
                src="https://i.ibb.co.com/qsfs2TW/Ix-I18-R8-Y-400x400.jpg"
                alt=""
              />
            </div>
          </div>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            Range: $500 - $600
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default PostDetails;
