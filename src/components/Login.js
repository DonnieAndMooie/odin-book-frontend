import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  async function sumbmitHandler(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const response = await fetch("https://purple-surf-7233.fly.dev/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.token) {
      localStorage.setItem("token", JSON.stringify(data));
      return navigate("/dashboard");
    }
    const error = document.querySelector(".error");
    error.classList.remove("hide");
  }

  return (
    <div className="login-page">
      <div className="left">
        <h1>Welcome To OdinBook</h1>
        <p className="intro"><strong>The best place to connect with friends</strong></p>
      </div>
      <div className="login">
        <form onSubmit={(e) => sumbmitHandler(e)}>
          <div className="form-item">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" />
          </div>
          <button>Log In</button>
          <p className="error hide">Incorrect email or password</p>
          <p>
            Don't have an account?
            {" "}
            <Link to="/sign-up">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
