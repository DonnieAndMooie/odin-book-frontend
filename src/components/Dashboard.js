import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Feed from "./Feed";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
  }, []);
  return (
    <div>
      <Header />
      <Feed />
    </div>
  );
}
