import React from "react";
import logo from "../assets/logo/logo.png";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle ";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="navbar bg-white dark:bg-black shadow-sm w-full px-10">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-auto h-7" src={logo} alt="" />
          <span className="font-bold">SoloSphere</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/allItems">All Items</Link>
          </li>

          {!user && (
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          )}
        </ul>

        <ThemeToggle></ThemeToggle>

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title={user?.displayName} className="w-11 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/addItems" className="justify-between">
                  Add Items
                </Link>
              </li>
              <li>
                <Link to="/myItems">My Items</Link>
              </li>
              <li>
                <Link to="/allRecovered">Recovered Items</Link>
              </li>
              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="bg-gray-200 block text-center"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;