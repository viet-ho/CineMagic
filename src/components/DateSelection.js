import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import "../styles/DateSelection.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import Modal from "../components/Modal.js";

const DateSelection = () => {
  const { setDate, setTime, title } = useAppContext();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [isConfirmDisabled, setConfirmDisabled] = useState(true);
  const [showtimes, setShowtimes] = useState([
    { time: "10:00AM", disabled: false },
    { time: "2:00PM", disabled: true },
    { time: "3:30PM", disabled: false },
    { time: "6:00PM", disabled: false },
    { time: "10:00PM", disabled: false },
    { time: "11:30PM", disabled: false },
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleShowtimeSelect = (time, disabled) => {
    if (!disabled) {
      setSelectedShowtime(time);
      setConfirmDisabled(false);
    }
  };

  const handleConfirmShowtime = () => {
    setModalMessage(`Showtime confirmed on ${startDate.toDateString()} at ${selectedShowtime}`);
    setShowModal(true);
  };

  useEffect(() => {
    document.body.classList.add("date-selection");

    return () => {
      document.body.classList.remove("date-selection");
    };
  }, []);

  return (
    <div className="date-selection-main">
      <Modal showModal={showModal} toggleModal={() => navigate("/ticket-selection")} message={modalMessage} />
      <h1>🎥 Selected Movie: {title}</h1>
      <p>
        <i>Click on the date selector box to change the showtime date.</i>
      </p>
      <section>
        <p>
          <strong className="showtime-dates">Showtimes on </strong>
          <DatePicker
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
            maxDate={addDays(new Date(), 7)}
            placeholderText="See movies within the next 7 days"
          />
          <strong className="showtime-dates"> :</strong>
        </p>
        <div className="button-container">
          {showtimes.map(({ time, disabled }, index) => (
            <button
              key={index}
              type="button"
              className={`orange-button ${
                selectedShowtime === time ? "selected" : ""
              }${disabled ? " disabled" : ""}`}
              onClick={() => handleShowtimeSelect(time, disabled)}
              disabled={disabled}
            >
              {time}
            </button>
          ))}
        </div>
      </section>
      <section>
        <button
          type="button"
          className="confirm-button"
          onClick={() => {
            setDate(startDate);
            setTime(selectedShowtime);
            handleConfirmShowtime();
          }}
          disabled={isConfirmDisabled}
        >
          Confirm Showtime
        </button>
      </section>
      <button className="back-button-date-selection" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default DateSelection;
