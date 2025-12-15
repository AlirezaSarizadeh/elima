"use client";

import React from "react";
import { Check } from "@mui/icons-material";
import clsx from "classnames";

const steps = [
  { id: 1, label: "انتخاب مقاصد" },
  { id: 2, label: "انتخاب محل اقامت" },
  { id: 3, label: "بررسی اطلاعات" }, // مرحله فعلی ما در عکس‌ها معمولا از اینجا شروع می‌شود
  { id: 4, label: "پرداخت" },
  { id: 5, label: "دریافت بلیط و تور" },
];

export default function CheckoutStepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full max-w-7xl px-4 mx-auto mb-10 px-0" dir="rtl">
      <div className="relative flex justify-between items-center">
        
        {/* خط خاکستری پس‌زمینه (کل مسیر) */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded-full"></div>
        
        {/* خط آبی (پیشرفت) - محاسبه عرض بر اساس مرحله */}
        <div 
            className="absolute top-1/2 right-0 h-1 bg-blue-600 -z-10 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
              {/* دایره */}
              <div 
                className={clsx(
                  "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300",
                  isCompleted ? "bg-blue-600 border-blue-600 text-white" : 
                  isActive ? "bg-white border-blue-600 text-blue-600" : 
                  "bg-gray-400 border-gray-400 text-white"
                )}
              >
                 {isCompleted ? <Check /> : (
                     // آیکون‌های شماتیک (یا عدد)
                     <span className="font-bold text-lg">{step.id}</span>
                 )}
              </div>
              
              {/* متن زیر دایره */}
              <span className={clsx(
                  "text-[10px] md:text-sm font-bold text-center absolute top-14 w-24 md:w-32",
                  isActive || isCompleted ? "text-gray-800" : "text-gray-400"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      {/* فضای خالی برای متن‌های زیر استپر */}
      <div className="h-12"></div>
    </div>
  );
}