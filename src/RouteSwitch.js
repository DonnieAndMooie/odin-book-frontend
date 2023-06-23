import React, { useEffect, useState } from "react";
import {
  BrowserRouter, Routes, Route, Navigate,
} from "react-router-dom";
import moment from "moment";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import UserPage from "./components/UserPage";
import AllUsers from "./components/AllUsers";

export default function RouteSwitch() {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const { token } = JSON.parse(localStorage.getItem("token"));
      const timestamp = moment(token.timestamp);
      const currentTime = moment(new Date());
      const difference = currentTime.diff(timestamp, "hours");
      if (difference >= 24) {
        localStorage.clear();
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard setAllUsers={setAllUsers} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/login" />} />
        {allUsers.map((user) => (
          <Route key={user._id} path={`/${user._id}`} element={<UserPage user={user} />} />
        ))}
        <Route path="/users" element={<AllUsers />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
