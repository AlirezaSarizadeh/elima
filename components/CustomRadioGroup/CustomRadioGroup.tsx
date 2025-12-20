"use client";

import React, { useState } from "react";

// تعریف گزینه‌ها بر اساس تصویر
const options = [
  {
    id: "tour_package",
    title: "تور گردشگری",
    description: "بلیط + خدمات گردشگری",
  },
  {
    id: "tour_flight_hotel",
    title: "تور هتل + بلیط",
    description: "بلیط + اقامت مناسب شما",
  },
];

export default function CustomRadioGroup() {
  const [selectedOption, setSelectedOption] = useState<string>("tour_package"); // گزینه پیش‌فرض

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl pb-4" dir="rtl">
      {options.map((option) => {
        const isSelected = selectedOption === option.id;

        return (
          <label
            key={option.id}
            className={`relative flex items-center justify-between p-4 rounded-8 border-1 cursor-pointer transition-all duration-300 w-full sm:w-1/2 select-none
              ${isSelected 
                ? "border-blue-600 bg-white shadow-sm" 
                : "border-gray-300 bg-white hover:border-blue-300"
              }
            `}
          >
            {/* Input رادیویی مخفی */}
            <input
              type="radio"
              name="tour_type"
              value={option.id}
              checked={isSelected}
              onChange={() => setSelectedOption(option.id)}
              className="hidden"
            />

            {/* --- عنوان روی بوردر (Floating Label) --- */}
            <div
              className={`absolute -top-3 right-4 px-2 bg-white text-sm font-normal transition-colors duration-300
                ${isSelected ? "text-blue-600" : "text-gray-400"}
              `}
            >
              {option.title}
            </div>

            {/* --- محتوای داخلی --- */}
            <div className="flex items-center justify-between w-full">
               {/* متن توضیحات */}
               <span className={`text-sm ${isSelected ? "text-gray-600" : "text-gray-400"}`}>
                 {option.description}
               </span>

               {/* دکمه رادیویی سفارشی (دایره) */}
               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300
                  ${isSelected ? "border-blue-600" : "border-gray-200"}
               `}>
                  {/* دایره توپر وسط */}
                  <div className={`w-2.5 h-2.5 rounded-full bg-blue-600 transition-transform duration-200 ${isSelected ? "scale-100" : "scale-0"}`}></div>
               </div>
            </div>

          </label>
        );
      })}
    </div>
  );
}