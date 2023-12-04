import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/AccountPage.css";

const AccountPage = () => {

    const navigate = useNavigate();

    const { accountName, setAccountName, email, setEmail, phoneNumber, setPhoneNumber, selectedPaymentMethod, setSelectedPaymentMethod, profilePicture, setProfilePicture } = useAppContext();

    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [newPasswordShown, setNewPasswordShown] = useState(false);
    const [confirmNewPasswordShown, setConfirmNewPasswordShown] = useState(false);

    const [tempAccountName, setTempAccountName] = useState(accountName);
    const [tempEmail, setTempEmail] = useState(email);
    const [tempPhoneNumber, setTempPhoneNumber] = useState(phoneNumber);

    const handleAccountNameChange = (e) => {
        setTempAccountName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setTempEmail(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setTempPhoneNumber(e.target.value);
    };

    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
        if (e.target.value === 'Credit Card') {
            navigate('/credit-card');
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
        setAccountName(tempAccountName);
        setEmail(tempEmail);
        setPhoneNumber(tempPhoneNumber);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleUpdateInfo();
    };

    const [orderHistory, setOrderHistory] = useState([
        //Order Data
    ]);

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordShown(!newPasswordShown);
    };

    const toggleConfirmNewPasswordVisibility = () => {
        setConfirmNewPasswordShown(!confirmNewPasswordShown);
    };

    const handleChangePassword = () => {
        // Add logic to handle password change
        // Validate old password, compare new passwords, and check format
    };

    const passwordTooltip = (
        <Tooltip id="password-tooltip">
            Password must contain at least 8 characters, including UPPER/lowercase, numbers, and at least one special character (@$!%*?&).
        </Tooltip>
    );

    // ... rest of the component

    const ChangePasswordModal = () => (
        <div className={`modal ${showChangePasswordModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showChangePasswordModal ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header change-password-modal-header">
                        <h5 className="modal-title">Change Password</h5>
                        <button type="button" className="btn-close" onClick={() => setShowChangePasswordModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    type={passwordShown ? "text" : "password"}
                                    className="form-control"
                                    value={oldPassword}
                                    onChange={e => setOldPassword(e.target.value)}
                                    placeholder="Enter old password"
                                />
                                <span className="input-group-text" onClick={togglePasswordVisibility}>
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
                                    onChange={e => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                />
                                <span className="input-group-text" onClick={toggleNewPasswordVisibility}>
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
                                    onChange={e => setConfirmNewPassword(e.target.value)}
                                    placeholder="Confirm new password"
                                />
                                <span className="input-group-text" onClick={toggleConfirmNewPasswordVisibility}>
                                    {confirmNewPasswordShown ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowChangePasswordModal(false)}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleChangePassword}>Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    );

    useEffect(() => {
        document.body.classList.add('account-page-background');

        return () => {
            document.body.classList.remove('account-page-background');
        };
    }, []);

    return (
        <div className="account-page">
            <div className="account-info-container">
                {ChangePasswordModal()}
                <h2>Account Information</h2>
                <form className="info-container" onSubmit={handleFormSubmit}>
                    <div className="form-group profile-pic-group">
                        <img src={profilePicture} alt="Profile" className="profile-pic" />
                        <p className="change-pic-text" onClick={handleProfilePicTextClick}>Change Profile Picture</p>
                        <input type="file" ref={fileInputRef} className="form-control" name="profilePicture" onChange={handleProfilePicChange} style={{ display: 'none' }} />
                    </div>
                    <div className="form-group">
                        <label className="form-header">Name</label>
                        <input type="text" className="form-control" name="accountName" value={tempAccountName} onChange={handleAccountNameChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-header">Phone Number</label>
                        <input type="tel" className="form-control" name="phoneNumber" value={tempPhoneNumber} onChange={handlePhoneNumberChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-header">Email</label>
                        <input type="email" className="form-control" name="email" value={tempEmail} onChange={handleEmailChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-header">Payment Method</label>
                        <select className="form-control" name="paymentMethod" value={selectedPaymentMethod} onChange={handlePaymentMethodChange}>
                            <option>None</option>
                            <option>Apple Pay</option>
                            <option>Google Pay</option>
                            <option>Credit Card</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary mr-2" onClick={handleUpdateInfo}>Update Info</button>
                    <button type="button" className="btn btn-primary" onClick={() => setShowChangePasswordModal(true)}>Change Password</button>
                </form>
                <div className="order-history">
                    <h2>Order History</h2>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order Number</th>
                                <th>Date</th>
                                <th>Movie</th>
                                <th>Tickets</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderHistory.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.orderNumber}</td>
                                    <td>{order.date}</td>
                                    <td>{order.movie}</td>
                                    <td>{order.tickets}</td>
                                    <td>{order.totalAmount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <button className="btn btn-secondary back-button-account">
                Back
            </button>
        </div>
    );
};

export default AccountPage;
