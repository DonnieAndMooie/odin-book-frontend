import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function FacebookLoginBtn() {
  const navigate = useNavigate();

  const responseFacebook = async (response) => {
    if (response.accessToken) {
      const user = await fetch("https://purple-surf-7233.fly.dev/facebook-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${response.accessToken}`,
        },
      });

      const userData = await user.json();
      localStorage.setItem("token", JSON.stringify({ token: userData.token, user: userData.user }));
    }
  };

  return (
    <div className="container">
      <Card style={{ width: "100%" }}>
        <Card.Header>
          <FacebookLogin
            appId="795775025274582"
            autoLoad
            fields="name,email,picture"
            scope="openid"
            callback={responseFacebook}
            icon="fa-facebook"
          />
        </Card.Header>
      </Card>
    </div>
  );
}

export default FacebookLoginBtn;
