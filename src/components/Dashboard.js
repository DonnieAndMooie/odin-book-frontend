import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Feed from "./Feed";
import PostForm from "./PostForm";

export default function Dashboard({ setAllUsers }) {
  const navigate = useNavigate();
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
    }
    if (localStorage.getItem("token")) {
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      const { token } = JSON.parse(localStorage.getItem("token"));
      const response = await fetch("https://purple-surf-7233.fly.dev/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAllUsers(data);
    }
    if (localStorage.getItem("token")) {
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="header-gap" />
      <PostForm setPosts={setPosts} posts={posts} />
      <Feed posts={posts} />
    </div>
  );
}
