// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import register from "../../../../public/register.png";
import "./register.css";
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formData
      );
      toast.success("Siz roʻyxatdan muvaffaqiyatli oʻtdingiz");
      navigate("/auth/login");
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
      toast.error("Nimadir xato ketdi :(");
    }
  };

  return (
    <div className="d-flex">
      <div>
        <img src={register} alt="register-img" className="register_img" />
      </div>
      <div className="form-controller">
        <h3 className="text-center p-2">Roʻyxatdan oʻtish</h3>
        <div>
          <form className="px-4 py-3" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Ismingiz</label>
              <input
                type="text"
                name="last_name"
                className="form-control"
                placeholder="Ismingizni kiriting!"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Familiyangiz</label>
              <input
                type="text"
                name="first_name"
                className="form-control"
                placeholder=" Familiyangizni kiriting !"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-1">
              <label className="form-label">Emailingizni kiriting</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-1">
              <label className="form-label">Parol</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Parolingizni kiriting"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <p>
                Ro‘yxatdan o‘tganmisiz?
                <Link to={"/auth/login"} className="text-decaration">
                  Profilga kirish
                </Link>
              </p>
            </div>
            <button type="submit" className="btn btn-primary">
              Register{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
