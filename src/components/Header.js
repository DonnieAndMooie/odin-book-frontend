import React, { useEffect } from "react";

export default function Header() {
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

  const profilePic = JSON.parse(localStorage.getItem("token")).user.picture;

  return (
    <header>
      <h2>OdinBook</h2>
      <div className="user">
        {profilePic && <img src={profilePic} alt="user pic" className="user-pic" />}
        <div className="option hide">View Profile</div>
        <div className="option hide">View Friends</div>
        <div className="option hide">Log Out</div>
      </div>
    </header>
  );
}
