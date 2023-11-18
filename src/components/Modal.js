import React from 'react';
import "../styles/Modal.css";

const Modal = ({ showModal, toggleModal, message }) => {
    if (!showModal) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <span className="modal-title">Error</span>
                    <button className="modal-close-button" onClick={toggleModal}>&times;</button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button className="modal-ok-button" onClick={toggleModal}>OK</button>
                </div>
            </div>
        </div>
    );
}

export default Modal;