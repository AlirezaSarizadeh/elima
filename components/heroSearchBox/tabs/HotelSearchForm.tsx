"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cls from "classnames";

// --- Date Picker Imports ---
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/jalali";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

// --- MUI & Icons Imports ---
import { Button, useMediaQuery, useTheme, Autocomplete, TextField } from "@mui/material";
import { WorkOutlineRounded, CreditCardOutlined, Hotel } from "@mui/icons-material";

// --- Custom Components Imports ---
import { DatePickerInput } from "../../DatePickerInput/DatePickerInput";
import CustomRadioGroup from "../../CustomRadioGroup/CustomRadioGroup";
import PassengerSelection from "../../../app/visa/components/PassengerSelection";

export default function HotelSearchForm() {
    const today = new DateObject({ calendar: persian, locale: persian_fa });
    today.setHour(0).setMinute(0).setSecond(0).setMillisecond(0);

    const destinations = [
        { title: "تهران" },
        { title: "مشهد" },
        { title: "اصفهان" },
        { title: "شیراز" },
        { title: "کیش" },
    ];

    // --- Hooks ---
    const pathname = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const datePickerRef = useRef<any>(null);

    // --- States ---
    const [destination, setDestination] = useState<any>(null);
    const [calendarType, setCalendarType] = useState<"jalali" | "gregorian">("jalali");
    const [dateRange, setDateRange] = useState<any>([null, null]);

    // --- Constants ---
    const tabs = [
        { label: "تور مسافرتی", href: "/", icon: <WorkOutlineRounded /> },
        { label: "هتل", href: "/hotel", icon: <Hotel /> },
        { label: "ویزا", href: "/visa", icon: <CreditCardOutlined /> },
    ];

    const calendar = calendarType === "jalali" ? persian : gregorian;
    const locale = calendarType === "jalali" ? persian_fa : gregorian_en;

    const departDate = dateRange[0] ? dateRange[0].format("YYYY/MM/DD") : "";
    const returnDate = dateRange[1] ? dateRange[1].format("YYYY/MM/DD") : "";

    // --- Handlers ---
    const openCalendar = () => datePickerRef.current?.openCalendar();
    const clearDepart = () => setDateRange([null, dateRange[1]]);
    const clearReturn = () => setDateRange([dateRange[0], null]);

    const handleDateChange = (date: any) => {
        setDateRange(date);
        if (date && date.length === 2) {
            datePickerRef.current?.closeCalendar();
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-200 p-4 md:p-6 shadow-sm w-full max-w-7xl mx-auto relative z-10">

            {/* --- تب‌ها (لینک‌های واقعی) --- */}
            <div className={`
                ${isMobile 
                    ? 'grid grid-cols-3 gap-2 mb-4' 
                    : 'border-b border-gray-100 flex gap-8 overflow-x-auto pb-0 mb-6'}
            `}>
                {tabs.map((t) => {
                    const isActive = pathname === t.href;
                    return (
                        <Link 
                            key={t.href} 
                            href={t.href}
                            className={cls(
                                "cursor-pointer font-bold flex flex-col md:flex-row items-center justify-center gap-2 transition-all duration-300 no-underline",
                                isMobile
                                    ? `py-3 px-2 rounded-xl text-[10px] sm:text-xs text-center ${isActive ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-50 text-gray-500 border border-transparent'}`
                                    : `pb-4 text-sm relative ${isActive ? "text-blue-600 tab-active-line" : "text-gray-400 hover:text-gray-600"}`
                            )}
                        >
                            {React.cloneElement(t.icon as React.ReactElement<any>, { fontSize: isMobile ? "small" : "medium" })}
                            <span>{t.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* --- محتوای فرم --- */}
            <div className="flex flex-col gap-5 pt-2 w-full animate-fade-in">
                
                <CustomRadioGroup />
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-3 relative items-start md:items-end w-full">

                    {/* ۱. مقصد یا هتل */}
                    <div className="col-span-1 md:col-span-4 lg:col-span-3 w-full relative z-20">
                        <Autocomplete
                            value={destination}
                            onChange={(e, val) => setDestination(val)}
                            options={destinations}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="مقصد یا هتل"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            backgroundColor: '#fff',
                                            height: '56px'
                                        }
                                    }}
                                />
                            )}
                        />
                    </div>

                    {/* ۲. تاریخ اقامت */}
                    <div className="col-span-1 md:col-span-5 lg:col-span-4 w-full relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 datepicker-container">
                            <div className="w-full relative">
                                <DatePickerInput
                                    value={departDate}
                                    onChange={() => { }}
                                    onClear={clearDepart}
                                    label="تاریخ ورود"
                                    variant="outlined"
                                    style={{ direction: "rtl", width: '100%' }}
                                    onAutocompleteClick={openCalendar}
                                />
                            </div>

                            <div className="w-full relative md:-mr-px">
                                <DatePickerInput
                                    value={returnDate}
                                    onChange={() => { }}
                                    onClear={clearReturn}
                                    label="تاریخ خروج"
                                    variant="outlined"
                                    style={{ direction: "rtl", width: '100%' }}
                                    onAutocompleteClick={openCalendar}
                                />
                            </div>
                        </div>

                        {/* کانتینر تقویم */}
                        <div 
                            className="absolute w-full flex justify-center z-[1300]" 
                            style={{ top: isMobile ? "100%" : "58px", right: 0 }}
                        >
                            <DatePicker
                                ref={datePickerRef}
                                range
                                value={dateRange}
                                onChange={handleDateChange}
                                calendar={calendar}
                                locale={locale}
                                numberOfMonths={isMobile ? 1 : 2}
                                format="YYYY/MM/DD"
                                inputClass="hidden"
                                containerStyle={{ width: "100%", display: "flex", justifyContent: "center" }}
                                mapDays={({ date }) => {
                                    const dateDay = date.toDays();
                                    const todayDay = today.toDays();
                                    let isBeforeToday = dateDay < (todayDay - 1);
                                    let isToday = dateDay === todayDay;

                                    const props: any = {};
                                    if (isBeforeToday) {
                                        props.disabled = true;
                                        props.style = { color: "#ccc", cursor: "not-allowed" };
                                    }
                                    if (isToday) {
                                        props.style = { color: "#2563eb", fontWeight: "bold", borderRadius: "8px" };
                                    }
                                    return props;
                                }}
                            />
                        </div>
                    </div>

                    {/* ۳. انتخاب مسافران */}
                    <div className="col-span-1 md:col-span-3 lg:col-span-3 w-full relative z-0">
                        <PassengerSelection />
                    </div>

                    {/* ۴. دکمه جستجو */}
                    <div className="col-span-1 md:col-span-12 lg:col-span-2 w-full mt-2 lg:mt-0">
                        <Link href={'/hotels/'} className="block w-full">
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{
                                    borderRadius: '12px',
                                    fontWeight: 'bold',
                                    height: '56px',
                                    backgroundColor: '#2563eb',
                                    boxShadow: 'none',
                                    '&:hover': { backgroundColor: '#1d4ed8' }
                                }}
                            >
                                جستجو
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                .tab-active-line::after {
                    content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 3px;
                    background-color: #2563eb; border-radius: 3px 3px 0 0;
                }
            `}</style>
        </div>
    );
}