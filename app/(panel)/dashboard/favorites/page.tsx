"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
    DeleteOutline, 
    AccessTime, 
    CalendarMonthOutlined, 
    Stars, 
    Tune, 
    InfoOutlined
} from "@mui/icons-material";
import { Button } from "@mui/material";

// 1. داده‌ها را تفکیک کردیم (type اضافه شد)
const initialFavorites = [
  {
    id: 1,
    type: "foreign", // 👈 مشخص کننده نوع تور
    title: "تور ترکیه - استانبول",
    image: "/images/img3.png",
    duration: "۵ شب و ۶ روز",
    date: "مهر و آبان ۱۴۰۳",
    price: 100000000,
    oldPrice: 145000000,
    remaining: 6,
    isLastMinute: true
  },
  {
    id: 2,
    type: "foreign",
    title: "تور دبی - امارات",
    image: "/images/img1.png",
    duration: "۳ شب و ۴ روز",
    date: "آذر ۱۴۰۳",
    price: 80000000,
    oldPrice: 95000000,
    remaining: 2,
    isLastMinute: false
  },
  {
    id: 3,
    type: "domestic", // 👈 تور داخلی
    title: "تور کیش - هتل داریوش",
    image: "/images/img4.png",
    duration: "۲ شب و ۳ روز",
    date: "دی ۱۴۰۳",
    price: 15000000,
    oldPrice: 18000000,
    remaining: 10,
    isLastMinute: true
  },
  {
    id: 4,
    type: "domestic", // 👈 تور داخلی
    title: "تور قشم - جنگل حرا",
    image: "/images/img1.png",
    duration: "۴ شب و ۵ روز",
    date: "بهمن ۱۴۰۳",
    price: 12000000,
    oldPrice: 14000000,
    remaining: 5,
    isLastMinute: false
  },
];

export default function FavoritesPage() {
  // پیش‌فرض روی foreign گذاشتم چون دیتای اولی خارجی بود
  const [activeTab, setActiveTab] = useState("foreign"); 

  // 2. فیلتر کردن داده‌ها بر اساس تب فعال
  const filteredTours = initialFavorites.filter((tour) => tour.type === activeTab);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-xl font-bold text-gray-800">تورهایی که ذخیره کرده اید</h2>
          
          <div className="flex gap-2">
               {/* دکمه فیلتر موبایل */}
               <div className="md:hidden">
                   <button className="flex items-center gap-1 text-blue-600 font-bold">
                       <Tune fontSize="small" />
                       <span>فیلتر</span>
                   </button>
               </div>
               
               {/* تب‌ها */}
               <div className="flex bg-gray-50 p-1 rounded-xl">
                   <button 
                      onClick={() => setActiveTab("foreign")}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "foreign" ? "bg-white shadow text-gray-800" : "text-gray-500 hover:text-gray-700"}`}
                   >
                       تورهای خارجی
                   </button>
                   <button 
                      onClick={() => setActiveTab("domestic")}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "domestic" ? "bg-blue-100 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                   >
                       تورهای داخلی
                   </button>
               </div>
          </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* 3. نمایش لیست فیلتر شده به جای لیست اصلی */}
         {filteredTours.length > 0 ? (
             filteredTours.map((tour) => (
                 <FavoriteCard key={tour.id} tour={tour} />
             ))
         ) : (
             // نمایش پیام در صورت نبودن آیتم
             <div className="col-span-1 md:col-span-2 text-center py-10 text-gray-500">
                 هیچ توری در این بخش ذخیره نشده است.
             </div>
         )}
      </div>

    </div>
  );
}

// کامپوننت کارت تور علاقه‌مندی (بدون تغییر)
function FavoriteCard({ tour }: { tour: any }) {
    return (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden group hover:shadow-lg transition-all duration-300">
            
            {/* بخش تصویر */}
            <div className="relative h-48 w-full border-gray-200">
                {/* توجه: حتما مطمئن شوید عکس‌ها در پوشه public وجود دارند */}
                <Image src={tour.image} alt={tour.title} fill className="object-cover" />
                
                <div className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full text-blue-600">
                    <div className="w-5 h-5 bg-blue-600 rounded-full"></div> 
                </div>

                <div className="absolute bottom-3 right-3 left-3 flex justify-between items-center">
                     {tour.isLastMinute && (
                         <span className="bg-amber-100 text-amber-600 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                             <Stars fontSize="inherit" />
                             تور لحظه آخری
                         </span>
                     )}
                     <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 backdrop-blur-md">
                         <InfoOutlined fontSize="inherit" />
                         {tour.remaining} نفر باقیمانده
                     </span>
                </div>
            </div>

            {/* بخش محتوا */}
            <div className="p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-4 text-center">{tour.title}</h3>

                <div className="flex flex-col gap-2 mb-4 items-start">
                    <div className="flex justify-between gap-1 text-gray-500 text-sm">
                        <CalendarMonthOutlined fontSize="small" />
                        <span>{tour.date}</span>
                    </div>
                    <div className="flex justify-between gap-1 text-gray-500 text-sm">
                        <AccessTime fontSize="small" />
                        <span>{tour.duration}</span>
                    </div>
                </div>

                <div className="flex justify-between items-end mb-4">
                     <span className="text-gray-400 text-xs mb-1">شروع قیمت از</span>
                     <div className="flex flex-col items-end">
                         <span className="text-gray-400 text-xs line-through decoration-red-400 mb-1">{tour.oldPrice.toLocaleString()}</span>
                         <div className="flex items-center gap-1 text-blue-600 font-bold text-lg">
                             {tour.price.toLocaleString()}
                             <span className="text-xs font-normal text-gray-500">تومان</span>
                         </div>
                     </div>
                </div>

                <div className="flex gap-2">
                    <Button 
                        variant="contained" 
                        fullWidth 
                        sx={{ bgcolor: '#0066ff', borderRadius: '10px', fontWeight: 'bold' }}
                    >
                        رزرو تور
                    </Button>
                    <Button 
                        variant="outlined" 
                        sx={{ 
                            minWidth: '50px', 
                            borderRadius: '10px', 
                            borderColor: '#e5e7eb', 
                            color: '#6b7280',
                            '&:hover': { borderColor: '#ef4444', color: '#ef4444', bgcolor: '#fef2f2' }
                        }}
                    >
                        <DeleteOutline />
                    </Button>
                </div>
            </div>

        </div>
    )
}