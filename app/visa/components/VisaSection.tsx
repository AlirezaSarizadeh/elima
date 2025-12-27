"use client";

import { useState, useMemo } from "react";
import VisaCard from "./VisaCard";
import Tabs from "../../../components/domestic_tour/tour_category/Tabs";
import { Search } from "@mui/icons-material"; // آیکون سرچ

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "./global.css"
import Link from "next/link";
import Title from "../../../components/ui/Title/Title";

const fakeData = {
    "مسافرتی": [
        { title: "ویزا ترکیه", price: 18900000, image: "/images/place_1.jpg" },
        { title: "ویزا فرانسه", price: 59990000, image: "/images/place_2.png" },
        { title: "ویزا تاجیکستان", price: 39400000, image: "/images/place_3.png" },
        { title: "ویزا ترکیه", price: 18900000, image: "/images/place_1.jpg" },
        { title: "ویزا فرانسه", price: 59990000, image: "/images/place_2.png" },
        { title: "ویزا تاجیکستان", price: 39400000, image: "/images/place_3.png" },
    ],
    "تجاری": [
        { title: "ویزا تجاری چین", price: 39400000, image: "/images/place_3.png" },
        { title: "ویزا تجاری دبی", price: 18900000, image: "/images/place_1.jpg" },
        { title: "ویزا تجاری آلمان", price: 59990000, image: "/images/place_2.png" },
    ],
    "ویزاهای خارجی": [],
    "ویزاهای داخلی": [],
};

// 1. اضافه کردن تب "همه ویزاها" به ابتدای لیست
const tabsList = ["همه ویزاها", "مسافرتی", "تجاری", "ویزاهای خارجی", "ویزاهای داخلی"];

const ToursSection = () => {
    const [activeTab, setActiveTab] = useState("همه ویزاها");
    const [searchQuery, setSearchQuery] = useState("");

    // 2. تجمیع همه داده‌ها در یک آرایه مسطح (Flat) برای جستجو و تب "همه"
    // useMemo باعث می‌شود در هر رندر دوباره محاسبه نشود مگر اینکه fakeData تغییر کند
    const allVisas = useMemo(() => {
        return Object.values(fakeData).flat();
    }, []);

    // 3. محاسبه آیتم‌هایی که باید نمایش داده شوند
    const getDisplayItems = () => {
        let currentItems = [];

        // الف) انتخاب منبع داده بر اساس تب
        if (activeTab === "همه ویزاها") {
            currentItems = allVisas;
        } else {
            // @ts-ignore
            currentItems = fakeData[activeTab] ?? [];
        }

        // ب) اعمال فیلتر جستجو (اگر متنی نوشته شده باشد)
        if (searchQuery.trim().length > 0) {
            return currentItems.filter(item => 
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return currentItems;
    };

    const displayItems = getDisplayItems();

    // هندلر تغییر اینپوت
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        // وقتی کاربر شروع به سرچ می‌کند، منطقی است که در بین "همه" بگردیم
        // پس تب را به "همه ویزاها" تغییر می‌دهیم
        if (value.length > 0 && activeTab !== "همه ویزاها") {
            setActiveTab("همه ویزاها");
        }
    };

    return (
        <section className="mt-0 bg-gray-50 pt-5 pb-10">

            <div className="max-w-7xl px-4 mx-auto px-0">
                {/* Header */}
                <Title title="دسته بندی ویزا ها" icon={<img src='/images/textalign-right.png' alt="icon" />} />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mb-4 max-w-7xl px-4 mx-auto px-0 gap-4 mt-4">
                
                {/* تب‌ها */}
                <div className="overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    <Tabs tabs={tabsList} active={activeTab} onChange={setActiveTab} />
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    
                    {/* 4. اینپوت لایو سرچ جایگزین دکمه مشاهده همه شد */}
                    <div className="relative group w-full md:w-64">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                            <Search fontSize="small" />
                        </div>
                        <input 
                            type="text" 
                            placeholder="جستجوی ویزا..." 
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full bg-white text-gray-700 border border-gray-300 rounded-xl py-2.5 pr-10 pl-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all "
                        />
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button className="tour-next-btn w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                            <img src="/images/arrow-right.png" className="w-5" alt="next" />
                        </button>

                        <button className="tour-prev-btn w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 bg-white border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                            <img src="/images/arrow-left.png" className="w-5" alt="prev" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Swiper Grid */}
            <div className="max-w-7xl px-4 mx-auto px-0">
                {displayItems.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Grid]}
                        navigation={{
                            prevEl: ".tour-prev-btn", // اصلاح جهت دکمه‌ها برای RTL (معمولا راست برای قبلی است)
                            nextEl: ".tour-next-btn",
                        }}
                        grid={{ rows: 2, fill: 'row' }}
                        spaceBetween={20}
                        breakpoints={{
                            320: { slidesPerView: 1, grid: { rows: 2 } },
                            640: { slidesPerView: 2, grid: { rows: 2 } },
                            1024: { slidesPerView: 3, grid: { rows: 2 } },
                        }}
                        className="w-full flex-row items-center toursSection_swiper pb-10"
                    >
                        {displayItems.map((item, index) => (
                            <SwiperSlide className="mt-5 h-auto" key={index}>
                                <VisaCard
                                    title={item.title}
                                    price={item.price}
                                    image={item.image}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    // پیام در صورت پیدا نشدن نتیجه
                    <div className="text-center py-10 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
                        موردی یافت نشد.
                    </div>
                )}
            </div>

        </section>
    );
};

export default ToursSection;