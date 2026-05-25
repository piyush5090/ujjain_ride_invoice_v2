"use client";

import { useInvoice } from "@/context/InvoiceContext";
import { motion } from "framer-motion";
import { ChevronLeft, FileDown } from "lucide-react";

export default function SummaryEntry({ onGenerate }) {
  const { totalAmount, setTotalAmount, advancePaid, setAdvancePaid, setStep, days } = useInvoice();

  const remaining = (parseFloat(totalAmount) || 0) - (parseFloat(advancePaid) || 0);

  const handleBack = () => {
    setStep(days.length + 2); // Go back to the last day entry
  };

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col w-full max-w-md mx-auto p-6 space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-hindi">कुल देय राशि दर्ज करें:</h2>
        <h3 className="text-lg text-gray-600">Enter Total Payable amount:</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 font-hindi">कुल राशि (Total Amount):</label>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="w-full p-4 text-xl border-2 border-brand-blue rounded-xl focus:ring-2 focus:ring-brand-orange outline-none"
            placeholder="₹ 0"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 font-hindi">अग्रिम राशि (Advance Paid):</label>
          <input
            type="number"
            value={advancePaid}
            onChange={(e) => setAdvancePaid(e.target.value)}
            className="w-full p-4 text-xl border-2 border-brand-blue rounded-xl focus:ring-2 focus:ring-brand-orange outline-none"
            placeholder="₹ 0"
          />
        </div>

        <div className="p-6 bg-brand-orange bg-opacity-10 rounded-2xl border-2 border-brand-orange border-dashed">
          <p className="text-center text-sm font-bold text-gray-600 font-hindi">शेष राशि (Remaining Balance):</p>
          <p className="text-center text-3xl font-bold text-brand-orange">₹ {remaining}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <button
          onClick={onGenerate}
          className="w-full bg-brand-blue text-white py-4 rounded-xl text-xl font-bold hover:bg-blue-800 transition-colors shadow-lg flex items-center justify-center"
        >
          <FileDown className="mr-2" />
          <span className="font-hindi mr-2">इनवॉइस जनरेट करें</span> / Generate Invoice
        </button>
        
        <button
          onClick={handleBack}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-bold flex items-center justify-center"
        >
          <ChevronLeft className="mr-1" />
          <span className="font-hindi mr-1">पीछे</span> / Back
        </button>
      </div>
    </motion.div>
  );
}
