import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  async function submitHandler(e) {
    // Validate signup
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const name = document.getElementById("name").value;

    // Check passwords match
    if (password !== confirmPassword) {
      const error = document.querySelector(".error");
      error.classList.remove("hide");
      return;
    }

    // Create new account
    const response = await fetch("https://purple-surf-7233.fly.dev/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    const data = await response.json();

    // If errors are returned, display errors
    if (Array.isArray(data)) {
      setErrors(data);
    } else {
      // Log user in
      navigate("/login");
    }
  }

  return (
    <div className="sign-up-page">
      <div className="left">
        <h1>Sign Up To OdinBook</h1>
      </div>
      <div className="sign-up">
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="form-item">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-item">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" />
          </div>
          <div className="form-item">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password" />
          </div>
          <p className="error hide">Passwords do not match</p>
          {errors.length > 0 && errors.map((error, i) => <p className="error" key={i}>{error.msg}</p>)}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
