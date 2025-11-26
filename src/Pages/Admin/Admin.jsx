import React, { useEffect, useState } from "react";
import { get } from "../../services/Endpoint";

export default function Admin() {
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      try {
        const request = await get("/dashboard");
        const response = request.data;

        if (request.status === 200) {
          setPost(response.Posts);
          setUsers(response.Users);
          setComments(response.comments);
        }
      } catch (error) {
        console.log(error);
      }
    };
    GetData();
  }, []);

  return (
    <div>
      <h2 className="text-dark text-2xl font-bold mb-6 ml-2">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="bg-blue-600 text-white rounded-lg shadow-lg p-6">
          <h5 className="text-lg font-semibold">Total Users</h5>
          <p className="text-3xl font-bold mt-2">{users?.length || 0}</p>
        </div>

        {/* Posts Card */}
        <div className="bg-green-600 text-white rounded-lg shadow-lg p-6">
          <h5 className="text-lg font-semibold">Total Posts</h5>
          <p className="text-3xl font-bold mt-2">{post?.length || 0}</p>
        </div>

        {/* Comments Card */}
        <div className="bg-yellow-500 text-white rounded-lg shadow-lg p-6">
          <h5 className="text-lg font-semibold">Total Comments</h5>
          <p className="text-3xl font-bold mt-2">{comments?.length || 0}</p>
        </div>
      </div>
    </div>
  );
}
