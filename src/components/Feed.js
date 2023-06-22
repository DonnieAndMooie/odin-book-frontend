import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Unliked from "../images/unliked.png";
import Comment from "../images/comment.png";
import Share from "../images/share.png";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      const { token } = JSON.parse(localStorage.getItem("token"));
      const response = await fetch("https://purple-surf-7233.fly.dev/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPosts(data);
      console.log(data);
    }
    fetchPosts();
  }, []);
  return (
    <div>
      {posts.map((post, i) => (
        <div className="post" key={i}>
          <div className="post-header">
            <div className="post-user">
              <img src={post.author.picture} alt="User" />
              <p>{post.author.name}</p>
            </div>
            <p>{`${formatDistanceToNow(new Date(post.timestamp))} ago`}</p>
          </div>
          <p className="content">{post.text}</p>
          <div className="post-footer">
            <div className="footer-item">
              <p>{post.likes.length}</p>
              <img src={Unliked} alt="Unliked" />
              <p>Like</p>
            </div>
            <div className="footer-item">
              <p>{post.comments ? post.comments.length : "0"}</p>
              <img src={Comment} alt="Comment" />
              <p>Comment</p>
            </div>
            <div className="footer-item">
              <img src={Share} alt="Share" />
              <p>Share</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
