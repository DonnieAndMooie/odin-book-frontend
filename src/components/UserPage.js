import React from "react";
import Header from "./Header";

export default function UserPage({ user }) {
  return (
    <div className="user-page">
      <Header />
      <img src={user.picture} alt="Profile Pic" />
      <h2>{user.name}</h2>
    </div>
  );
}
