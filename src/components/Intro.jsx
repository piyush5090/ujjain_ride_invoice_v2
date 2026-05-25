"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useInvoice } from "@/context/InvoiceContext";

export default function Intro() {
  const { setStep } = useInvoice();

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(1);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setStep]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-brand-blue text-white z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 mx-auto overflow-hidden">
          {/* Placeholder for Logo */}
          <span className="text-brand-blue font-bold text-2xl">UR</span>
        </div>
        <h1 className="text-3xl font-bold mb-2 font-hindi">उज्जैन राइड इनवॉइस</h1>
        <h2 className="text-xl opacity-90">Ujjain Ride Invoice</h2>
      </motion.div>
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ duration: 2.5, ease: "linear" }}
        className="h-1 bg-brand-orange mt-12 rounded-full"
      />
    </motion.div>
  );
}
