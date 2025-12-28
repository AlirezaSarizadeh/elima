"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cls from "classnames";

// Icons & UI Components
import { WorkOutlineRounded, CreditCardOutlined, Hotel } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";

// Custom Components
import VisaInfoSection from "../../../app/visa/components/VisaInfoSection";
import LicenseInfoSection from "../../../app/license/components/LicenseInfoSection";

export default function VisaSearchForm() {
    const pathname = usePathname();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const tabs = [
        { label: "تور مسافرتی", href: "/", icon: <WorkOutlineRounded /> },
        { label: "هتل", href: "/hotel", icon: <Hotel /> },
        { label: "ویزا", href: "/visa", icon: <CreditCardOutlined /> },
        {
            label: "گواهینامه بین المللی",
            href: "/license",
            icon: (
              <svg
                width={24}
                height={24}
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M464.932,85.797H47.068C21.076,85.797,0,106.865,0,132.865v246.271c0,25.991,21.076,47.067,47.068,47.067
                  h417.865c25.991,0,47.068-21.076,47.068-47.067V132.865C512,106.865,490.924,85.797,464.932,85.797z M123.254,167.399
                  c25.966,0,47.026,21.059,47.026,47.034c0,25.974-21.06,47.025-47.026,47.025c-25.974,0-47.025-21.051-47.025-47.025
                  C76.229,188.458,97.28,167.399,123.254,167.399z M123.254,348.916c-32.305,0-65.389-11.187-60.229-42.153
                  c2.102-12.576,12.508-30.203,20.407-38.102c1.016-1.017,5.652-1.28,6.915-0.5c9.585,5.907,20.839,9.364,32.907,9.364
                  c12.068,0,23.313-3.457,32.898-9.364c1.263-0.78,5.898-0.517,6.924,0.5c7.89,7.899,18.296,25.526,20.398,38.102
                  C188.636,337.729,155.551,348.916,123.254,348.916z M366.424,333.492H232.194v-27h134.229V333.492z
                  M446.686,267.068H232.194v-27h214.492V267.068z M446.686,200.644H232.194v-27h214.492V200.644z"
                  fill="currentColor"
                />
              </svg>
            ),
          }
          
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
                                    : `pb-4 text-sm relative ${isActive ? "text-blue-600 tab-active-line" : "opacity-40 hover:text-gray-600"}`
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
                    <LicenseInfoSection />
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