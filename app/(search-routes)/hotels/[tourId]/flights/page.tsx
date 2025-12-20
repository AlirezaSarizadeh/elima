"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import WizardStepper from "../../../../../components/wizard/WizardStepper";
import FlightFilterSidebar from "./FlightFilterSidebar";
import { 
    Flight, 
    InfoOutlined, 
    DirectionsBus, 
    LocalTaxi,
    ShortcutOutlined
} from "@mui/icons-material";

// --- داده‌های نمونه بر اساس ساختار جدید (رفت و برگشت در یک کارت) ---
const flightOptions = [
  {
    id: 1,
    provider: "آوا گشت",
    rating: 4.7,
    services: ["شاتل", "سافاری"],
    pricePerPerson: 14156800,
    totalPrice: 28313500,
    outbound: {
        airline: "معراج",
        logo: "/images/meraj-logo.png", // فرض بر وجود عکس
        origin: "THR",
        dest: "KIH",
        depTime: "18:30",
        arrTime: "20:15",
        duration: "1 ساعت و 45 دقیقه"
    },
    inbound: {
        airline: "کیش ایر",
        logo: "/images/kish-logo.png", // فرض بر وجود عکس
        origin: "KIH",
        dest: "THR",
        depTime: "08:00",
        arrTime: "10:00",
        duration: "2 ساعت"
    }
  },
  {
    id: 2,
    provider: "علی بابا",
    rating: 4.5,
    services: ["ترانسفر رایگان"],
    pricePerPerson: 15500000,
    totalPrice: 31000000,
    outbound: {
        airline: "ماهان",
        logo: "/images/mahan-logo.png",
        origin: "THR",
        dest: "DXB",
        depTime: "12:00",
        arrTime: "14:30",
        duration: "2 ساعت و 30 دقیقه"
    },
    inbound: {
        airline: "ماهان",
        logo: "/images/mahan-logo.png",
        origin: "DXB",
        dest: "THR",
        depTime: "22:00",
        arrTime: "00:30",
        duration: "2 ساعت و 30 دقیقه"
    }
  },
];

export default function FlightsPage({ params, searchParams }: { params: { tourId: string }, searchParams: { hotel?: string } }) {
  const { tourId } = params;
  const selectedHotel = searchParams.hotel;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-0 py-8 max-w-7xl px-4">

        {/* <h1 className="text-2xl font-bold text-gray-800 mb-6">انتخاب پرواز</h1> */}
        <WizardStepper tourId={tourId} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start mt-8">

            {/* سایدبار فیلتر */}
            <aside className="hidden lg:block lg:col-span-1 sticky top-4 space-y-4">
                <FlightFilterSidebar />
            </aside>

            {/* لیست پروازها */}
            <main className="lg:col-span-3 space-y-4">
                
                {flightOptions.map((flight) => (
                    <div key={flight.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row">
                        
                        {/* --- بخش راست: جزئیات پرواز (۷۵٪ عرض) --- */}
                        <div className="flex-1 p-5 md:pr-6 md:pl-2 flex flex-col justify-between gap-6">
                            
                            {/* هدر خدمات (شاتل و ...) */}
                            <div className="flex justify-end gap-2">
                                {flight.services.map((srv, idx) => (
                                    <div key={idx} className="bg-gray-100 text-gray-600 text-[10px] md:text-xs px-2 py-1 rounded-full flex items-center gap-1 font-bold">
                                        <DirectionsBus fontSize="inherit" />
                                        <span>{srv}</span>
                                    </div>
                                ))}
                            </div>

                            {/* ردیف پرواز رفت */}
                            <FlightRow 
                                label="پرواز رفت" 
                                data={flight.outbound} 
                                iconColor="text-blue-900" // رنگ سرمه‌ای برای لوگو معراج فرضی
                            />

                            {/* خط جداکننده محو */}
                            <div className="border-t border-gray-50 mx-4"></div>

                            {/* ردیف پرواز برگشت */}
                            <FlightRow 
                                label="پرواز برگشت" 
                                data={flight.inbound} 
                                iconColor="text-orange-500" // رنگ نارنجی برای کیش ایر فرضی
                            />

                            {/* فوتر اطلاعات تامین کننده */}
                            <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                                <div className="flex gap-3">
                                    <span>خدمات تور</span>
                                    <span className="text-gray-300">•</span>
                                    <span>سافاری</span>
                                    <span className="text-gray-300">•</span>
                                    <span>شاتل</span>
                                </div>
                                <div className="flex items-center gap-1 font-bold text-gray-700">
                                    <InfoOutlined sx={{ fontSize: 14 }} className="text-gray-400" />
                                    <span>تأمین‌کننده تور: {flight.provider}</span>
                                    <span className="font-black text-black">{flight.rating}</span>
                                </div>
                            </div>
                        </div>

                        {/* --- بخش چپ: قیمت و دکمه (۲۵٪ عرض) --- */}
                        <div className="w-full md:w-72 bg-gray-50/30 border-t md:border-t-0 md:border-r border-gray-100 p-5 flex flex-col justify-center items-center gap-4 text-center">
                            
                            <div className="flex flex-col gap-1">
                                <div className="text-gray-500 text-xs">هر نفر</div>
                                <div className="flex items-center justify-center gap-1 text-blue-600 font-bold text-xl md:text-2xl">
                                    {flight.pricePerPerson.toLocaleString()}
                                    <span className="text-sm font-normal text-gray-400">تومان</span>
                                </div>
                            </div>

                            <div className="text-gray-400 text-xs">
                                مجموع ۲ نفر {flight.totalPrice.toLocaleString()} تومان
                            </div>

                            <Link 
                                href={`/tours/${tourId}/details?hotel=${selectedHotel}&flight=${flight.id}`}
                                className="w-full"
                            >
                                <button className="w-full bg-[#0077db] hover:bg-[#0060b0] text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-sm shadow-blue-200">
                                    انتخاب حمل و نقل
                                </button>
                            </Link>
                            
                            <button className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold py-3 rounded-xl transition-colors text-sm">
                                جزئیات تور
                            </button>

                        </div>

                    </div>
                ))}

                {/* دکمه بازگشت */}
                <div className="mt-8 flex justify-end">
                  <Link
                    href={`/tours/${tourId}/accommodation`}
                    className="text-gray-600 hover:text-black border border-gray-300 px-4 py-2.5 rounded-lg text-sm flex items-center gap-2 bg-white"
                  >
                    مرحله قبل (هتل)
                    <ShortcutOutlined fontSize="small" className="rotate-180" />
                  </Link>
                </div>

            </main>
        </div>
      </div>
    </div>
  );
}

