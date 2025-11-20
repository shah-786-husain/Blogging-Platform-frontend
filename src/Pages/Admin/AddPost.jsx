import React, { useState } from "react";
import { post } from "../../services/Endpoint";
import toast from "react-hot-toast";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  console.log("image", image);

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image) formData.append("postimg", image);

      formData.append("title", title);
      formData.append("desc", description);

      const response = await post("/blog/create", formData);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setImage(null);
        setDescription("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center px-4 py-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white py-4 text-center">
            <h2 className="text-xl font-semibold">Add New Post</h2>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="space-y-5">
              {/* Image Upload */}
              <div>
                <label htmlFor="image" className="block font-medium mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="block w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Title */}
              <div>
                <label htmlFor="postTitle" className="block font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="postTitle"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="postDescription"
                  className="block font-medium mb-1"
                >
                  Description
                </label>
                <textarea
                  id="postDescription"
                  rows="6"
                  placeholder="Write your post description here"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  onClick={handleSumbit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-200"
                >
                  Submit Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
