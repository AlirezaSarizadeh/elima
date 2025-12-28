"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import WizardStepper from "../../../../../components/wizard/WizardStepper";
import FlightFilterSidebar from "./FlightFilterSidebar";
import {
    FlightTakeoff,
    StarRounded,
    TimerOutlined,
    LuggageOutlined,
    DirectionsBus
} from "@mui/icons-material";
import { Button } from "@mui/material";

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
            logo: "/images/meraj-logo.png",
            origin: "THR",
            originName: "تهران",
            dest: "KIH",
            destName: "کیش",
            depTime: "18:30",
            arrTime: "20:15",
            duration: "1h 45m"
        },
        inbound: {
            airline: "کیش ایر",
            logo: "/images/kish-logo.png",
            origin: "KIH",
            originName: "کیش",
            dest: "THR",
            destName: "تهران",
            depTime: "08:00",
            arrTime: "10:00",
            duration: "2h 00m"
        }
    },
    // ... سایر داده‌ها
];
// ... (داده‌های flightOptions بدون تغییر باقی می‌ماند)

export default function FlightsPage({ params, searchParams }: any) {
    const { tourId } = params;

    return (
        <div className="min-h-screen bg-[#F4F7FA]" dir="rtl">
            <div className="container mx-auto py-4 md:py-8 max-w-7xl px-4">
                <WizardStepper tourId={tourId} />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 items-start mt-6 md:mt-10">
                    <aside className="hidden lg:block lg:col-span-1 sticky top-6">
                        <FlightFilterSidebar />
                    </aside>

                    <main className="lg:col-span-3 space-y-6">
                        {flightOptions.map((flight) => (
                            <div key={flight.id} className="relative bg-white rounded-[2rem] md:rounded-3xl hover:shadow-xl transition-all duration-500 border border-gray-200 flex flex-col md:flex-row group">

                                {/* بخش اطلاعات پرواز */}
                                <div className="flex-1 p-5 md:p-8">
                                    {/* Header: Provider & Tags */}
                                    <div className="flex flex-wrap justify-between items-center gap-4 mb-6 md:mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-50 p-2 rounded-xl shrink-0">
                                                <Image src="/images/meraj-logo.png" width={32} height={32} alt="airline" className="rounded-lg" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-gray-800">{flight.provider}</h4>
                                                <div className="flex items-center gap-1 text-yellow-500">
                                                    <StarRounded sx={{ fontSize: 16 }} />
                                                    <span className="text-xs font-black">{flight.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {flight.services.map((srv, idx) => (
                                                <span key={idx} className="bg-emerald-50 text-emerald-600 text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-bold">
                                                    <DirectionsBus sx={{ fontSize: 14 }} />
                                                    {srv}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-8 md:space-y-10 relative">
                                        {/* خط عمودی دکوراتیو - فقط در دسکتاپ */}
                                        <div className="hidden md:block absolute right-[5.2rem] top-8 bottom-8 border-r-2 border-dashed border-gray-100"></div>

                                        <FlightLeg data={flight.outbound} type="رفت" />
                                        
                                        {/* خط جداکننده افقی در موبایل */}
                                        <div className="md:hidden border-t border-gray-100 w-full"></div>
                                        
                                        <FlightLeg data={flight.inbound} type="برگشت" />
                                    </div>
                                </div>

                                {/* --- بخش جداکننده بلیط (Notches) --- */}
                                {/* در دسکتاپ: عمودی | در موبایل: افقی */}
                                <div className="flex md:flex-col justify-between items-center px-4 md:px-0 md:py-4 relative">
                                    {/* دایره‌های برش بلیط */}
                                    <div className="w-6 h-6 bg-[#F4F7FA] rounded-full -mt-3 md:mt-0 md:-mr-3 border border-gray-100"></div>
                                    <div className="left-1.5 relative flex-1 border-t-2 md:border-t-0 md:border-r-2 border-dashed border-gray-200 w-full md:w-0 my-0 md:my-2"></div>
                                    <div className="w-6 h-6 bg-[#F4F7FA] rounded-full -mb-3 md:mb-0 md:-mr-3 border border-gray-100"></div>
                                </div>

                                {/* بخش قیمت و دکمه */}
                                <div className="w-full md:w-80 p-6 md:p-8 flex flex-col justify-center bg-gray-50/50 rounded-b-[2rem] md:rounded-b-none md:rounded-l-3xl">
                                    <div className="text-center space-y-1 mb-6">
                                        <span className="text-gray-400 text-xs font-medium">قیمت نهایی هر نفر</span>
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-2xl md:text-3xl font-black text-blue-600">{flight.pricePerPerson.toLocaleString()}</span>
                                            <span className="text-sm text-gray-500 font-bold">تومان</span>
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-medium bg-white py-1 px-3 rounded-full border border-gray-100 inline-block mt-2">
                                            مجموع ۲ نفر: {flight.totalPrice.toLocaleString()} تومان
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Link href={`/tours/${tourId}/details?flight=${flight.id}`} className="block">
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                disableElevation
                                                sx={{
                                                    borderRadius: '14px',
                                                    padding: '12px',
                                                    fontWeight: 'bold',
                                                    '&:hover': { backgroundColor: '#29477d' }
                                                }}
                                            >
                                                انتخاب پرواز
                                                <FlightTakeoff className="rotate-[-90deg] mr-2" fontSize="small" />
                                            </Button>
                                        </Link>
                                        <button className="w-full py-2 text-gray-500 hover:text-blue-600 text-xs md:text-sm font-bold transition-colors">
                                            مشاهده جزئیات کامل تور
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
}

function FlightLeg({ data, type }: any) {
    const isOutbound = type === "رفت";
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
            {/* لوگو و نام ایرلاین */}
            <div className="flex sm:flex-col items-center gap-2 w-full sm:w-20 shrink-0">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center p-2 ">
                    <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
                        <FlightTakeoff className={isOutbound ? "text-blue-600" : "text-orange-500 rotate-180"} sx={{ fontSize: 20 }} />
                    </div>
                </div>
                <div className="flex flex-col sm:items-center">
                    <span className="text-[10px] font-black text-gray-500 uppercase">{data.airline}</span>
                    <span className="sm:hidden text-[9px] text-blue-600 font-bold">پرواز {type}</span>
                </div>
            </div>

            {/* تایم‌لاین پرواز */}
            <div className="flex-1 flex items-center justify-between gap-2 md:gap-4 w-full">
                {/* مبدا */}
                <div className="text-right min-w-[60px]">
                    <span className="block text-xl md:text-2xl font-black text-gray-800">{data.depTime}</span>
                    <span className="text-[10px] md:text-xs font-bold text-gray-400">{data.originName}</span>
                </div>

                {/* ویژوال خط مسیر */}
                <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 md:gap-2 text-gray-400 mb-1">
                        <TimerOutlined sx={{ fontSize: 12 }} />
                        <span className="text-[9px] md:text-[10px] font-bold">{data.duration}</span>
                        <span className="hidden md:inline text-gray-200">|</span>
                        <LuggageOutlined className="hidden md:inline" sx={{ fontSize: 12 }} />
                        <span className="hidden md:inline text-[10px] font-bold">20kg</span>
                    </div>
                    <div className="relative w-full flex items-center px-1">
                        <div className="w-2 h-2 rounded-full border border-blue-600 bg-white z-10"></div>
                        <div className="flex-1 h-[1.5px] bg-gray-100 relative">
                            <FlightTakeoff
                                sx={{ fontSize: 14 }}
                                className="absolute left-1/2 -translate-x-1/2 -top-1.5 text-blue-200 rotate-[-90deg]"
                            />
                        </div>
                        <div className="w-2 h-2 rounded-full bg-gray-200 z-10"></div>
                    </div>
                    <span className="text-[9px] font-bold text-blue-600/70 mt-1">مستقیم</span>
                </div>

                {/* مقصد */}
                <div className="text-left min-w-[60px]">
                    <span className="block text-xl md:text-2xl font-black text-gray-800">{data.arrTime}</span>
                    <span className="text-[10px] md:text-xs font-bold text-gray-400">{data.destName}</span>
                </div>
            </div>
        </div>
    );
}