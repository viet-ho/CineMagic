import React, { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const totalSeats = 60;
  const availableSeats = 48;
  const cleaningFee = 2.5;
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [trailer, setTrailer] = useState("");
  const [description, setDescription] = useState("");
  const [review, setReview] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [seniorCount, setSeniorCount] = useState(0);
  const [specialAssistance, setSpecialAssistance] = useState("");
  const [seatIDs, setSeatIDs] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [validUsername, setValidUsername] = useState("abc@gmail.com");
  const [validPassword, setValidPassword] = useState("@Abcd1234");
  const [profilePicture, setProfilePicture] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png");
  const [loginStatus, setLoginStatus] = useState("false");
  const [orderNumber, setOrderNumber] = useState(0);

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
        time,
        setTime,
        image,
        setImage,
        moreInfo,
        setMoreInfo,
        newsImage,
        setNewsImage,
        newsDescription,
        setNewsDescription,
        newsTitle,
        setNewsTitle,
        trailer,
        setTrailer,
        description,
        setDescription,
        review,
        setReview,
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
        validUsername,
        setValidUsername,
        validPassword,
        setValidPassword,
        accountName,
        setAccountName,
        profilePicture,
        setProfilePicture,
        loginStatus,
        setLoginStatus,
        orderNumber,
        setOrderNumber,

        // Provide other states here
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
