"use client";

import { createContext, useContext, useState } from "react";

const InvoiceContext = createContext();

export const PACKAGES = [
  { id: "ujjain_darshan", hi: "उज्जैन दर्शन", en: "Ujjain Darshan" },
  { id: "indore_pickup_drop", hi: "इंदौर पिकअप/ड्रॉप", en: "Indore Pickup/Drop" },
  { id: "omkareshwar_darshan", hi: "ओंकारेश्वर दर्शन", en: "Omkareshwar Darshan" },
  { id: "baglamukhi_darshan", hi: "बगलामुखी दर्शन", en: "Baglamukhi Darshan" },
  { id: "indore_sightseen", hi: "इंदौर साइटसीन", en: "Indore sightseen" },
  { id: "mandav", hi: "मांडव", en: "Mandav" },
  { id: "maheshwar", hi: "महेश्वर", en: "Maheshwar" },
  { id: "other", hi: "अन्य (कृपया बताएं)", en: "Other (Please Specify)" },
];

export function InvoiceProvider({ children }) {
  const [step, setStep] = useState(0); // 0: Intro, 1: Name, 2: Date, 3+: Day N, Last: Amount
  const [customerName, setCustomerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState([]); // [{ date: string, packages: [string], otherText: string }]
  const [totalAmount, setTotalAmount] = useState("");
  const [advancePaid, setAdvancePaid] = useState("");

  const updateDay = (index, data) => {
    const newDays = [...days];
    newDays[index] = { ...newDays[index], ...data };
    setDays(newDays);
  };

  const addDay = (date) => {
    setDays([...days, { date, packages: [], otherText: "" }]);
  };

  const removeLastDay = () => {
    setDays(days.slice(0, -1));
  };

  const value = {
    step,
    setStep,
    customerName,
    setCustomerName,
    startDate,
    setStartDate,
    days,
    setDays,
    updateDay,
    addDay,
    removeLastDay,
    totalAmount,
    setTotalAmount,
    advancePaid,
    setAdvancePaid,
  };

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
}
