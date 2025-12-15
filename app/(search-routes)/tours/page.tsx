"use client";

import React from "react";
import PriceCalendar from "../../../components/searchPages/PriceCalendar";
import TourCard from "../../../components/searchPages/TourCard/TourCard";
import SortBar from "../../../components/searchPages/SortBar/SortBar";
import MobileFilter from "../../../components/searchPages/MobileFilter/MobileFilter";
import FilterSidebar from "../../../components/filters/FilterSidebar";
import WizardStepper from "../../../components/wizard/WizardStepper";
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
                    <div className="h-px bg-gray-100 w-full lg:hidden"></div>
                    <SortBar />
                </div>

                {/* --- Main Layout Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

                    {/* --- Sidebar --- */}
                    <aside className="hidden lg:block lg:col-span-1 sticky top-10 space-y-4 overflow-auto max-h-[calc(100vh-2rem)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="text-sm text-gray-500 bg-white p-4 rounded-xl mb-4 border border-gray-200">
                            تعداد نتایج: <span className="font-semibold text-black">{tours.length}</span> تور
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