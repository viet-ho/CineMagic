import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import "../styles/TicketBookingPage.css";
import Modal from "../components/Modal.js";

function TicketBookingPage({ availableSeats }) {
    const navigate = useNavigate();

    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [seniorCount, setSeniorCount] = useState(0);
    const [specialAssistance, setSpecialAssistance] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const subtotal = adultCount * 22 + childCount * 10 + seniorCount * 10;
    const totalTickets = adultCount + childCount + seniorCount;

    const handleConfirmTickets = () => {
        if (adultCount + childCount + seniorCount === 0) {
            setModalMessage('Please add at least one ticket before confirming.');
            setShowModal(true);
        } else {
            navigate(`/seat-booking?tickets=${totalTickets}`);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const canAddTicket = (count) => totalTickets < availableSeats && count < availableSeats;

    useEffect(() => {
        document.body.classList.add('ticket-page-background');

        return () => {
            document.body.classList.remove('ticket-page-background');
        };
    }, []);

    return (
        <div className="ticket-page">
            <div className="ticket-container">
                <Modal showModal={showModal} toggleModal={toggleModal} message={modalMessage} />
                <h2>Ticket Type</h2>

                <div className="card mb-3">
                    <div className="card-body">
                        <span>Adult (18-64): $22</span>
                        <div>
                            <button className="btn btn-primary" onClick={() => canAddTicket(adultCount) && setAdultCount(adultCount + 1)}>+</button>
                            <span className="mx-2">{adultCount}</span>
                            <button className="btn btn-primary" onClick={() => adultCount > 0 && setAdultCount(adultCount - 1)}>-</button>
                        </div>
                    </div>
                </div>

                <div className="card mb-3">
                    <div className="card-body">
                        <span>Child (0-17): $10</span>
                        <div>
                            <button className="btn btn-primary" onClick={() => canAddTicket(childCount) && setChildCount(childCount + 1)}>+</button>
                            <span className="mx-2">{childCount}</span>
                            <button className="btn btn-primary" onClick={() => childCount > 0 && setChildCount(childCount - 1)}>-</button>
                        </div>
                    </div>
                </div>

                <div className="card mb-3">
                    <div className="card-body">
                        <span>Senior (65+): $10</span>
                        <div>
                            <button className="btn btn-primary" onClick={() => canAddTicket(seniorCount) && setSeniorCount(seniorCount + 1)}>+</button>
                            <span className="mx-2">{seniorCount}</span>
                            <button className="btn btn-primary" onClick={() => seniorCount > 0 && setSeniorCount(seniorCount - 1)}>-</button>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="label-text">Special Assistance:</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={specialAssistance}
                        onChange={(e) => setSpecialAssistance(e.target.value)}
                        placeholder="Please provide details for any special assistance needed."
                    ></textarea>
                </div>

                <div className="subtotal-field">
                    <span>Subtotal: ${subtotal}</span>
                </div>

                <div className="ticket-action-container">
                    <Button variant="primary" className="ticket-confirm-button" onClick={handleConfirmTickets}>
                        Confirm Ticket(s)
                    </Button>
                    <Button variant="secondary" className="ticket-back-button">
                        Back
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default TicketBookingPage;


