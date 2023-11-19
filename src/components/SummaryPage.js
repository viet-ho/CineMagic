import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import "../styles/SummaryPage.css";

const SummaryPage = () => {
  // Placeholder data
  const movieDetails = {
    title: "Movie Title",
    date: "Date",
    time: "Time",
    location: "Theater Address",
    imageUrl: "https://source.unsplash.com/featured/?movie"
  };

  const ticketDetails = {
    adultTickets: "[Number of Adult Tickets]",
    youthTickets: "[Number of Youth Tickets]",
    seniorTickets: "[Number of Senior Tickets]",
    seatNumber: "[Seat Number]"
  };

  const userDetails = {
    phone: "[Phone Number]",
    email: "[Email]",
    paymentMethod: "[Payment Method]",
    promoCode: "[Promo Code]"
  };

  const priceDetails = {
    subtotal: "$[Amount]",
    discount: "$[Discount]",
    taxes: "$[Tax Amount]",
    bookingFee: "$[Booking Fee]",
    total: "$[Total Amount]",
  };

  useEffect(() => {
    document.body.classList.add('summary-page-background');

    return () => {
      document.body.classList.remove('summary-page-background');
    };
  }, []);

  return (
    <div className="confirm-container">
      <main className="main-container">
        <section className="movie-details">
          <img src={movieDetails.imageUrl} alt="Movie Poster" />
          <div>
            <h3>{movieDetails.title}</h3>
            <p><strong>Date:</strong> {movieDetails.date}</p>
            <p><strong>Time:</strong> {movieDetails.time}</p>
            <p><strong>Location:</strong> {movieDetails.location}</p>
          </div>
        </section>
        <hr />
        <section className="ticket-details">
          <h2>Your Tickets</h2>
          <p><strong>Adult Tickets:</strong> {ticketDetails.adultTickets}</p>
          <p><strong>Youth Tickets:</strong> {ticketDetails.youthTickets}</p>
          <p><strong>Senior Tickets:</strong> {ticketDetails.seniorTickets}</p>
          <p><strong>Seat Number:</strong> {ticketDetails.seatNumber}</p>
        </section>
        <hr />
        <section className="user-details">
          <h2>Your Information</h2>
          <p><strong>Phone:</strong> {userDetails.phone}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Payment Method:</strong> {userDetails.paymentMethod}</p>
          <p><strong>Promo Code:</strong> {userDetails.promoCode}</p>
        </section>
        <hr />
        <section className="price-details">
          <h2>Total Price</h2>
          <p><strong>Subtotal:</strong> {priceDetails.subtotal}</p>
          <p><strong>Promo Discount:</strong> {priceDetails.discount}</p>
          <p><strong>Taxes:</strong> {priceDetails.taxes}</p>
          <p><strong>Booking Fees:</strong> {priceDetails.bookingFee}</p>
          <p><strong>Total: {priceDetails.total}</strong></p>
        </section>
        <div className="confirm-page-action-buttons">
          <Button variant="primary" size="lg" className="complete-button">
            Complete Order
          </Button>
          <Button variant="secondary" className="complete-back-button">
            Back
          </Button>
        </div>
      </main>
    </div>
  );
}

export default SummaryPage;


