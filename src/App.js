import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/Homepage";
import DateSelection from "./components/DateSelection";
import ReviewsPage from "./components/ReviewsPage";
import SeatBookingPage from "./components/SeatBookingPage";
import PaymentPage from "./components/PaymentPage";
import TicketBookingPage from "./components/TicketBookingPage";
import CreditCardPage from "./components/CreditCardPage";
import ConfirmationPage from "./components/ConfirmationPage";
import MovieInfo from "./components/MovieInfo";

function App() {
  //return <DateSelection></DateSelection>;
  //return <MovieInfo></MovieInfo>;
  //return <HomePage></HomePage>;
  //return <ReviewsPage></ReviewsPage>;
  //return <SeatBookingPage totalSeats={60} availableSeats={48} selectedTickets={4} />
  //return <PaymentPage></PaymentPage>;
  //return <TicketBookingPage availableSeats={30} />;
  //return <CreditCardPage></CreditCardPage>;
  //return <ConfirmationPage></ConfirmationPage>;

  {/*
  return (
    <Routes>
      <Route path="/" element={<TicketBookingPage />} />
      <Route path="/seat-booking" element={<SeatBookingPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/credit-card" element={<CreditCardPage />} />
      <Route path="/confirmation-page" element={<ConfirmationPage />} />
    </Routes>
  );
  */}

}

export default App;
