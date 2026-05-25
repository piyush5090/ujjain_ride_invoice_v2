"use client";

import { useInvoice } from "@/context/InvoiceContext";
import { motion } from "framer-motion";

export default function NameEntry() {
  const { customerName, setCustomerName, setStep } = useInvoice();

  const handleNext = () => {
    if (customerName.trim()) {
      setStep(2);
    } else {
      alert("कृपया ग्राहक का नाम दर्ज करें / Please enter customer name");
    }
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

      <button
        onClick={handleNext}
        className="w-full max-w-md bg-brand-blue text-white py-4 rounded-xl text-xl font-bold hover:bg-blue-800 transition-colors shadow-lg"
      >
        <span className="font-hindi mr-2">अगला</span> / Next
      </button>
    </motion.div>
  );
}
