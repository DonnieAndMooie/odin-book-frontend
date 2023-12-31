import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FacebookLoginBtn from "./FacebookLoginBtn";

export default function Login() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // If token saved, login automatically
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [loggedIn]);

  async function submitHandler(e) {
    // Login with email and password
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
    if (data.token) {
      localStorage.setItem("token", JSON.stringify({ token: data.token, user: data.user, timestamp: Date.now() }));
      setLoggedIn(true);
      return navigate("/dashboard");
    }
    const error = document.querySelector(".error");
    error.classList.remove("hide");
  }

  async function guestLogin() {
    // Log in with guest account details
    document.getElementById("email").value = "guest@email.com";
    document.getElementById("password").value = "guestPassword";
    const loginBtn = document.querySelector(".login-btn");
    loginBtn.click();
  }

  return (
    <div className="login-page">
      <div className="left">
        <h1>Welcome To OdinBook</h1>
        <p className="intro"><strong>The best place to connect with friends</strong></p>
      </div>
      <div className="login">
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="form-item">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" />
          </div>
          <button className="login-btn">Log In</button>
          <p className="error hide">Incorrect email or password</p>
          <p className="or">or</p>
          <button className="guest-login" type="button" onClick={guestLogin}>Log In As A Guest</button>
          <FacebookLoginBtn setLoggedIn={setLoggedIn} />
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
