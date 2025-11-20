import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Dashboard/Sidebar";
import { useSelector } from "react-redux";

export default function Adminlayout() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log("user from redux", user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />

      {/* Layout Wrapper */}
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}
