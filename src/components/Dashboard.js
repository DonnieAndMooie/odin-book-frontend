import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Feed from "./Feed";
import PostForm from "./PostForm";

export default function Dashboard({ setAllUsers }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
  useEffect(() => {
    // Fetch posts from friends first
    async function fetchPosts() {
      const { token } = JSON.parse(localStorage.getItem("token"));
      const response = await fetch("https://purple-surf-7233.fly.dev/timeline", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPosts(data);
    }
    // Only run if logged in
    if (localStorage.getItem("token")) {
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    // Fetch posts not from friends
    async function fetchOtherPosts() {
      const { token } = JSON.parse(localStorage.getItem("token"));
      const response = await fetch("https://purple-surf-7233.fly.dev/other-posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOtherPosts(data);
    }
    if (localStorage.getItem("token")) {
      fetchOtherPosts();
    }
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      // Fetch all users
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
    // Redirect to login if not logged in
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
  }, []);
  return (
    <div className="dashboard">
      <Header />
      <div className="header-gap" />
      <PostForm setPosts={setPosts} posts={posts} />
      <Feed posts={posts} otherPosts={otherPosts} />
    </div>
  );
}
