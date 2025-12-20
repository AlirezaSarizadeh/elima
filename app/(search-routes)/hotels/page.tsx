"use client";

import React from "react";
import PriceCalendar from "../../../components/searchPages/PriceCalendar";
import HotelCard from "../../../components/searchPages/HotelCard/HotelCard"; 
import SortBar from "../../../components/searchPages/SortBar/SortBar";
import MobileFilter from "../../../components/searchPages/MobileFilter/MobileFilter";
import FilterSidebar from "../../../components/filters/FilterSidebar";
import WizardStepper from "../../../components/wizard/WizardStepper";

export default function HotelListingPage() {
    // پیشنهاد: این دیتا معمولاً از API می‌آید، اما برای Mock کردن همین‌جا بماند
    const hotels = [
        {
            id: 1,
            title: "هتل پارسیان آزادی تهران",
            images: ["/images/hotel_1.png", "/images/hotel_2.png", "/images/hotel_3.png"],
            stars: 5,
            location: "تهران، بزرگراه شهید چمران",
            rating: 4.4,
            reviews: 379,
            price: 272100000,
            oldPrice: 315600000,
            discount: 14,
            duration: "۲۸ شب",
            tags: ["ویژه یلدا"],
        },
        {
            id: 2,
            title: "هتل پارسیان آزادی تهران",
            images: ["/images/hotel_1.png", "/images/hotel_2.png", "/images/hotel_3.png"],
            stars: 5,
            location: "تهران، بزرگراه شهید چمران",
            rating: 4.4,
            reviews: 379,
            price: 272100000,
            oldPrice: 315600000,
            discount: 14,
            duration: "۲۸ شب",
            tags: ["ویژه یلدا"],
        },
        {
            id: 3,
            title: "هتل پارسیان آزادی تهران",
            images: ["/images/hotel_1.png", "/images/hotel_2.png", "/images/hotel_3.png"],
            stars: 5,
            location: "تهران، بزرگراه شهید چمران",
            rating: 4.4,
            reviews: 379,
            price: 272100000,
            oldPrice: 315600000,
            discount: 14,
            duration: "۲۸ شب",
            tags: ["ویژه یلدا"],
        },
        // ... بقیه هتل‌ها
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc]" dir="rtl">
            <div className="container mx-auto py-8 max-w-7xl px-4">

                <div className="p-4 px-0 rounded-xl mb-6 flex flex-col gap-4">
                    <div className="h-px bg-gray-100 w-full lg:hidden"></div>
                    <SortBar />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* سایدبار فیلترها */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-6">
                            <div className="bg-[#25446b] text-white p-4 rounded-2xl mb-4 shadow-blue-200">
                                <p className="text-xs opacity-80 mb-1">نتایج یافت شده</p>
                                <p className="text-lg font-bold">{hotels.length} هتل در دسترس</p>
                            </div>
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* لیست کارت‌ها */}
                    <main className="lg:col-span-3 flex flex-col gap-6">
                        {hotels.map((hotel) => (
                            <HotelCard
                                key={hotel.id}
                                data={hotel}
                                linkUrl={`/hotels/${hotel.id}/rooms`}
                            />
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
}