"use client"; // چون تعامل داریم بهتر است کلاینت باشد

import React from "react";
import Link from "next/link";
import WizardStepper from "../../../../../components/wizard/WizardStepper";
import HotelFilterSidebar from "./HotelFilterSidebar"; // 👈 ایمپورت سایدبار هتل که ساختیم
import { ShortcutOutlined, StarBorder } from "@mui/icons-material";
import Image from "next/image";
import { Button } from "@mui/material";

// --- Mock Data for Hotels ---
const hotels = [
  {
    id: 101,
    name: "هتل گرند حیات (Grand Hyatt)",
    stars: 5,
    image: "/images/hotel_1.png",
    location: "مرکز شهر دهلی",
    features: ["استخر", "وای‌فای رایگان", "باشگاه ورزشی", "صبحانه بوفه"],
    priceDiff: 0,
  },
  {
    id: 102,
    name: "هتل تاج محل (Taj Mahal Hotel)",
    stars: 5,
    image: "/images/hotel_2.png",
    location: "نزدیک دروازه هند",
    features: ["اسپا لوکس", "منظره شهر", "ترانسفر رایگان"],
    priceDiff: 5000000,
  },
];

export default function AccommodationPage({ params }: { params: { tourId: string } }) {
  const { tourId } = params;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8 max-w-7xl"> {/* max-w را بیشتر کردم تا جا برای سایدبار باشد */}

        {/* Wizard Header - تمام عرض */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">انتخاب محل اقامت</h1>
        <WizardStepper tourId={'accommodation'} />

        {/* --- Layout Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mt-8">

          {/* ✅ 1. سایدبار فیلتر (سمت راست) */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-4 space-y-4">
            <HotelFilterSidebar />
          </aside>

          {/* ✅ 2. محتوای اصلی (لیست هتل‌ها) */}
          <main className="lg:col-span-3">

            {/* Info Box */}
            {/* <div className="bg-blue-50 text-blue-700 p-4 rounded-xl mb-6 text-sm border border-blue-100 flex items-center gap-2">
              <span className="text-xl">ℹ️</span>
              هتل‌های پیشنهادی برای این تور بر اساس نظرات مسافران قبلی انتخاب شده‌اند.
            </div> */}

            {/* Hotels Grid (داخل ستون اصلی) */}
            <div className="grid grid-cols-1 gap-6">
              {/* اگر بخواهید در دسکتاپ هتل‌ها کنار هم باشند md:grid-cols-2 را اضافه کنید، 
                      اما معمولا وقتی سایدبار هست، یک ستونه بودن کارت‌ها خواناتر است */}

              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row">

                  {/* Image Area */}
                  <div className="relative h-48 md:h-auto md:w-1/3 bg-gray-200 shrink-0">
                    <Image src={hotel.image} fill alt={hotel.name} className="object-cover" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-amber-500 shadow-sm">
                      <span>{hotel.stars}</span>
                      <StarBorder fontSize="inherit" />
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{hotel.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
                      📍 {hotel.location}
                    </p>

                    {/* Features Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {hotel.features.map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-sm">
                        {hotel.priceDiff === 0 ? (
                          <span className="text-green-600 font-bold">بدون افزایش قیمت</span>
                        ) : (
                          <span className="text-gray-700">
                            + {hotel.priceDiff.toLocaleString()} <span className="text-xs text-gray-400">تومان</span>
                          </span>
                        )}
                      </div>

                      {/* <Link
                        href={`/tours/${tourId}/flights?hotel=${hotel.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto text-center"
                      >
                        انتخاب و ادامه
                      </Link> */}

                      <Link href={`/tours/${tourId}/flights?hotel=${hotel.id}`} className="block w-full sm:w-auto">
                        <Button variant="contained" className="w-full" sx={{
                          padding: '10px',
                          borderRadius: '10px'
                        }}>انتخاب و ادامه</Button>
                      </Link>

                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Back Button */}
            <div className="mt-8 flex justify-end">
              <Link
                href={`/tours`}
                className="text-gray-600 hover:text-black border border-gray-300 px-4 py-2.5 rounded-lg text-sm flex items-center justify-between gap-2 transition-colors bg-white hover:bg-gray-50"
              >
                مرحله قبل (لیست تورها)
                <ShortcutOutlined fontSize="small" className="rotate-180" /> {/* آیکون رو برعکس کردم برای RTL */}
              </Link>
            </div>

          </main>
        </div>

      </div>
    </div>
  );
}