import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../images/notifications.png";

export default function Header() {
  const navigate = useNavigate();
  useEffect(() => {
    const options = document.querySelectorAll(".option");
    const user = document.querySelector(".user");
    user.addEventListener("mouseover", () => {
      for (const option of options) {
        option.classList.remove("hide");
      }
    });
    user.addEventListener("mouseout", () => {
      for (const option of options) {
        option.classList.add("hide");
      }
    });
  }, []);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  let profilePic;
  let userId;
  if (localStorage.getItem("token")) {
    profilePic = JSON.parse(localStorage.getItem("token")).user.picture;
    userId = JSON.parse(localStorage.getItem("token")).user._id;
  }
  return (
    <header>
      <h2 onClick={() => navigate("/dashboard")}>OdinBook</h2>
      <div className="notifications" onClick={() => navigate("/notifications")}>
        <img className="notifications" src={Notification} alt="Notifications" />
        {JSON.parse(localStorage.getItem("token")).user.requests_received.length > 0
          && <p>{JSON.parse(localStorage.getItem("token")).user.requests_received.length}</p>}

      </div>

      <div className="user">
        {profilePic && <img src={profilePic} alt="user pic" className="user-pic" />}
        <div className="option hide" onClick={() => navigate(`/${userId}`)}>View Profile</div>
        <div className="option hide" onClick={() => navigate("/users")}>View Users</div>
        <div className="option hide" onClick={logout}>Log Out</div>
      </div>
    </header>
  );
}
