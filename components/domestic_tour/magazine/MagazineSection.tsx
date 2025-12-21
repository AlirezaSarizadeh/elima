"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Grid is not used, so I removed it for cleanliness

import "swiper/css";
import "swiper/css/navigation";
// import "./global.css" // Make sure this file exists and contains necessary styles

import Link from "next/link";
import Title from "../../ui/Title/Title";
import MagazineCard from "./MagazineCard"; // Make sure this path is correct

// --- EDITED FAKE DATA ---
// The key is changed to "مقالات محبوب" (Popular Articles)
// The object structure now matches the props for MagazineCard (title, image, description)
const fakeData = {
    "مقالات محبوب": [
        {
            title: "ویژگی‌های منحصر به فرد جزیره موستچلlo",
            image: '/images/hotel_1.png',
            description: "کشف جزیره‌ای رنگارنگ با آب‌های زلال و معماری منحصر به فرد. با قایق‌های کوچک در کانال‌های زیبا قدم بزنید و از طبیعت بکر لذت ببرید.",
            buttonText: "بیشتر بخوانید"
        },
        {
            title: "ویژگی‌های منحصر به فرد جزیره موستچلlo",
            image: '/images/hotel_2.png',
            description: "کشف جزیره‌ای رنگارنگ با آب‌های زلال و معماری منحصر به فرد. با قایق‌های کوچک در کانال‌های زیبا قدم بزنید و از طبیعت بکر لذت ببرید.",
            buttonText: "بیشتر بخوانید"
        },
        {
            title: "ویژگی‌های منحصر به فرد جزیره موستچلlo",
            image: '/images/hotel_3.png',
            description: "کشف جزیره‌ای رنگارنگ با آب‌های زلال و معماری منحصر به فرد. با قایق‌های کوچک در کانال‌های زیبا قدم بزنید و از طبیعت بکر لذت ببرید.",
            buttonText: "بیشتر بخوانید"
        },
        {
            title: "ویژگی‌های منحصر به فرد جزیره موستچلlo",
            image: '/images/hotel_1.png',
            description: "کشف جزیره‌ای رنگارنگ با آب‌های زلال و معماری منحصر به فرد. با قایق‌های کوچک در کانال‌های زیبا قدم بزنید و از طبیعت بکر لذت ببرید.",
            buttonText: "بیشتر بخوانید"
        },

    ]
};



const MagazineSection = () => {

    // --- EDITED: Using the new key to fetch the magazine articles ---
    const items = fakeData['مقالات محبوب'];

    return (
        // Added dir="rtl" to the section for proper Right-to-Left text flow
        <section className="md:mt-10 pt-5 pb-10 px-4" dir="rtl">

            <div className="flex flex-wrap items-center justify-between gap-y-4 mb-2 max-w-7xl px-4 mx-auto">

                {/* بخش تایتل */}
                <Title title="مجله گردشگری" icon={<img src='/images/textalign-right.png' alt="Icon" />} />

                {/* بخش کنترل‌ها (لینک + دکمه‌ها) - گروه‌بندی شده */}
                <div className="flex items-center gap-4 ms-auto">

                    {/* مشاهده همه */}
                    <Link href="/magazine" className="text-sm text-blue-500 whitespace-nowrap">
                        مشاهده همه
                    </Link>

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-2">
                        <button className="magazine-prev-btn w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                            <img src="/images/arrow-right.png" className="w-5" alt="Previous" />
                        </button>

                        <button className="magazine-next-btn w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                            <img src="/images/arrow-left.png" className="w-5" alt="Next" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Swiper Grid */}
            <Swiper
                modules={[Navigation]}
                navigation={{
                    // --- EDITED: Using the new class names for navigation buttons ---
                    prevEl: ".magazine-prev-btn",
                    nextEl: ".magazine-next-btn",
                }}
                slidesPerView={3}
                spaceBetween={20}
                // --- EDITED: Added a unique class name to the Swiper instance ---
                className="w-full max-w-7xl px-4 mx-auto magazine-swiper"
                // --- EDITED: Added breakpoints for responsive design ---
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        {/* The spread operator {...item} will now correctly pass title, image, description, and buttonText to the MagazineCard */}
                        <MagazineCard {...item} />
                    </SwiperSlide>
                ))}
            </Swiper>


        </section>
    );
};

export default MagazineSection;