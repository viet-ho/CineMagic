import React, { useState, useEffect, useRef } from "react";
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
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import MovieNewsModal from "./MovieNewsModal";

const HomePage = () => {
  const navigate = useNavigate();
  const {
    setTitle,
    setImage,
    setTrailer,
    setDescription,
    setReview,
    setNewsImage,
    setNewsTitle,
    setNewsDescription,
  } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const [showNews, setShowNews] = useState(false);

  const handleShowNews = () => {
    setShowNews(true);
  };

  const handleCloseNews = () => {
    setShowNews(false);
  };

  const featuredMovies = [
    {
      img: movieCard1,
      title: "Indie Greg Heffley",
      otherInfo: "Length: 2h 37min || Age-Rating: PG-13",
      trailer: "https://www.youtube.com/embed/example-trailer",
      description: "A brief description of the movie.",
      reviews: [
        {
          id: 2,
          name: "Vikram C.",
          rating: 3,
          text: "This movie was confusing and disjointed, trying to tackle too many themes at once. The result was a plot that was hard to follow and ultimately unsatisfying. It seemed like the filmmakers could not decide on a clear direction, leaving the audience lost and disconnected.",
        },
        {
          id: 3,
          name: "Ekhonmu E.",
          rating: 4,
          text: "A delightful surprise from start to finish! This movie masterfully blended humor with heartfelt moments, striking a perfect balance that kept me both laughing and deeply invested in the characters journeys. It is rare to find a film that can tug at your heartstrings while keeping a smile on your face.",
        },
        {
          id: 4,
          name: "Jordan C.",
          rating: 4,
          text: "A bit of a letdown, unfortunately. While the concept was promising, the plot turned out to be quite predictable, and the acting did not quite hit the mark. It felt like a missed opportunity, especially considering the potential the initial trailers showed.",
        },
        {
          id: 5,
          name: "Jane Doe",
          rating: 5,
          text: "An instant classic in my book! The performances were simply outstanding, each actor bringing depth and nuance to their roles. The direction was equally superb, weaving a story that was both deeply moving and visually stunning. It is a film that will stay with me for a long time.",
        },
        {
          id: 6,
          name: "Vincent H.",
          rating: 2,
          text: "Mediocre at best, which was disappointing. The film suffered from significant pacing issues and a script that lacked depth and originality. I found myself checking my watch more than once, which is never a good sign for any movie.",
        },
      ],
    },
    {
      img: movieCard2,
      title: "Despicable Indie",
      otherInfo: "Length: 1h 45min / Age-Rating: PG-13",
      trailer: "",
      description: "",
      reviews: [
        {
          id: 1,
          name: "Harry M.",
          rating: 5,
          text: "Absolutely stunning! The cinematography and special effects in this film were nothing short of mind-blowing, perfectly complementing a riveting and well-crafted storyline. The characters were richly developed, drawing the audience deeply into their world.",
        },
        {
          id: 2,
          name: "Vikram C.",
          rating: 3,
          text: "This movie was confusing and disjointed, trying to tackle too many themes at once. The result was a plot that was hard to follow and ultimately unsatisfying. It seemed like the filmmakers could not decide on a clear direction, leaving the audience lost and disconnected.",
        },
        {
          id: 3,
          name: "Ekhonmu E.",
          rating: 4,
          text: "A delightful surprise from start to finish! This movie masterfully blended humor with heartfelt moments, striking a perfect balance that kept me both laughing and deeply invested in the characters journeys. It is rare to find a film that can tug at your heartstrings while keeping a smile on your face.",
        },
        {
          id: 4,
          name: "Jordan C.",
          rating: 4,
          text: "A bit of a letdown, unfortunately. While the concept was promising, the plot turned out to be quite predictable, and the acting did not quite hit the mark. It felt like a missed opportunity, especially considering the potential the initial trailers showed.",
        },
        {
          id: 5,
          name: "Jane Doe",
          rating: 5,
          text: "An instant classic in my book! The performances were simply outstanding, each actor bringing depth and nuance to their roles. The direction was equally superb, weaving a story that was both deeply moving and visually stunning. It is a film that will stay with me for a long time.",
        },
        {
          id: 6,
          name: "Vincent H.",
          rating: 2,
          text: "Mediocre at best, which was disappointing. The film suffered from significant pacing issues and a script that lacked depth and originality. I found myself checking my watch more than once, which is never a good sign for any movie.",
        },
      ],
    },
    {
      img: movieCard3,
      title: "Indieana Jones",
      otherInfo: "Length: 3h 45min / Age-Rating: R",
      trailer: "",
      description: "",
      reviews: [
        {
          id: 1,
          name: "Harry M.",
          rating: 5,
          text: "Absolutely stunning! The cinematography and special effects in this film were nothing short of mind-blowing, perfectly complementing a riveting and well-crafted storyline. The characters were richly developed, drawing the audience deeply into their world.",
        },
        {
          id: 2,
          name: "Vikram C.",
          rating: 3,
          text: "This movie was confusing and disjointed, trying to tackle too many themes at once. The result was a plot that was hard to follow and ultimately unsatisfying. It seemed like the filmmakers could not decide on a clear direction, leaving the audience lost and disconnected.",
        },
        {
          id: 3,
          name: "Ekhonmu E.",
          rating: 4,
          text: "A delightful surprise from start to finish! This movie masterfully blended humor with heartfelt moments, striking a perfect balance that kept me both laughing and deeply invested in the characters journeys. It is rare to find a film that can tug at your heartstrings while keeping a smile on your face.",
        },
        {
          id: 4,
          name: "Jordan C.",
          rating: 4,
          text: "A bit of a letdown, unfortunately. While the concept was promising, the plot turned out to be quite predictable, and the acting did not quite hit the mark. It felt like a missed opportunity, especially considering the potential the initial trailers showed.",
        },
        {
          id: 5,
          name: "Jane Doe",
          rating: 5,
          text: "An instant classic in my book! The performances were simply outstanding, each actor bringing depth and nuance to their roles. The direction was equally superb, weaving a story that was both deeply moving and visually stunning. It is a film that will stay with me for a long time.",
        },
        {
          id: 6,
          name: "Vincent H.",
          rating: 2,
          text: "Mediocre at best, which was disappointing. The film suffered from significant pacing issues and a script that lacked depth and originality. I found myself checking my watch more than once, which is never a good sign for any movie.",
        },
      ],
    },
    {
      img: movieCard4,
      title: "Wolf of Indie Street",
      otherInfo: "Length: 2h 10min / Age-Rating: PG",
      trailer: "",
      description: "",
      reviews: [
        {
          id: 1,
          name: "Harry M.",
          rating: 5,
          text: "Absolutely stunning! The cinematography and special effects in this film were nothing short of mind-blowing, perfectly complementing a riveting and well-crafted storyline. The characters were richly developed, drawing the audience deeply into their world.",
        },
        {
          id: 2,
          name: "Vikram C.",
          rating: 3,
          text: "This movie was confusing and disjointed, trying to tackle too many themes at once. The result was a plot that was hard to follow and ultimately unsatisfying. It seemed like the filmmakers could not decide on a clear direction, leaving the audience lost and disconnected.",
        },
        {
          id: 3,
          name: "Ekhonmu E.",
          rating: 4,
          text: "A delightful surprise from start to finish! This movie masterfully blended humor with heartfelt moments, striking a perfect balance that kept me both laughing and deeply invested in the characters journeys. It is rare to find a film that can tug at your heartstrings while keeping a smile on your face.",
        },
        {
          id: 4,
          name: "Jordan C.",
          rating: 4,
          text: "A bit of a letdown, unfortunately. While the concept was promising, the plot turned out to be quite predictable, and the acting did not quite hit the mark. It felt like a missed opportunity, especially considering the potential the initial trailers showed.",
        },
        {
          id: 5,
          name: "Jane Doe",
          rating: 5,
          text: "An instant classic in my book! The performances were simply outstanding, each actor bringing depth and nuance to their roles. The direction was equally superb, weaving a story that was both deeply moving and visually stunning. It is a film that will stay with me for a long time.",
        },
        {
          id: 6,
          name: "Vincent H.",
          rating: 2,
          text: "Mediocre at best, which was disappointing. The film suffered from significant pacing issues and a script that lacked depth and originality. I found myself checking my watch more than once, which is never a good sign for any movie.",
        },
      ],
    },
    {
      img: movieCard5,
      title: "Indie Movie",
      otherInfo: "Length: 1h 45min / Age-Rating: PG",
      trailer: "",
      description: "",
      reviews: [
        {
          id: 1,
          name: "Harry M.",
          rating: 5,
          text: "Absolutely stunning! The cinematography and special effects in this film were nothing short of mind-blowing, perfectly complementing a riveting and well-crafted storyline. The characters were richly developed, drawing the audience deeply into their world.",
        },
        {
          id: 2,
          name: "Vikram C.",
          rating: 3,
          text: "This movie was confusing and disjointed, trying to tackle too many themes at once. The result was a plot that was hard to follow and ultimately unsatisfying. It seemed like the filmmakers could not decide on a clear direction, leaving the audience lost and disconnected.",
        },
        {
          id: 3,
          name: "Ekhonmu E.",
          rating: 4,
          text: "A delightful surprise from start to finish! This movie masterfully blended humor with heartfelt moments, striking a perfect balance that kept me both laughing and deeply invested in the characters journeys. It is rare to find a film that can tug at your heartstrings while keeping a smile on your face.",
        },
        {
          id: 4,
          name: "Jordan C.",
          rating: 4,
          text: "A bit of a letdown, unfortunately. While the concept was promising, the plot turned out to be quite predictable, and the acting did not quite hit the mark. It felt like a missed opportunity, especially considering the potential the initial trailers showed.",
        },
        {
          id: 5,
          name: "Jane Doe",
          rating: 5,
          text: "An instant classic in my book! The performances were simply outstanding, each actor bringing depth and nuance to their roles. The direction was equally superb, weaving a story that was both deeply moving and visually stunning. It is a film that will stay with me for a long time.",
        },
        {
          id: 6,
          name: "Vincent H.",
          rating: 2,
          text: "Mediocre at best, which was disappointing. The film suffered from significant pacing issues and a script that lacked depth and originality. I found myself checking my watch more than once, which is never a good sign for any movie.",
        },
      ],
    },
  ];

  const movieNews = [
    {
      img: movieCard1,
      title: "Tom Hanks Stars in Indieana Jones",
      description:
        "Tom Hanks has taken his first leap into the indie market, being the lead actors on Indieanna Jones...",
      descriptionLong:
        "\nTom Hanks has taken his first leap into the indie market, being the lead actors on Indieanna Jones... blah blah balhsahhauuhadwsdfuhahuwfhoawuhiffawhf",
    },
    {
      img: movieCard2,
      title: "2024 Indie Awards",
      description:
        "The 2024 Indie Awards will be taking place in Winnipeg, Manitoba this year...",
      descriptionLong:
        "\nTom Hanks has taken his first leap into the indie market, being the lead actors on Indieanna Jones... blah blah balhsahhauuhadwsdfuhahuwfhoawuhiffawhf",
    },
    {
      img: movieCard3,
      title: "Despicable Indie Rocks Box Office",
      description:
        "Earning a staggering $5.5 million USD, Despicable Indie has taken the indie market by storm...",
      descriptionLong:
        "\nTom Hanks has taken his first leap into the indie market, being the lead actors on Indieanna Jones... blah blah balhsahhauuhadwsdfuhahuwfhoawuhiffawhf",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    document.body.classList.add("homepage-page-background");

    return () => {
      document.body.classList.remove("homepage-page-background");
    };
  }, []);

  const handleGetTicketsClick = () => {
    const carouselSection = document.getElementById("carousel-section");
    if (carouselSection) {
      window.scrollTo({
        top: carouselSection.offsetTop,
        behavior: "smooth",
      });
    }
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
                  "Frames Tells a Tale",
                  1000,
                  "The Power of Indie",
                  1000,
                  "Cinematic Wonders",
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
        <button className="cta-button" onClick={handleGetTicketsClick}>
          Get Tickets
        </button>
      </div>

      <section id="carousel-section" className="featured-movies">
        <h2 className="featured-movie-title">Featured Movies</h2>
        <p>
          <i>Browse our list of currently airing films!</i>
        </p>
        <Carousel className="carousel" itemsToShow={3}>
          {featuredMovies.map((movie, index) => (
            <Item
              key={index}
              onClick={() => {
                setImage(movie.img);
                setTitle(movie.title);
                setDescription(movie.description);
                setTrailer(movie.trailer);
                setReview(movie.reviews);
                navigate("/movie-info");
              }}
            >
              <div
                className="movie-card"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="movie-poster"
                />
                <h3 className="featured-movie">{movie.title}</h3>
                <p className="review-text-homepage">
                  {" "}
                  <i>{movie.otherInfo}</i>
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
          <Item
            className="articles"
            key={index}
            onClick={() => {
              handleShowNews();
              setNewsDescription(movie.descriptionLong);
              setNewsImage(movie.img);
              setNewsTitle(movie.title);
            }}
          >
            <div className="movie-article-card">
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
        {showNews && <MovieNewsModal onClose={handleCloseNews} />}
      </section>

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
