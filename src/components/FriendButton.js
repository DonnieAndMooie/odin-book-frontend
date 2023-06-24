import React from "react";

export default function FriendButton({ user }) {
  const currentUser = JSON.parse(localStorage.getItem("token")).user;
  const currentUserFriends = currentUser.friends;
  const requestsReceived = currentUser.requests_received;
  const requestsSent = currentUser.requests_sent;

  async function unfriend(e, user) {
    e.stopPropagation();
    const { token } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`https://purple-surf-7233.fly.dev/unfriend/${user._id}`, {
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

  async function acceptRequest(e, user) {
    e.stopPropagation();
    const { token } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`https://purple-surf-7233.fly.dev/friend-request-accept/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const storedUser = JSON.parse(localStorage.getItem("token"));
    storedUser.user.requests_received.filter((id) => id !== user._id);
    storedUser.user.friends.push(user._id);
    localStorage.setItem("token", JSON.stringify(storedUser));

    window.location.reload();
  }

  async function sendRequest(e, user) {
    e.stopPropagation();
    const { token } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`https://purple-surf-7233.fly.dev/friend-request/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const storedUser = JSON.parse(localStorage.getItem("token"));
    storedUser.user.requests_sent.push(user._id);
    localStorage.setItem("token", JSON.stringify(storedUser));

    window.location.reload();
  }

  let button;
  if (currentUserFriends.includes(user._id)) {
    button = <button className="friends" onClick={(e) => unfriend(e, user)}>Friends</button>;
  } else if (requestsReceived.includes(user._id)) {
    button = <button className="accept-request" onClick={(e) => acceptRequest(e, user)}>+ Accept Request</button>;
  } else if (requestsSent.includes(user._id)) {
    button = <button className="request-sent">Request Sent</button>;
  } else {
    button = <button onClick={(e) => sendRequest(e, user)}>Send Request</button>;
  }
  return (
    button
  );
}
