import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar></Navbar>

      {/* Dynamic Contents */}
      <div className="min-h-[calc(100vh-306px)] bg-white dark:bg-black">
        <Outlet></Outlet>
      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
