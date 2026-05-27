"use client";

import { useInvoice } from "@/context/InvoiceContext";
import { motion } from "framer-motion";
import { Clock, CheckCircle, Map } from "lucide-react";

export default function CategorySelection() {
  const { setCategory, setStep } = useInvoice();

  const handleSelect = (category) => {
    setCategory(category);
    setStep(1);
  };

  const categories = [
    {
      id: "pending",
      hi: "पेंडिंग रसीद",
      en: "Pending Receipt",
      descHi: "बुकिंग के लिए लंबित",
      descEn: "Pending for Booking",
      icon: <Clock className="text-orange-500" size={32} />,
      color: "border-orange-200 bg-orange-50",
    },
    {
      id: "success",
      hi: "सक्सेस रसीद",
      en: "Success Receipt",
      descHi: "बुकिंग सफल",
      descEn: "Success for Booking",
      icon: <CheckCircle className="text-green-500" size={32} />,
      color: "border-green-200 bg-green-50",
    },
    {
      id: "planner",
      hi: "ट्रिप प्लानर",
      en: "Trip Planner",
      descHi: "इटिनरी प्लानर (बिना एडवांस)",
      descEn: "Itinerary Planner (No Advance)",
      icon: <Map className="text-brand-blue" size={32} />,
      color: "border-blue-200 bg-blue-50",
    },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col items-center justify-center p-6 space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-hindi">दस्तावेज़ का प्रकार चुनें:</h2>
        <h3 className="text-lg text-gray-600">Select Document Type:</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`flex items-center p-5 border-2 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] text-left shadow-sm ${cat.color}`}
          >
            <div className="mr-5 p-3 bg-white rounded-xl shadow-inner">
              {cat.icon}
            </div>
            <div className="flex-1">
              <div className="flex flex-col">
                <span className="text-xl font-bold font-hindi leading-tight">{cat.hi}</span>
                <span className="text-sm font-semibold text-gray-700 leading-tight">{cat.en}</span>
              </div>
              <div className="mt-1 flex flex-col">
                <span className="text-xs text-gray-500 font-hindi">{cat.descHi}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{cat.descEn}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
