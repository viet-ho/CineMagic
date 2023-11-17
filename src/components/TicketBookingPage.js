import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/TicketBookingPage.css";

function TicketBookingPage() {
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [seniorCount, setSeniorCount] = useState(0);
    const [wheelchairCount, setWheelchairCount] = useState('');
    const [specialAssistance, setSpecialAssistance] = useState('');

    const subtotal = adultCount * 22 + childCount * 10 + seniorCount * 10;

    return (
        <div className="container">
            <h2>Ticket Type</h2>

            <div className="card mb-3">
                <div className="card-body">
                    <span>Adult (18-64): $22</span>
                    <div>
                        <button className="btn btn-primary" onClick={() => setAdultCount(adultCount + 1)}>+</button>
                        <span className="mx-2">{adultCount}</span>
                        <button className="btn btn-primary" onClick={() => adultCount > 0 && setAdultCount(adultCount - 1)}>-</button>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <span>Child (0-17): $10</span>
                    <div>
                        <button className="btn btn-primary" onClick={() => setChildCount(childCount + 1)}>+</button>
                        <span className="mx-2">{childCount}</span>
                        <button className="btn btn-primary" onClick={() => childCount > 0 && setChildCount(childCount - 1)}>-</button>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <span>Senior (65+): $10</span>
                    <div>
                        <button className="btn btn-primary" onClick={() => setSeniorCount(seniorCount + 1)}>+</button>
                        <span className="mx-2">{seniorCount}</span>
                        <button className="btn btn-primary" onClick={() => seniorCount > 0 && setSeniorCount(seniorCount - 1)}>-</button>
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <label>How many wheelchair seats will be required, if any?:</label>
                <input
                    type="number"
                    className="form-control"
                    value={wheelchairCount}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '') {
                            setWheelchairCount(value);
                        } else {
                            const newValue = parseInt(value, 10);
                            if (newValue >= 0 && newValue <= 40) {
                                setWheelchairCount(newValue);
                            }
                        }
                    }}
                    placeholder="0, 1, 2, or more (up to 40)"
                    min="0"
                    max="40"
                />
            </div>

            <div className="mb-3">
                <label>Special Assistance:</label>
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
                <button className="btn btn-confirm">Confirm Ticket(s)</button>
                <button className="btn btn-back">Back</button>
            </div>

        </div>
    );
}

export default TicketBookingPage;


