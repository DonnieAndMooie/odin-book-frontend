import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import Unliked from "../images/unliked.png";
import CommentImg from "../images/comment.png";
import Share from "../images/share.png";
import Comment from "./Comment";

export default function Post({ post }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      const { token } = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`https://purple-surf-7233.fly.dev/posts/${post._id}/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setComments(data);
    }
    fetchComments();
  }, []);

  function showComments(e) {
    const comments = e.target.parentNode.parentNode.parentNode.childNodes[3];
    comments.classList.toggle("hide");
  }

  async function likePost() {
    const userID = JSON.parse(localStorage.getItem("token")).user._id;
    const { token } = JSON.parse(localStorage.getItem("token"));
    if (post.likes.includes(userID)) {
      const filteredLikes = post.likes.filter((id) => id !== userID);
      const response = await fetch(`https://purple-surf-7233.fly.dev/posts/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          likes: filteredLikes,
        }),
      });
      const data = await response.json();
      post.likes = filteredLikes;
      setLikes(post.likes.length);
    } else {
      const response = await fetch(`https://purple-surf-7233.fly.dev/posts/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          likes: [...post.likes, userID],
        }),
      });
      const data = await response.json();
      post.likes.push(userID);
      setLikes(post.likes.length);
    }
  }

  return (
    <div className="post" key={post._id}>
      <div className="post-header">
        <div className="post-user" onClick={() => navigate(`/${post.author._id}`)}>
          <img src={post.author.picture} alt="User" />
          <p>{post.author.name}</p>
        </div>
        <p>{`${formatDistanceToNow(new Date(post.timestamp))} ago`}</p>
      </div>
      <p className="content">{post.text}</p>
      <div className="post-footer">
        <div className="footer-item" onClick={likePost}>
          <p className="likes-count">{likes}</p>
          <img src={Unliked} alt="Unliked" />
          <p>Like</p>
        </div>
        <div className="footer-item" onClick={(e) => showComments(e)}>
          <p>{comments.length}</p>
          <img src={CommentImg} alt="Comment" />
          <p>Comment</p>
        </div>
        <div className="footer-item">
          <img src={Share} alt="Share" />
          <p>Share</p>
        </div>
      </div>
      <div className="comments hide">
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
