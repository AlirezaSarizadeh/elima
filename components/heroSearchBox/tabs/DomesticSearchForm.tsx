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
    const datePickerRef = useRef<any>(null);

    const tabs = [
        { label: "تور داخلی", href: "/", icon: <WorkOutlineRounded /> },
        { label: "تور خارجی", href: "/iranout", icon: <FlightTakeoffRounded /> },
    ];

    const activeTab = pathname === "/iranout" ? "/iranout" : "/";

    const [calendarType, setCalendarType] = useState<"jalali" | "gregorian">(
        "jalali"
    );

    const [dateRange, setDateRange] = useState<any>([null, null]);

    const [origin, setOrigin] = useState<any>(null);
    const [destination, setDestination] = useState<any>(null);

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


            {/* Tabs */}
            <div className="border-b border-gray-300 flex gap-6 overflow-x-auto pb-2">
                {tabs.map((t) => (
                    <div
                        key={t.href}
                        onClick={() => router.push(t.href)}
                        className={cls(
                            "pb-2 cursor-pointer font-normal text-ls whitespace-nowrap flex items-center justify-start gap-1",
                            activeTab === t.href
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-900"
                        )}
                    >
                        {t.icon}
                        {t.label}
                    </div>
                ))}
            </div>

            {/* Search Form */}
            <div className="mt-5 flex flex-col gap-4">

                {/* Origin / Destination */}
                <div className="flex flex-col md:flex-row gap-3 relative">
                    {/* <div className="w-full"> */}
                    <div className="flex items-center justify-between w-full gap-5 relative c_datepickerInput-container">
                        <SwapInputs />
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
                                    className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full shadow"
                                >
                                    {calendarType === "jalali" ? "میلادی" : "شمسی"}
                                </button>
                            </div>
                        </DatePicker>
                        <PassengerDropdown />
                        <Button variant="contained"
                            sx={{
                                padding: '15.5px 14px',
                                borderRadius:'10px',
                                minWidth:'100px'
                            }}
                        >جستجو</Button>
                    </div>
                    {/* <Select
                            placeholder="مبدا"
                            className="heroSearchBox_select"
                            options={cityOptions}
                            value={origin}
                            onChange={setOrigin}
                            isSearchable
                            components={{
                                DropdownIndicator: () => null,   // حذف آیکون فلش
                                IndicatorSeparator: () => null,  // حذف خط جداکننده
                            }}
                        /> */}
                    {/* </div> */}
                    {/* 
                    <button
                        onClick={swapOriginDest}
                        className="absolute md:absolute left-1/2 -translate-x-1/2 top-14 md:top-1/2 md:-translate-y-1/2
                       z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-400"
                    >
                        🔄
                    </button> */}

                    {/* <div className="w-full">
                        <Select
                            placeholder="مقصد"
                            className="heroSearchBox_select"
                            options={cityOptions}
                            value={destination}
                            onChange={setDestination}
                            isSearchable
                            components={{
                                DropdownIndicator: () => null,   // حذف آیکون فلش
                                IndicatorSeparator: () => null,  // حذف خط جداکننده
                            }}
                        />

                    </div> */}
                </div>

                {/* Date Inputs */}
                <div className="flex gap-3 w-full relative">



                    {/* Departure */}
                    {/* <div className="flex-1 relative">
                        <button
                            type="button"
                            onClick={openCalendar}
                            className="bg-white border border-gray-900 rounded-lg h-12 px-10 w-full flex justify-between items-center"
                        >
                            <span className="text-sm">تاریخ رفت</span>
                            <span className="text-gray-600">{departDate || "انتخاب کنید"}</span>
                        </button>

                        {departDate && (
                            <button
                                onClick={clearDepart}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                            >
                                <ClearIcon />
                            </button>
                        )}
                    </div>

                    <div className="flex-1 relative">
                        <button
                            type="button"
                            onClick={openCalendar}
                            className="bg-white border border-gray-900 rounded-lg h-12 px-10 w-full flex justify-between items-center"
                        >
                            <span className="text-sm">تاریخ برگشت</span>
                            <span className="text-gray-600">{returnDate || "انتخاب کنید"}</span>
                        </button>

                        {returnDate && (
                            <button
                                onClick={clearReturn}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black flex items-center"
                            >
                                <ClearIcon />
                            </button>
                        )}
                    </div> */}

                    {/* Calendar Mounted Normally */}

                </div>

                {/* Passengers */}
                <div className="flex gap-3">


                    {/* <button className="rounded-full bg-blue-600 text-white font-bold h-12 px-6 w-full md:w-auto">
                        جستجو داخلی
                    </button> */}
                </div>
            </div>

        </div>
    );
}
