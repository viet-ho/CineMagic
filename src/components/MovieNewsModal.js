import React from "react";
import PropTypes from "prop-types";
import "../styles/MovieNewsModal.css";
import { useAppContext } from "../AppContext";

const MovieNewsModal = ({ onClose }) => {
  const { newsImage, newsDescription, newsTitle } = useAppContext();

  return (
    <div className="i-modal-overlay" onClick={onClose}>
      <div className="i-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="i-close-button" onClick={onClose}>
          Close
        </button>

        <p className="movie-news-title-modal">{newsTitle}</p>
        <img className="movie-news-image-modal" src={newsImage} />
        <p className="movie-news-description-modal">{newsDescription}</p>
      </div>
    </div>
  );
};

MovieNewsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default MovieNewsModal;
