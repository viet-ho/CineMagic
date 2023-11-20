import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const totalSeats = 60;
    const availableSeats = 48;
    const [subtotal, setSubtotal] = useState(0);
    const [totalTickets, setTotalTickets] = useState(0);
    const [adultCount, setAdultCount] = useState(0);
    const [childCount, setChildCount] = useState(0);
    const [seniorCount, setSeniorCount] = useState(0);
    const [specialAssistance, setSpecialAssistance] = useState('');
    
    // Add other shared states if needed

    return (
        <AppContext.Provider value={{
            totalSeats,
            availableSeats,
            subtotal, setSubtotal,
            totalTickets, setTotalTickets,
            adultCount, setAdultCount,
            childCount, setChildCount,
            seniorCount, setSeniorCount,
            specialAssistance, setSpecialAssistance,
            
            // Provide other states here
        }}>
            {children}
        </AppContext.Provider>
    );
};
