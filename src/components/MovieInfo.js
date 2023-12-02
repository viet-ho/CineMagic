import React, { useState, useEffect } from "react";
import movieCard2 from "../assets/Movie2.jpeg";
import MovieTrailerModal from "./MovieTrailerModal";
import "../styles/MovieInfo.css";
import { useAppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const MovieInfo = () => {
  const handleBack = () => {
    navigate(-1);
  };

  const navigate = useNavigate();
  const { title, image, trailer, description } = useAppContext();

  const movieData = {
    name: title,
    titleCard: image,
    trailerUrl: trailer,
    description: description,
  };

  const [showTrailer, setShowTrailer] = useState(false);

  const handleShowTrailer = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  useEffect(() => {
    document.body.classList.add("movie-info-selection");

    return () => {
      document.body.classList.remove("movie-info-selection");
    };
  }, []);

  return (
    <div>
      <div className="movie-info-page white-container">
        <h1 className="movie-info-title">{movieData.name}</h1>
        <img
          className="movie-info-image"
          src={movieData.titleCard}
          alt="Title Card"
        />
        <p>{movieData.description}</p>

        <div className="movie-info-buttons">
          <button className="movie-info-button" onClick={handleShowTrailer}>
            Watch Trailer
          </button>
          <button
            className="movie-info-button"
            onClick={() => navigate("/reviews")}
          >
            Read Reviews
          </button>
        </div>
        {showTrailer && (
          <MovieTrailerModal
            trailerUrl={movieData.trailerUrl}
            onClose={handleCloseTrailer}
          />
        )}
        <button
          className="movie-info-button"
          onClick={() => navigate("/date-selection")}
        >
          Show Showtimes
        </button>
      </div>
      <button className="back-button-movie-info" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default MovieInfo;
