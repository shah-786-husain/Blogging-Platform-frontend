import React from "react";
import { FaHome, FaPlusSquare, FaUsers, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-gray-900 text-white h-screen w-64 flex flex-col shadow-lg">
      <div className="p-6">
        <ul className="space-y-5">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center text-white hover:text-green-400 transition-colors"
            >
              <FaHome className="mr-3 text-lg" /> Dashboard
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/addpost"
              className="flex items-center text-white hover:text-green-400 transition-colors"
            >
              <FaPlusSquare className="mr-3 text-lg" /> Add Post
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/users"
              className="flex items-center text-white hover:text-green-400 transition-colors"
            >
              <FaUsers className="mr-3 text-lg" /> All Users
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/allposts"
              className="flex items-center text-white hover:text-green-400 transition-colors"
            >
              <FaFileAlt className="mr-3 text-lg" /> All Posts
            </Link>
          </li>

          {/* Example if you enable Comments */}
          {/* <li>
            <a
              href="#"
              className="flex items-center text-white hover:text-green-400 transition-colors"
            >
              <FaComments className="mr-3 text-lg" /> All Comments
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
