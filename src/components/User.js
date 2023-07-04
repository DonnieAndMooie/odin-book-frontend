import React from "react";
import { useNavigate } from "react-router-dom";
import FriendButton from "./FriendButton";

export default function User({ user }) {
  const navigate = useNavigate();

  // Return user element which links to user page
  return (
    <div className="user-item" onClick={() => navigate(`/${user._id}`)}>
      <img src={user.picture} alt="User" />
      <h2>{user.name}</h2>
      <FriendButton user={user} />
    </div>
  );
}
