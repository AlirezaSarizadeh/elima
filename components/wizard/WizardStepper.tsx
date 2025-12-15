"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { CheckRounded, Flight, Hotel, Assignment, Map } from "@mui/icons-material";

// تعریف مراحل با آیکون‌های مربوطه
const steps = [
  { id: "selection", label: "انتخاب تور", pathPart: "", icon: <Map fontSize="small" /> }, // این مرحله همیشه پاس شده فرض می‌شود
  { id: "accommodation", label: "اقامتگاه", pathPart: "/accommodation", icon: <Hotel fontSize="small" /> },
  { id: "flights", label: "پرواز", pathPart: "/flights", icon: <Flight fontSize="small" /> },
  { id: "details", label: "بررسی نهایی", pathPart: "/details", icon: <Assignment fontSize="small" /> },
];

export default function WizardStepper({ tourId }: { tourId: string }) {
  const pathname = usePathname();

  // منطق تعیین وضعیت هر مرحله
  const getStepStatus = (index: number) => {
    // 1. پیدا کردن ایندکس مرحله فعلی بر اساس URL
    // (از ایندکس 1 شروع می‌کنیم چون ایندکس 0 انتخاب تور است که URL خاصی در ویزارد ندارد)
    let activeStepIndex = 0;
    if (pathname.includes("/accommodation")) activeStepIndex = 1;
    else if (pathname.includes("/flights")) activeStepIndex = 2;
    else if (pathname.includes("/details")) activeStepIndex = 3;

    if (index < activeStepIndex) return "completed";
    if (index === activeStepIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="w-full max-w-7xl px-4 mx-auto my-8 px-4" dir="rtl">
      <div className="relative flex items-center justify-between">
        
        {/* --- خط پس‌زمینه (خاکستری) --- */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 rounded-full mx-4 md:mx-8"></div>

        {/* --- خط پیشرفت (آبی) --- */}
        {/* محاسبه درصد پیشرفت بر اساس مرحله فعال */}
        <div 
            className="absolute top-1/2 right-0 h-1 bg-blue-600 z-10 rounded-full mx-4 md:mx-8 transition-all duration-500 ease-out"
            style={{ 
                width: (() => {
                    if (pathname.includes("/accommodation")) return "33%"; // تا مرحله 2
                    if (pathname.includes("/flights")) return "65%";      // تا مرحله 3
                    if (pathname.includes("/details")) return "95%";     // کامل
                    return "0%"; 
                })()
            }}
        ></div>

        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isCompleted = status === "completed";
          const isCurrent = status === "current";

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              
              {/* دایره مرحله */}
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ease-in-out
                  ${isCompleted 
                    ? "bg-blue-600 border-blue-600 text-white scale-100" 
                    : isCurrent 
                        ? "bg-white border-blue-600 text-blue-600 scale-110 shadow-lg shadow-blue-200" 
                        : "bg-white border-gray-300 text-gray-400 scale-100"
                  }
                `}
              >
                {isCompleted ? (
                  <CheckRounded fontSize="small" />
                ) : (
                  // اگر آیکون دارید نمایش دهید، وگرنه عدد
                  step.icon ? step.icon : <span className="font-bold text-sm">{index + 1}</span>
                )}
              </div>

              {/* لیبل زیر دایره */}
              <div className={`absolute top-14 w-32 text-center transition-all duration-300 ${isCurrent ? '-translate-y-1' : ''}`}>
                <span
                    className={`text-xs md:text-sm font-bold block mb-1
                    ${isCurrent ? "text-blue-700 scale-105" : isCompleted ? "text-gray-700" : "text-gray-400"}
                    `}
                >
                    {step.label}
                </span>
                
                {/* وضعیت متنی کوچک (اختیاری) */}
                {isCurrent && (
                    <span className="text-[10px] text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                        در حال انجام
                    </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* فضای خالی پایین برای جلوگیری از تداخل متن‌ها */}
      <div className="h-12 md:h-14 w-full"></div>
    </div>
  );
}