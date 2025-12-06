"use client";

import { useState } from "react";
import TourCard from "./TourCard";
import Tabs from "./Tabs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "./global.css"
import Link from "next/link";
import Title from "../../ui/Title/Title";
const fakeData = {
    "لوکس‌ترین": [
        { title: "تور ترکیه", price: 18900000, image: "/images/place_1.jpg" },
        { title: "تور فرانسه", price: 59990000, image: "/images/place_2.png" },
        { title: "تور تاجیکستان", price: 39400000, image: "/images/place_3.png" },
        { title: "تور ترکیه", price: 18900000, image: "/images/place_1.jpg" },
        { title: "تور فرانسه", price: 59990000, image: "/images/place_2.png" },
        { title: "تور تاجیکستان", price: 39400000, image: "/images/place_3.png" },
        { title: "تور ترکیه", price: 18900000, image: "/images/place_1.jpg" },
        { title: "تور فرانسه", price: 59990000, image: "/images/place_2.png" },
        { title: "تور تاجیکستان", price: 39400000, image: "/images/place_3.png" },


    ],
    "تورهای زمینی": [
        { title: "تور تاجیکستان", price: 39400000, image: "/images/place_3.png" },
        { title: "تور ترکیه", price: 18900000, image: "/images/place_1.jpg" },
        { title: "تور فرانسه", price: 59990000, image: "/images/place_2.png" },
        { title: "تور تاجیکستان", price: 39400000, image: "/images/place_3.png" },
        { title: "تور ترکیه", price: 18900000, image: "/images/place_1.jpg" },
        { title: "تور فرانسه", price: 59990000, image: "/images/place_2.png" },
        { title: "تور تاجیکستان", price: 39400000, image: "/images/place_3.png" },
    ],
    "تورهای خارجی": [],
    "تورهای داخلی": [],
};

const tabsList = ["لوکس‌ترین", "تورهای زمینی", "تورهای خارجی", "تورهای داخلی"];

const ToursSection = () => {
    const [activeTab, setActiveTab] = useState("لوکس‌ترین");

    const items = fakeData[activeTab] ?? [];

    return (
        <section className=" mt-10 bg-gray-50 pt-5 pb-10">

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <Title title="دسته بندی تور ها" icon={<img src='/images/textalign-right.png' />} />

            </div>

            <div className="flex items-center justify-between mb-1 max-w-7xl mx-auto">
                {/* تب‌ها */}
                <Tabs tabs={tabsList} active={activeTab} onChange={setActiveTab} />

                {/* مشاهده همه */}
                <Link href="#" className="text-sm ms-auto me-4 text-blue-500">
                    مشاهده همه
                </Link>
                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                    <button className="tour-prev-btn w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 bg-white border border-gray-200 cursor-pointer">
                        <img src="/images/arrow-right.png" className="w-5" />
                    </button>

                    <button className="tour-next-btn w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 bg-white border border-gray-200 cursor-pointer">
                        <img src="/images/arrow-left.png" className="w-5" />
                    </button>
                </div>
            </div>

            {/* Swiper Grid */}
            <Swiper
                modules={[Navigation, Grid]}
                navigation={{
                    prevEl: ".tour-prev-btn",
                    nextEl: ".tour-next-btn",
                }}
                grid={{ rows: 2 }}
                spaceBetween={20}
                slidesPerView={3}
                className="w-full flex-row items-center toursSection_swiper max-w-7xl mx-auto"
            >
                {items.map((item, index) => (
                    <SwiperSlide className="mt-5" key={index}>
                        <TourCard
                            title={item.title}
                            price={item.price}
                            image={item.image}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    );
};

export default ToursSection;
