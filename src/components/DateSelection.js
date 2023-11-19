import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import "../styles/DateSelection.css";

const DateSelection = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [isConfirmDisabled, setConfirmDisabled] = useState(true);
  const [showtimes, setShowtimes] = useState([
    { time: "10:00AM", disabled: false },
    { time: "2:00PM", disabled: false },
    { time: "3:30PM", disabled: false },
    { time: "6:00PM", disabled: false },
    { time: "10:00PM", disabled: false },
    { time: "11:30PM", disabled: false },
  ]);

  useEffect(() => {
    const greyedOutShowtimes = Array.from({ length: 2 }, () =>
      Math.floor(Math.random() * showtimes.length)
    );
    const updatedShowtimes = showtimes.map((st, index) => ({
      ...st,
      disabled: greyedOutShowtimes.includes(index),
    }));
    setShowtimes(updatedShowtimes);
  }, [startDate]);

  const handleShowtimeSelect = (time, disabled) => {
    if (!disabled) {
      setSelectedShowtime(time);
      setConfirmDisabled(false);
    }
  };

  const handleConfirmShowtime = () => {
    alert(`Showtime confirmed: ${selectedShowtime}`);
  };

  return (
    <div className="date-selection">
      <h1>🎥 Selected Movie: Indie Movie</h1>
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
          onClick={handleConfirmShowtime}
          disabled={isConfirmDisabled}
        >
          Confirm Showtime
        </button>
      </section>
    </div>
  );
};

export default DateSelection;
