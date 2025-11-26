import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, patch, BaseUrl } from "../../services/Endpoint";
import toast from "react-hot-toast";

export default function UpdatePost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await get(`/blog/GetPosts`);
        const all = response.data.posts;

        const post = all.find((p) => p._id === id);

        if (post) {
          setTitle(post.title);
          setDescription(post.description);
          setOldImage(post.image);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id, loadData]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("desc", description);

    if (newImage) {
      formData.append("postimg", newImage); // match Multer
    }

    try {
      const response = await patch(`/blog/update/${id}`, formData);

      const data = response.data;

      if (data.success) {
        toast.success(data.message || "Post updated successfully!");
        setLoadData(!loadData);
      } else {
        toast.error("Failed to update the post.");
      }

      navigate("/dashboard/allposts");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-bold mb-4">Update Post</h2>

      <form
        onSubmit={handleUpdate}
        className="space-y-4 bg-white p-5 shadow rounded"
      >
        {/* Old Image */}
        <div>
          <label className="font-semibold">Current Image</label>
          <img
            src={`${BaseUrl}/images/${oldImage}`}
            alt="Post"
            className="w-full h-48 object-cover rounded mt-2"
          />
        </div>

        {/* Upload New Image */}
        <div>
          <label>New Image (optional)</label>
          <input
            type="file"
            onChange={(e) => setNewImage(e.target.files[0])}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Title */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="border rounded w-full p-2"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
