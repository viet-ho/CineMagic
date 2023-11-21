import React, { useState } from "react";
import movieCard2 from "../assets/Movie2.jpeg";
import MovieTrailerModal from "./MovieTrailerModal";
import "../styles/MovieInfo.css";

const MovieInfo = () => {
  const movieData = {
    name: "Indie Movie",
    titleCard: movieCard2,
    trailerUrl: "https://www.youtube.com/embed/example-trailer",
    description: "A brief description of the movie.",
  };

  const [showTrailer, setShowTrailer] = useState(false);

  const handleShowTrailer = () => {
    setShowTrailer(true);
  };

  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  return (
    <div className="summary-page white-container">
      <h1>{movieData.name}</h1>
      <img src={movieData.titleCard} alt="Title Card" />
      <button onClick={handleShowTrailer}>Watch Trailer</button>
      {showTrailer && (
        <MovieTrailerModal
          trailerUrl={movieData.trailerUrl}
          onClose={handleCloseTrailer}
        />
      )}
      <p>{movieData.description}</p>
      <button>Read Reviews</button>
      <button>Show Showtimes</button>
    </div>
  );
};

export default MovieInfo;
