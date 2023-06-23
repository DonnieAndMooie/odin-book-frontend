import React, { useEffect, useState } from "react";
import Header from "./Header";
import User from "./User";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
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
      const filteredData = data.filter((user) => user._id !== currentUserID);
      setUsers(filteredData);
    }
    if (localStorage.getItem("token")) {
      fetchUsers();
    }
  }, []);
  return (
    <div>
      <Header />
      {users.map((user) => <User key={user._id} user={user} key={user._id} />)}
    </div>
  );
}
