import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/PaymentPage.css";
import Modal from "../components/Modal.js";


const PaymentPage = () => {

    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [inputError, setInputError] = useState('');

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };

    const selectPaymentMethod = (method) => {
        setSelectedPaymentMethod(method);
    };

    const getButtonClass = (method) => {
        return `btn ${selectedPaymentMethod === method ? 'button-grey' : 'btn-primary'}`;
    };

    const handleNextClick = () => {
        if (!emailRegex.test(email)) {
            setInputError('Please enter a valid email.');
            setShowModal(true);
        } else if (!phoneRegex.test(phoneNumber)) {
            setInputError('Please enter a valid phone number in the format 123-456-7890.');
            setShowModal(true);
        } else if (!selectedPaymentMethod) {
            setInputError('Please select a payment method.');
            setShowModal(true);
        } else {
            setInputError('');
            setShowModal(false);
        }
    };

    return (
        <div className="payment-container">
            <Modal
                showModal={showModal}
                toggleModal={toggleModal}
                message={inputError || promoError}
            />
            <h2 className="text-center payment-header">Payment and Contact</h2>

            <div className="row">
                <div className="col-md-6 input-section">
                    <label>Phone number:</label>
                    <input type="text" className="form-control mb-3" placeholder="e.g. 123-456-7890" value={phoneNumber} onChange={handlePhoneNumberChange} />

                    <label>E-mail:</label>
                    <input type="email" className="form-control mb-3" placeholder="example@example.com" value={email} onChange={handleEmailChange} />
                </div>

                <div className="col-md-6 input-section">
                    <label>Payment Method:</label>
                    <div className="payment-methods mb-3">
                        <button
                            className={getButtonClass('Credit Card')}
                            onClick={() => selectPaymentMethod('Credit Card')}
                        >
                            Credit Card
                        </button>
                        <button
                            className={getButtonClass('Apple Pay')}
                            onClick={() => selectPaymentMethod('Apple Pay')}
                        >
                            Apple Pay
                        </button>
                        <button
                            className={getButtonClass('Google Pay')}
                            onClick={() => selectPaymentMethod('Google Pay')}
                        >
                            Google Pay
                        </button>
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
                <button className="btn complete-order-btn" onClick={handleNextClick}>Next</button>
                <br />
                <button className="btn backButton">Back</button>
            </div>
        </div>
    );
};



export default PaymentPage;
