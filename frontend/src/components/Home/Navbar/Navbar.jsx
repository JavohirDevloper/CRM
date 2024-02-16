// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav>
        <div className="logo">
          <h1>NaJot Taʻlim</h1>
        </div>
        <ul className={isOpen ? "nav-links open" : "nav-links"}>
          <li>
            <Link to="/user/register">Register</Link>
          </li>
          <li>
            <Link to="/admin/login">Admin</Link>
          </li>
          <li>
            <Link to="/videos">Video</Link>
          </li>
          <li>
            <Link to="/">Contact Us</Link>
          </li>
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
