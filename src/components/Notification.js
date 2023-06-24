import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Notification({ userID }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUsers() {
      const { token } = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`https://purple-surf-7233.fly.dev/users/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
    }
    fetchUsers();
  }, []);

  async function acceptRequest() {
    const { token } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`https://purple-surf-7233.fly.dev/friend-request-accept/${userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const storedUser = JSON.parse(localStorage.getItem("token"));
    storedUser.user = data.user;
    localStorage.setItem("token", JSON.stringify(storedUser));

    window.location.reload();
  }

  async function rejectRequest() {
    const { token } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`https://purple-surf-7233.fly.dev/friend-request-reject/${userID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const storedUser = JSON.parse(localStorage.getItem("token"));
    storedUser.user = data.user;
    localStorage.setItem("token", JSON.stringify(storedUser));

    window.location.reload();
  }

  if (user) {
    return (
      <div className="notification">
        <img src={user.picture} alt="User" onClick={() => navigate(`/${userID}`)} />
        <h3>{`${user.name} has sent you a friend request`}</h3>
        <button onClick={acceptRequest} className="accept-request">Accept</button>
        <button className="reject-request" onClick={rejectRequest}>Reject</button>
      </div>
    );
  }
}
