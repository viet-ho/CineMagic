import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/CreditCardPage.css";

const CreditCardPage = () => {
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
        postalCode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(cardDetails);
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-center mb-4">Credit Card Information</h2>
                        <div className="form-group mb-3">
                            <label><strong>Credit Card Number:</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                name="cardNumber"
                                value={cardDetails.cardNumber}
                                onChange={handleChange}
                                maxLength={16}
                                placeholder="Enter credit card number"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label><strong>Name On Card:</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                name="cardName"
                                value={cardDetails.cardName}
                                onChange={handleChange}
                                placeholder="Enter name on card"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label><strong>Expiry:</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                name="expiry"
                                value={cardDetails.expiry}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                maxLength={5}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label><strong>CVV:</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                name="cvv"
                                value={cardDetails.cvv}
                                onChange={handleChange}
                                placeholder="Enter CVV (3 numbers)"
                                maxLength={3}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label><strong>Postal Code:</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                name="postalCode"
                                value={cardDetails.postalCode}
                                onChange={handleChange}
                                placeholder="Enter postal code (T2N 1N4)"
                                maxLength={7}
                            />
                        </div>
                        <div className="text-center mb-2">
                            <button className="btn confirm-button">Confirm Card</button>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-secondary back-button" onClick={() => { /* Handle the back button logic here */ }}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreditCardPage;

