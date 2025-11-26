import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/Endpoint";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue({ ...value, image: file });
  };

  const handleImageClick = () => {
    document.getElementById("image").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("FullName", value.fullName);
    formData.append("email", value.email);
    formData.append("password", value.password);
    if (value.image) formData.append("profile", value.image);

    try {
      const response = await post("/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = response.data;
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("register error:", error);
      toast.error(error.response?.data?.message || "Internal Server Error");
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <div className="mb-4 text-center">
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Back to Home Page
          </Link>
        </div>

        <h1 className="text-xl font-bold text-center mb-4">
          Create an account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Image Upload */}
          <div className="text-center">
            <label className="block text-gray-600 mb-2 font-medium">
              Profile Picture
            </label>

            <div className="flex justify-center">
              <img
                src={
                  value.image
                    ? URL.createObjectURL(value.image)
                    : "https://via.placeholder.com/100?text=Avatar"
                }
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
                onClick={handleImageClick}
              />
            </div>

            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your full name"
              required
              value={value.fullName}
              onChange={(e) => setValue({ ...value, fullName: e.target.value })}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
              required
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
              required
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
