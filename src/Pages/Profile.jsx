import React, { useEffect, useState } from "react";
import { FaUser, FaLock, FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl, patch } from "../services/Endpoint";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { setUser } from "../redux/AuthSlice";

export default function Profile() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      setName(user.FullName);
    }
  }, [user]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("FullName", name);
    formData.append("oldpassword", oldPassword);
    formData.append("newpassword", newPassword);
    if (profileImage) {
      formData.append("profile", profileImage);
    }
    try {
      const response = await patch(`auth/profile/${userId}`, formData);
      const data = response.data;

      if (response.status === 200) {
        toast.success(data.message);
        dispatch(setUser(data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Update Profile</h1>

      <form onSubmit={handleUpdateProfile} className="space-y-6">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center">
          <label htmlFor="profileImage" className="relative cursor-pointer">
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
              />
            ) : (
              <img
                src={`${BaseUrl}/images/${user.profile}`}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
              />
            )}

            <FaCamera className="absolute bottom-2 right-2 text-xl bg-blue-600 text-white p-2 rounded-full" />
          </label>

          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Input: Name */}
        <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
          <FaUser className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Update Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-transparent outline-none text-white"
          />
        </div>

        {/* Input: Old Password */}
        <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
          <FaLock className="text-gray-400 mr-3" />
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full bg-transparent outline-none text-white"
          />
        </div>

        {/* Input: New Password */}
        <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
          <FaLock className="text-gray-400 mr-3" />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full bg-transparent outline-none text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
