"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { KeyboardArrowLeft } from "@mui/icons-material";

// داده‌های نمونه (Mock Data)
const trips = [
  {
    id: 1,
    title: "تور گیلان",
    price: 35000000,
    image: "/images/img2.png", // عکس نمونه
    status: "paid", // پرداخت موفق
  },
  {
    id: 2,
    title: "تور گیلان",
    price: 35000000,
    image: "/images/img2.png", // عکس نمونه
    status: "paid",
  },
  {
    id: 3,
    title: "تور گیلان",
    price: 35000000,
    image: "/images/img2.png", // عکس نمونه
    status: "paid",
  },
  {
    id: 4,
    title: "تور گیلان",
    price: 35000000,
    image: "/images/img2.png", // عکس نمونه
    status: "paid",
  },
];

export default function MyTripsPage() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-8 text-right">تورهای رزرو شده</h2>

      <div className="flex flex-col gap-4">
        {trips.map((trip) => (
          <div 
            key={trip.id} 
            className="border-b border-gray-200 last:border-0 pb-4 last:pb-0 md:border md:border-gray-200 md:rounded-2xl md:p-4 md:pb-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-all hover:bg-gray-50"
          >
            
            {/* سمت راست: عکس و عنوان */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-end md:justify-start order-1 md:order-2">
               <div className="text-right">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{trip.title}</h3>
                  {/* در موبایل قیمت اینجا نمایش داده نشود بهتر است یا استایل متفاوت */}
               </div>
               <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image src={trip.image} alt={trip.title} fill className="object-cover" />
               </div>
            </div>

            {/* وسط: قیمت و وضعیت */}
            <div className="flex items-center gap-6 w-full md:w-auto justify-between order-2 md:order-1 flex-row-reverse md:flex-row">
               
               <div className="flex flex-col items-end gap-1">
                 <span className="text-gray-400 text-xs">مبلغ پرداختی</span>
                 <div className="flex items-center gap-1">
                    <span className="text-blue-600 font-bold text-lg">{trip.price.toLocaleString()}</span>
                    <span className="text-gray-400 text-xs">تومان</span>
                 </div>
               </div>

               <span className="border border-green-500 text-green-500 bg-green-50 px-3 py-1 rounded-full text-xs font-medium">
                  پرداخت موفق
               </span>

            </div>

            {/* سمت چپ: دکمه جزئیات */}
            <div className="w-full md:w-auto order-3 md:order-1">
               <Link 
                 href={`/dashboard/my-trips/${trip.id}`} 
                 className="flex items-center justify-center md:justify-start gap-1 text-blue-500 text-sm font-bold hover:gap-2 transition-all cursor-pointer w-full md:w-auto py-2"
               >
                  <span>مشاهده جزئیات</span>
                  <KeyboardArrowLeft fontSize="small" />
               </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}