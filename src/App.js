import React, { useState } from "react";
import { Route, Router, Routes, Navigate } from "react-router-dom";
import { useAppContext } from './AppContext';
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
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import AccountPage from "./components/AccountPage";

const ProtectedRoute = ({ children }) => {
  const { loginStatus } = useAppContext();

  return loginStatus === "true" ? children : <Navigate to="/profile" />;
};

function App() {
  //return <DateSelection></DateSelection>;
  //return <MovieInfo></MovieInfo>;
  //return <ReviewsPage></ReviewsPage>;
  //return <SeatBookingPage totalSeats={60} availableSeats={48} selectedTickets={4} />
  //return <PaymentPage></PaymentPage>;
  //return <TicketBookingPage availableSeats={30} />;
  //return <CreditCardPage></CreditCardPage>;
  //return <ConfirmationPage></ConfirmationPage>;
  //return <LoginPage></LoginPage>;
  //return <AccountPage></AccountPage>;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/movie-info" element={<MovieInfo />} />
        <Route path="/date-selection" element={<DateSelection />} />
        <Route path="/seat-booking" element={<SeatBookingPage />} />
        <Route path="/ticket-selection" element={<TicketBookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/credit-card" element={<CreditCardPage />} />
        <Route path="/profile" element={<LoginPage />} />
        <Route path="/confirmation-page" element={<ConfirmationPage />} />
        <Route
          path="/profile-info"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
