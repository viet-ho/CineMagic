import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/Homepage";
import ReviewsPage from "./components/ReviewsPage";
import SeatBookingPage from "./components/SeatBookingPage";
import PaymentPage from "./components/PaymentPage";
import TicketBookingPage from "./components/TicketBookingPage";
import ConfirmationPage from "./components/ConfirmationPage";
import CreditCardPage from "./components/CreditCardPage";

function App() {
  return <HomePage></HomePage>;
  //return <ReviewsPage></ReviewsPage>;
  //return <SeatBookingPage></SeatBookingPage>;
  return <PaymentPage></PaymentPage>;
  //return <TicketBookingPage></TicketBookingPage>;
  //return <ConfirmationPage></ConfirmationPage>;
  //return <CreditCardPage></CreditCardPage>;
}

export default App;
