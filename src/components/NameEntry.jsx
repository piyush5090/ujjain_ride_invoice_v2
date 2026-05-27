"use client";

import { useInvoice } from "@/context/InvoiceContext";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

export default function NameEntry() {
  const { customerName, setCustomerName, setStep } = useInvoice();

  const handleNext = () => {
    if (customerName.trim()) {
      setStep(2);
    } else {
      alert("कृपया ग्राहक का नाम दर्ज करें / Please enter customer name");
    }
  };

  const handleBack = () => {
    setStep(0);
  };

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col items-center justify-center p-6 space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-hindi">ग्राहक का नाम दर्ज करें:</h2>
        <h3 className="text-lg text-gray-600">Enter Customer&apos;s Name:</h3>
      </div>

      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="w-full max-w-md p-4 text-xl border-2 border-brand-blue rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-orange text-center"
        placeholder="नाम / Name"
        autoFocus
        autoComplete="off"
        onKeyDown={(e) => e.key === "Enter" && handleNext()}
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
