import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { delet, get } from "../../services/Endpoint";
import toast from "react-hot-toast";

export default function User() {
  const [Users, setUsers] = useState([]);
  const [loadedata, setLoadedata] = useState(false);

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      const response = await delet(`/dashboard/delete/${userId}`);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        setLoadedata(!loadedata);
      } else {
        toast.error("Failed to delete the user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);

      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await get("/dashboard/users");
        const data = response.data;

        setUsers(data.Users || []);
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
  }, [loadedata]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-dark text-3xl font-bold mb-6">Users</h1>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="px-4 py-3 border-b border-gray-600">#</th>
              <th className="px-4 py-3 border-b border-gray-600">Name</th>
              <th className="px-4 py-3 border-b border-gray-600">Email</th>
              <th className="px-4 py-3 border-b border-gray-600">Action</th>
            </tr>
          </thead>

          <tbody>
            {Users.length > 0 ? (
              Users.map((user, index) => (
                <tr
                  key={user._id} // ✅ FIXED KEY
                  className="hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3 border-b border-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-700">
                    {user.FullName}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-700">
                    {user.email}
                  </td>

                  <td className="px-4 py-3 border-b border-gray-700">
                    <button
                      onClick={() => handleDelete(user._id)} // ✅ FIXED DELETE
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-gray-300 border-b border-gray-700"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
