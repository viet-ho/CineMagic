import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import "../styles/ConfirmationPage.css";

function ConfirmationPage() {
  return (
    <Container className="confirmation-container">
      <h2>Confirmation</h2>
      
      <Row>
        <Col md={6}>
          <h4>Ticket(s):</h4>
          <p>Adult x1 - $22.00</p>
          <p>Young x2 - $20.00</p>
          <p>Senior x0 - $0.00</p>
        </Col>
        <Col md={6}>
          <h4>Phone number:</h4>
          <p>403-123-4567</p>
          <h4>E-mail:</h4>
          <p>email.gmail.com</p>
          <h4>Payment Method:</h4>
          <p>Credit Card</p>
          <h4>Promo Code:</h4>
          <p>OFF$2</p>
        </Col>
      </Row>

      <div className="amount-section">
        <p><strong>Subtotal:</strong> $42.00</p>
        <p><strong>Promo:</strong> -$2.00</p>
        <p><strong>Tax:</strong> $2.00</p>
        <p><strong>Cleaning Fee:</strong> $2.50</p>
        <p><strong>Total:</strong> $44.50</p>
      </div>

      <Button variant="primary" size="lg" className="complete-order-button">
        Complete Order
      </Button>
      <Button variant="secondary" className="button-back">
        Back
      </Button>
    </Container>
  );
}

export default ConfirmationPage;

