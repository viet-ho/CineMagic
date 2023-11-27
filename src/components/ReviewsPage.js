import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ReviewsPage.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";

// Star Component
const Star = ({ type }) => {
  const starClass =
    type === "full"
      ? "fa fa-star"
      : type === "half"
      ? "fa fa-star-half-o"
      : "fa fa-star-o";
  return <span className={`star ${starClass}`}></span>;
};

// Rating Component
const Rating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="rating">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} type="full" />
      ))}
      {halfStar === 1 && <Star key="half" type="half" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} type="empty" />
      ))}
    </div>
  );
};

const Review = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-content">
        <h5 className="review-title">{review.name}</h5>
        <div className="review-rating">
          <Rating rating={review.rating} />
        </div>
        <p className="review-text">{review.text}</p>
      </div>
    </div>
  );
};

// Reviews Page Component
const ReviewsPage = () => {
  useEffect(() => {
    document.body.classList.add("reviews-page-background");

    return () => {
      document.body.classList.remove("reviews-page-background");
    };
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    document.head.appendChild(link);
  }, []);

  const { title, image, review: userReviews } = useAppContext();

  // Map user reviews to the required format
  const reviews = userReviews.map((userReview) => ({
    id: userReview.id,
    name: userReview.name,
    rating: userReview.rating,
    text: userReview.text,
  }));

  const numberOfReviews = reviews.length;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const [visibleReviews, setVisibleReviews] = useState(3);

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const handleSeeMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 4);
  };

  return (
    <div className="reviews-page-height">
      <div className="container mt-5 reviews-page">
        <div className="overall-rating">
          <h2>{title}</h2>
          <img src={image} alt="Movie Poster" className="movie-poster" />
          <div className="rating-and-number-wrapper">
            <div className="rating-wrapper">
              <Rating rating={averageRating} />
            </div>
            <div className="average-rating-number">
              {averageRating.toFixed(1)}/5.0
            </div>
          </div>
        </div>
        <h3>User Reviews ({numberOfReviews})</h3>
        {reviews.slice(0, visibleReviews).map((review) => (
          <Review key={review.id} review={review} />
        ))}
        {visibleReviews < reviews.length && (
          <button
            className="btn btn-primary see-more-button"
            onClick={handleSeeMore}
          >
            See More
          </button>
        )}
        <button className="btn btn-primary back-button" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ReviewsPage;
