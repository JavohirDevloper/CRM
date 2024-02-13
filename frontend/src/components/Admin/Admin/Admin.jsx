// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin");
      setAdmins(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Ma'lumotlarni olishda xatolik yuz berdi");
    }
  };

  const handleDelete = async (adminId) => {
    try {
      await axios.delete(`http://localhost:5000/admin/${adminId}`);
      fetchAdmins();
      toast.success("Admin o'chirildi");
    } catch (error) {
      console.error(error);
      toast.error("Adminni o'chirishda xatolik yuz berdi");
    }
  };
  const openModal = (mode, adminId) => {
    mode;
    adminId;
    setShowModal(true);
  };
  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <Link
        onClick={() => setShowModal(true)}
        className="list-style"
        to={"/admin/create"}
      >
        Add Admin
      </Link>
      <ul className="admin-list">
        {admins.map((admin) => (
          <li key={admin._id} className="admin-list-item gap-5 ">
            <span>{admin.email}</span>
            <button onClick={() => openModal("update", admin._id)}>
              <Link to={`/admin/update/${admin._id}`} className="text">Edit</Link>
            </button>
            <button onClick={() => handleDelete(admin._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
