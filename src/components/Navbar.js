// Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/CineMagic-logos_white.png";
import { CgProfile } from "react-icons/cg";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/" onClick={() => navigate("/")}>
          Home
        </Link>
        <Link to="/profile" onClick={() => navigate("/profile")}>
          Profile
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/profile">
          <CgProfile className="user-profile-symbol" size={"1.5em"}></CgProfile>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
