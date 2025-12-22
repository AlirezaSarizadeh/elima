"use client";

import React, { useState, useRef } from "react";
import { 
    LocationOnOutlined, 
    CalendarMonthOutlined 
} from "@mui/icons-material";
import { Button, Autocomplete, TextField } from "@mui/material";

// --- Date Picker Imports ---
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/jalali";
import persian_fa from "react-date-object/locales/persian_fa";

// --- Custom Components ---
import { DatePickerInput } from "../../../../../components/DatePickerInput/DatePickerInput";

export default function HotelBookingSideForm() {
    // تاریخ امروز برای تنظیمات تقویم
    const today = new DateObject({ calendar: persian, locale: persian_fa });
    
    // رفرنس تقویم
    const datePickerRef = useRef<any>(null);

    // استیت‌ها
    const [dateRange, setDateRange] = useState<any>([null, null]);
    // در صفحه داخلی هتل، معمولاً مقصد همان نام هتل است
    const [destination, setDestination] = useState<string | null>("هتل پارسیان آزادی تهران");

    // لیست نمونه برای اتوکمپلیت (اگر کاربر بخواهد هتل را عوض کند)
    const hotelOptions = [
        "هتل پارسیان آزادی تهران",
        "هتل اسپیناس پالاس",
        "هتل استقلال تهران",
        "هتل اوین تهران"
    ];

    // --- هندلرها ---
    const openCalendar = () => datePickerRef.current?.openCalendar();
    
    const handleDateChange = (date: any) => {
        setDateRange(date);
        // بستن خودکار تقویم اگر دو تاریخ انتخاب شد
        if (date && date.length === 2) {
            datePickerRef.current?.closeCalendar();
        }
    };

    const clearDepart = () => setDateRange([null, dateRange[1]]);
    const clearReturn = () => setDateRange([dateRange[0], null]);

    // فرمت دهی تاریخ برای نمایش در اینپوت‌ها
    const departDate = dateRange[0] ? dateRange[0].format("DD MMMM") : "";
    const returnDate = dateRange[1] ? dateRange[1].format("DD MMMM") : "";

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-[0_5px_20px_rgba(0,0,0,0.03)]" dir="rtl">
            
            {/* 1. باکس پیام آبی (Alert Box) */}
            <div className="bg-[#e3f2fd] border border-[#bbdefb] rounded-xl p-3 mb-5 text-center">
                <p className="text-[#1565c0] text-sm font-bold leading-6">
                    برای مشاهده قیمت‌های دقیق‌تر، تاریخ ورود و خروج را انتخاب کنید.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                
                {/* 2. اینپوت مقصد (Autocomplete) */}
                <div className="relative">
                    <Autocomplete
                        options={hotelOptions}
                        value={destination}
                        onChange={(event, newValue) => setDestination(newValue)}
                        freeSolo
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="مقصد یا هتل"
                                variant="outlined"
                                // شخصی‌سازی استایل متریال برای شبیه شدن به طرح
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        backgroundColor: '#fff',
                                        '& fieldset': {
                                            borderColor: '#e5e7eb', // gray-200
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#3b82f6', // blue-500
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#2563eb', // blue-600
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: '#9ca3af', // gray-400
                                        fontSize: '0.9rem',
                                    },
                                    '& .MuiInputLabel-shrink': {
                                        backgroundColor: 'white',
                                        padding: '0 4px',
                                        color: '#9ca3af',
                                    }
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            <LocationOnOutlined className="text-gray-400 ml-1" />
                                            {params.InputProps.endAdornment}
                                        </>
                                    )
                                }}
                            />
                        )}
                    />
                </div>

                {/* 3. تاریخ‌ها (DatePicker Inputs) */}
                <div className="grid grid-cols-2 gap-3 relative">
                    
                    {/* ورودی تاریخ ورود */}
                    <div onClick={openCalendar}>
                        <DatePickerInput
                            label="تاریخ ورود"
                            value={departDate}
                            onChange={() => {}} // کنترل توسط تقویم اصلی
                            onClear={clearDepart}
                            variant="outlined"
                            style={{ 
                                direction: "rtl", 
                                cursor: 'pointer',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}
                            // آیکون تقویم
                            InputProps={{
                                endAdornment: <CalendarMonthOutlined className="text-gray-400 text-lg" />
                            }}
                        />
                    </div>

                    {/* ورودی تاریخ خروج */}
                    <div onClick={openCalendar}>
                        <DatePickerInput
                            label="تاریخ خروج"
                            value={returnDate}
                            onChange={() => {}} 
                            onClear={clearReturn}
                            variant="outlined"
                            style={{ 
                                direction: "rtl", 
                                cursor: 'pointer',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}
                            InputProps={{
                                endAdornment: <CalendarMonthOutlined className="text-gray-400 text-lg" />
                            }}
                        />
                    </div>

                    {/* --- موتور تقویم (مخفی / پاپ‌آپ) --- */}
                    <div className="absolute top-full right-0 left-0 z-50 flex justify-center mt-1">
                        <DatePicker
                            ref={datePickerRef}
                            range
                            value={dateRange}
                            onChange={handleDateChange}
                            calendar={persian}
                            locale={persian_fa}
                            numberOfMonths={1}
                            format="YYYY/MM/DD"
                            
                            // استایل مخفی برای تریگر کردن دستی
                            containerStyle={{
                                position: "absolute",
                                visibility: "hidden", // مخفی است تا زمانی که openCalendar صدا زده شود
                                height: 0
                            }}
                            
                            // تنظیمات پاپ‌آپ
                            portal
                            inputClass="hidden"
                        />
                    </div>
                </div>

                {/* 4. دکمه جستجو */}
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                        backgroundColor: '#1976d2', // آبی مشابه تصویر
                        borderRadius: '12px',
                        padding: '12px',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        boxShadow: '0 4px 14px rgba(25, 118, 210, 0.2)',
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        }
                    }}
                >
                    جستجو
                </Button>

            </div>
        </div>
    );
}