import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/PaymentPage.css";
import Modal from "../components/Modal.js";


const PaymentPage = () => {

    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const subtotal = 22.00;
    const cleaningFee = 2.50;
    const calculateTax = (subtotal, discount) => 0.05 * (subtotal - discount);
    const [tax, setTax] = useState(calculateTax(subtotal, discount));

    const handlePromoCodeChange = (event) => {
        setPromoCode(event.target.value);
    };

    const applyPromoCode = () => {
        if (promoCode === 'OFF$2') {
            setDiscount(2);
            setTax(calculateTax(subtotal, 2));
            setPromoError('');
            setShowModal(false);
        } else {
            if (!promoCode) {
                setPromoError('Please enter a promo code.');
            } else {
                setPromoError('Invalid promo code. Please try again.');
            }
            setDiscount(0);
            setTax(calculateTax(subtotal, 0));
            setShowModal(true);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const total = subtotal - discount + tax + cleaningFee;

    return (
        <div className="container">
            <Modal
                showModal={showModal}
                toggleModal={toggleModal}
                message={promoError}
            />
            <h2 className="text-center payment-header">Payment and Contact</h2>

            <div className="row">
                <div className="col-md-6 input-section">
                    <label>Phone number:</label>
                    <input type="text" className="form-control mb-3" placeholder="e.g. 123-456-7890" />

                    <label>E-mail:</label>
                    <input type="email" className="form-control mb-3" placeholder="example@example.com" />
                </div>

                <div className="col-md-6 input-section">
                    <label>Payment Method:</label>
                    <div className="payment-methods mb-3">
                        <button className="btn btn-primary">Credit Card</button>
                        <button className="btn btn-primary">Apple Pay</button>
                        <button className="btn btn-primary">Google Pay</button>
                    </div>

                    <label>Promo Code:</label>
                    <div className="promo-code-group mb-3">
                        <input
                            type="text"
                            className="form-control promo-code-input"
                            placeholder="Enter promo code"
                            value={promoCode}
                            onChange={handlePromoCodeChange}
                        />
                        <button
                            className="btn btn-secondary apply-promo-btn"
                            onClick={applyPromoCode}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <ul className="summary-list">
                        <li className="summary-item">Subtotal: ${subtotal.toFixed(2)}</li>
                        <li className="summary-item">Promo: -${discount.toFixed(2)}</li>
                        <li className="summary-item">Tax: ${tax.toFixed(2)}</li>
                        <li className="summary-item">Cleaning Fee: ${cleaningFee.toFixed(2)}</li>
                        <li className="total-cost summary-item">Total: ${total.toFixed(2)}</li>
                    </ul>
                </div>
            </div>

            <div className="text-center actions">
                <button className="btn complete-order-btn">Next</button>
                <br />
                <button className="btn backButton">Back</button>
            </div>
        </div>
    );
};



export default PaymentPage;
