// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import loginImage from "../../../../public/register.png";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
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
        "http://localhost:5000/user/login",
        formData
      );
      console.log(response.data);
      toast.success("Siz tizimga kirding!");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.response.data);
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <div className="d-flex">
      <div>
        <img src={loginImage} alt="login-img" className="login_img" />
      </div>
      <div className="form-controller">
        <h3 className="text-center p-2">Login</h3>
        <div>
          <form className="px-4 py-3" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                required
              />
            </div>
            <div className="mb-3">
              <p>
                Profilingiz yo‘qmi?{" "}
                <Link to={"/auth/register"} className="text-decoration">
                  Ro‘yxatdan o‘tish
                </Link>
              </p>
            </div>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