// --- کامپوننت داخلی برای نمایش هر سطر پرواز (برای تمیزی کد) ---
function FlightRow({ label, data, iconColor }: { label: string, data: any, iconColor: string }) {
    return (
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
            
            {/* قسمت راست: نام ایرلاین و نوع پرواز */}
            <div className="flex items-center justify-between md:justify-start w-full md:w-1/4 gap-4">
                <span className="text-gray-400 text-xs font-medium w-16">{label}</span>
                <div className="flex items-center gap-2">
                    {/* جایگاه لوگو (دایره رنگی موقت) */}
                    <div className={`w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center ${iconColor}`}>
                         {/* <Image src={data.logo} width={20} height={20} alt={data.airline} /> */}
                         <Flight fontSize="small" className="rotate-90" />
                    </div>
                    <span className="font-bold text-gray-800 text-sm">{data.airline}</span>
                </div>
            </div>

            {/* قسمت وسط: زمان و مسیر */}
            <div className="flex-1 w-full flex items-center justify-between gap-2 md:px-8">
                
                {/* ساعت مبدا */}
                <div className="text-center">
                    <span className="block font-bold text-xl text-gray-800">{data.depTime}</span>
                    <span className="text-xs text-gray-400 font-bold uppercase">({data.origin})</span>
                </div>

                {/* ویژوال مسیر پرواز */}
                <div className="flex-1 flex flex-col items-center relative -top-1">
                    <span className="text-[10px] text-gray-400 mb-1">{data.duration}</span>
                    <div className="w-full flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full border border-gray-300 bg-white"></div>
                        <div className="h-[1px] bg-gray-300 flex-1 relative">
                             {/* آیکون هواپیما وسط خط */}
                             <Flight sx={{ fontSize: 14 }} className="text-gray-400 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 -rotate-90 bg-white px-0.5 box-content" />
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full border border-gray-300 bg-gray-300"></div> {/* دایره پر برای مقصد */}
                    </div>
                </div>

                {/* ساعت مقصد */}
                <div className="text-center">
                    <span className="block font-bold text-xl text-gray-800">{data.arrTime}</span>
                    <span className="text-xs text-gray-400 font-bold uppercase">({data.dest})</span>
                </div>
            </div>
        </div>
    )
}