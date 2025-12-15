"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "./global.css"
import Link from "next/link";
import Title from "../../ui/Title/Title";
import HotelCard from "./HotelCard";
const fakeData = {
    "لوکس‌ترین": [
        {
            title: "هتل ایروان",
            image: "/images/hotel_1.png",
            rating: 4.5,
            location: "زمستان",
            remaining: 8,
            nights: 7,
            days: 8,
            price: 39400000
        },
        {
            title: "هتل پاریس",
            image: "/images/hotel_2.png",
            rating: 4.8,
            location: "فرانسه",
            remaining: 5,
            nights: 5,
            days: 6,
            price: 59990000
        },
        {
            title: "هتل تاجیکستان",
            image: "/images/hotel_3.png",
            rating: 4.3,
            location: "تاجیکستان",
            remaining: 4,
            nights: 6,
            days: 7,
            price: 39400000
        },
        {
            title: "هتل ایروان",
            image: "/images/hotel_1.png",
            rating: 4.5,
            location: "زمستان",
            remaining: 8,
            nights: 7,
            days: 8,
            price: 39400000
        },
        {
            title: "هتل پاریس",
            image: "/images/hotel_2.png",
            rating: 4.8,
            location: "فرانسه",
            remaining: 5,
            nights: 5,
            days: 6,
            price: 59990000
        },
        {
            title: "هتل تاجیکستان",
            image: "/images/hotel_3.png",
            rating: 4.3,
            location: "تاجیکستان",
            remaining: 4,
            nights: 6,
            days: 7,
            price: 39400000
        },
        {
            title: "هتل پاریس",
            image: "/images/hotel_2.png",
            rating: 4.7,
            location: "فرانسه",
            remaining: 3,
            nights: 4,
            days: 5,
            price: 53900000
        },
        {
            title: "هتل ایروان",
            image: "/images/hotel_1.png",
            rating: 4.6,
            location: "زمستان",
            remaining: 6,
            nights: 7,
            days: 8,
            price: 41000000
        },
        {
            title: "هتل تاجیکستان",
            image: "/images/hotel_3.png",
            rating: 4.2,
            location: "تاجیکستان",
            remaining: 9,
            nights: 6,
            days: 7,
            price: 38000000
        }
    ]
};



const PopularHotelsSection = () => {

    const items = fakeData['لوکس‌ترین'];

    return (
        <section className=" mt-10 pt-5 pb-10">


            <div className="flex items-center justify-between mb-1 max-w-7xl px-4 mx-auto">
                <Title title="محبوب ترین هتل ها" icon={<img src='/images/textalign-right.png' />} />

                {/* مشاهده همه */}
                <Link href="#" className="text-sm ms-auto me-4 text-blue-500">
                    مشاهده همه
                </Link>
                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                    <button className="hotel-prev-btn w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 bg-white border border-gray-200 cursor-pointer">
                        <img src="/images/arrow-right.png" className="w-5" />
                    </button>

                    <button className="hotel-next-btn w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 bg-white border border-gray-200 cursor-pointer">
                        <img src="/images/arrow-left.png" className="w-5" />
                    </button>
                </div>
            </div>

            {/* Swiper Grid */}
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: ".hotel-prev-btn",
                    nextEl: ".hotel-next-btn",
                }}
                slidesPerView={3}     // ← 3 کارت در یک row
                spaceBetween={20}
                className="w-full max-w-7xl px-4 mx-auto pop_hotel-swiper"
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <HotelCard {...item} />
                    </SwiperSlide>
                ))}
            </Swiper>


        </section>
    );
};

export default PopularHotelsSection;
