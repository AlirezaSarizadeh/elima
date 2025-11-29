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
import './global.css'
const cityOptions = [
  { value: "THR", label: "تهران" },
  { value: "MHD", label: "مشهد" },
  { value: "AWZ", label: "اهواز" },
  { value: "KIH", label: "کیش" },
  { value: "IFN", label: "اصفهان" },
];

export default function HeroBox() {
  const router = useRouter();
  const pathname = usePathname();

  const datePickerRef = useRef<any>(null);

  const tabs = [
    { label: "پرواز داخلی", href: "/" },
    { label: "پرواز خارجی", href: "/iranout" },
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
    <div className="bg-white rounded-3xl shadow-md p-6 max-w-5xl mx-auto">

      {/* Tabs */}
      <div className="border-b flex gap-6 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <div
            key={t.href}
            onClick={() => router.push(t.href)}
            className={cls(
              "pb-2 cursor-pointer font-bold text-sm px-4 whitespace-nowrap",
              activeTab === t.href
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-900"
            )}
          >
            {t.label}
          </div>
        ))}
      </div>
      
    </div>
  );
}
