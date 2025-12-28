"use client";

import React, { useState } from "react";
import PriceCalendar from "../../../components/searchPages/PriceCalendar";
import TourCard from "../../../components/searchPages/TourCard/TourCard";
import SortBar from "../../../components/searchPages/SortBar/SortBar";
import MobileFilter from "../../../components/searchPages/MobileFilter/MobileFilter";
import FilterSidebar from "../../../components/filters/FilterSidebar";
import WizardStepper from "../../../components/wizard/WizardStepper";
import Image from "next/image";
import Tabs from "../../../components/domestic_tour/tour_category/Tabs";
// import WizardStepper from "../../../components/wizard/WizardStepper"; // 👈 این را اینجا نیاز نداریم چون هنوز ID نداریم

// --- Mock Data ---
const tours = [
    {
        id: 1,
        title: "هندوستان (دهلی، آگرا، جیپور)",
        image: "/images/samp-t-1.png",
        date: "۱۴۰۳/۰۵/۰۶",
        duration: "۹ شب و ۱۰ روز",
        hotelStars: 4,
        price: "۸۰,۰۰۰,۰۰۰",
        oldPrice: "۸۲,۰۰۰,۰۰۰",
        capacity: 3,
        tags: ["تور لحظه آخری"],
        details: {
            hotel: "۹ شب اقامت هتل ۴ ستاره",
            meals: "۸ وعده صبحانه، ۷ وعده ناهار",
            transport: "هواپیما",
            capacityLabel: "حداکثر ۳۰ نفر",
        },
    },
    {
        id: 1,
        title: "هندوستان (دهلی، آگرا، جیپور)",
        image: "/images/samp-t-2.png",
        date: "۱۴۰۳/۰۵/۰۶",
        duration: "۹ شب و ۱۰ روز",
        hotelStars: 4,
        price: "۸۰,۰۰۰,۰۰۰",
        oldPrice: "۸۲,۰۰۰,۰۰۰",
        capacity: 3,
        tags: ["تور لحظه آخری"],
        details: {
            hotel: "۹ شب اقامت هتل ۴ ستاره",
            meals: "۸ وعده صبحانه، ۷ وعده ناهار",
            transport: "هواپیما",
            capacityLabel: "حداکثر ۳۰ نفر",
        },
    },
    {
        id: 1,
        title: "هندوستان (دهلی، آگرا، جیپور)",
        image: "/images/samp-t-3.png",
        date: "۱۴۰۳/۰۵/۰۶",
        duration: "۹ شب و ۱۰ روز",
        hotelStars: 4,
        price: "۸۰,۰۰۰,۰۰۰",
        oldPrice: "۸۲,۰۰۰,۰۰۰",
        capacity: 3,
        tags: ["تور لحظه آخری"],
        details: {
            hotel: "۹ شب اقامت هتل ۴ ستاره",
            meals: "۸ وعده صبحانه، ۷ وعده ناهار",
            transport: "هواپیما",
            capacityLabel: "حداکثر ۳۰ نفر",
        },
    },
    // ... سایر دیتاها
];

export default function TourListingPage() {

        const tabsList = ["لوکس‌ترین", "تورهای زمینی", "تورهای خارجی", "تورهای داخلی"];
        const [activeTab, setActiveTab] = useState("لوکس‌ترین");

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <div className="container mx-auto px-4 py-6 max-w-7xl px-4">

                {/* Wizard Header */}
                {/* <h1 className="text-2xl font-bold text-gray-800 mb-6">انتخاب محل اقامت</h1> */}
                <WizardStepper tourId={'selection'} />


                {/* --- Header / Sort Options --- */}
                <div className="p-4 px-0 rounded-xl mb-6 flex flex-col gap-4">
                    <PriceCalendar />
                    <MobileFilter />
                    <div className="flex items-center gap-8 w-full overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                        {/* متن ثابت (مخفی در موبایل) */}
                        <span className="font-semibold text-gray-800 text-sm whitespace-nowrap hidden md:flex items-center gap-2 ml-2">
                            <Image
                                alt="sort-icon"
                                src={"/images/sort-icon.svg"}
                                width={24}
                                height={24}
                            />
                            مرتب‌سازی بر اساس
                        </span>
                        {/* <SortBar /> */}
                        <Tabs tabs={tabsList} active={activeTab} onChange={setActiveTab} />
                    </div>
                </div>

                {/* --- Main Layout Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

                    {/* --- Sidebar --- */}
                    <aside className="hidden lg:block lg:col-span-1 sticky top-10 space-y-4 overflow-auto max-h-[calc(100vh-2rem)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="bg-[#25446b] text-white p-4 rounded-2xl mb-4 shadow-blue-200">
                            <p className="text-xs opacity-80 mb-1">نتایج یافت شده</p>
                            <p className="text-lg font-bold">{tours.length} هتل در دسترس</p>
                        </div>
                        <FilterSidebar />
                    </aside>

                    {/* --- Content --- */}
                    <main className="lg:col-span-3 flex flex-col gap-4">
                        {tours.map((tour) => (
                            // ✅ 2. ارسال لینک اختصاصی به هر کارت
                            // فرض بر این است که کامپوننت TourCard شما پراپی مثل linkUrl یا href قبول می‌کند
                            // اگر ندارد، باید به آن اضافه کنید.
                            <TourCard
                                key={tour.id}
                                data={tour}
                                linkUrl={`/tours/${tour.id}/accommodation`} // 👈 هدایت به مرحله ۲ (اقامتگاه)
                            />
                        ))}

                    </main>

                </div>
            </div>
        </div>
    );
}