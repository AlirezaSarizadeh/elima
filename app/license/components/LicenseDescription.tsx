"use client";

import React, { useState, useRef } from "react";
import { Button } from "@mui/material";

export default function LicenseDescription() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-8 bg-sky-950 rounded-full"></span>
        <h2 className="text-xl font-bold text-gray-800">
          راهنمای گواهینامه بین‌المللی رانندگی
        </h2>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200">
        <div
          ref={contentRef}
          className="relative overflow-hidden transition-all duration-700 ease-in-out"
          style={{
            maxHeight: isExpanded
              ? `${contentRef.current?.scrollHeight}px`
              : "190px",
            opacity: 1,
          }}
        >
          <div className="text-gray-600 leading-8 text-justify space-y-4">
            <p>
              گواهینامه بین‌المللی رانندگی، ترجمه رسمی گواهینامه ملی شماست که
              امکان رانندگی در کشورهای مختلف دنیا را فراهم می‌کند. با داشتن این
              مدرک، می‌توانید از شرکت‌های اجاره خودرو در خارج از ایران، ماشین
              دریافت کرده و بدون نگرانی از عدم شناخت گواهینامه ایرانی، رانندگی
              کنید.
            </p>
            <p>
              فرآیند دریافت گواهینامه بین‌المللی در این سامانه کاملاً{" "}
              <strong>آنلاین</strong> است و نیازی به مراجعه حضوری ندارید. کافیست
              مدارک خود را بارگذاری کرده و فرم درخواست را تکمیل کنید؛ پس از
              بررسی مدارک، گواهینامه شما صادر شده و از طریق پست یا حضوری تحویل
              می‌گردد.
            </p>
            <p>
              توجه داشته باشید که این گواهینامه تنها در کنار{" "}
              <strong>گواهینامه ملی معتبر</strong> قابل استفاده است و به‌عنوان
              کارت شناسایی مستقل، کاربرد قانونی ندارد. همچنین مدت اعتبار آن
              محدود است و در صورت پایان اعتبار، لازم است مجدداً اقدام به تمدید
              نمایید.
            </p>
            <p>
              اگر قصد سفر کاری، تحصیلی یا گردشگری به کشورهای مختلف را دارید،
              تهیه گواهینامه بین‌المللی قبل از سفر، خیال شما را از بابت کرایه
              خودرو و رانندگی در جاده‌های بین‌المللی راحت می‌کند.
            </p>
          </div>

          {/* گرادیانت پایین در حالت جمع‌شده */}
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
              color: "#0369a1",
              bgcolor: "#e0f2fe",
              fontWeight: "bold",
              borderRadius: "10px",
              padding: "8px 24px",
              "&:hover": { bgcolor: "#bae6fd" },
            }}
          >
            {isExpanded ? "بستن توضیحات" : "مطالعه کامل راهنما"}
          </Button>
        </div>
      </div>
    </div>
  );
}
