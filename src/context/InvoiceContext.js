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

export const VEHICLES = [
  { id: "dzire", hi: "सुजुकी डिजायर", en: "Suzuki Dzire" },
  { id: "ertiga", hi: "सुजुकी अर्टिगा", en: "Suzuki Ertiga" },
  { id: "tavera", hi: "टवेरा", en: "Tavera" },
  { id: "traveller_14", hi: "फ़ोर्स ट्रैवलर (14 सीटर)", en: "Force Traveller (14 seater)" },
  { id: "traveller_17", hi: "फ़ोर्स ट्रैवलर (17 सीटर)", en: "Force Traveller (17 seater)" },
  { id: "traveller_20", hi: "फ़ोर्स ट्रैवलर (20 सीटर)", en: "Force Traveller (20 seater)" },
  { id: "traveller_26", hi: "फ़ोर्स ट्रैवलर (26 सीटर)", en: "Force Traveller (26 seater)" },
];

export function InvoiceProvider({ children }) {
  const [step, setStep] = useState(0); // 0: Intro, 1: Name, 2: Date, 3+: Day N, Last: Amount
  const [customerName, setCustomerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState([]); // [{ date: string, packages: [string], otherText: string, vehicle: string }]
  const [totalAmount, setTotalAmount] = useState("");
  const [advancePaid, setAdvancePaid] = useState("");
  const [invoiceId] = useState(() => Math.floor(10000000 + Math.random() * 90000000).toString());

  const updateDay = (index, data) => {
    const newDays = [...days];
    newDays[index] = { ...newDays[index], ...data };
    setDays(newDays);
  };

  const addDay = (date) => {
    setDays([...days, { date, packages: [], otherText: "", vehicle: "" }]);
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
    invoiceId,
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
