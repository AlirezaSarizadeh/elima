"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { CheckRounded, Flight, Hotel, Assignment, Map } from "@mui/icons-material";
import clsx from "clsx";

const steps = [
  { id: "selection", label: "انتخاب تور", pathPart: "", icon: <Map fontSize="small" /> },
  { id: "accommodation", label: "اقامتگاه", pathPart: "/accommodation", icon: <Hotel fontSize="small" /> },
  { id: "flights", label: "پرواز", pathPart: "/flights", icon: <Flight fontSize="small" /> },
  { id: "details", label: "بررسی نهایی", pathPart: "/details", icon: <Assignment fontSize="small" /> },
];

export default function WizardStepper({ tourId }: { tourId: string }) {
  const pathname = usePathname();

  const getActiveStepIndex = () => {
    if (pathname.includes("/accommodation")) return 1;
    if (pathname.includes("/flights")) return 2;
    if (pathname.includes("/details")) return 3;
    return 0;
  };

  const activeIndex = getActiveStepIndex();
  const progressWidth = (activeIndex / (steps.length - 1)) * 100;

  // رنگ اصلی برگرفته از لوگوی ایما گشت
  const brandNavy = "#1a3454"; 

  return (
    <div className="w-full max-w-7xl mx-auto mb-12" dir="rtl">
      {/* کانتینر اصلی با استایل کارتی و تمیز */}
      <div className="bg-white rounded-[1.5rem] border border-gray-200 p-8 md:p-10 relative">
        
        <div className="relative flex items-center justify-between w-full max-w-5xl mx-auto">
          
          {/* مسیر خاکستری پس‌زمینه */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-gray-100 rounded-full -z-0"></div>

          {/* خط پیشرفت با رنگ سرمه‌ای برند */}
          <div
            className="absolute top-1/2 -translate-y-1/2 right-0 h-1 z-0 transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) rounded-full"
            style={{ 
                width: `${progressWidth}%`,
                backgroundColor: brandNavy 
            }}
          ></div>

          {steps.map((step, index) => {
            const isCompleted = index < activeIndex;
            const isCurrent = index === activeIndex;
            const isUpcoming = index > activeIndex;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center group">
                
                {/* دایره یا همان استپ‌ها */}
                <div
                  className={clsx(
                    "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 border-2",
                    isCompleted && "text-white shadow-lg",
                    isCurrent && "bg-white scale-110 shadow-2xl",
                    isUpcoming && "bg-white border-gray-100 text-gray-300"
                  )}
                  style={{
                    backgroundColor: isCompleted ? brandNavy : isCurrent ? "#white" : "",
                    borderColor: isCompleted || isCurrent ? brandNavy : ""
                  }}
                >
                  {/* هاله نورانی دور مرحله فعلی */}
                  {isCurrent && (
                    <div 
                        className="absolute inset-0 rounded-full animate-pulse -z-10"
                        style={{ backgroundColor: `${brandNavy}20` }}
                    ></div>
                  )}

                  {isCompleted ? (
                    <CheckRounded className="text-white scale-110" />
                  ) : (
                    <span 
                        className="transition-colors duration-300"
                        style={{ color: isCurrent ? brandNavy : "#D1D5DB" }}
                    >
                      {step.icon}
                    </span>
                  )}
                </div>

                {/* برچسب مرحله */}
                <div className="absolute top-20 whitespace-nowrap flex flex-col items-center">
                  <span
                    className={clsx(
                      "text-xs md:text-sm font-bold transition-all duration-300",
                      isCurrent ? "scale-110" : "opacity-70"
                    )}
                    style={{ color: isCurrent || isCompleted ? brandNavy : "#9CA3AF" }}
                  >
                    {step.label}
                  </span>
                  
                  {isCurrent && (
                    <div 
                        className="w-5 h-1 rounded-full mt-1.5 animate-bounce"
                        style={{ backgroundColor: brandNavy }}
                    ></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* فضای رزرو شده برای متون پایین */}
        <div className="h-12"></div>
      </div>
    </div>
  );
}