import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "../styles/CreditCardPage.css";
import Modal from "../components/Modal.js";

const CreditCardPage = () => {
  const { setSelectedPaymentMethod } = useAppContext();

  const navigate = useNavigate();

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    postalCode: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      let formattedValue = value.replace(/\D/g, "").substring(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1-");
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        [name]: formattedValue,
      }));
    } else if (name === "expiry") {
      let formattedValue = value.replace(/\D/g, "").substring(0, 4);
      formattedValue = formattedValue.replace(/(\d{2})(?=\d)/g, "$1/");
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        [name]: formattedValue,
      }));
    } else if (name === "postalCode") {
      let formattedValue = value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .substring(0, 6);
      if (formattedValue.length > 3) {
        formattedValue = `${formattedValue.slice(0, 3)} ${formattedValue.slice(
          3
        )}`;
      }
      setCardDetails((prevDetails) => ({
        ...prevDetails,
        [name]: formattedValue,
      }));
    } else {
      setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cardNumberRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const cvvRegex = /^\d{3}$/;
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;

    // Validation checks
    if (!cardNumberRegex.test(cardDetails.cardNumber)) {
      setModalMessage(
        "Please enter a valid 16-digit credit card number (e.g. 1234-5678-9123-4567)."
      );
    } else if (!cardDetails.cardName.trim()) {
      setModalMessage("Please enter the name on the card.");
    } else if (!expiryRegex.test(cardDetails.expiry)) {
      setModalMessage("Please enter a valid expiry date in MM/YY format.");
    } else if (!cvvRegex.test(cardDetails.cvv)) {
      setModalMessage("Please enter a valid 3-digit CVV (e.g. 123).");
    } else if (!postalCodeRegex.test(cardDetails.postalCode)) {
      setModalMessage("Please enter a valid postal code (e.g. T2N 1N4).");
    } else {
      console.log(cardDetails);
      navigate(-1);
      return;
    }

    setShowModal(true);
  };

  const handleCreditCardClick = () => {
    setSelectedPaymentMethod("");
    navigate(-1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    document.body.classList.add("credit-page-background");

    return () => {
      document.body.classList.remove("credit-page-background");
    };
  }, []);

  return (
    <div className="credit-page">
      <div className="container mt-5 credit-card-container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Credit Card Information</h2>
            <div className="form-group mb-3">
              <label>
                <strong>Credit Card Number:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleChange}
                maxLength={20}
                placeholder="Enter 16-digit credit card number"
              />
            </div>
            <div className="form-group mb-3">
              <label>
                <strong>Name On Card:</strong>
              </label>
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
              <label>
                <strong>Expiry:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="expiry"
                value={cardDetails.expiry}
                onChange={handleChange}
                placeholder="MMYY"
                maxLength={5}
              />
            </div>
            <div className="form-group mb-3">
              <label>
                <strong>CVV:</strong>
              </label>
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
              <label>
                <strong>Postal Code:</strong>
              </label>
              <input
                type="text"
                className="form-control"
                name="postalCode"
                value={cardDetails.postalCode}
                onChange={handleChange}
                placeholder="Enter postal code (e.g. T2N1N4)"
                maxLength={7}
              />
            </div>
            <div className="text-center credit-actions">
              <Button
                variant="primary"
                className="credit-confirm-button"
                onClick={handleSubmit}
              >
                Confirm Card
              </Button>
              <Button
                variant="secondary"
                className="credit-back-button"
                onClick={handleCreditCardClick}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
        <Modal
          showModal={showModal}
          toggleModal={toggleModal}
          message={modalMessage}
        />
      </div>
    </div>
  );
};

export default CreditCardPage;
