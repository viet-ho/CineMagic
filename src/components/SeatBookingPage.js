import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/SeatBookingPage.css";
import Modal from "../components/Modal.js";

const Seat = ({ id, isBooked, isAccessible, isSelected, toggleBooking }) => {
    return (
        <button
            disabled={isBooked}
            className={`btn ${isBooked ? 'btn-secondary' : isAccessible ? 'btn-info' : 'btn-success'} m-1 seatButton position-relative`}
            onClick={() => toggleBooking(id)}
        >
            {isSelected && <span className="starBadge">★</span>}
            {isAccessible ? '♿️' : id}
        </button>
    );
};

const SeatBookingPage = ({ totalSeats, availableSeats }) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedTickets = parseInt(searchParams.get('tickets'), 10) || 0;

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const generateSeats = () => {
        const seats = [];
        for (let i = 1; i <= totalSeats; i++) {
            seats.push({
                id: `S${i}`,
                isBooked: i > availableSeats,
                isAccessible: ['S5', 'S6'].includes(`S${i}`), // Two accessible seats
                isSelected: false
            });
        }
        return seats;
    };

    const [seats, setSeats] = useState(generateSeats);

    const toggleBooking = (id) => {
        const currentlySelected = seats.filter(seat => seat.isSelected).length;

        if (currentlySelected < selectedTickets || seats.find(seat => seat.id === id).isSelected) {
            setSeats(
                seats.map((seat) =>
                    seat.id === id ? { ...seat, isSelected: !seat.isSelected } : seat
                )
            );
        }
    };

    const hasSelectedSeats = seats.some(seat => seat.isSelected);

    const navigate = useNavigate();

    const handleConfirmSeats = () => {
        const selectedSeatCount = seats.filter(seat => seat.isSelected).length;
        if (selectedSeatCount !== selectedTickets) {
            setModalMessage(`Please select exactly ${selectedTickets} seats.`);
            setShowModal(true);
            return;
        }
    };

    useEffect(() => {
        document.body.classList.add('seat-booking-page-background');

        return () => {
            document.body.classList.remove('seat-booking-page-background');
        };
    }, []);

    return (
        <div className="seatBookingContainer">
            <p className="selectSeatText">Select Empty Seat</p>
            <div className="screenText">🎥 Screen</div>
            <div className="seatContainer">
                {seats.map((seat, index) => (
                    <React.Fragment key={seat.id}>
                        {index % 10 === 0 && <div className="w-100"></div>}
                        <Seat
                            id={seat.id}
                            isBooked={seat.isBooked}
                            isAccessible={seat.isAccessible}
                            isSelected={seat.isSelected}
                            toggleBooking={toggleBooking}
                        />
                    </React.Fragment>
                ))}
            </div>
            {hasSelectedSeats && (
                <div className="text-center confirmButton">
                    <button className="btn btn-warning" onClick={handleConfirmSeats}>Confirm Seat(s)</button>
                </div>
            )}
            <div className="text-center backButton">
                <button className="btn btn-primary" onClick={() => navigate(-1)}>Back</button>
            </div>
            <div className="noteSection">
                <div className="availableSeat">
                    <button className="btn btn-success seatButton">A</button>
                    <span> Available Seat</span>
                </div>
                <div className="unavailableSeat">
                    <button className="btn btn-secondary seatButton">U</button>
                    <span> Unavailable Seat</span>
                </div>
                <div className="accessibilitySeat">
                    <button className="btn btn-info seatButton"><i className="fa fa-wheelchair" aria-hidden="true"></i></button>
                    <span> Accessibility Seat</span>
                </div>
            </div>
            <Modal showModal={showModal} toggleModal={() => setShowModal(!showModal)} message={modalMessage} />
        </div>
    );
};

export default SeatBookingPage;