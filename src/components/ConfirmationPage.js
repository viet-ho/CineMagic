import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import "../styles/ConfirmationPage.css";

const SummaryPage = () => {

  const { title, date, time, image, adultCount, childCount, seniorCount, seatIDs, phoneNumber, email, selectedPaymentMethod, promoCode, subtotal, discount, tax, cleaningFee, total, specialAssistance } = useAppContext();

  const navigate = useNavigate();

  const movieDetails = {
    title: title,
    date: date instanceof Date ? date.toDateString() : 'Invalid Date',
    time: time,
    location: "CineMagic at 511 10 Ave SW",
    imageUrl: image,
  };

  const adultTicketPrice = 22;
  const youthTicketPrice = 10;
  const seniorTicketPrice = 10;

  const ticketDetails = {
    adultTickets: `${adultCount} ($${adultTicketPrice} x ${adultCount} = $${adultCount * adultTicketPrice})`,
    youthTickets: `${childCount} ($${youthTicketPrice} x ${childCount} = $${childCount * youthTicketPrice})`,
    seniorTickets: `${seniorCount} ($${seniorTicketPrice} x ${seniorCount} = $${seniorCount * seniorTicketPrice})`,
    seatNumber: seatIDs.map(seatID => {
      if (seatID === 'S5' || seatID === 'S6') {
        return `${seatID} (Accessibility Seat)`;
      }
      return seatID;
    }).join(", "),
    specialRequest: specialAssistance ? specialAssistance: "None"
  };

  const userDetails = {
    phone: phoneNumber,
    email: email,
    paymentMethod: selectedPaymentMethod,
    promoCode: promoCode ? promoCode : "None"
  };

  const priceDetails = {
    subtotal: subtotal.toFixed(2),
    discount: discount.toFixed(2),
    taxes: tax.toFixed(2),
    bookingFee: cleaningFee.toFixed(2),
    total: total.toFixed(2),
  };

  useEffect(() => {
    document.body.classList.add('summary-page-background');

    return () => {
      document.body.classList.remove('summary-page-background');
    };
  }, []);

  return (
    <div className="confirmation-page">
      <div className="confirm-container">
        <main className="main-container">
          <section className="movie-details">
            <img src={movieDetails.imageUrl} alt="Movie Poster" className="movie-poster-confirm" />
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
            <p><strong>Special Assistance:</strong> {ticketDetails.specialRequest}</p>
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
            <p><strong>Subtotal:</strong> ${priceDetails.subtotal}</p>
            <p><strong>Promo Discount:</strong> -${priceDetails.discount}</p>
            <p><strong>Taxes:</strong> ${priceDetails.taxes}</p>
            <p><strong>Booking Fees:</strong> ${priceDetails.bookingFee}</p>
            <p><strong>Total: ${priceDetails.total}</strong></p>
          </section>
          <div className="confirm-page-action-buttons">
            <Button variant="primary" size="lg" className="complete-button">
              Complete Order
            </Button>
            <Button variant="secondary" className="complete-back-button" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SummaryPage;


