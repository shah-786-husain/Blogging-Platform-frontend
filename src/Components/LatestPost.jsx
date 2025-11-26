import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl, get } from "../services/Endpoint";

export default function LatestPost() {
  const navigation = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const request = await get("/blog/GetPosts");
        const response = request.data;
        setBlogs(response?.posts || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-center text-white text-3xl font-bold mb-10">
        Latest Posts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((elem) => (
            <div
              key={elem._id}
              className="bg-gray-900 rounded-xl border border-green-600 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <img
                src={
                  elem.image
                    ? `${BaseUrl}/images/${elem.image}`
                    : "https://placehold.co/300x200?text=No+Image"
                }
                alt={elem.title}
                className="w-full h-48 object-cover"
              />

              {/* Content */}
              <div className="p-5 text-white">
                <h3 className="text-xl font-semibold mb-2">
                  {elem.title || "Untitled Post"}
                </h3>

                <p className="text-gray-300 mb-4">
                  {truncateText(elem.desc, 20)}
                </p>

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200"
                  onClick={() => navigation(`/blog/${elem._id}`)}
                >
                  Read Article
                </button>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-center text-white mt-5 col-span-3">
            No posts available.
          </h5>
        )}
      </div>
    </div>
  );
}
