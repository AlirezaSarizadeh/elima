"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { LocationOnOutlined, CalendarMonthOutlined } from "@mui/icons-material";
import { Button, Autocomplete, TextField } from "@mui/material";
import "./global.css";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/jalali";
import persian_fa from "react-date-object/locales/persian_fa";
import { DatePickerInput } from "../../../../../components/DatePickerInput/DatePickerInput";

export default function HotelBookingSideForm() {
  // --- تاریخ امروز و "دیروز" (با تنظیم ساعت روی 00:00 برای جلوگیری از مشکلات تایم‌زون) ---
  const now = new Date();
  now.setHours(0, 0, 0, 0); // ساعت را صفر می‌کنیم
  const today = new DateObject({
    date: now,
    calendar: persian,
    locale: persian_fa,
  });

  const yesterdayDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const yesterday = new DateObject({
    date: yesterdayDate,
    calendar: persian,
    locale: persian_fa,
  });

  // --- رفرنس‌ها و استیت‌ها ---
  const datePickerRef = useRef<any>(null);
  const departRef = useRef<HTMLDivElement | null>(null);
  const returnRef = useRef<HTMLDivElement | null>(null);

  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [destination, setDestination] = useState<string | null>(
    "هتل پارسیان آزادی تهران"
  );
  const [activeInput, setActiveInput] = useState<"depart" | "return" | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);

  const hotelOptions = [
    "هتل پارسیان آزادی تهران",
    "هتل اسپیناس پالاس",
    "هتل استقلال تهران",
    "هتل اوین تهران",
  ];

  // --- باز/بسته کردن تقویم ---
  const openCalendar = (which: "depart" | "return") => {
    setActiveInput(which);
    setIsOpen(true);
    datePickerRef.current?.openCalendar?.();
  };

  const closeCalendar = () => {
    setIsOpen(false);
    setActiveInput(null);
    datePickerRef.current?.closeCalendar?.();
  };

  const handleDateChange = (date: any) => {
    setDateRange(date);
    // اگر رنج کامل شد، تقویم را ببند
    if (date && Array.isArray(date) && date.length === 2 && date[0] && date[1]) {
      closeCalendar();
    }
  };

  const clearDepart = () => setDateRange([null, dateRange[1]]);
  const clearReturn = () => setDateRange([dateRange[0], null]);

  const departDate = dateRange[0] ? dateRange[0].format("DD MMMM") : "";
  const returnDate = dateRange[1] ? dateRange[1].format("DD MMMM") : "";

  // اگر کاربر صفحه را resize کند، بهتر است تقویم بسته شود تا کتابخانه خودش موقعیت‌دهی را انجام دهد
  useLayoutEffect(() => {
    const onResize = () => {
      if (isOpen) {
        datePickerRef.current?.closeCalendar?.();
        setTimeout(() => datePickerRef.current?.openCalendar?.(), 50);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 p-5 shadow-[0_5px_20px_rgba(0,0,0,0.03)]"
      dir="rtl"
    >
      <div className="bg-[#e3f2fd] border border-[#bbdefb] rounded-xl p-3 mb-5 text-center">
        <p className="text-[#1565c0] text-sm font-bold leading-6">
          برای مشاهده قیمت‌های دقیق‌تر، تاریخ ورود و خروج را انتخاب کنید.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* مقصد */}
        <div className="relative">
          <Autocomplete
            disablePortal // ✅ مهم: برای کار صحیح داخل مودال
            options={hotelOptions}
            value={destination}
            onChange={(event, newValue) => setDestination(newValue)}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="مقصد یا هتل"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    "& fieldset": { borderColor: "#e5e7eb" },
                    "&:hover fieldset": { borderColor: "#3b82f6" },
                    "&.Mui-focused fieldset": { borderColor: "#2563eb" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#9ca3af",
                    fontSize: "0.9rem",
                    backgroundColor: "white",
                    padding: "0 4px",
                  },
                  "& .MuiInputLabel-shrink": { color: "#9ca3af" },
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      <LocationOnOutlined className="text-gray-400 ml-1" />
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </div>

        {/* تاریخ‌ها */}
        <div className="grid grid-cols-2 gap-0 relative datepicker-container">
          <div ref={departRef} onClick={() => openCalendar("depart")}>
            <DatePickerInput
              label="تاریخ ورود"
              value={departDate}
              onChange={() => { }}
              onClear={clearDepart}
              variant="outlined"
              style={{
                direction: "rtl",
                cursor: "pointer",
                textAlign: "center",
                fontWeight: "bold",
              }}
              InputProps={{
                endAdornment: (
                  <CalendarMonthOutlined className="text-gray-400 text-lg" />
                ),
              }}
            />
          </div>

          <div ref={returnRef} onClick={() => openCalendar("return")}>
            <DatePickerInput
              label="تاریخ خروج"
              value={returnDate}
              onChange={() => { }}
              onClear={clearReturn}
              variant="outlined"
              style={{
                direction: "rtl",
                cursor: "pointer",
                textAlign: "center",
                fontWeight: "bold",
              }}
              InputProps={{
                endAdornment: (
                  <CalendarMonthOutlined className="text-gray-400 text-lg" />
                ),
              }}
            />
          </div>

          {/* موتور تقویم */}
          <DatePicker
            ref={datePickerRef}
            range
            value={dateRange}
            onChange={handleDateChange}
            calendar={persian}
            locale={persian_fa}
            numberOfMonths={1}
            format="YYYY/MM/DD"
            minDate={yesterday}
            inputClass="hidden"
            // ❌ دیگه portal استفاده نمی‌کنیم تا زیر بک‌درآپ/مودال گم نشه
            // portal
            calendarPosition="bottom-center"
          />
        </div>

        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{
            backgroundColor: "#1976d2",
            borderRadius: "12px",
            padding: "12px",
            fontWeight: "bold",
            fontSize: "1rem",
            boxShadow: "0 4px 14px rgba(25, 118, 210, 0.2)",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          جستجو
        </Button>
      </div>
    </div>
  );
}
