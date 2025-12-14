"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DescriptionOutlined, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Button } from "@mui/material";

// تعریف تایپ برای هر روز از برنامه سفر
type ItineraryItem = {
    day: number;
    date: string;
    description: string[]; // آرایه‌ای از توضیحات برای بولت‌‌پوینت‌ها
    image: string;
    imageAlt: string;
};

// داده‌های نمونه (بر اساس متن تصویر شما)
const itineraryData: ItineraryItem[] = [
    {
        day: 1,
        date: "چهارشنبه ۱۸ مهر",
        description: [
            "بعد از رسیدن به فرودگاه به هتل خود انتقال داده می شوید که به محض رسیدن به هتل مراحل پذیرش انجام می گیرد."
        ],
        image: "/images/img2.png", // عکس نمونه
        imageAlt: "ورود به هتل"
    },
    {
        day: 2,
        date: "پنجشنبه ۱۹ مهر",
        description: [
            "صبح بعد از صبحانه گشت و گذار در دهلی به همراه راهنمای تور فارسی زبان بازدید از محل سوزاندن پدر ملت مهاتما گاندی.",
            "بازدید از کاخ رییس جمهور، این کاخ در ابتدا به عنوان قصر نایب السلطنه بریتانیا ساخته شد. این برج در سال 1950 پس از استقبال هند به Rastrapathi Bhawan تغییر نام داد."
        ],
        image: "/images/img1.png",
        imageAlt: "گشت شهری دهلی"
    },
    {
        day: 3,
        date: "جمعه ۲۰ مهر",
        description: [
            "بعد از صبحانه با جیپ سواری از قلعه عامر دیدن می‌کنیم.",
            "بعد از کاخ شهر بازدید می‌کنیم که مجموعه ای از حیاط ها ، باغ ها ،ساختمان‌ها تقسیم شده است.",
            "مسافت ۶ ساعته را به سوی دهلی بازمی‌گردیم تا با خاطراتی خوش و فراموش نشدنی به تهران بازگردیم."
        ],
        image: "/images/img2.png",
        imageAlt: "جیپور"
    },
    {
        day: 4,
        date: "شنبه ۲۱ مهر",
        description: [
            "پس از صرف صبحانه در هتل، بازدید از تاج محل معروف، امپراتور شاه جهان این بنای یادبود معروف مغول را به یاد همسر محبوبش قلعه آگرا را ساخت.",
            "یک شب در دهلی."
        ],
        image: "/images/img3.png",
        imageAlt: "تاج محل"
    },
    // فرض کنید روزهای بیشتری هم وجود دارد...
    {
        day: 5,
        date: "یکشنبه ۲۲ مهر",
        description: ["بازگشت به تهران و اتمام تور."],
        image: "/images/img4.png",
        imageAlt: "بازگشت"
    }
];

export default function TourItinerary() {
    // استیت برای مدیریت نمایش "مشاهده بیشتر"
    const [showAll, setShowAll] = useState(false);

    // تعداد آیتم‌هایی که در حالت بسته نمایش داده می‌شوند
    const INITIAL_COUNT = 3;

    // تصمیم‌گیری برای اینکه چه دیتایی نمایش داده شود
    const displayedItems = showAll ? itineraryData : itineraryData.slice(0, INITIAL_COUNT);

    return (
        <div className="w-full py-8" dir="rtl">

            {/* هدر بخش */}
            <div className="flex items-center gap-2 mb-6 text-gray-800">
                {/* <DescriptionOutlined className="text-blue-600" /> */}
                <Image src={'/images/Tour icon.svg'} width={24} height={24} alt="icon" />
                <h2 className="text-xl font-bold">برنامه تور</h2>
            </div>

            {/* لیست کارت‌ها */}
            <div className="flex flex-col gap-6">
                {displayedItems.map((item) => (
                    <div
                        key={item.day}
                        className="bg-white rounded-8 border border-gray-200  p-4 flex flex-col md:flex-row gap-5 hover:shadow-md transition-shadow duration-300"
                    >


                        {/* بخش محتوا */}
                        <div className="flex-1 flex flex-col py-2">

                            {/* هدر کارت: روز و تاریخ */}
                            <div className="flex items-center justify-start gap-3 mb-4">
                                <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold  text-lg">
                                    {item.day}
                                </div>
                                <span className="text-gray-500 text-sm font-medium">
                                    {item.date}
                                </span>
                            </div>

                            {/* توضیحات */}
                            <div className="text-gray-600 text-sm md:text-base leading-8 text-justify">
                                <ul className="list-disc list-outside pr-4 space-y-2 marker:text-gray-300">
                                    {item.description.map((desc, idx) => (
                                        <li key={idx}>
                                            {desc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/* بخش تصویر */}
                        <div className="w-full md:w-1/3 shrink-0">
                            <div className="relative w-full h-48 md:h-full min-h-[180px] rounded-xl overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.imageAlt}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            {/* دکمه مشاهده بیشتر / کمتر */}
            {itineraryData.length > INITIAL_COUNT && (
                <div className="mt-8 flex justify-center">
                    <Button
                        variant="outlined"
                        onClick={() => setShowAll(!showAll)}
                        endIcon={showAll ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        sx={{
                            borderRadius: "50px",
                            padding: "10px 24px",
                            borderColor: "#e5e7eb",
                            color: "#4b5563",
                            "&:hover": {
                                borderColor: "#3b82f6",
                                color: "#3b82f6",
                                backgroundColor: "#eff6ff"
                            }
                        }}
                    >
                        {showAll ? "بستن برنامه سفر" : `مشاهده ${itineraryData.length - INITIAL_COUNT} روز دیگر`}
                    </Button>
                </div>
            )}

        </div>
    );
}