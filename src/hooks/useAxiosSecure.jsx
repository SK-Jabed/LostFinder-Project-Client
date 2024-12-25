import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("Error Caught in The Interceptor", error);

        if (error.status === 401 || error.status === 403) {
          console.log("Need to Log Out The User");
          logOut()
            .then(() => {
              console.log("Logged Out User");
              navigate("/auth/login");
            })
            .catch((error) => console.log(error));
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;