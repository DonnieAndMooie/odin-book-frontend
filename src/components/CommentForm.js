import React from "react";

export default function CommentForm({ postId, setComments, comments }) {
  async function submitComment() {
    const text = document.getElementById(`comment-${postId}`).value;
    const { token } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`https://purple-surf-7233.fly.dev/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
        author: JSON.parse(localStorage.getItem("token")).user,
      }),
    });
    const data = await response.json();
    data.author = JSON.parse(localStorage.getItem("token")).user;
    if (data.text) {
      setComments([data, ...comments]);
    }
    document.getElementById(`comment-${postId}`).value = "";
  }
  return (
    <div className="comment-form">
      <input type="text" id={`comment-${postId}`} name="comment" placeholder="Add a comment..." />
      <button type="submit" onClick={submitComment}>Send</button>
    </div>
  );
}
