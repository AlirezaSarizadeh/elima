"use client";

import React from "react";
import { Button } from "@mui/material";
import { Check, Close, CalendarMonth, LocationOn } from "@mui/icons-material";
import Image from "next/image";

export default function StepPaymentResult({ status, onRetry }: { status: 'success' | 'failure', onRetry: () => void }) {
  
  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-6 w-full max-w-3xl mx-auto">
        
        {/* 1. آیکون موفقیت با افکت درخشش */}
        <div className="relative flex items-center justify-center mb-2">
            {/* لایه بیرونی محو */}
            <div className="absolute w-28 h-28 bg-green-100 rounded-full animate-pulse"></div>
            {/* لایه میانی */}
            <div className="absolute w-20 h-20 bg-green-200 rounded-full"></div>
            {/* آیکون اصلی */}
            <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-200">
                <Check fontSize="large" sx={{ fontSize: 32, fontWeight: 'bold' }} />
            </div>
        </div>

        {/* متن‌ها */}
        <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-green-500">پرداخت موفقیت آمیز بود</h2>
            <p className="text-gray-500 text-sm">از خرید شما سپاسگزاریم</p>
        </div>

        {/* 2. کارت خلاصه بلیط (دقیق طبق عکس) */}
        <div className="bg-white rounded-3xl border border-gray-200 p-4 w-full flex flex-col md:flex-row gap-5 items-start">
            
            {/* تصویر تور */}
            <div className="relative w-full md:w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                <Image src="/images/img1.png" alt="Tour" fill className="object-cover" />
            </div>

            {/* محتوای متنی */}
            <div className="flex-1 w-full flex flex-col justify-between h-full gap-4">
                
                {/* سطر اول: عنوان و کد رهگیری */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-gray-800 text-lg">تور مثلث طلایی هند</h3>
                        <span className="text-sm text-gray-500">مدت سفر: ۴ روز و ۳ شب</span>
                    </div>
                    {/* کد رهگیری */}
                    <div className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-normal">
                        کد رهگیری: ۸۷۴۵۱۲۳
                    </div>
                </div>

                {/* خط جداکننده */}
                <div className="border-t border-gray-50"></div>

                {/* سطر دوم: تاریخ و محل */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                        <CalendarMonth fontSize="small" className="text-gray-400" />
                        <span>تاریخ حرکت : چهارشنبه تا شنبه چهارم مهر هزار چهارصد و سه</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm">
                        <LocationOn fontSize="small" className="text-gray-400" />
                        <span>محل حرکت : فرودگاه بین المللی امام خمینی</span>
                    </div>
                </div>

            </div>
        </div>

        {/* 3. دکمه‌ها */}
        <div className="flex gap-4 w-full mt-4">
             {/* دکمه آبی (دانلود) */}
             <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                    bgcolor: '#0066ff', 
                    borderRadius: '12px', 
                    height: 48, 
                    fontWeight: 'bold',
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#0052cc', boxShadow: 'none' }
                }}
            >
                دانلود بلیط
             </Button>

             {/* دکمه سفید (بازگشت) */}
             <Button 
                variant="outlined" 
                fullWidth 
                sx={{ 
                    borderRadius: '12px', 
                    height: 48, 
                    borderColor: '#0066ff', 
                    color: '#0066ff', 
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#f0f7ff', borderColor: '#0066ff' }
                }}
                onClick={() => window.location.href = '/'}
            >
                بازگشت به صفحه اصلی
             </Button>
        </div>
      </div>
    );
  }

  // حالت ناموفق (بدون تغییر عمده، فقط استایل دکمه‌ها هماهنگ شد)
  return (
      <div className="flex flex-col items-center justify-center py-10 gap-6 w-full max-w-lg mx-auto">
        <div className="relative flex items-center justify-center mb-2">
            <div className="absolute w-28 h-28 bg-red-50 rounded-full animate-pulse"></div>
            <div className="absolute w-20 h-20 bg-red-100 rounded-full"></div>
            <div className="relative w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-200">
                <Close fontSize="large" sx={{ fontSize: 32, fontWeight: 'bold' }} />
            </div>
        </div>

        <div className="text-center space-y-2">
             <h2 className="text-2xl font-bold text-red-500">پرداخت شما ناموفق بود</h2>
             <p className="text-gray-500 text-sm max-w-xs mx-auto leading-6">
                در صورتیکه پول از شما کسر شده مبلغ حداکثر تا ۷۲ ساعت آینده به حساب شما باز میگردد
             </p>
        </div>

        <div className="flex gap-4 w-full mt-4">
             <Button 
                variant="contained" 
                fullWidth 
                onClick={onRetry}
                sx={{ bgcolor: '#0066ff', borderRadius: '12px', height: 48, fontWeight: 'bold' }}
            >
                پرداخت مجدد
             </Button>
             <Button 
                variant="outlined" 
                fullWidth 
                sx={{ borderRadius: '12px', height: 48, borderColor: '#0066ff', color: '#0066ff' }}
                onClick={() => window.location.href = '/'}
            >
                بازگشت به صفحه اصلی
             </Button>
        </div>
      </div>
  );
}