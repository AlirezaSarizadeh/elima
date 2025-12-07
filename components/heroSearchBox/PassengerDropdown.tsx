"use client";

import { useState, useRef, useEffect } from "react";
import { TextField, InputAdornment, MenuItem } from "@mui/material";

const flightClasses = [
  { value: "economy", label: "اکونومی" },
  { value: "business", label: "بیزینس" },
  { value: "first", label: "فرست کلاس" },
];

export default function FlightSearchInputs() {
  const [open, setOpen] = useState(false);
  
  // استیت‌های مسافر
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  
  // استیت کلاس پرواز (جدید)
  const [flightClass, setFlightClass] = useState("economy");

  const ref = useRef<any>(null);
  const total = adult + child + infant;

  // بستن منو با کلیک بیرون
  useEffect(() => {
    const handler = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-full" ref={ref} dir="rtl">
      
      {/* کانتینر برای کنار هم قرار دادن دو اینپوت */}
      <div className="flex w-full items-center">
        
        {/* 1. اینپوت مسافران (سمت راست) */}
        <div className="w-2/3"> {/* عرض بیشتر برای مسافر */}
          <TextField
            fullWidth
            label="تعداد مسافران"
            value={`${total} مسافر`}
            onClick={() => setOpen(!open)}
            InputProps={{
              readOnly: true,
              style: { 
                cursor: 'pointer', 
                borderRadius: '0 10px 10px 0' // گرد کردن فقط سمت راست
              } 
            }}
            inputProps={{ style: { cursor: 'pointer' } }}
          />
        </div>

        {/* 2. اینپوت کلاس پرواز (سمت چپ) - جدید */}
        <div className="w-1/3"> {/* عرض کمتر برای کلاس */}
          <TextField
            select // تبدیل به دراپ‌داون
            fullWidth
            label="کلاس پرواز"
            value={flightClass}
            onChange={(e) => setFlightClass(e.target.value)}
            InputProps={{
              style: { 
                borderRadius: '10px 0 0 10px' // گرد کردن فقط سمت چپ
              }
            }}
          >
            {flightClasses.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        
      </div>

      {/* Dropdown Panel برای مسافران */}
      {/* پوزیشن پنل را تنظیم کردیم که زیر کل مجموعه باز شود */}
      {open && (
        <div className="absolute top-full right-0 mt-2 z-50 w-full sm:w-80 bg-white shadow-lg rounded-xl p-4 border border-gray-200">
          <PassengerRow
            title="بزرگسال"
            subtitle="(۱۲ سال به بالا)"
            count={adult}
            setCount={setAdult}
          />
          <PassengerRow
            title="کودک"
            subtitle="(۲ تا ۱۲ سال)"
            count={child}
            setCount={setChild}
          />
        </div>
      )}
    </div>
  );
}

// کامپوننت سطر مسافر (بدون تغییر)
function PassengerRow({
  title,
  subtitle,
  count,
  setCount,
  disableMinus,
  disablePlus,
}: any) {
  return (
    <div className="flex items-center justify-between mb-4 last:mb-0">
      <div className="flex flex-col text-right">
        <span className="font-medium">{title}</span>
        <span className="text-gray-400 text-sm">{subtitle}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={disablePlus}
          onClick={() => setCount(count + 1)}
          className={`w-8 h-8 flex items-center justify-center rounded-full border 
          ${disablePlus ? "opacity-30 cursor-not-allowed" : ""} `}
        >
          ➕
        </button>
        <span className="w-6 text-center">{count}</span>
        <button
          type="button"
          disabled={disableMinus || count === 0}
          onClick={() => setCount(count - 1)}
          className={`w-8 h-8 flex items-center justify-center rounded-full border 
          ${disableMinus || count === 0 ? "opacity-30 cursor-not-allowed" : ""} `}
        >
          ➖
        </button>
      </div>
    </div>
  );
}