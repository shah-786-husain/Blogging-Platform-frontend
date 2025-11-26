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
      // Make sure your BaseUrl is correct: http://localhost:3000/api
      const req = await post("/auth/login", value);

      const res = req?.data;

      if (req.status === 200 && res?.success) {
        dispatch(setUser(res.user));
        toast.success(res.message || "Login successful!");
        navigate("/");
      } else {
        toast.error(res?.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);

      const msg =
        error?.response?.data?.message ||
        "Unable to login. Please check your server or network.";

      toast.error(msg);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center py-6">
      <div className="w-full flex flex-col items-center px-4">
        <div className="mb-6">
          <Link
            to="/"
            className="text-lg font-bold text-blue-600 hover:underline"
          >
            Back to Home Page
          </Link>
        </div>

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
                value={value.email}
                placeholder="Enter your email"
                required
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
                name="password"
                onChange={handleChange}
                value={value.password}
                placeholder="Enter your password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
            >
              Login
            </button>
          </form>

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
