import React, { useState } from "react";
import {
  BrowserRouter, Routes, Route, Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import UserPage from "./components/UserPage";

export default function RouteSwitch() {
  const [allUsers, setAllUsers] = useState([]);
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
      </Routes>
    </BrowserRouter>
  );
}
