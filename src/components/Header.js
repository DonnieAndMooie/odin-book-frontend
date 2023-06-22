import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  if (localStorage.getItem("token")) {
    profilePic = JSON.parse(localStorage.getItem("token")).user.picture;
  }

  return (
    <header>
      <h2>OdinBook</h2>
      <div className="user">
        {profilePic && <img src={profilePic} alt="user pic" className="user-pic" />}
        <div className="option hide">View Profile</div>
        <div className="option hide">View Friends</div>
        <div className="option hide" onClick={logout}>Log Out</div>
      </div>
    </header>
  );
}
