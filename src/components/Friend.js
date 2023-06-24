import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Friend({ friendID }) {
  const [friend, setFriend] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUser() {
      const { token } = JSON.parse(localStorage.getItem("token"));
      const response = await fetch(`https://purple-surf-7233.fly.dev/users/${friendID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFriend(data);
    }
    fetchUser();
  }, []);

  if (friend) {
    return (
      <div className="friend" onClick={() => navigate(`/${friendID}`)}>
        <img src={friend.picture} alt="Friend" />
        <h3>{friend.name}</h3>
      </div>
    );
  }
}
