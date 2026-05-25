"use client";

import { useInvoice, PACKAGES, VEHICLES } from "@/context/InvoiceContext";
import { motion } from "framer-motion";
import { ChevronLeft, Check, Plus } from "lucide-react";
import { useState } from "react";

export default function DayEntry() {
  const { step, setStep, days, updateDay, addDay, removeLastDay } = useInvoice();
  const dayIndex = step - 3;
  const currentDay = days[dayIndex];
  const [showOtherInput, setShowOtherInput] = useState(currentDay?.packages.includes("other"));

  if (!currentDay) return null;

  const togglePackage = (pkgId) => {
    let newPackages = [...currentDay.packages];
    if (newPackages.includes(pkgId)) {
      newPackages = newPackages.filter((p) => p !== pkgId);
      if (pkgId === "other") setShowOtherInput(false);
    } else {
      newPackages.push(pkgId);
      if (pkgId === "other") setShowOtherInput(true);
    }
    updateDay(dayIndex, { packages: newPackages });
  };

  const handleNext = () => {
    if (currentDay.packages.length === 0) {
      alert("कृपया कम से कम एक पैकेज चुनें / Please select at least one package");
      return;
    }
    if (!currentDay.vehicle) {
      alert("कृपया वाहन चुनें / Please select a vehicle");
      return;
    }
    
    // Only add a new day if we are at the last entered day
    if (dayIndex === days.length - 1) {
      const currentDate = new Date(currentDay.date);
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + 1);
      const nextDateStr = nextDate.toISOString().split('T')[0];
      addDay(nextDateStr);
    }
    
    setStep(step + 1);
  };

  const handleSkip = () => {
    if (currentDay.packages.length === 0) {
      alert("कृपया कम से कम एक पैकेज चुनें / Please select at least one package");
      return;
    }
    if (!currentDay.vehicle) {
      alert("कृपया वाहन चुनें / Please select a vehicle");
      return;
    }
    // Finish adding days and move to financials
    setStep(999); 
  };

  const handleBack = () => {
    if (dayIndex === 0) {
      setStep(2);
    } else {
      removeLastDay();
      setStep(step - 1);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatDateEn = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex flex-col w-full max-w-2xl mx-auto p-4 space-y-6"
    >
      <div className="text-center space-y-1">
        <h2 className="text-3xl font-bold font-hindi text-brand-blue">
          दिन {dayIndex + 1} (DAY {dayIndex + 1})
        </h2>
        <p className="text-gray-600 font-hindi">{formatDate(currentDay.date)}</p>
        <p className="text-gray-500 text-sm italic">{formatDateEn(currentDay.date)}</p>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold font-hindi text-brand-orange underline underline-offset-4">1. पैकेज चुनें (Select Package):</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => togglePackage(pkg.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all flex justify-between items-center ${
                currentDay.packages.includes(pkg.id)
                  ? "border-brand-orange bg-orange-50 ring-2 ring-brand-orange"
                  : "border-gray-200 hover:border-brand-blue"
              }`}
            >
              <div>
                <p className="font-bold font-hindi text-lg">{pkg.hi}</p>
                <p className="text-sm text-gray-600">{pkg.en}</p>
              </div>
              {currentDay.packages.includes(pkg.id) && (
                <div className="bg-brand-orange text-white rounded-full p-1">
                  <Check size={20} />
                </div>
              )}
            </button>
          ))}
        </div>

        {showOtherInput && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="space-y-2 p-2 border-l-4 border-brand-orange bg-orange-50 rounded"
          >
            <p className="font-hindi font-bold">अन्य विवरण दें (Specify Other):</p>
            <input
              type="text"
              value={currentDay.otherText}
              onChange={(e) => updateDay(dayIndex, { otherText: e.target.value })}
              className="w-full p-3 border-2 border-brand-blue rounded-lg bg-white"
              placeholder="यहाँ लिखें / Write here"
              autoFocus
            />
          </motion.div>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t-2 border-dashed border-gray-100">
        <div className="text-center">
          <h3 className="text-xl font-bold font-hindi text-brand-blue underline underline-offset-4">2. वाहन चुनें (Select Vehicle):</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VEHICLES.map((v) => (
            <button
              key={v.id}
              onClick={() => updateDay(dayIndex, { vehicle: v.id })}
              className={`p-4 rounded-xl border-2 text-left transition-all flex justify-between items-center ${
                currentDay.vehicle === v.id
                  ? "border-brand-blue bg-blue-50 ring-2 ring-brand-blue"
                  : "border-gray-200 hover:border-brand-blue"
              }`}
            >
              <div>
                <p className="font-bold font-hindi text-lg">{v.hi}</p>
                <p className="text-sm text-gray-600">{v.en}</p>
              </div>
              {currentDay.vehicle === v.id && (
                <div className="bg-brand-blue text-white rounded-full p-1">
                  <Check size={20} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-3 pt-6">
        <div className="flex space-x-4">
          <button
            onClick={handleBack}
            className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-xl font-bold flex items-center justify-center"
          >
            <ChevronLeft size={20} className="mr-1" />
            <span className="font-hindi mr-1">पीछे</span> / Back
          </button>
          
          <button
            onClick={handleNext}
            className="flex-1 bg-brand-blue text-white py-4 rounded-xl font-bold flex items-center justify-center shadow-lg"
          >
            <Plus size={20} className="mr-1" />
            <span className="font-hindi mr-1">अगला दिन</span> / Next Day
          </button>
        </div>

        <button
          onClick={handleSkip}
          className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-xl shadow-lg"
        >
          <span className="font-hindi mr-2">{dayIndex >= 1 ? "समाप्त करें और पेमेंट पर जाएं" : "पेमेंट पर जाएं"}</span> 
          / {dayIndex >= 1 ? "Finish & Go to Payment" : "Go to Payment"}
        </button>
      </div>
    </motion.div>
  );
}
