import React from "react";
// ایمپورت کامپوننت‌های ساخته شده (مسیرها را بر اساس پروژه خود تنظیم کنید)
import PriceCalendar from "../../../components/searchPages/PriceCalendar";
import TourCard from "../../../components/searchPages/TourCard/TourCard";
import SortBar from "../../../components/searchPages/SortBar/SortBar";
import MobileFilter from "../../../components/searchPages/MobileFilter/MobileFilter";
import FilterSidebar from "../../../components/searchPages/FilterSidebar/FilterSidebar";

// --- Mock Data (Static for Server Component) ---
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
    // ... بقیه دیتاها ...
    {
        id: 2,
        title: "مثلث طلایی هند",
        image: "/images/samp-t-2.png",
        date: "۱۴۰۳/۱۰/۰۷",
        duration: "۷ شب و ۸ روز",
        hotelStars: 4,
        price: "۷۹,۰۰۰,۰۰۰",
        oldPrice: "۹۸,۰۰۰,۰۰۰",
        capacity: 8,
        tags: ["تور لحظه آخری"],
        details: {
            hotel: "۷ شب اقامت هتل ۴ ستاره",
            meals: "صبحانه بوفه",
            transport: "پرواز ماهان",
            capacityLabel: "ظرفیت محدود",
        },
    },
    {
        id: 2,
        title: "مثلث طلایی هند",
        image: "/images/samp-t-2.png",
        date: "۱۴۰۳/۱۰/۰۷",
        duration: "۷ شب و ۸ روز",
        hotelStars: 4,
        price: "۷۹,۰۰۰,۰۰۰",
        oldPrice: "۹۸,۰۰۰,۰۰۰",
        capacity: 8,
        tags: ["تور لحظه آخری"],
        details: {
            hotel: "۷ شب اقامت هتل ۴ ستاره",
            meals: "صبحانه بوفه",
            transport: "پرواز ماهان",
            capacityLabel: "ظرفیت محدود",
        },
    },
    {
        id: 2,
        title: "مثلث طلایی هند",
        image: "/images/samp-t-2.png",
        date: "۱۴۰۳/۱۰/۰۷",
        duration: "۷ شب و ۸ روز",
        hotelStars: 4,
        price: "۷۹,۰۰۰,۰۰۰",
        oldPrice: "۹۸,۰۰۰,۰۰۰",
        capacity: 8,
        tags: ["تور لحظه آخری"],
        details: {
            hotel: "۷ شب اقامت هتل ۴ ستاره",
            meals: "صبحانه بوفه",
            transport: "پرواز ماهان",
            capacityLabel: "ظرفیت محدود",
        },
    },
];

export default function TourListingPage() {
    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <div className="container mx-auto px-0 py-6 max-w-7xl">

                {/* --- Header / Sort Options --- */}
                <div className="p-4 px-0 rounded-xl mb-6 flex flex-col gap-4">
                    
                    {/* فرض بر این است که PriceCalendar خودش Use Client دارد */}
                    <PriceCalendar />

                    {/* دکمه فیلتر موبایل (Client Component) */}
                    <MobileFilter />

                    {/* خط جداکننده در موبایل */}
                    <div className="h-px bg-gray-100 w-full lg:hidden"></div>

                    {/* نوار مرتب‌سازی (Client Component) */}
                    <SortBar />
                </div>

                {/* --- Main Layout Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

                    {/* --- Desktop Sidebar (Filters) --- */}
                    <aside className="hidden lg:block lg:col-span-1 sticky top-10 space-y-4 overflow-auto max-h-[calc(100vh-2rem)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="text-sm text-gray-500 bg-white p-4 rounded-xl mb-4 border border-gray-200">
                            تعداد نتایج: <span className="font-semibold text-black">{tours.length}</span> تور
                        </div>
                        
                        {/* محتوای فیلترها (Client Component) */}
                        <FilterSidebar />
                    </aside>

                    {/* --- Left Content (Tour Cards) --- */}
                    <main className="lg:col-span-3 flex flex-col gap-4">
                        {/* رندر کردن لیست در سمت سرور */}
                        {tours.map((tour) => (
                            <TourCard key={tour.id} data={tour} />
                        ))}

                        {/* Loading Indicator */}
                        <div className="w-full py-8 flex justify-center text-gray-400 text-sm">
                            <span>در حال بارگذاری تورهای بیشتر...</span>
                        </div>
                    </main>

                </div>
            </div>
        </div>
    );
}