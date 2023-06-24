import React, { useEffect, useState } from "react";
import Header from "./Header";
import Post from "./Post";
import FriendButton from "./FriendButton";

export default function UserPage({ user }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("token"));
    async function fetchPosts() {
      const response = await fetch("https://purple-surf-7233.fly.dev/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const filteredPosts = data.filter((post) => (
        post.author._id === user._id
      ));
      setPosts(filteredPosts);
    }
    fetchPosts();
  }, []);

  function toggleTextarea() {
    const textarea = document.getElementById("bio");
    const confirmBtn = document.querySelector(".confirm-edit-bio");
    textarea.classList.toggle("hide");
    confirmBtn.classList.toggle("hide");
  }

  async function submitBio() {
    const bio = document.getElementById("bio").value;
    const { token } = JSON.parse(localStorage.getItem("token"));
    const response = await await fetch(`https://purple-surf-7233.fly.dev/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bio,
      }),
    });
    const bioDiv = document.querySelector(".bio-text");
    bioDiv.textContent = bio;
    toggleTextarea();
  }

  return (
    <div className="user-page">
      <Header />
      <div className="header-gap" />
      <div className="user-page-header">
        <img src={user.picture} alt="Profile Pic" />
        <h2>{user.name}</h2>
        {user._id !== JSON.parse(localStorage.getItem("token")).user._id
          && <FriendButton user={user} />}
        <div className="bio">
          <div className="bio-top">
            <p className="bio-text">{user.bio}</p>
            {localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).user._id === user._id
            && <button onClick={toggleTextarea} className="edit-bio">Edit Bio</button>}
          </div>
          <textarea className="hide" name="bio" id="bio" />
          <button onClick={submitBio} className="confirm-edit-bio hide">Confirm Changes</button>
        </div>
      </div>
      <div className="user-page-bottom">
        <div className="posts">
          {posts.map((post) => <Post post={post} key={post._id} />)}
        </div>
        <div className="friends">
          friends
        </div>
      </div>
    </div>
  );
}
