import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import Loading from "../images/Spinner-1s-200px.gif";

export default function Feed({ posts, otherPosts }) {
  if (otherPosts.length === 0) {
    return (
      <img src={Loading} alt="Loading" className="loading" />
    );
  }
  return (
    <div className="posts">
      <h2>Posts From Friends</h2>
      {posts.map((post, i) => (
        <Post post={post} key={post._id} />
      ))}
      <h2 className="other">Other Posts</h2>
      {otherPosts.map((post, i) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
}
