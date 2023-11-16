import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/PaymentPage.css";

const PaymentPage = () => {
    return (
        <div className="container">
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

                    <button className="btn btn-secondary mb-3">Apply Promo Code</button>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <ul className="summary-list">
                        <li className="summary-item">Subtotal: $22.00</li>
                        <li className="summary-item">Promo: -$0.00</li>
                        <li className="summary-item">Tax: $1.10</li>
                        <li className="summary-item">Cleaning Fee: $2.50</li>
                        <li className="total-cost summary-item">Total: $25.60</li>
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
