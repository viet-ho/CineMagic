import React from "react";
import "../styles/Modal.css";

const Modal = ({ showModal, toggleModal, message }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="v-modal-overlay">
      <div className="v-modal-content">
        <div className="v-modal-header">
          <span className="v-modal-title">Attention</span>
          <button className="v-modal-close-button" onClick={toggleModal}>
            &times;
          </button>
        </div>
        <div className="v-modal-body">
          <p>{message}</p>
        </div>
        <div className="v-modal-footer">
          <button className="v-modal-ok-button" onClick={toggleModal}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
