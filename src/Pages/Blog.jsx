import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseUrl, get, post } from "../services/Endpoint";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function Blog() {
  const { postId } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [singlePost, setSinglePost] = useState(null);
  const [comment, setComment] = useState("");
  const [loaddata, setLoaddata] = useState(false);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const request = await get(`/public/Singlepost/${postId}`);
        setSinglePost(request.data.Post);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePost();
  }, [loaddata, postId]);

  const onSubmitComment = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login");
      return;
    }

    try {
      const request = await post("/comment/addcomment", {
        comment,
        postId,
        userId: user._id,
      });

      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setComment("");
        setLoaddata((prev) => !prev);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Try again.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-10 text-white px-4">
      {/* Title */}
      <h1 className="font-bold text-4xl md:text-5xl mb-6">
        {singlePost?.title}
      </h1>

      {/* Image */}
      <img
        src={singlePost && `${BaseUrl}/images/${singlePost.image}`}
        alt="Blog"
        className="w-full rounded-lg mb-6 max-h-[500px] object-cover shadow-lg"
      />

      {/* Description */}
      <p className="text-lg leading-relaxed mb-10 opacity-90">
        {singlePost?.desc}
      </p>

      <hr className="border-gray-700 my-8" />

      {/* Comment Form */}
      <h3 className="text-2xl font-semibold mb-4">Leave a Comment</h3>

      <form onSubmit={onSubmitComment} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Comment</label>
          <textarea
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write your comment here..."
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-white font-medium shadow-md transition"
        >
          Submit Comment
        </button>
      </form>

      <hr className="border-gray-700 my-8" />

      {/* Comments Section */}
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>

      <div className="space-y-4">
        {singlePost?.comments?.map((elem, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg flex gap-4 items-start"
          >
            <img
              src={`${BaseUrl}/images/${elem.userId.profile}`}
              alt={elem.userId.FullName}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <h5 className="font-semibold text-lg">{elem.userId.FullName}</h5>
              <p className="opacity-90">{elem.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
