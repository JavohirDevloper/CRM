/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./sidebar.css";

const Sidebar = ({user}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
    toast.success("Siz tizimdan chiqdingiz");
  };

  return (
    <div>
      <div className={`navbar-list ${isOpen ? "open" : ""}`}>
        <nav>
          <div className="logo">
            <h2>Najot Taʻlim</h2>
          </div>
          <nav>
            <div>
              <ul className="d-flex gap-4 ">
                <li className="mb-1 p-b-1">
                  <Link to={"/notfication"}>
                    <i className="fa-solid fa-bell"></i>
                  </Link>
                </li>
                <div className="dropdown">
                  <a
                    href="#"
                    className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
                    id="dropdownUser2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                      alt=""
                      width="30"
                      height="30"
                      className="rounded-circle me-3"
                    />
                    <strong></strong>
                  </a>
                  <ul
                    className="dropdown-menu text-small shadow"
                    aria-labelledby="dropdownUser2"
                  >
                    <li>
                      <Link className="dropdown-item" to="/settings">
                        Sozlamalar
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/payments">
                        Toʻlovlarim
                      </Link>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </nav>
        </nav>
        <hr />
      </div>
      <div
        className={`d-flex flex-column flex-shrink-0 p-3 bg-white sidebar ${
          isOpen ? "open" : ""
        }`}
        style={{ width: "240px" }}
      >
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link link-dark" aria-current="page">
              <i className="fa-solid fa-house "></i>
              Bosh Sahifa
            </Link>
          </li>
          <li>
            <Link to="/courses" className="nav-link link-dark">
              <i className="fa-solid fa-computer"></i>
              Mening kurslarim
            </Link>
          </li>
          <li>
            <Link to="/courses" className="nav-link link-dark">
              <i className="fa-solid fa-folder"></i>
              Barcha kurslar
            </Link>
          </li>
          <li>
            <Link to="/videos" className="nav-link link-dark">
              <i className="fa-solid fa-video"></i>
              Videolar
            </Link>
          </li>
          <li>
            <Link to="/messages" className="nav-link link-dark">
              <i className="fa-sharp fa-solid fa-comment"></i>
              Adminga yozish
            </Link>
          </li>
          <li>
            <Link
              to="/auth/login"
              className="nav-link link-dark"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              Chiqish
            </Link>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  );
};

export default Sidebar;
