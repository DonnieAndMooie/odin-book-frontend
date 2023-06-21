import React from "react";
import "../stylesheets/Login.css";

export default function Login() {
  return (
    <div className="login-page">
      <div className="left">
        <h1>Welcome To OdinBook</h1>
        <p className="intro"><strong>The best place to connect with friends</strong></p>
      </div>
      <div className="login">
        <form>
          <div className="form-item">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" />
          </div>
          <button>Log In</button>
          <p>Don't have an account? Sign Up</p>
        </form>
      </div>
    </div>
  );
}
