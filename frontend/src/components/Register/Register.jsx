// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import "./register.css";
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    phone_number: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formData
      );
      console.log(response.data);
      toast.success("Siz roʻyxatdan muvaffaqiyatli oʻtdingiz");
      navigate("/user/verify");
    } catch (error) {
      console.error(error.response.data);
      toast.error("Nimadir xato ketdi :(");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Date of Birth:
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
