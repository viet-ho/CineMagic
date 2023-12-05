// Navbar.js
import React from "react";
import { useAppContext } from '../AppContext';
import { Link } from "react-router-dom";
import Logo from "../assets/CineMagic-logos_white.png";
import { CgProfile } from "react-icons/cg";
import "../styles/Navbar.css";

const Navbar = () => {

  const { loginStatus, email, phoneNumber, selectedPaymentMethod, setLoginStatus, setEmail, setPhoneNumber, setSelectedPaymentMethod, setTempEmail, setTempPhone, setTempPaymentMethod } = useAppContext();

  const handleLogout = () => {
    setTempEmail(email);
    setTempPhone(phoneNumber);
    setTempPaymentMethod(selectedPaymentMethod);
    setLoginStatus("false");
    setEmail("");
    setPhoneNumber("");
    setSelectedPaymentMethod("");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/profile-info">Profile</Link>
      </div>
      <div className="navbar-right">
        <Link to="/profile">
          <CgProfile className="user-profile-symbol" size={"1.5em"}></CgProfile>
        </Link>
        {loginStatus === "true" && (
          <button className="btn btn-outline-light ms-2" onClick={handleLogout}>Log Out</button>
        )}
      </div>
    </nav>
  );

};

export default Navbar;
