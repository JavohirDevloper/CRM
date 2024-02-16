// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Verify from "./components/Verify/Verify";
import Admin from "./components/Admin/Admin/Admin";
import AdminLogin from "./components/Admin/Login/AdminLogin";
import AdminCreate from "./components/Admin/Create/AdminCreate";
import AdminUpdate from "./components/Admin/Update/AdminUpdate";
import VideoUpload from "./components/Videos/VideoPost/Videos";
import Video from "./components/Videos/VideoGet/Videos";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/verify" element={<Verify />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create" element={<AdminCreate />} />
        <Route path="/admin/update/:adminId" element={<AdminUpdate />} />
        <Route path="/videos/create" element={<VideoUpload />} />
        <Route path="/videos" element={<Video />} />
      </Routes>
    </>
  );
};

export default App;
