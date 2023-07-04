import React from "react";
import FacebookLogin from "react-facebook-login";
import { Card } from "react-bootstrap";

function FacebookLoginBtn({ setLoggedIn }) {
  // Once logged in with Facebook, OdinBook user is returned
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
      localStorage.setItem("token", JSON.stringify({ token: userData.token, user: userData.user, timestamp: Date.now() }));
      setLoggedIn(true);
    }
  };

  return (
    <div className="container">
      <Card style={{ width: "100%" }}>
        <Card.Header>
          <FacebookLogin
            appId="795775025274582"
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
