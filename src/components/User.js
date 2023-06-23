import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function User({ user }) {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("token")).user;
  const currentUserFriends = currentUser.friends;
  const requestsReceived = currentUser.requests_received;

  let button;
  if (currentUserFriends.includes(user._id)) {
    button = <button>Friends</button>;
  } else if (requestsReceived.includes(user._id)) {
    button = <button>+ Accept Request</button>;
  } else {
    button = <button>Send Request</button>;
  }

  return (
    <div className="user-item" onClick={() => navigate(`/${user._id}`)}>
      <img src={user.picture} alt="User" />
      <h2>{user.name}</h2>
      {button}
    </div>
  );
}
