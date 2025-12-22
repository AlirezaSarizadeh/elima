"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cls from "classnames";

// Icons & UI Components
import { WorkOutlineRounded, CreditCardOutlined, Hotel } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";

// Custom Components
import VisaInfoSection from "../../visa/VisaInfoSection";

export default function VisaSearchForm() {
    const pathname = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const tabs = [
        { label: "تور مسافرتی", href: "/", icon: <WorkOutlineRounded /> },
        { label: "هتل", href: "/hotel", icon: <Hotel /> },
        { label: "ویزا", href: "/visa", icon: <CreditCardOutlined /> },
    ];

    return (
        <div className="bg-white rounded-3xl border border-gray-200 p-4 md:p-6 shadow-sm w-full max-w-7xl mx-auto relative z-10">

            {/* --- تب‌ها (لینک‌های واقعی با ناوبری مستقیم) --- */}
            <div className={`
                ${isMobile 
                    ? 'grid grid-cols-3 gap-2 mb-4' 
                    : 'border-b border-gray-100 flex gap-8 overflow-x-auto pb-0 mb-6'}
            `}>
                {tabs.map((t) => {
                    const isActive = pathname === t.href;
                    return (
                        <Link 
                            key={t.href} 
                            href={t.href}
                            className={cls(
                                "cursor-pointer font-bold flex flex-col md:flex-row items-center justify-center gap-2 transition-all duration-300 no-underline",
                                isMobile
                                    ? `py-3 px-2 rounded-xl text-[10px] sm:text-xs text-center ${isActive ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-gray-50 text-gray-500 border border-transparent'}`
                                    : `pb-4 text-sm relative ${isActive ? "text-blue-600 tab-active-line" : "text-gray-400 hover:text-gray-600"}`
                            )}
                        >
                            {/* استفاده از تایپ any برای جلوگیری از خطای fontSize در کلون کردن المنت */}
                            {React.cloneElement(t.icon as React.ReactElement<any>, { 
                                fontSize: isMobile ? "small" : "medium" 
                            })}
                            <span>{t.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* --- محتوای اختصاصی بخش ویزا (بدون مودال) --- */}
            <div className="w-full animate-fade-in">
                <div className="flex flex-col gap-4">
                    {/* رندر کردن بخش اطلاعات ویزا که با هتل و تور متفاوت است */}
                    <VisaInfoSection />
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                .tab-active-line::after {
                    content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 3px;
                    background-color: #2563eb; border-radius: 3px 3px 0 0;
                }
            `}</style>
        </div>
    );
}