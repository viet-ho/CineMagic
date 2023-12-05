import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/ConfirmationPopupModal.css";
import ticketImage from "../assets/CineMagicTicket.png";
import { useAppContext } from "../AppContext";
import Modal from "../components/Modal.js";

const ConfirmationPopupModal = ({ onClose }) => {
  const { orderNumber, title, total, date, time } = useAppContext();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleDownloadButton = () => {
    setModalMessage("Downloaded ticket successfully!");
    setShowModal(true);
  };

  return (
    <div className="i-modal-overlay" onClick={onClose}>
      <div className="i-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="i-close-button" onClick={onClose}>
          Close
        </button>

        <p className="movie-confirm-title-modal">{title}</p>
        <img className="movie-confirm-image-modal" src={ticketImage} />
        <p className="movie-confirm-description-modal">
          Your ticket has been emailed!
        </p>
        <p className="movie-confirm-description-modal">
          Order Number: #{orderNumber}
        </p>
        <p className="movie-confirm-description-modal">Cost: ${total}</p>
        <p className="movie-confirm-description-modal">Date: {date instanceof Date ? date.toDateString() : 'Invalid Date'}</p>
        <p className="movie-confirm-description-modal">Time: {time}</p>
        <button className="cta-button-get-ticket" onClick={handleDownloadButton}>Download Ticket</button>
      </div>
      <Modal
        showModal={showModal}
        toggleModal={() => setShowModal(false)}
        message={modalMessage}
      />
    </div>
  );
};

ConfirmationPopupModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ConfirmationPopupModal;
