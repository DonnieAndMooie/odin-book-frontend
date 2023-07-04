import React, { useEffect, useState } from "react";
import Header from "./Header";
import Post from "./Post";
import FriendButton from "./FriendButton";
import Friend from "./Friend";
import Loading from "../images/Spinner-1s-200px.gif";
import Upload from "../images/upload.png";

export default function UserPage({ user }) {
  const [posts, setPosts] = useState(null);
  const [friends, setFriends] = useState(user.friends);
  const [pictureAddress, setPictureAddress] = useState("No picture selected");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const { token } = JSON.parse(localStorage.getItem("token"));
    async function fetchPosts() {
      // Fetch all posts
      const response = await fetch("https://purple-surf-7233.fly.dev/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // Filter to only posts from user
      const filteredPosts = data.filter((post) => (
        post.author._id === user._id
      ));
      setPosts(filteredPosts);
      setFriends(user.friends);
    }
    fetchPosts();
  }, [user]);

  function toggleTextarea() {
    // Display/hide edit bio textarea
    const textarea = document.getElementById("bio");
    const confirmBtn = document.querySelector(".confirm-edit-bio");
    textarea.classList.toggle("hide");
    confirmBtn.classList.toggle("hide");
  }

  async function submitBio() {
    // Save new bio to DB
    const bio = document.getElementById("bio").value;
    const { token } = JSON.parse(localStorage.getItem("token"));
    const response = await await fetch(`https://purple-surf-7233.fly.dev/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bio,
      }),
    });
    const bioDiv = document.querySelector(".bio-text");
    bioDiv.textContent = bio;
    toggleTextarea();
  }

  if (posts === null) {
    // If posts not fetched, return loading
    return (
      <div className="loading-div">
        <Header />
        <img src={Loading} alt="Loading" className="loading" />
      </div>

    );
  }

  function changeHandler(e) {
    // When image uploaded, store in state
    setImage(e.target.files[0]);
    setPictureAddress(e.target.value);
  }

  async function uploadImage() {
    // Save image to cloudinary
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

  async function profilePicChange() {
    // Upload image and store returned url in DB
    const url = await uploadImage();
    const userID = JSON.parse(localStorage.getItem("token")).user._id;
    const { token } = JSON.parse(localStorage.getItem("token"));
    const response = await fetch(`https://purple-surf-7233.fly.dev/users/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        picture: url,
      }),
    });
    const data = await response.json();
    window.location.reload(false);
  }

  return (
    <div className="user-page">
      <Header />
      <div className="header-gap" />
      <div className="user-page-header">
        <img src={user.picture} alt="Profile Pic" />
        <h2>{user.name}</h2>
        {user._id !== JSON.parse(localStorage.getItem("token")).user._id
          && <FriendButton user={user} />}
        <div className="bio">
          <div className="bio-top">
            <p className="bio-text">{user.bio}</p>
            {localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).user._id === user._id
            && <button onClick={toggleTextarea} className="edit-bio">Edit Bio</button>}
          </div>
          <textarea className="hide" name="bio" id="bio" />
          <button onClick={submitBio} className="confirm-edit-bio hide">Confirm Changes</button>
          {localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")).user._id === user._id && (
            <div>
              <label htmlFor="file" className="file-upload">
                Change Profile Picture:
                <img className="upload" src={Upload} alt="Upload" accept="image/jpeg, image/png, image/jpg" />
              </label>
              <p className="file-location">{pictureAddress}</p>
              <input type="file" id="file" className="hide" name="picture" onChange={(e) => changeHandler(e)} />
              {image !== null && <button onClick={profilePicChange} className="confirm-profile-pic">Confirm</button>}
            </div>

          )}

        </div>
      </div>
      <div className="user-page-bottom">
        <div className="posts">
          {posts.map((post) => <Post post={post} key={post._id} />)}
        </div>
        <div className="friends">
          <h2>Friends</h2>
          {friends.map((friend) => <Friend friendID={friend} key={friend} />)}
        </div>
      </div>
    </div>
  );
}
