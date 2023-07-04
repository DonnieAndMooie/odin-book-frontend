import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Unliked from "../images/unliked.png";
import Share from "../images/share.png";
import Liked from "../images/liked.png";

export default function Comment({ comment }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes.length);

  // Check if post has previously been liked
  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (comment.likes.includes(JSON.parse(localStorage.getItem("token")).user._id.toString())) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, []);

  async function likeComment() {
    const userID = JSON.parse(localStorage.getItem("token")).user._id;
    const { token } = JSON.parse(localStorage.getItem("token"));

    // If previously liked, unlike the comment
    if (comment.likes.includes(userID)) {
      const filteredLikes = comment.likes.filter((id) => id !== userID);
      const response = await fetch(`https://purple-surf-7233.fly.dev/posts/${comment.post}/comments/${comment._id}`, {
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
      comment.likes = filteredLikes;
      setLikes(comment.likes.length);
      setIsLiked(false);
    } else {
      // Like the comment
      const response = await fetch(`https://purple-surf-7233.fly.dev/posts/${comment.post}/comments/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          likes: [...comment.likes, userID],
        }),
      });
      const data = await response.json();
      comment.likes.push(userID);
      setLikes(comment.likes.length);
      setIsLiked(true);
    }
  }
  return (
    <div className="comment">
      <div className="comment-header" onClick={() => navigate(`/${comment.author._id}`)}>
        <div className="comment-user">
          <img src={comment.author.picture} alt={comment.author.name} />
          <p>{comment.author.name}</p>
        </div>
        <p className="comment-date">{`${formatDistanceToNow(new Date(comment.timestamp))} ago`}</p>
      </div>

      {comment.text}
      <div className="comment-footer">
        <div className="footer-item" onClick={likeComment}>
          <p className="likes-count">{likes}</p>
          {!isLiked && <img src={Unliked} alt="Unliked" />}
          {isLiked && <img src={Liked} alt="Liked" />}
          <p>Like</p>
        </div>
        <div className="footer-item">
          <img src={Share} alt="Share" />
          <p>Share</p>
        </div>
      </div>
    </div>
  );
}
