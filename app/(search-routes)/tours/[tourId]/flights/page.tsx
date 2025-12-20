"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import WizardStepper from "../../../../../components/wizard/WizardStepper";
import FlightFilterSidebar from "./FlightFilterSidebar";
import {
    FlightTakeoff,
    FlightLand,
    InfoOutlined,
    DirectionsBus,
    LocalTaxi,
    ShortcutOutlined,
    StarRounded,
    TimerOutlined,
    LuggageOutlined
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

export default function FlightsPage({ params, searchParams }: any) {
    const { tourId } = params;

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            <div className="container mx-auto py-8 max-w-7xl px-4">
                <WizardStepper tourId={tourId} />

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start mt-10">
                    <aside className="hidden lg:block lg:col-span-1 sticky top-6">
                        <FlightFilterSidebar />
                    </aside>

                    <main className="lg:col-span-3 space-y-6">
                        {flightOptions.map((flight) => (
                            <div key={flight.id} className="relative bg-white rounded-3xl hover:shadow-xl transition-all duration-500 border border-gray-200 flex flex-col md:flex-row group">

                                {/* بخش اطلاعات پرواز */}
                                <div className="flex-1 p-6 md:p-8">
                                    {/* Header: Provider & Tags */}
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-50 p-2 rounded-xl">
                                                <Image src="/images/meraj-logo.png" width={32} height={32} alt="provider" className="rounded-lg" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm   text-gray-800">{flight.provider}</h4>
                                                <div className="flex items-center gap-1 text-yellow-500">
                                                    <StarRounded sx={{ fontSize: 16 }} />
                                                    <span className="text-xs font-black">{flight.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {flight.services.map((srv, idx) => (
                                                <span key={idx} className="bg-emerald-50 text-emerald-600 text-[10px]   px-3 py-1.5 rounded-lg flex items-center gap-1">
                                                    <DirectionsBus sx={{ fontSize: 14 }} />
                                                    {srv}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-10 relative">
                                        {/* دکوراسیون خط عمودی بین دو پرواز در دسکتاپ */}
                                        <div className="hidden md:block absolute right-[5.2rem] top-8 bottom-8 border-r-2 border-dashed border-gray-200"></div>

                                        <FlightLeg data={flight.outbound} type="رفت" color="blue" />
                                        <FlightLeg data={flight.inbound} type="برگشت" color="orange" />
                                    </div>
                                </div>

                                {/* بخش جداکننده بلیط (Notches) */}
                                <div className="hidden md:flex flex-col justify-between py-4 relative">
                                    <div className="w-6 h-6 bg-[#F4F7FA] rounded-full -mr-3 border-l border-gray-200"></div>
                                    <div className="flex-1 border-r-2 border-dashed border-gray-200 my-2"></div>
                                    <div className="w-6 h-6 bg-[#F4F7FA] rounded-full -mr-3 border-l border-gray-200"></div>
                                </div>

                                {/* بخش قیمت و اکشن */}
                                <div className="w-full md:w-80 p-8 flex flex-col justify-center bg-gray-50/50 rounded-b-3xl md:rounded-b-none md:rounded-l-3xl">
                                    <div className="text-center space-y-1 mb-6">
                                        <span className="text-gray-400 text-xs font-medium">قیمت نهایی هر نفر</span>
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-3xl font-black text-blue-600">{flight.pricePerPerson.toLocaleString()}</span>
                                            <span className="text-sm text-gray-500  ">تومان</span>
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-medium bg-white py-1 px-3 rounded-full border border-gray-200 inline-block mt-2">
                                            مجموع ۲ نفر: {flight.totalPrice.toLocaleString()} تومان
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Link href={`/tours/${tourId}/details?flight=${flight.id}`}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                className="w-full rounded-lg px-6 py-4 font-normal flex items-center justify-center gap-2"
                                                disableElevation
                                                sx={{
                                                    borderRadius: '10px', 
                                                    padding:'15px'
                                                }}
                                            >
                                                انتخاب پرواز
                                                <FlightTakeoff className="rotate-[-90deg]" fontSize="small" />
                                            </Button>
                                        </Link>
                                        <button className="w-full py-3 text-gray-500 hover:text-blue-600 text-sm   transition-colors">
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

function FlightLeg({ data, type, color }: any) {
    const isOutbound = type === "رفت";
    return (
        <div className="flex items-center gap-6">
            {/* لوگو ایرلاین */}
            <div className="flex flex-col items-center gap-2 w-20 shrink-0">
                <div className={`w-14 h-14 rounded-2xl bg-white border border-gray-200  flex items-center justify-center p-2`}>
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <FlightTakeoff className={isOutbound ? "text-blue-600" : "text-orange-500 rotate-180"} />
                    </div>
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase">{data.airline}</span>
            </div>

            {/* تایم‌لاین پرواز */}
            <div className="flex-1 flex items-center gap-4">
                <div className="text-right">
                    <span className="block text-2xl font-black text-gray-800">{data.depTime}</span>
                    <span className="text-xs   text-gray-400">{data.originName}</span>
                </div>

                <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <TimerOutlined sx={{ fontSize: 14 }} />
                        <span className="text-[10px]  ">{data.duration}</span>
                        <span className="text-gray-200 mx-1">|</span>
                        <LuggageOutlined sx={{ fontSize: 14 }} />
                        <span className="text-[10px]  ">20kg</span>
                    </div>
                    <div className="relative w-full flex items-center">
                        <div className="w-2.5 h-2.5 rounded-full border-2 border-blue-600 bg-white z-10"></div>
                        <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-600 to-gray-200 relative">
                            <FlightTakeoff
                                sx={{ fontSize: 16 }}
                                className={`absolute left-1/2 -translate-x-1/2 -top-2 text-blue-600 bg-white px-1 transition-all group-hover:left-[60%]`}
                            />
                        </div>
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-200 z-10"></div>
                    </div>
                    <span className="text-[10px] font-black text-blue-600 mt-1">مستقیم (بدون توقف)</span>
                </div>

                <div className="text-left">
                    <span className="block text-2xl font-black text-gray-800">{data.arrTime}</span>
                    <span className="text-xs   text-gray-400">{data.destName}</span>
                </div>
            </div>
        </div>
    );
}