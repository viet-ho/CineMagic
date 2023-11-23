import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const totalSeats = 60;
  const availableSeats = 48;
  const cleaningFee = 2.5;
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [seniorCount, setSeniorCount] = useState(0);
  const [specialAssistance, setSpecialAssistance] = useState("");
  const [seatIDs, setSeatIDs] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  // Add other shared states if needed

  const calculateTax = (subtotal, discount) => 0.05 * (subtotal - discount);

  useEffect(() => {
    setTax(calculateTax(subtotal, discount));
  }, [subtotal, discount]);

  useEffect(() => {
    setTotal(subtotal - discount + tax + cleaningFee);
  }, [subtotal, discount, tax]);

  return (
    <AppContext.Provider
      value={{
        totalSeats,
        availableSeats,
        cleaningFee,
        title,
        setTitle,
        date,
        setDate,
        image,
        setImage,
        subtotal,
        setSubtotal,
        totalTickets,
        setTotalTickets,
        adultCount,
        setAdultCount,
        childCount,
        setChildCount,
        seniorCount,
        setSeniorCount,
        specialAssistance,
        setSpecialAssistance,
        seatIDs,
        setSeatIDs,
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
        total,

        // Provide other states here
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
