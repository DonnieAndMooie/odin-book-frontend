import React, { useEffect } from "react";

export default function PostForm({ setPosts, posts }) {
  async function submitHandler(e) {
    e.preventDefault();
    const text = document.querySelector("input").value;
    const { token } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch("https://purple-surf-7233.fly.dev/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
      }),
    });
    const data = await response.json();
    if (data.text) {
      setPosts([data, ...posts]);
    }
    document.querySelector("input").value = "";
  }

  let profilePic;
  if (localStorage.getItem("token")) {
    profilePic = JSON.parse(localStorage.getItem("token")).user.picture;
  }

  return (
    <div className="post-form-div">
      <form onSubmit={(e) => submitHandler(e)} id="post-form" className="post-form">
        <img src={profilePic} alt="Profile" className="user-pic" />
        <input type="text" placeholder="What's on your mind?" />
      </form>
      <button form="post-form" className="post-btn" type="submit">Post</button>
    </div>
  );
}
