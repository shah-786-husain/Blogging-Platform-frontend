import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/Endpoint";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/AuthSlice";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await post("/auth/login", value);
      const response = request.data;

      if (request.status === 200 && response.success) {
        dispatch(setUser(response.user));
        toast.success(response.message || "Login successful!");
        navigate("/");
      } else {
        toast.error(response.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center py-6">
      <div className="w-full flex flex-col items-center px-4">
        {/* Back to Home */}
        <div className="mb-6">
          <Link
            to="/"
            className="text-lg font-bold text-blue-600 hover:underline"
          >
            Back to Home Page
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white shadow-lg rounded-lg w-full max-w-sm p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Login Here</h1>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Your email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                id="email"
                placeholder="Enter your email"
                required
                value={value.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                onChange={handleChange}
                value={value.password}
                name="password"
                id="password"
                placeholder="Enter your password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-4 text-sm text-gray-600">
            Don’t have an account yet?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
