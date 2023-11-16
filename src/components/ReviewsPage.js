import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/ReviewsPage.css";
import { useNavigate } from 'react-router-dom';

// Star Component
const Star = ({ filled }) => {
  return <span className={`fa fa-star ${filled ? 'checked' : ''}`}></span>;
};

// Rating Component
const Rating = ({ rating }) => {
  return (
    <div className="rating">
      {[...Array(5)].map((_, i) => (
        <Star key={i} filled={i < rating} />
      ))}
    </div>
  );
};

/*
// Review Component
const Review = ({ review }) => {
  return (
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title">{review.name}</h5>
        <Rating rating={review.rating} />
        <p className="card-text">{review.text}</p>
      </div>
    </div>
  );
};
*/


const Review = ({ review }) => {
  return (
    <div className="card my-3">
      <div className="card-body">
        <div className="review-header">
          <h5 className="card-title">{review.name}</h5>
          <div className="review-rating">
            <Rating rating={review.rating} />
          </div>
        </div>
        <p className="card-text">{review.text}</p>
      </div>
    </div>
  );
};

// Reviews Page Component
const ReviewsPage = () => {
    useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    document.head.appendChild(link);
  }, []);

  const reviews = [
    { id: 1, name: 'Harry M.', rating: 3, text: 'It was alright' },
    { id: 2, name: 'Vikram C.', rating: 5, text: 'Amazing movie' },
    { id: 3, name: 'Ekhonmu E.', rating: 4, text: 'Cool to watch' },
    { id: 4, name: 'Jordan C.', rating: 2, text: 'Boring but watchable' },
    { id: 5, name: 'Jane Doe', rating: 5, text: 'It was ok' },
    { id: 6, name: 'Vincent H.', rating: 4, text: 'Ok' },
    // ... Add more reviews as needed
  ];

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const [visibleReviews, setVisibleReviews] = useState(3);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const handleSeeMore = () => {
    setVisibleReviews(prevVisibleReviews => prevVisibleReviews + 4);
  };

  return (
    <div className="container mt-5 reviews-page">
      <div className="overall-rating">
        <h2>Movie 2</h2>
        <div className="rating-wrapper">
          <Rating rating={averageRating} />
        </div>
      </div>
      <h3>User Reviews</h3>
      {reviews.slice(0, visibleReviews).map(review => (
        <Review key={review.id} review={review} />
      ))}
      {visibleReviews < reviews.length && (
        <button className="btn btn-primary see-more-button" onClick={handleSeeMore}>
          See More
        </button>
      )}
      <button className="btn btn-primary back-button" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default ReviewsPage;
