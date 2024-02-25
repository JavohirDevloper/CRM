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
  const [showModal, setShowModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [ setToken] = useState("");
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
      console.log(response.data);
      toast.success("Siz roʻyxatdan muvaffaqiyatli oʻtdingiz");
      setShowModal(true);
    } catch (error) {
      console.log(error.response.data);
      toast.error("Nimadir xato ketdi :(");
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/user/verify", {
        email: formData.email,
        code: verificationCode, // Use verificationCode state here
      });
      console.log(response.data);
      setToken(response.data.acces_token);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      toast.error("Nimadir xato ketdi :(");
    }
  };

  const handleCancel = () => {
    setShowModal(false); // Close modal
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
              Sign in
            </button>
          </form>
        </div>
      </div>
      {showModal && (
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Enter Verification Code
                </h5>
                <button
                  type="button"
                  className="btn-close" 
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCancel}
                ></button>
              </div>
              <form onSubmit={handleVerificationSubmit}>
                <div className="modal-body">
                  <input
                    type="text"
                    name="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter verification code"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
