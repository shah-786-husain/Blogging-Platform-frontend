import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { BaseUrl, delet, get } from "../services/Endpoint";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loadData, setLoadData] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async (postId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmed) {
      try {
        const response = await delet(`/blog/delete/${postId}`);
        const data = response.data;

        if (data.success) {
          toast.success(data.message || "Post deleted successfully!");
          setLoadData(!loadData);
        } else {
          toast.error("Failed to delete the post.");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(
          error?.response?.data?.message || "Something went wrong. Try again."
        );
      }
    }
  };

  const handleUpdate = (postId) => {
    console.log("Update clicked for Post ID:", postId);
    navigate(`/dashboard/update-post/${postId}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await get("/blog/GetPosts");
        const data = response.data;
        setPosts(data.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [loadData]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-center text-dark text-3xl font-bold mb-8">
        All Posts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg flex flex-col"
            >
              <img
                src={`${BaseUrl}/images/${post.image}`}
                alt={post.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 flex-grow">
                <h5 className="text-xl font-semibold mb-2">{post.title}</h5>
                <p className="text-gray-300 text-sm">
                  {post.description
                    ? post.description.slice(0, 120) + "..."
                    : "No description available."}
                </p>
              </div>

              <div className="px-4 py-3 bg-gray-900 flex justify-between">
                <button
                  onClick={() => handleDelete(post._id)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm transition"
                >
                  <FaTrashAlt /> Delete
                </button>

                <button
                  onClick={() => handleUpdate(post._id)}
                  className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-md text-sm transition"
                >
                  <FaEdit /> Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white col-span-full text-center text-lg">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
}
