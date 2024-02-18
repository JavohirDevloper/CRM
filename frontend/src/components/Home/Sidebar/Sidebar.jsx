// eslint-disable-next-line no-unused-vars
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-white"
      style={{ width: "240px" }}
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item ">
          <Link to="/" className="nav-link link-dark" aria-current="page">
            <i className="fa-solid fa-house"></i>
            Home
          </Link>
        </li>
        <li>
          <Link to="/user/register" className="nav-link link-dark">
          <i className="fa-solid fa-gauge"></i>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/videos" className="nav-link link-dark">
            <i className="fa-solid fa-video"></i>
            Videos
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link link-dark">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#grid"></use>
            </svg>
            Courses
          </Link>
        </li>
        <li>
          <Link to="/" className="nav-link link-dark">
          <i className="fa-solid fa-right-from-bracket"></i>
           Logout
          </Link>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/JavohirDevloper.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>JavohirDevloper</strong>
        </a>
        <ul
          className="dropdown-menu text-small shadow"
          aria-labelledby="dropdownUser2"
        >
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
