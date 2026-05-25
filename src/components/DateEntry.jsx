"use client";

import { useInvoice } from "@/context/InvoiceContext";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

export default function DateEntry() {
  const { startDate, setStartDate, setStep, addDay, days } = useInvoice();

  const handleNext = () => {
    if (startDate) {
      if (days.length === 0) {
        addDay(startDate);
      }
      setStep(3);
    } else {
      alert("कृपया यात्रा की तारीख चुनें / Please select trip date");
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col items-center justify-center p-6 space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-hindi">यात्रा की तारीख दर्ज करें:</h2>
        <h3 className="text-lg text-gray-600">Enter Trip Date:</h3>
      </div>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full max-w-md p-4 text-xl border-2 border-brand-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange text-center appearance-none"
        autoFocus
      />

      <div className="flex w-full max-w-md space-x-4">
        <button
          onClick={handleBack}
          className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-xl text-xl font-bold hover:bg-gray-300 transition-colors flex items-center justify-center"
        >
          <ChevronLeft className="mr-1" />
          <span className="font-hindi mr-2">पीछे</span> / Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-brand-blue text-white py-4 rounded-xl text-xl font-bold hover:bg-blue-800 transition-colors shadow-lg"
        >
          <span className="font-hindi mr-2">अगला</span> / Next
        </button>
      </div>
    </motion.div>
  );
}
