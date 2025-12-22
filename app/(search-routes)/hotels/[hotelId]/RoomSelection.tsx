"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
    PersonOutline, 
    RestaurantMenu, 
    Check, 
    KeyboardArrowLeft,
    FilterList,
    Close
} from '@mui/icons-material';

// داده‌های نمونه اتاق‌ها
const roomsData = [
    {
        id: 1,
        title: "اتاق دو تخته برای یک نفر نرمال",
        capacity: "۱ بزرگسال، ۰ خردسال",
        tags: ["صبحانه (بوفه)", "اینترنت رایگان"],
        oldPrice: 10500000,
        price: 9000000,
        discount: 17,
        image: "/images/room_!.webp", 
        type: "single"
    },
    {
        id: 2,
        title: "اتاق دو تخته برای یک نفر دیلاکس",
        capacity: "۱ بزرگسال، ۰ خردسال",
        tags: ["صبحانه (بوفه)", "چشم انداز شهر"],
        oldPrice: 12600000,
        price: 10300000,
        discount: 19,
        image: "/images/room_2.webp",
        type: "deluxe"
    },
    {
        id: 3,
        title: "اتاق دو تخته دبل نرمال",
        capacity: "۲ بزرگسال، ۱ خردسال",
        extraPerson: true,
        tags: ["صبحانه (بوفه)"],
        oldPrice: 11000000,
        price: 10260000,
        discount: 5,
        image: "/images/room_!.webp",
        type: "double"
    },
];

const filters = [
    { label: "صبحانه", value: "breakfast" },
    { label: "سوئیت", value: "suite" },
    { label: "دبل", value: "double" },
    { label: "توئین", value: "twin" },
    { label: "دو تخته", value: "2bed" },
    { label: "یک نفر", value: "single" },
    { label: "دو نفر", value: "2person" },
    { label: "نفر اضافه", value: "extra" },
];

export default function RoomSelection() {
    // تغییر استیت به آرایه برای پشتیبانی از چند انتخابی
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    // تابع مدیریت کلیک روی فیلترها (Toggle Logic)
    const handleFilterClick = (value: string) => {
        if (activeFilters.includes(value)) {
            // اگر قبلا انتخاب شده، حذفش کن
            setActiveFilters(prev => prev.filter(item => item !== value));
        } else {
            // اگر انتخاب نشده، اضافه‌اش کن
            setActiveFilters(prev => [...prev, value]);
        }
    };

    return (
        <section className="bg-white rounded-3xl border border-gray-200 p-5 md:p-8 mt-5" id="room-selection">
            
            {/* هدر بخش انتخاب اتاق */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
                <h2 className="text-lg md:text-xl font-black text-slate-800 border-r-4 border-blue-600 pr-3 rounded-sm">
                    انتخاب اتاق
                </h2>
                <div className="flex items-center gap-1 text-blue-600 text-xs md:text-sm font-bold cursor-pointer hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                    <span>مشاهده همه اتاق‌ها</span>
                    <KeyboardArrowLeft fontSize="small" />
                </div>
            </div>

            {/* --- بخش فیلترها (Multi-Select) --- */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-3 text-slate-500">
                    <FilterList fontSize="small" />
                    <span className="text-xs font-bold">فیلترهای اتاق:</span>
                    {activeFilters.length > 0 && (
                        <button 
                            onClick={() => setActiveFilters([])}
                            className="text-[10px] text-red-500 bg-red-50 px-2 py-0.5 rounded-md mr-auto flex items-center gap-1 hover:bg-red-100 transition-colors"
                        >
                            <Close sx={{ fontSize: 12 }} /> حذف فیلترها
                        </button>
                    )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => {
                        const isActive = activeFilters.includes(filter.value);
                        return (
                            <button
                                key={filter.value}
                                onClick={() => handleFilterClick(filter.value)}
                                className={`
                                    px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs font-bold transition-all border select-none
                                    ${isActive 
                                        ? 'bg-blue-600 text-white border-blue-600  shadow-blue-200 ring-2 ring-blue-100' 
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }
                                `}
                            >
                                {isActive && <Check sx={{ fontSize: 14 }} className="ml-1" />}
                                {filter.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* --- لیست اتاق‌ها --- */}
            <div className="flex flex-col gap-6">
                {roomsData.map((room) => (
                    <div key={room.id} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col md:flex-row">
                        
                        {/* 1. تصویر اتاق (ریسپانسیو: موبایل بالا، دسکتاپ راست) */}
                        <div className="w-full md:w-64 h-48 md:h-auto relative shrink-0">
                            <Image 
                                src={room.image} 
                                alt={room.title} 
                                fill 
                                className="object-cover hover:scale-105 transition-transform duration-700" 
                            />
                            {/* بج روی عکس در موبایل */}
                            {room.discount > 0 && (
                                <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm md:hidden">
                                    {room.discount}٪ تخفیف
                                </div>
                            )}
                        </div>

                        {/* 2. محتوا و اطلاعات */}
                        <div className="flex-1 p-5 flex flex-col justify-between">
                            
                            {/* بالا: عنوان و ویژگی‌ها */}
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-slate-800 text-base md:text-lg leading-7">
                                        {room.title}
                                    </h3>
                                    {/* بج دسکتاپ */}
                                    {room.discount > 0 && (
                                        <div className="hidden md:block bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-lg border border-red-100">
                                            {room.discount}٪ تخفیف ویژه
                                        </div>
                                    )}
                                </div>

                                {/* ظرفیت */}
                                <div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm mb-3">
                                    <PersonOutline fontSize="small" />
                                    <span>{room.capacity}</span>
                                    {room.extraPerson && (
                                        <span className="text-[10px] bg-gray-100 text-slate-600 px-2 py-0.5 rounded mr-2">
                                            + نفر اضافه
                                        </span>
                                    )}
                                </div>

                                {/* تگ‌ها (امکانات) */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {room.tags.map((tag, idx) => (
                                        <span key={idx} className="bg-slate-50 text-slate-600 text-[10px] md:text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 border border-slate-100">
                                            {tag.includes("صبحانه") && <RestaurantMenu sx={{ fontSize: 12 }} className="text-orange-400" />}
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* پایین: قیمت و دکمه (خط جداکننده در موبایل) */}
                            <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-4 pt-4 md:pt-0 mt-2 md:mt-0 border-t md:border-t-0 border-dashed border-gray-100">
                                
                                <div className="text-left md:text-right w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end">
                                    {/* قیمت قدیمی (موبایل و دسکتاپ) */}
                                    <div className="flex flex-col items-end">
                                        {room.discount > 0 && (
                                            <span className="text-gray-400 text-xs line-through decoration-gray-300 mb-0.5">
                                                {room.oldPrice.toLocaleString()}
                                            </span>
                                        )}
                                        <div className="flex items-center gap-1 text-slate-800">
                                            <span className="text-xl md:text-2xl font-black text-blue-600">
                                                {room.price.toLocaleString()}
                                            </span>
                                            <span className="text-xs text-gray-500 font-medium">تومان / شب</span>
                                        </div>
                                    </div>
                                    
                                    {/* این بخش فقط در موبایل برای پر کردن فضا */}
                                    <div className="md:hidden text-[10px] text-gray-400">
                                        قیمت قطعی
                                    </div>
                                </div>

                                <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-2.5 px-8 rounded-xl transition-all  shadow-blue-100 active:scale-95 flex items-center justify-center gap-2">
                                    انتخاب اتاق
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}