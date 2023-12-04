import React from "react";
import PropTypes from "prop-types";
import "../styles/ConfirmationPopupModal.css";
import ticketImage from "../assets/CineMagicTicket.png";
import { useAppContext } from "../AppContext";

const ConfirmationPopupModal = ({ onClose }) => {
  const { orderNumber, title, total, date, time } = useAppContext();

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
        <p className="movie-confirm-description-modal">Cost: {total}</p>
        <p className="movie-confirm-description-modal">Date: lol</p>
        <p className="movie-confirm-description-modal">Time: {time}</p>
        <button className="cta-button-get-ticket">Download Ticket</button>
      </div>
    </div>
  );
};

ConfirmationPopupModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ConfirmationPopupModal;
