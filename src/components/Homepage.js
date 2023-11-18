import React, { useState } from "react";
import movieCard1 from "../assets/Movie1.jpg";
import movieCard2 from "../assets/Movie2.jpeg";
import movieCard3 from "../assets/Movie3.jpg";
import movieCard4 from "../assets/Movie4.jpg";
import movieCard5 from "../assets/Movie5.png";
import theatre from "../assets/theatre.jpeg";
import { TypeAnimation } from "react-type-animation";
import "../styles/Homepage.css";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import ReactModal from "react-modal";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const featuredMovies = [
    {
      img: movieCard1,
      title: "Indie Greg Heffley",
      rating: "4.3/5",
    },
    {
      img: movieCard2,
      title: "Despicable Indie",
      rating: "2.3/5",
    },
    {
      img: movieCard3,
      title: "Indieana Jones",
      rating: "4.6/5",
    },
    {
      img: movieCard4,
      title: "Wolf of Indie Street",
      rating: "4.9/5",
    },
    {
      img: movieCard5,
      title: "Indie Movie",
      rating: "3.5/5",
    },
  ];

  const movieNews = [
    {
      img: movieCard1,
      title: "Tom Hanks Stars in Indieana Jones",
      description:
        "Tom Hanks has taken his first leap into the indie market, being the lead actors on Indieanna Jones...",
    },
    {
      img: movieCard2,
      title: "2024 Indie Awards",
      description:
        "The 2024 Indie Awards will be taking place in Winnipeg, Manitoba this year...",
    },
    {
      img: movieCard3,
      title: "Despicable Indie Rocks Box Office",
      description:
        "Earning a staggering $5.5 million USD, Despicable Indie has taken the indie market by storm...",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="title">
          🔮🔮🔮 <u>Welcome to CineMagic</u> 🔮🔮🔮
        </h1>
        <div className="header">
          <section className="left-info">
            <p className="subtitle">
              <TypeAnimation
                sequence={[
                  "Where Every Frame Tells a Tale",
                  1000,
                  "Unleash the Power of Indie",
                  1000,
                  "Your Path to Cinematic Wonders.",
                  1000,
                  "Experience Movie Magic",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: "2em", display: "inline-block" }}
                repeat={Infinity}
              />
            </p>
            <p className="about-us">
              Welcome to CineMagic, Calgary's cherished independent theater
              where every frame tells a story. Established in 2006, CineMagic
              has been a beacon for film enthusiasts seeking a unique cinematic
              experience beyond the mainstream. We take pride in our commitment
              to the art of storytelling, focusing exclusively on independent
              films that captivate, inspire, and provoke thought.
              <br />
              <br />
              At CineMagic, we believe in the power of indie cinema to transport
              audiences to new worlds and perspectives. Our carefully curated
              selection of films spans a diverse range of genres and narratives,
              showcasing the incredible talent of emerging filmmakers. Over the
              years, we have become a hub for those who appreciate the beauty of
              storytelling through the lens of independent cinema.
              <br />
              <br />
              Our vintage-inspired theater provides an intimate setting for
              cinephiles to immerse themselves in the magic of indie movies.
              From compelling narratives to breathtaking visuals, each film
              featured at CineMagic is a testament to the creativity and
              innovation found in the world of independent filmmaking.
            </p>
            <p className="address">
              Come visit us at <strong>511 10 Ave SW!</strong>
            </p>
          </section>
          <section className="right-info">
            <img src={theatre} className="theatre-picture" />
          </section>
        </div>
        <button className="cta-button">Get Tickets</button>
      </div>

      <section className="featured-movies">
        <h2 className="featured-movie-title">Featured Movies</h2>
        <p>
          <i>Browse our list of currently airing films!</i>
        </p>
        <Carousel className="carousel" itemsToShow={3}>
          {featuredMovies.map((movie, index) => (
            <Item key={index}>
              <div className="movie-card" onClick={() => setIsOpen(true)}>
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="movie-poster"
                />
                <h3 className="featured-movie">{movie.title}</h3>
                <p className="review-text">
                  {" "}
                  <i>Quick Rating: {movie.rating}</i>
                </p>
              </div>
            </Item>
          ))}
        </Carousel>
      </section>

      <section className="movie-news-section-header">
        <h2 className="movie-news-title">Movie News</h2>
        <p className="movie-news-info">
          <i>See the latest news in the indie movie market!</i>
        </p>
      </section>

      <section className="movie-news">
        {movieNews.map((movie, index) => (
          <Item className="articles" key={index}>
            <div className="movie-article-card" onClick={() => setIsOpen(true)}>
              <img
                src={movie.img}
                alt={movie.title}
                className="movie-news-poster"
              />
              <h3 className="movie-news-title">{movie.title}</h3>
              <p className="movie-news-description">
                <i>{movie.description}</i>
              </p>
            </div>
          </Item>
        ))}
      </section>

      <footer className="footer">
        <p>&copy; 2023 CineMagic. All rights reserved.</p>
      </footer>

      <ReactModal
        className="popup"
        isOpen={isOpen}
        contentLabel="Movie Review Modal"
        onRequestClose={() => setIsOpen(false)}
      ></ReactModal>
    </div>
  );
};

export default HomePage;
