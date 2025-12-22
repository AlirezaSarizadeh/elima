"use client";

import React, { useState } from 'react';
import { 
    KeyboardArrowLeft, 
    Train, 
    DirectionsCar, 
    LocationOn 
} from '@mui/icons-material';

// داده‌های نمونه فاصله
const accessData = {
    terminals: [
        { name: "ایستگاه مترو", distance: "۵.۸ کیلومتر" },
        { name: "فرودگاه مهرآباد", distance: "۱۵.۷ کیلومتر" },
    ],
    nearbyPlaces: [
        { name: "افق کوروش", distance: "۱ کیلومتر" },
        { name: "فست فود پارمین", distance: "۱۰۰ متر" },
    ]
};

export default function AccessAndDistances() {
    // تب فعال (با خودرو / پیاده - اگر در آینده اضافه شود)
    const [activeTab, setActiveTab] = useState<'car' | 'walk'>('car');

    return (
        <section className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8" id="access-section">
            
            {/* هدر بخش */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                
                {/* عنوان و تب‌ها */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <h2 className="text-xl font-black text-slate-800">
                        فاصله‌ها و دسترسی‌ها
                    </h2>
                    
                    {/* تب سوییچ ساده (فعلاً فقط با خودرو) */}
                    <div className="flex gap-4 mr-4 text-sm font-bold text-gray-400">
                        <span className={`cursor-pointer transition-colors ${activeTab === 'car' ? 'text-slate-800 border-b-2 border-slate-800 pb-1' : 'hover:text-slate-600'}`}>
                            با خودرو
                        </span>
                        {/* <span className="hover:text-slate-600 cursor-pointer">پیاده</span> */}
                    </div>
                </div>

                {/* دکمه مشاهده همه */}
                <div className="flex items-center gap-1 text-blue-600 text-xs md:text-sm font-bold cursor-pointer hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                    <span>مشاهده همه فاصله‌ها</span>
                    <KeyboardArrowLeft fontSize="small" />
                </div>
            </div>

            {/* محتوای گرید */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                
                {/* ستون چپ: فاصله تا پایانه‌ها */}
                <div>
                    <h3 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <Train sx={{ fontSize: 20 }} className="text-slate-700" />
                        فاصله تا پایانه‌ها
                    </h3>
                    <ul className="space-y-4">
                        {accessData.terminals.map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-sm border-b border-dashed border-gray-100 pb-3 last:border-0">
                                <span className="text-gray-500 font-medium">{item.name}</span>
                                <span className="text-slate-800 font-bold dir-ltr">{item.distance}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ستون راست: مکان‌های نزدیک */}
                <div>
                    <h3 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
                        <LocationOn sx={{ fontSize: 20 }} className="text-slate-700" />
                        مکان‌های نزدیک
                    </h3>
                    <ul className="space-y-4">
                        {accessData.nearbyPlaces.map((item, index) => (
                            <li key={index} className="flex justify-between items-center text-sm border-b border-dashed border-gray-100 pb-3 last:border-0">
                                <span className="text-gray-500 font-medium">{item.name}</span>
                                <span className="text-slate-800 font-bold dir-ltr">{item.distance}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
}