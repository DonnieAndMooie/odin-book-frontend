import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";

export default function Feed({ posts }) {
  return (
    <div className="posts">
      {posts.map((post, i) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
}
