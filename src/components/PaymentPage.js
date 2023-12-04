import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "../styles/PaymentPage.css";
import Modal from "../components/Modal.js";

const PaymentPage = () => {
  const {
    subtotal,
    promoCode,
    setPromoCode,
    discount,
    setDiscount,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    tax,
    cleaningFee,
    total,
  } = useAppContext();

  const navigate = useNavigate();

  const [promoError, setPromoError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [inputError, setInputError] = useState("");

  const handlePromoCodeChange = (event) => {
    setPromoCode(event.target.value);
  };

  const applyPromoCode = () => {
    if (promoCode === "OFF$2") {
      setDiscount(2);
      setPromoError("");
      setShowModal(false);
    } else {
      if (!promoCode) {
        setPromoError("Please enter a promo code.");
      } else {
        setPromoError("Invalid promo code. Please try again.");
      }
      setDiscount(0);
      setShowModal(true);
    }
    setInputError("");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    let input = event.target.value.replace(/\D/g, "");
    if (input.length > 6) {
      input = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6, 10)}`;
    } else if (input.length > 3) {
      input = `${input.slice(0, 3)}-${input.slice(3)}`;
    }
    setPhoneNumber(input);
  };

  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  const getButtonClass = (method) => {
    if (!selectedPaymentMethod) {
      return "btn btn-primary";
    }
    return `btn ${
      selectedPaymentMethod === method ? "btn-primary" : "button-grey"
    }`;
  };

  const handleNextClick = () => {
    if (!emailRegex.test(email)) {
      setInputError(
        "Please enter a valid email in the format example@example.com"
      );
      setShowModal(true);
    } else if (!phoneRegex.test(phoneNumber)) {
      setInputError(
        "Please enter a valid phone number in the format 123-456-7890"
      );
      setShowModal(true);
    } else if (!selectedPaymentMethod) {
      setInputError("Please select a payment method.");
      setShowModal(true);
    } else {
      setInputError("");
      setShowModal(false);
      navigate("/confirmation-page");
    }
    setPromoError("");
  };

  const handleCreditCardClick = () => {
    selectPaymentMethod("Credit Card");
    navigate("/credit-card");
  };

  useEffect(() => {
    document.body.classList.add("payment-page-background");

    return () => {
      document.body.classList.remove("payment-page-background");
    };
  }, []);

  return (
    <div className="payment-page">
      <div className="payment-container">
        <Modal
          showModal={showModal}
          toggleModal={toggleModal}
          message={inputError || promoError}
        />

        <h2 className="text-center payment-header">Payment and Contact</h2>

        <div className="input-section centered-section">
          <div className="form-group">
            <label>E-mail:</label>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="e.g. example@example.com"
              value={email}
              onChange={handleEmailChange}
            />

            <label>Phone number:</label>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="e.g. 0123456789"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />

            <label>Payment Method:</label>
            <div className="payment-methods mb-3">
              <button
                className={getButtonClass("Apple Pay")}
                onClick={() => selectPaymentMethod("Apple Pay")}
              >
                Apple Pay
              </button>
              <button
                className={getButtonClass("Google Pay")}
                onClick={() => selectPaymentMethod("Google Pay")}
              >
                Google Pay
              </button>
              <button
                className={getButtonClass("Credit Card")}
                onClick={handleCreditCardClick}
              >
                Credit Card (Visa and MasterCard)
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

          <div className="summary-section">
            <ul className="summary-list">
              <li className="summary-item">Subtotal: ${subtotal.toFixed(2)}</li>
              <li className="summary-item">
                Promo Discount: -${discount.toFixed(2)}
              </li>
              <li className="summary-item">Taxes: ${tax.toFixed(2)}</li>
              <li className="summary-item">
                Booking Fees: ${cleaningFee.toFixed(2)}
              </li>
              <li className="total-cost summary-item">
                Total: ${total.toFixed(2)}
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center payment-actions">
          <Button
            variant="primary"
            size="lg"
            className="payment-next-button"
            onClick={handleNextClick}
          >
            Confirm
          </Button>
          <Button
            variant="secondary"
            className="payment-back-button"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
