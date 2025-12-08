"use client";

import { useState, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";
import cls from "classnames";

import persian from "react-date-object/calendars/jalali";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import ClearIcon from '@mui/icons-material/Clear';
import '../global.css'
import PassengerDropdown from "../PassengerDropdown";
import Image from "next/image";
import { FlightTakeoffRounded, WorkOutlined, WorkOutlineRounded } from "@mui/icons-material";
import RtlDemo, { SwapInputs } from "../../SwapInputs/SwapInputs";
import { DatePickerInput } from "../../DatePickerInput/DatePickerInput";
import { Button } from "@mui/material";

const cityOptions = [
    { value: "THR", label: "تهران" },
    { value: "MHD", label: "مشهد" },
    { value: "AWZ", label: "اهواز" },
    { value: "KIH", label: "کیش" },
    { value: "IFN", label: "اصفهان" },
];

export default function DomesticSearchForm() {
    const router = useRouter();
    const pathname = usePathname();

    const [value, setValue] = useState("");
    const datePickerRef = useRef(null);

    const tabs = [
        { label: "تور داخلی", href: "/", icon: <WorkOutlineRounded /> },
        { label: "تور خارجی", href: "/external-tours", icon: <FlightTakeoffRounded /> },
    ];

    const activeTab = pathname === "/external-tours" ? "/external-tours" : "/";

    const [calendarType, setCalendarType] = useState("jalali");

    const [dateRange, setDateRange] = useState([null, null]);

    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);

    const calendar = calendarType === "jalali" ? persian : gregorian;
    const locale = calendarType === "jalali" ? persian_fa : gregorian_en;

    const switchCalendar = () => {
        setCalendarType((prev) => (prev === "jalali" ? "gregorian" : "jalali"));
    };

    const swapOriginDest = () => {
        const o = origin;
        setOrigin(destination);
        setDestination(o);
    };

    const departDate = dateRange[0] ? dateRange[0].format("YYYY/MM/DD") : "";
    const returnDate = dateRange[1] ? dateRange[1].format("YYYY/MM/DD") : "";

    const openCalendar = () => {
        if (!datePickerRef.current) return;
        datePickerRef.current.openCalendar();
    };

    // clear functions
    const clearDepart = () => {
        setDateRange([null, dateRange[1]]);
    };

    const clearReturn = () => {
        setDateRange([dateRange[0], null]);
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-200 p-6">
            {/* استایل‌های انیمیشن اختصاصی همین کامپوننت */}
            <style jsx>{`
                @keyframes fadeSlideUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px) scale(0.98);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                @keyframes expandWidth {
                    from { width: 0; opacity: 0; }
                    to { width: 100%; opacity: 1; }
                }
                .animate-slide-up {
                    animation: fadeSlideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                .tab-active-line::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: #2563eb; /* blue-600 */
                    border-radius: 2px 2px 0 0;
                    animation: expandWidth 0.3s ease forwards;
                }
            `}</style>

            {/* Tabs */}
            <div className="border-b border-gray-300 flex gap-6 overflow-x-auto pb-0 mb-5">
                {tabs.map((t) => {
                    const isActive = activeTab === t.href;
                    return (
                        <div
                            key={t.href}
                            onClick={() => router.push(t.href)}
                            className={cls(
                                "pb-3 cursor-pointer font-medium text-ls whitespace-nowrap flex items-center justify-start gap-2 relative transition-colors duration-300",
                                isActive
                                    ? "text-blue-600 tab-active-line"
                                    : "text-gray-500 hover:text-gray-800"
                            )}
                        >
                            {t.icon}
                            {t.label}
                        </div>
                    );
                })}
            </div>

            {/* Search Form */}
            {/* نکته مهم: key باعث می‌شود با تغییر تب، انیمیشن دوباره اجرا شود */}
            <div
                key={activeTab}
                className="flex flex-col gap-4"
            >
                {/* Origin / Destination */}
                <div className="flex flex-col md:flex-row gap-3 relative">
                    {/* <div className="w-full"> */}
                    <SwapInputs />
                    <div className="flex items-center justify-between w-full gap-0 relative c_datepickerInput-container">
                        <DatePickerInput
                            value={departDate}
                            onChange={(val) => setValue(val)}
                            onClear={clearDepart}
                            label="تاریخ رفت"
                            variant="outlined"
                            style={{ direction: "rtl" }}
                            onAutocompleteClick={openCalendar}

                        />
                        <DatePickerInput
                            value={returnDate}
                            onChange={(val) => setValue(val)}
                            onClear={clearReturn}
                            label="تاریخ برگشت"
                            variant="outlined"
                            style={{ direction: "rtl" }}
                            onAutocompleteClick={openCalendar}
                        />
                        <DatePicker
                            ref={datePickerRef}
                            range
                            value={dateRange}
                            onChange={setDateRange}
                            calendar={calendar}
                            locale={locale}
                            numberOfMonths={2}
                            format="YYYY/MM/DD"
                            portal
                            inputClass="hidden"
                            style={{ visibility: "hidden", height: 0 }}
                        >
                            <div className="absolute top-3 left-3 z-50">
                                <button
                                    type="button"
                                    onClick={switchCalendar}
                                    className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full shadow hover:bg-gray-300 transition"
                                >
                                    {calendarType === "jalali" ? "میلادی" : "شمسی"}
                                </button>
                            </div>
                        </DatePicker>
                    </div>
                    <PassengerDropdown />
                    <Button variant="contained"
                        href="/internal-tours"
                        sx={{
                            padding: '15.5px 14px',
                            borderRadius: '10px',
                            minWidth: '100px',
                            boxShadow: 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                            }
                        }}
                    >جستجو</Button>
                </div>
            </div>

        </div>
    );
}