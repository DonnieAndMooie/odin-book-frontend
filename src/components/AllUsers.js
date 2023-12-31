import React, { useEffect, useState } from "react";
import Header from "./Header";
import User from "./User";
import Loading from "../images/Spinner-1s-200px.gif";

export default function AllUsers() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    async function fetchUsers() {
      // Fetch all users from DB
      const currentUserID = JSON.parse(localStorage.getItem("token")).user._id;
      const { token } = JSON.parse(localStorage.getItem("token"));
      const response = await fetch("https://purple-surf-7233.fly.dev/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // Remove current user
      const filteredData = data.filter((user) => user._id !== currentUserID);
      setUsers(filteredData);
    }
    if (localStorage.getItem("token")) {
      fetchUsers();
    }
  }, []);

  // Return loading when awaiting fetch
  if (users === null) {
    return (
      <div className="loading-div">
        <Header />
        <img src={Loading} alt="Loading" className="loading" />
      </div>

    );
  }

  // Return all users
  return (
    <div>
      <Header />
      {users.map((user) => <User key={user._id} user={user} key={user._id} />)}
    </div>
  );
}
