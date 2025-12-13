"use client";

import { AccessTime, VerifiedUserOutlined } from "@mui/icons-material"; // ایمپورت آیکون‌ها
// اگر از MUI استفاده نمی‌کنید، می‌توانید این بخش را حذف کنید یا با img جایگزین کنید.

interface VisaCardProps {
  title: string;
  price: number;
  image: string;
  // این پراپ‌ها را اختیاری گذاشتم تا اگر دیتای جدید نداشتید کد ارور ندهد
  processingTime?: string; // مثلا: ۳ روز کاری
  visaType?: string; // مثلا: ویزای توریستی
}

const VisaCard = ({ 
    title, 
    price, 
    image, 
    processingTime = "۳ روز کاری", // مقدار پیش‌فرض طبق عکس
    visaType = "ویزای توریستی"     // مقدار پیش‌فرض طبق عکس
}: VisaCardProps) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-3 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      
      {/* بخش تصویر */}
      <div className="relative h-48 w-full rounded-2xl overflow-hidden shrink-0">
        <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover" 
        />
      </div>

      {/* بخش محتوا */}
      <div className="pt-4 px-1 flex flex-col flex-1 justify-between">
        
        {/* هدر: عنوان و نوع ویزا */}
        <div className="flex justify-between items-start mb-3">
             <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
             
             {/* بج نوع ویزا */}
             <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                 <VerifiedUserOutlined style={{ fontSize: 14 }} />
                 <span>{visaType}</span>
             </div>
        </div>

        {/* زمان اخذ ویزا */}
        <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
             <AccessTime style={{ fontSize: 16 }} className="text-gray-400" />
             <span>اخذ ویزا : {processingTime}</span>
        </div>

        {/* قیمت */}
        <div className="flex justify-between items-end mb-4">
             <span className="text-gray-400 text-xs mb-1">شروع قیمت برای هر نفر</span>
             <div className="flex items-center gap-1 text-blue-600 font-bold text-lg">
                 {price.toLocaleString()}
                 <span className="text-xs font-normal text-gray-400">تومان</span>
             </div>
        </div>

        {/* دکمه پایین */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-sm">
            مشاهده جزئیات
        </button>

      </div>
    </div>
  );
};

export default VisaCard;