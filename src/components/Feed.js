import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import Unliked from "../images/unliked.png";
import Comment from "../images/comment.png";
import Share from "../images/share.png";

export default function Feed({ posts }) {
  const navigate = useNavigate();
  return (
    <div>
      {posts.map((post, i) => (
        <div className="post" key={i}>
          <div className="post-header">
            <div className="post-user" onClick={() => navigate(`/${post.author._id}`)}>
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
