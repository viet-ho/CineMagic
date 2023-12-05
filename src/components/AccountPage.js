import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/AccountPage.css";
import Modal from "../components/Modal.js";

const AccountPage = () => {
  const navigate = useNavigate();

  const {
    accountName,
    setAccountName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    profilePicture,
    setProfilePicture,
    validPassword,
    setValidPassword,
    orderHistory
  } = useAppContext();

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmNewPasswordShown, setConfirmNewPasswordShown] = useState(false);
  const [tempAccountName, setTempAccountName] = useState(accountName);
  const [tempEmail, setTempEmail] = useState(email);
  const [tempPhoneNumber, setTempPhoneNumber] = useState(phoneNumber);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [updateButtonText, setUpdateButtonText] =
    useState("Update Information");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  const handleAccountNameChange = (e) => {
    setTempAccountName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setTempEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 6) {
      input = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`;
    } else if (input.length > 3) {
      input = `${input.slice(0, 3)}-${input.slice(3)}`;
    }
    setTempPhoneNumber(input);
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
    if (e.target.value === "Credit Card") {
      navigate("/credit-card");
    }
  };

  const fileInputRef = useRef();

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        setProfilePicture(e.target.result);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleProfilePicTextClick = () => {
    fileInputRef.current.click();
  };

  const handleUpdateInfo = () => {
    if (tempPhoneNumber && !phoneRegex.test(tempPhoneNumber)) {
      setModalMessage(
        "Please enter a valid phone number in the format 123-456-7890"
      );
      setShowModal(true);
      return;
    }

    if (tempEmail && !emailRegex.test(tempEmail)) {
      setModalMessage(
        "Please enter a valid email in the format example@example.com"
      );
      setShowModal(true);
      return;
    }

    setAccountName(tempAccountName);
    setEmail(tempEmail);
    setPhoneNumber(tempPhoneNumber);

    setModalMessage("Updated successfully!");
    setShowModal(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateInfo();
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordShown(!newPasswordShown);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setConfirmNewPasswordShown(!confirmNewPasswordShown);
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChangePassword = () => {
    if (oldPassword !== validPassword) {
      setModalMessage("The old password is incorrect.");
    } else if (!isValidPassword(newPassword)) {
      setModalMessage(
        "The new password format is invalid. It must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters."
      );
    } else if (confirmNewPassword !== newPassword) {
      setModalMessage("Password and confirm password does not match.");
    } else {
      setValidPassword(newPassword);
      setModalMessage("Password changed successfully!");
    }
    setShowChangePasswordModal(false);
    setShowModal(true);
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const passwordTooltip = (
    <Tooltip id="password-tooltip">
      Password must contain at least 8 characters, including UPPER/lowercase,
      numbers, and at least one special character (@$!%*?&).
    </Tooltip>
  );

  const ChangePasswordModal = () => (
    <div
      className={`modal ${showChangePasswordModal ? "show" : ""}`}
      tabIndex="-1"
      style={{ display: showChangePasswordModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header change-password-modal-header">
            <h5 className="modal-title">Change Password</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowChangePasswordModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <div className="input-group">
                <input
                  type={passwordShown ? "text" : "password"}
                  className="form-control"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter old password"
                />
                <span
                  className="input-group-text"
                  onClick={togglePasswordVisibility}
                >
                  {passwordShown ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type={newPasswordShown ? "text" : "password"}
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <span
                  className="input-group-text"
                  onClick={toggleNewPasswordVisibility}
                >
                  {newPasswordShown ? <FaEye /> : <FaEyeSlash />}
                </span>
                <OverlayTrigger placement="right" overlay={passwordTooltip}>
                  <span className="input-group-text">?</span>
                </OverlayTrigger>
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type={confirmNewPasswordShown ? "text" : "password"}
                  className="form-control"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                <span
                  className="input-group-text"
                  onClick={toggleConfirmNewPasswordVisibility}
                >
                  {confirmNewPasswordShown ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowChangePasswordModal(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleChangePassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    document.body.classList.add("account-page-background");

    return () => {
      document.body.classList.remove("account-page-background");
    };
  }, []);

  return (
    <div className="account-page">
      <div className="account-info-container">
        <Modal
          showModal={showModal}
          toggleModal={() => setShowModal(false)}
          message={modalMessage}
        />
        {ChangePasswordModal()}
        <h2>Account Information</h2>
        <form className="info-container" onSubmit={handleFormSubmit}>
          <div className="form-group profile-pic-group">
            <img src={profilePicture} alt="Profile" className="profile-pic" />
            <p className="change-pic-text" onClick={handleProfilePicTextClick}>
              Change Profile Picture
            </p>
            <input
              type="file"
              ref={fileInputRef}
              className="form-control"
              name="profilePicture"
              onChange={handleProfilePicChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="form-group">
            <label className="form-header">Payment Method</label>
            <select
              className="form-control"
              name="paymentMethod"
              value={selectedPaymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <option>None</option>
              <option>Apple Pay</option>
              <option>Google Pay</option>
              <option>Credit Card</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-header">Name</label>
            <input
              type="text"
              className="form-control"
              name="accountName"
              value={tempAccountName}
              onChange={handleAccountNameChange}
            />
          </div>
          <div className="form-group">
            <label className="form-header">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              name="phoneNumber"
              value={tempPhoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="e.g. 0123456789"
            />
          </div>
          <div className="form-group">
            <label className="form-header">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={tempEmail}
              onChange={handleEmailChange}
              placeholder="e.g. example@example.com"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mr-2"
            onClick={handleUpdateInfo}
          >
            {updateButtonText}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowChangePasswordModal(true)}
          >
            Change Password
          </button>
        </form>
        <div className="order-history">
          <h2>Order History</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Date</th>
                <th>Time</th>
                <th>Movie</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order, index) => (
                <tr key={index}>
                  <td>#{order.orderNumber}</td>
                  <td>{order.date.toDateString()}</td>
                  <td>{order.time}</td>
                  <td>{order.title}</td>
                  <td>${order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="btn btn-secondary back-button-account"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
