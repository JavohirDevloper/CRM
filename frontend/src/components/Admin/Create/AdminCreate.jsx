// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./admincreate.css";
import { useNavigate } from "react-router-dom";
const AdminCreate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreateAdmin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/admin", {
        email,
        password,
      });
      console.log(response);
      toast.success("Admin qo'shildi");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      toast.error("Admin qo'shishda xatolik yuz berdi");
    }
  };

  return (
    <div className="admin-create-container">
      <h2>Create Admin</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="admin-create-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="admin-create-input"
      />
      <button onClick={handleCreateAdmin} className="admin-create-button">
        Create Admin
      </button>
    </div>
  );
};

export default AdminCreate;
