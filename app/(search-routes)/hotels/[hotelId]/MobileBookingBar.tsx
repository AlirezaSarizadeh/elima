"use client";

import React, { useState } from 'react';
import { Drawer, IconButton } from '@mui/material';
import { Close, CalendarMonth, KeyboardArrowUp } from '@mui/icons-material';
// فرض بر این است که همان فرم قبلی که ساختید را اینجا ایمپورت می‌کنیم
// اگر اسمش فرق دارد لطفا اصلاح کنید
import BookingForm from './HotelBookingForm';

interface Props {
    price: number;
}

export default function MobileBookingBar({ price }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setIsOpen(open);
    };

    return (
        <>
            {/* --- نوار چسبان پایین صفحه (Sticky Bar) --- */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 z-[999] lg:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.05)] transition-transform duration-300">
                <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
                    
                    {/* اطلاعات قیمت */}
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 font-bold mb-0.5">شروع قیمت از (۱ شب)</span>
                        <div className="flex items-center gap-1 text-slate-800">
                            <span className="text-xl font-black text-blue-600">{price.toLocaleString()}</span>
                            <span className="text-xs text-gray-400">تومان</span>
                        </div>
                    </div>

                    {/* دکمه باز کردن فرم */}
                    <button 
                        onClick={toggleDrawer(true)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                        <span>بررسی ظرفیت</span>
                        <KeyboardArrowUp fontSize="small" />
                    </button>
                </div>
            </div>

            {/* --- کشوی بازشو (Bottom Sheet) --- */}
            <Drawer
                anchor="bottom"
                open={isOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        borderTopLeftRadius: '24px',
                        borderTopRightRadius: '24px',
                        padding: '0',
                        maxHeight: '85vh' // جلوگیری از اشغال کل صفحه
                    }
                }}
            >
                <div className="relative bg-gray-50 p-6 pb-8" dir="rtl">
                    
                    {/* دستگیره کوچک برای زیبایی (Handle) */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full mb-4"></div>

                    {/* هدر کشو */}
                    <div className="flex justify-between items-center mb-6 mt-2">
                        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                            <CalendarMonth className="text-blue-600" />
                            تاریخ سفر را انتخاب کنید
                        </h3>
                        <IconButton onClick={toggleDrawer(false)} size="small" className="bg-gray-200">
                            <Close fontSize="small" />
                        </IconButton>
                    </div>

                    {/* فرم اصلی (بدون بوردر و سایه اضافه چون داخل دراور است) */}
                    <div className="booking-form-wrapper">
                         {/* نکته: در اینجا کامپوننت فرم قبلی را فراخوانی می‌کنیم.
                            بهتر است در کامپوننت HotelBookingSideForm پراپی اضافه کنید که 
                            اگر داخل موبایل بود، سایه و بوردر را حذف کند.
                         */}
                        <BookingForm /> 
                    </div>

                </div>
            </Drawer>
        </>
    );
}