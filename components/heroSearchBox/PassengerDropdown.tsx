"use client";

import { useState, useRef, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
// آیکون‌ها برای زیبایی بیشتر دکمه‌ها
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

const flightClasses = [
  { value: "economy", label: "اکونومی" },
  { value: "business", label: "بیزینس" },
  { value: "first", label: "فرست کلاس" },
];

export default function PassengerDropdown() {
  const [open, setOpen] = useState(false);

  // استیت‌های مسافر
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);

  // استیت کلاس پرواز
  const [flightClass, setFlightClass] = useState("economy");

  const ref = useRef(null);
  const total = adult + child + infant;

  // بستن منو با کلیک بیرون
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-full" ref={ref} dir="rtl">

      {/* کانتینر اینپوت‌ها */}
      <div className="flex w-full items-center">

        {/* 1. اینپوت مسافران */}
        <div className="w-100 md:w-50">
          <TextField
            fullWidth
            label="تعداد مسافران"
            value={`${total} مسافر`}
            onClick={() => setOpen(!open)}
            InputProps={{
              readOnly: true,
              style: {
                cursor: 'pointer',
                borderRadius: '0 10px 10px 0'
              }
            }}
            inputProps={{ style: { cursor: 'pointer' } }}
          />
        </div>

        {/* 2. اینپوت کلاس پرواز */}
        <div className="w-100 md:w-50">
          <TextField
            select
            fullWidth
            label="کلاس پرواز"
            value={flightClass}
            onChange={(e) => setFlightClass(e.target.value)}
            InputProps={{
              style: {
                borderRadius: '10px 0 0 10px'
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

      {/* --- شروع بخش دراپ‌داون ویرایش شده --- */}
      {open && (
        <div className="absolute top-full right-0 mt-3 z-50 w-full sm:w-80 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-2xl p-5 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">

          {/* لیست مسافران */}
          <div className="flex flex-col gap-1">
            <PassengerRow
              title="بزرگسال"
              subtitle="(۱۲ سال به بالا)"
              count={adult}
              setCount={setAdult}
              min={1} // حداقل ۱ بزرگسال الزامی است
            />

            {/* خط جدا کننده */}
            <div className="h-px bg-gray-100 my-2 w-full"></div>

            <PassengerRow
              title="کودک"
              subtitle="(۲ تا ۱۲ سال)"
              count={child}
              setCount={setChild}
            />

            {/* خط جدا کننده */}
            <div className="h-px bg-gray-100 my-2 w-full"></div>

            <PassengerRow
              title="نوزاد"
              subtitle="(۱۰ روز تا ۲ سال)"
              count={infant}
              setCount={setInfant}
            />
          </div>

          {/* دکمه ثبت پایین دراپ‌داون */}
          <div className="mt-5 pt-3 border-t border-gray-100 flex justify-end">
            <button
              onClick={() => setOpen(false)}
              className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
            >
              ثبت و بستن
            </button>
          </div>
        </div>
      )}
      {/* --- پایان بخش دراپ‌داون ویرایش شده --- */}

    </div>
  );
}

// کامپوننت سطر مسافر (با استایل جدید)
function PassengerRow({
  title,
  subtitle,
  count,
  setCount,
  min = 0,
  max = 9
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex flex-col text-right">
        <span className="font-bold text-gray-800 text-sm">{title}</span>
        <span className="text-gray-400 text-xs mt-0.5">{subtitle}</span>
      </div>

      <div className="flex items-center gap-3">
        {/* دکمه افزایش */}
        <button
          type="button"
          disabled={count >= max}
          onClick={() => setCount(count + 1)}
          className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200
            ${count >= max
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
            }`}
        >
          <AddRoundedIcon fontSize="small" />
        </button>

        {/* عدد */}
        <span className="w-5 text-center font-bold text-gray-700 select-none text-base">
          {count}
        </span>

        {/* دکمه کاهش */}
        <button
          type="button"
          disabled={count <= min}
          onClick={() => setCount(count - 1)}
          className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200
            ${count <= min
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
            }`}
        >
          <RemoveRoundedIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
}