import React from "react";
import PropTypes from "prop-types";
import "../styles/MovieTrailerModal.css";

const MovieTrailerModal = ({ trailerUrl, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <iframe
          width="560"
          height="315"
          src={trailerUrl}
          title="Movie Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

MovieTrailerModal.propTypes = {
  trailerUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieTrailerModal;
