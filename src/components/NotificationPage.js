import React from "react";
import Header from "./Header";
import Notification from "./Notification";

export default function NotificationPage() {
  const notifications = JSON.parse(localStorage.getItem("token")).user.requests_received;

  // Convert array of notifications into elements
  let notificationsElement;
  if (notifications.length === 0) {
    notificationsElement = <h3>You have no new notifications</h3>;
  } else {
    notificationsElement = (
      <div>
        {notifications.map((id) => <Notification key={id} userID={id} />)}
      </div>
    );
  }

  return (
    <div className="notifications-page">
      <Header />
      <h2>Notifications</h2>
      {notificationsElement}
    </div>
  );
}
