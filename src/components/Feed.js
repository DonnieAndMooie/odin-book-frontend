import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";

export default function Feed({ posts, otherPosts }) {
  return (
    <div className="posts">
      <h2>Posts From Friends</h2>
      {posts.map((post, i) => (
        <Post post={post} key={post._id} />
      ))}
      <h2>Other Posts</h2>
      {otherPosts.map((post, i) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
}
