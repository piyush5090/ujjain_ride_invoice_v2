"use client";

import { useInvoice, PACKAGES } from "@/context/InvoiceContext";
import NameEntry from "@/components/NameEntry";
import DateEntry from "@/components/DateEntry";
import DayEntry from "@/components/DayEntry";
import SummaryEntry from "@/components/SummaryEntry";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { pdf } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import Image from "next/image";

// Import InvoiceDocument dynamically to avoid SSR issues with @react-pdf/renderer
const InvoiceDocument = dynamic(() => import("@/components/InvoiceDocument"), {
  ssr: false,
});

export default function Home() {
  const { step, customerName, startDate, days, totalAmount, advancePaid, invoiceId } = useInvoice();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Splash screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500); // Reduced from 2500ms
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const data = { customerName, startDate, days, totalAmount, advancePaid, invoiceId };
      
      // Need to import InvoiceDocument here for pdf() to work properly with data
      const { default: Document } = await import("@/components/InvoiceDocument");
      const blob = await pdf(<Document data={data} packagesList={PACKAGES} />).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Invoice_${invoiceId}_${customerName.replace(/\s+/g, '_')}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    if (step === 1) return <NameEntry key="name" />;
    if (step === 2) return <DateEntry key="date" />;
    if (step >= 3 && step < 999) return <DayEntry key={`day-${step}`} />;
    if (step === 999) return <SummaryEntry key="summary" onGenerate={handleGenerate} />;
    return null;
  };

  return (
    <main className="min-h-screen bg-white">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100 
              }}
              className="relative w-40 h-40 mb-6"
            >
              <Image 
                src="/logo.jpeg" 
                alt="Ujjain Ride Logo" 
                fill 
                className="rounded-3xl shadow-2xl object-cover"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 className="text-3xl font-bold text-brand-blue font-hindi">Ujjain Ride Invoice</h1>
              <p className="text-gray-500 tracking-widest uppercase text-sm mt-1">उज्जैन राइड इनवॉइस</p>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="p-4 bg-brand-blue text-white shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <Image src="/logo.jpeg" alt="UR" width={40} height={40} className="object-cover" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-hindi leading-tight">उज्जैन राइड</h1>
            <p className="text-xs opacity-90 leading-tight">Ujjain Ride</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-hindi opacity-80">इनवॉइस टूल</p>
          <p className="text-[10px] opacity-70">Invoice Tool</p>
        </div>
      </header>

      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto"></div>
            <p className="font-bold font-hindi">इनवॉइस तैयार की जा रही है...</p>
            <p className="text-sm text-gray-500">Generating Invoice PDF...</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto pt-8 pb-20">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 p-2 bg-gray-50 border-t text-center text-[10px] text-gray-400">
        Ujjain Ride Invoice PWA v1.0 • Built for Employees
      </footer>
    </main>
  );
}
