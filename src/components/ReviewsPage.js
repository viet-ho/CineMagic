import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/ReviewsPage.css";
import { useNavigate } from 'react-router-dom';

// Star Component
const Star = ({ type }) => {
  const starClass = type === 'full' ? 'fa fa-star' : type === 'half' ? 'fa fa-star-half-o' : 'fa fa-star-o';
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
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    document.head.appendChild(link);
  }, []);

  const reviews = [
    { id: 1, name: 'Harry M.', rating: 5, text: 'Absolutely stunning! The cinematography and special effects in this film were nothing short of mind-blowing, perfectly complementing a riveting and well-crafted storyline. The characters were richly developed, drawing the audience deeply into their world.' },
    { id: 2, name: 'Vikram C.', rating: 3, text: 'This movie was confusing and disjointed, trying to tackle too many themes at once. The result was a plot that was hard to follow and ultimately unsatisfying. It seemed like the filmmakers could not decide on a clear direction, leaving the audience lost and disconnected.' },
    { id: 3, name: 'Ekhonmu E.', rating: 4, text: 'A delightful surprise from start to finish! This movie masterfully blended humor with heartfelt moments, striking a perfect balance that kept me both laughing and deeply invested in the characters journeys. It is rare to find a film that can tug at your heartstrings while keeping a smile on your face.' },
    { id: 4, name: 'Jordan C.', rating: 4, text: 'A bit of a letdown, unfortunately. While the concept was promising, the plot turned out to be quite predictable, and the acting did not quite hit the mark. It felt like a missed opportunity, especially considering the potential the initial trailers showed.' },
    { id: 5, name: 'Jane Doe', rating: 5, text: 'An instant classic in my book! The performances were simply outstanding, each actor bringing depth and nuance to their roles. The direction was equally superb, weaving a story that was both deeply moving and visually stunning. It is a film that will stay with me for a long time.' },
    { id: 6, name: 'Vincent H.', rating: 2, text: 'Mediocre at best, which was disappointing. The film suffered from significant pacing issues and a script that lacked depth and originality. I found myself checking my watch more than once, which is never a good sign for any movie.' },
    // ... Add more reviews as needed
  ];

  const numberOfReviews = reviews.length;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const [visibleReviews, setVisibleReviews] = useState(3);

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const handleSeeMore = () => {
    setVisibleReviews(prevVisibleReviews => prevVisibleReviews + 4);
  };

  const moviePosterUrl = "https://www.themoviedb.org/t/p/original/76Py7yDbVne7LGAeYIiNi5oQEOV.jpg";

  return (
    <div className="container mt-5 reviews-page">
      <div className="overall-rating">
        <h2>Movie 2</h2>
        <img src={moviePosterUrl} alt="Movie Poster" className="movie-poster" />
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
