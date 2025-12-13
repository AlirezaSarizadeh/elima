"use client";

import React from "react";
import Image from "next/image";
import {
    VerifiedUserOutlined,
    FavoriteBorder,
    AccessTime,
    CalendarMonthOutlined,
    Stars
} from "@mui/icons-material";

// داده‌های نمونه (طبق تصویر)
const popularToursData = [
    {
        id: 1,
        title: "تور فرانسه – بلژیک–هلند",
        image: "/images/img2.png",
        duration: "۷ شب و ۸ روز",
        date: "مهر و آبان ۱۴۰۳",
        oldPrice: 54000000,
        price: 50000000,
        remaining: 8,
    },
    {
        id: 2,
        title: "تور فرانسه – بلژیک–هلند",
        image: "/images/img1.png",
        duration: "۷ شب و ۸ روز",
        date: "مهر و آبان ۱۴۰۳",
        oldPrice: 56000000,
        price: 50000000,
        remaining: 8,
    },
];

export default function PopularTours() {
    return (
        <div className="w-full border-1 border-blue-500 rounded-8 p-5 bg-white">

            {/* Header */}
            <div className="flex justify-start items-center gap-2 mb-6 text-gray-800">
                <Image src={'/images/like icon.svg'} width={24} height={24} alt="icon" />
                <h3 className="font-bold text-lg">تور های پر طرفدار</h3>
                {/* <VerifiedUserOutlined className="text-blue-600" /> */}
            </div>

            {/* Cards List */}
            <div className="flex flex-col gap-6">
                {popularToursData.map((tour) => (
                    <div key={tour.id} className="bg-white rounded-8 border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">

                        {/* Image Section */}
                        <div className="relative h-48 w-full">
                            <Image
                                src={tour.image}
                                alt={tour.title}
                                fill
                                className="object-cover rounded-8"
                            />
                            {/* Like Button */}
                            {/* <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-1.5 rounded-full text-blue-500 transition-colors">
                <FavoriteBorder fontSize="small" />
              </button> */}

                            {/* Badge: Remaining */}
                            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-8 flex items-center gap-1 text-xs font-bold text-blue-600 shadow-sm">
                                <Stars fontSize="inherit" />
                                <span>{tour.remaining} نفر باقیمانده</span>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4">
                            <h4 className="font-bold text-gray-900 text-start mb-4">{tour.title}</h4>

                            {/* Details */}
                            <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                                <div className="flex justify-start gap-2 items-center">
                                    <AccessTime fontSize="small" className="text-gray-400" />
                                    <span>{tour.duration}</span>
                                </div>
                                <div className="flex justify-start gap-2 items-center">
                                    <CalendarMonthOutlined fontSize="small" className="text-gray-400" />
                                    <span>{tour.date}</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-3"></div>

                            {/* Price */}
                            <div className="flex flex-col items-center gap-1">
                                {/* قیمت قدیمی */}
                                <span className="text-gray-400 text-[10px]">شروع قیمت از</span>
                                <span className="text-gray-400 text-xs line-through decoration-red-400">
                                    {tour.oldPrice.toLocaleString()}
                                </span>
                                {/* قیمت جدید */}
                                <div className="flex items-center gap-1">
                                    <span className="text-blue-600 font-bold text-lg">
                                        {tour.price.toLocaleString()}
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                        <Image src={'/images/price.svg'} width={18} height={18} alt="تومان" />
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}