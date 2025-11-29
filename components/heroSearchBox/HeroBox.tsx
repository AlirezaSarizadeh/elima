"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

import persian from "react-date-object/calendars/jalali";
import persian_fa from "react-date-object/locales/persian_fa";

import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

export default function HeroBox() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { label: "پرواز داخلی", href: "/" },
    { label: "پرواز خارجی", href: "/iranout" },
  ];

  const activeTab = pathname === "/iranout" ? "/iranout" : "/";

  const [calendarType, setCalendarType] = useState<"jalali" | "gregorian">(
    "jalali"
  );

  const [dateRange, setDateRange] = useState<any>([null, null]);

  const calendar = calendarType === "jalali" ? persian : gregorian;
  const locale = calendarType === "jalali" ? persian_fa : gregorian_en;

  const switchCalendar = () => {
    setCalendarType((prev) => (prev === "jalali" ? "gregorian" : "jalali"));
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-6 max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="border-b flex gap-6 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <div
            key={t.href}
            onClick={() => router.push(t.href)}
            className={`pb-2 cursor-pointer font-bold text-sm px-4 relative whitespace-nowrap
              ${
                activeTab === t.href
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-900"
              }
            `}
          >
            {t.label}
          </div>
        ))}
      </div>

      {/* Search Form */}
      <div className="mt-5 flex flex-col gap-4">
        {/* Origin / Destination */}
        <div className="flex flex-col md:flex-row gap-3">
          <button className="bg-white border border-gray-900 rounded-lg h-12 flex items-center gap-3 px-3 w-full">
            <span className="text-xl">📍</span>
            <label className="text-base text-gray-900 absolute pointer-events-none">
              مبدا
            </label>
          </button>

          <button className="bg-white border border-gray-900 rounded-lg h-12 flex items-center gap-3 px-3 w-full">
            <span className="text-xl">📍</span>
            <label className="text-base text-gray-900 absolute pointer-events-none">
              مقصد
            </label>
          </button>
        </div>

        {/* Date Picker */}
        <div className="flex gap-3 w-full">
          <div className="flex-1 relative">
            <DatePicker
              range
              value={dateRange}
              onChange={setDateRange}
              numberOfMonths={2}
              calendar={calendar}
              locale={locale}
              format="YYYY/MM/DD"
            //   plugins={[<DatePanel key="panel" />]}
              portal
              render={(value, openCalendar) => (
                <button
                  onClick={openCalendar}
                  type="button"
                  className="bg-white border border-gray-900 rounded-lg h-12 flex items-center gap-3 px-3 w-full text-right"
                >
                  <span className="text-xl">📅</span>
                  <div className="flex flex-col text-right">
                    <span className="text-sm text-gray-900">
                      تاریخ رفت / برگشت
                    </span>
                    <span className="text-xs text-gray-500">
                      {value ? value.toString() : "انتخاب کنید"}
                    </span>
                  </div>
                </button>
              )}
              containerClassName="p-3 bg-white shadow-xl rounded-xl relative"
              mapDays={({ date }) => ({
                className:
                  "rounded-full hover:bg-blue-500 hover:text-white transition cursor-pointer",
              })}
            >
              {/* switch inside popup */}
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
          </div>
        </div>

        {/* Passengers */}
        <div className="flex gap-3">
          <button className="bg-white border border-gray-900 rounded-lg h-12 flex items-center gap-3 px-3 w-full">
            <span className="text-xl">👤</span>
            <label className="text-base text-gray-900 absolute pointer-events-none -translate-y-3 scale-75">
              مسافرها
            </label>
            <span className="mt-4 text-gray-900 text-sm">1 مسافر</span>
          </button>

          <button className="rounded-full bg-blue-600 text-white font-bold h-12 px-6 w-full md:w-auto">
            جستجو
          </button>
        </div>
      </div>
    </div>
  );
}
