import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
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

const SeatBookingPage = () => {

    const { availableSeats, totalSeats, totalTickets, seatIDs, setSeatIDs } = useAppContext();

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const generateSeats = () => {
        return Array.from({ length: totalSeats }, (_, i) => {
            const id = `S${i + 1}`;
            return {
                id: id,
                isBooked: i >= availableSeats,
                isAccessible: ['S5', 'S6'].includes(id),
                isSelected: seatIDs.includes(id),
            };
        });
    };

    const [seats, setSeats] = useState(generateSeats);

    useEffect(() => {
        setSeats(generateSeats());
    }, [seatIDs]);

    const toggleBooking = (id) => {
        setSeats(seats.map((seat) => {
            if (seat.id === id && !seat.isBooked) {
                const isSelected = !seat.isSelected;
                // Determine if adding or removing a seat
                if (isSelected) {
                    if (seatIDs.length < totalTickets) {
                        setSeatIDs([...seatIDs, id]);
                    } else {
                        // Optionally, show a message that no more seats can be selected
                        setModalMessage("You cannot select more seats than the number of tickets.");
                        setShowModal(true);
                        return seat; // Early return to prevent selecting more seats
                    }
                } else {
                    const newSeatIDs = seatIDs.filter(seatID => seatID !== id);
                    setSeatIDs(newSeatIDs);
                }
                return { ...seat, isSelected: isSelected };
            }
            return seat;
        }));
    };

    const hasSelectedSeats = seatIDs.length > 0;

    const navigate = useNavigate();

    const handleConfirmSeats = () => {
        const selectedSeatCount = seats.filter(seat => seat.isSelected).length;
        if (selectedSeatCount !== totalTickets) {
            setModalMessage(`Please select exactly ${totalTickets} seats.`);
            setShowModal(true);
            return;
        }
        navigate('/payment');
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