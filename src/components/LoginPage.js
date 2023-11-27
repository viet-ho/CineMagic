import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/LoginPage.css";
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Modal from "../components/Modal.js";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [loginButtonText, setLoginButtonText] = useState('Log In');
    const [signUpButtonText, setSignUpButtonText] = useState('Sign Up');
    const [resetLinkButtonText, setResetLinkButtonText] = useState('Send Reset Link');

    const { validUsername, validPassword } = useAppContext();

    const validateCredentials = () => {
        if (!username || !password) {
            setModalMessage("Username and password cannot be empty. Please try again.");
            setShowModal(true);
            return false;
        }

        if (!emailRegex.test(username)) {
            setModalMessage('Please enter a valid email in the format example@example.com');
            setShowModal(true);
            return;
        }

        if (!isValidPassword(password)) {
            setModalMessage("The password format is invalid. It must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.");
            setShowModal(true);
            return false;
        }

        return true;
    };

    const handleLogin = (event) => {
        event.preventDefault();

        if (!validateCredentials()) return;

        if (username !== validUsername || password !== validPassword) {
            setModalMessage("The username or password is incorrect. Please try again.");
            setShowModal(true);
            return;
        }

        setLoginButtonText("Success...");
        setTimeout(() => {
            setModalMessage("Login successful!");
            setShowModal(true);
        }, 2000);
    };

    const handleSignUp = (event) => {
        event.preventDefault();

        if (!validateCredentials()) return;

        setSignUpButtonText("Success...");
        setTimeout(() => {
            setModalMessage("Signup successful!");
            setShowModal(true);
        }, 2000);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const passwordTooltip = (
        <Tooltip id="password-tooltip">
            Password must contain at least 8 characters, including UPPER/lowercase, numbers, and at least one special character (@$!%*?&).
        </Tooltip>
    );

    const handleForgotPassword = () => {
        setShowForgotPasswordModal(true);
    };

    const handleResetPasswordSubmit = () => {
        if (!resetEmail || !emailRegex.test(resetEmail)) {
            setModalMessage("Please enter a valid email address.");
            setShowModal(true);
            setShowForgotPasswordModal(false);
            setResetEmail('');
            return;
        }
        setResetLinkButtonText("Sent Successfully!");
        setTimeout(() => {
            setShowForgotPasswordModal(false);
            setResetEmail('');
            setResetLinkButtonText("Send Reset Link");
        }, 2000);
    };

    const ForgotPasswordModal = () => (
        <div className={`modal ${showForgotPasswordModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showForgotPasswordModal ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header forgot-password-modal-header">
                        <h5 className="modal-title">Reset Password</h5>
                        <button type="button" className="btn-close" onClick={() => setShowForgotPasswordModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Please enter your email address to receive a password reset link.</p>
                        <input
                            type="email"
                            className="form-control"
                            value={resetEmail}
                            onChange={e => setResetEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowForgotPasswordModal(false)}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleResetPasswordSubmit}>{resetLinkButtonText}</button>
                    </div>
                </div>
            </div>
        </div>
    );


    useEffect(() => {
        document.body.classList.add('login-page-background');

        return () => {
            document.body.classList.remove('login-page-background');
        };
    }, []);

    return (
        <div className="login-page">
            <div className="container mt-5">
                <Modal showModal={showModal} toggleModal={() => setShowModal(false)} message={modalMessage} />
                {ForgotPasswordModal()}
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form>
                            <h2 className="text-center">Login</h2>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Email</label>
                                <input type="text" className="form-control" id="username" value={username} onChange={handleUsernameChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group">
                                    <input type={passwordShown ? "text" : "password"} className="form-control" id="password" value={password} onChange={handlePasswordChange} />
                                    <span className="input-group-text" onClick={togglePasswordVisibility}>
                                        {passwordShown ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                    <OverlayTrigger placement="right" overlay={passwordTooltip}>
                                        <span className="input-group-text">?</span>
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div className="mb-3 text-center">
                                <div className="row">
                                    <div className="col">
                                        <button type="submit" onClick={handleLogin} className="btn btn-primary w-100">{loginButtonText}</button>
                                    </div>
                                    <div className="col">
                                        <button type="button" onClick={handleSignUp} className="btn btn-secondary w-100">{signUpButtonText}</button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 text-center">
                                <button type="button" className="btn btn-link" onClick={handleForgotPassword}>Forgot Password?</button>
                            </div>
                            <div className="mb-3 text-center">
                                <button type="button" className="btn btn-outline-secondary">Back</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;