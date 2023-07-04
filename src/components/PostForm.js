import React, { useEffect, useState } from "react";
import Upload from "../images/upload.png";

export default function PostForm({ setPosts, posts }) {
  const [pictureAddress, setPictureAddress] = useState("No file uploaded"); // This will be displayed on input;
  const [image, setImage] = useState(null);
  async function uploadImage() {
    // Upload file to cloudinary
    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET),
      data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
      const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "POST",
        body: data,
      });
      const img = await response.json();
      document.getElementById("file").value = "";
      setPictureAddress("No file uploaded");
      setImage(null);
      return img.url;
    } catch (err) {
      console.error(err);
    }
  }

  async function submitHandler(e) {
    let url;
    e.preventDefault();
    if (image) {
      // If image uploaded, save to cloudinary and get URL
      url = await uploadImage();
    }

    // Save post
    const text = document.querySelector("input").value;
    const { token } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch("https://purple-surf-7233.fly.dev/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text,
        picture: url,
      }),
    });
    const data = await response.json();
    if (data.text) {
      setPosts([data, ...posts]);
    }
    document.querySelector("input").value = "";
  }

  function changeHandler(e) {
    // When image uploaded, store in state
    setImage(e.target.files[0]);
    setPictureAddress(e.target.value);
  }

  let profilePic;
  // Get proifle pic from localStorage
  if (localStorage.getItem("token")) {
    profilePic = JSON.parse(localStorage.getItem("token")).user.picture;
  }

  return (
    <div className="post-form-div">
      <form onSubmit={(e) => submitHandler(e)} id="post-form" className="post-form">
        <img src={profilePic} alt="Profile" className="user-pic" />
        <input type="text" placeholder="What's on your mind?" />
      </form>
      <label htmlFor="file" className="file-upload">
        Upload Image:
        <img src={Upload} alt="Upload" accept="image/jpeg, image/png, image/jpg" />
      </label>
      <p>{pictureAddress}</p>
      <input type="file" id="file" className="hide" name="picture" onChange={(e) => changeHandler(e)} />
      <button form="post-form" className="post-btn" type="submit">Post</button>
    </div>
  );
}
