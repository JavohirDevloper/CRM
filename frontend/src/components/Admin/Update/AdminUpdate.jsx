// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "../Admin/admin.css";

const AdminUpdate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { adminId } = useParams();
  const handleUpdateAdmin = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/admin/${adminId}`,
        {
          email,
          password,
        }
      );
      console.log(response);
      toast.success("Admin yangilandi");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      toast.error("Adminni yangilashda xatolik yuz berdi");
    }
  };

  return (
    <div className="container">
      <h2>Update Admin</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleUpdateAdmin}>Update Admin</button>
    </div>
  );
};

export default AdminUpdate;
