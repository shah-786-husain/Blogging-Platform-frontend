import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl, post } from "../services/Endpoint";
import { removeUser } from "../redux/AuthSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      const request = await post("/auth/logout");
      const response = request.data;
      if (request.status === 200) {
        navigate("/login");
        dispatch(removeUser());
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="w-full bg-blue-700 text-light-600 px-6 py-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link to={"/"}>
        <h1 className="text-2xl font-bold font-serif tracking-wide text-yellow-500 ">
          Blogging Platform
        </h1>
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-4 relative">
        {!user ? (
          <Link to={"/login"}>
            <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all">
              Sign in
            </button>
          </Link>
        ) : (
          <div className="relative">
            {/* Avatar */}
            <div
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <img
                src={`${BaseUrl}/images/${user.profile}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Dropdown */}
            {openDropdown && (
              <ul className="absolute right-0 mt-2 w-40 bg-gray-500 text-white rounded-lg shadow-lg overflow-hidden z-50">
                {user.role === "admin" && (
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-dark-600 text-white"
                      to="/dashboard"
                      onClick={() => setOpenDropdown(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}

                <li>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-700 text-white"
                    to={`/profile/${user._id}`}
                    onClick={() => setOpenDropdown(false)}
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
