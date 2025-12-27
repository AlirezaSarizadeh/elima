"use client";

import React, { useState, useRef } from "react";
import { Button } from "@mui/material";

export default function VisaDescription() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-8 bg-blue-950 rounded-full"></span>
          <h2 className="text-xl font-bold text-gray-800">راهنمای جامع ویزا</h2>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200">
        <div 
            ref={contentRef}
            className="relative overflow-hidden transition-all duration-700 ease-in-out"
            style={{
                maxHeight: isExpanded 
                    ? `${contentRef.current?.scrollHeight}px` 
                    : "160px",
                opacity: 1 
            }}
        >
            <div className="text-gray-600 leading-8 text-justify space-y-4">
                <p>
                    دبی، نگین خاورمیانه، با آسمان‌خراش‌های سر به فلک کشیده و مراکز خرید لوکس، مقصدی رویایی برای گردشگران است. اما اولین قدم برای ورود به این شهر مدرن، دریافت <strong>ویزای دبی</strong> است. برخلاف تصور، پروسه دریافت این ویزا امروزه بسیار ساده و تماماً آنلاین شده است.
                </p>
                <p>
                    مهمترین نکته در مورد ویزای امارات این است که سفارت این کشور به صورت مستقیم ویزای توریستی برای افراد مستقل صادر نمی‌کند و شما حتما باید از طریق یک کارگزار (آژانس مسافرتی یا شرکت معتبر) اقدام نمایید. این کارگزار به عنوان "کفیل" شما عمل کرده و مسئولیت بازگشت شما را بر عهده می‌گیرد.
                </p>
                {/* سایر متون */}
                <p>
                    توجه داشته باشید که قوانین ویزای دبی سخت‌گیرانه است. در صورت اقامت بیش از حد مجاز، نه تنها مشمول جریمه‌های سنگین نقدی خواهید شد، بلکه ممکن است در لیست سیاه قرار گرفته و دیگر اجازه ورود به امارات را نداشته باشید.
                </p>
            </div>

            <div 
                className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent z-10 transition-opacity duration-500 ${
                    isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            ></div>
        </div>

        <div className="flex justify-center mt-2">
            <Button 
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{
                    color: '#2563eb',
                    bgcolor: '#eff6ff',
                    fontWeight: 'bold',
                    borderRadius: '10px',
                    padding: '8px 24px',
                    '&:hover': { bgcolor: '#dbeafe' }
                }}
            >
                {isExpanded ? "بستن مطلب" : "مطالعه کامل راهنما"}
            </Button>
        </div>
      </div>
    </div>
  );
}