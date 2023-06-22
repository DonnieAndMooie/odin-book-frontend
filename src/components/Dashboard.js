import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("no token");
      return navigate("/login");
    }
    console.log("token");
  }, []);
  return (
    <div>
      <Header />
    </div>
  );
}
