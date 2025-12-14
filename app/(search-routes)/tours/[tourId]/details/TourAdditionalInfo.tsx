"use client";

import React from "react";
import {
  ShoppingBagOutlined,
  LocalActivityOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import Image from "next/image";

export default function TourAdditionalInfo() {
  
  // داده‌های تفریحات
  const recreationItems = [
    "چشیدن طعم ادویه‌جات تند و متنوع در غذاهای خیابانی دهلی",
    "تماشای طلوع خورشید در کنار تاج محل، شاهکار معماری مغول",
    "سوار شدن بر قایق‌های سنتی در رودخانه گنگ مقدس در شهر وارانسی",
    "شرکت در جشنواره رنگ‌های هولی و رقصیدن با مردم محلی",
    "دیدن ببرهای بنگال در پارک ملی رانتامبور در سافاری جنگلی",
  ];

  // داده‌های لوازم مورد نیاز
  const suppliesItems = [
    "کفش کتونی مناسب برای گشت ها",
    "کلاه نقاب دار",
    "وسایل حمام",
    "هم لباس تابستانی هم لباس زمستانی",
    "کرم ضد آفتاب",
  ];

  // داده‌های خدمات تور
  const servicesItems = [
    "اقامتگاه",
    "حمل و نقل",
    "لیدر محلی",
    "وعده های غذایی",
  ];

  return (
    <div className="w-full pb-8" dir="rtl">
      
      {/* ---------------- Top Section (Grid) ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* کارت لوازم مورد نیاز */}
        <InfoCard 
          title="لوازم موردنیاز" 
          icon={<Image width={24} height={24} alt="icon" src={'/images/TourAdditionalInfo-icon1.svg'} />} 
          items={suppliesItems} 
        />

        {/* کارت تفریحات */}
        <InfoCard 
          title="تفریحات" 
          icon={<Image width={24} height={24} alt="icon" src={'/images/TourAdditionalInfo-icon3.svg'} />} 
          items={recreationItems} 
        />
        
      </div>

      {/* ---------------- Bottom Section (Full Width) ---------------- */}
      <div className="bg-white rounded-8 border border-gray-200 p-6 md:p-8">
        {/* هدر خدمات */}
        <div className="flex justify-start items-center gap-2 mb-6">
          <div className="text-blue-600">
             <Image src={'/images/TourAdditionalInfo-icon2.svg'} alt={'icon'} width={24} height={24} />
          </div>
          <h3 className="font-bold text-lg text-gray-800">خدمات تور</h3>
        </div>

        {/* لیست افقی خدمات */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 justify-start">
          {servicesItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 flex-row-reverse">
               <span className="w-1.5 h-1.5 bg-gray-800 rounded-full"></span>
               <span className="text-gray-700 font-medium text-sm md:text-base">{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ----------------------------------------------------------------------
// کامپوننت کمکی برای کارت‌های بالایی (Reusable Component)
// ----------------------------------------------------------------------
interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

function InfoCard({ title, icon, items }: InfoCardProps) {
  return (
    <div className="bg-white rounded-8 border border-gray-200 p-6 h-full">
      
      {/* هدر کارت */}
      <div className="flex justify-start items-center gap-2 mb-6">
        <div className="text-blue-600">
          {icon}
        </div>
        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
      </div>

      {/* لیست آیتم‌ها */}
      <ul className="space-y-4 pr-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-right">
             {/* بولت پوینت سفارشی برای زیبایی بیشتر */}
            <span className="mt-2 w-1.5 h-1.5 min-w-[6px] bg-gray-800 rounded-full shrink-0"></span>
            <span className="text-gray-600 text-sm leading-7 font-medium">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}