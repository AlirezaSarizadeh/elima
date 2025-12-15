"use client";

import React from "react";
import { Apartment, Mosque, BeachAccess, Landscape, FlashOnOutlined } from "@mui/icons-material";
import Link from "next/link";
import Title from "../../../components/ui/Title/Title";

const categories = [
    { id: 1, title: "هتل‌های مشهد", count: "۱۲۴ هتل", icon: <Mosque fontSize="large" />, color: "bg-blue-50 text-blue-600", link: "#" },
    { id: 2, title: "هتل‌های کیش", count: "۸۵ هتل", icon: <BeachAccess fontSize="large" />, color: "bg-orange-50 text-orange-500", link: "#" },
    { id: 3, title: "هتل‌های تهران", count: "۲۱۰ هتل", icon: <Apartment fontSize="large" />, color: "bg-purple-50 text-purple-600", link: "#" },
    { id: 4, title: "هتل‌های شمال", count: "۱۵۰ هتل", icon: <Landscape fontSize="large" />, color: "bg-green-50 text-green-600", link: "#" },
    { id: 5, title: "هتل‌های شیراز", count: "۶۵ هتل", icon: <Mosque fontSize="large" />, color: "bg-pink-50 text-pink-500", link: "#" },
    { id: 6, title: "هتل‌های اصفهان", count: "۹۰ هتل", icon: <Apartment fontSize="large" />, color: "bg-cyan-50 text-cyan-600", link: "#" },
    { id: 7, title: "هتل‌های تبریز", count: "۵۵ هتل", icon: <Landscape fontSize="large" />, color: "bg-red-50 text-red-500", link: "#" },
    { id: 8, title: "هتل‌های یزد", count: "۴۰ هتل", icon: <Apartment fontSize="large" />, color: "bg-amber-50 text-amber-600", link: "#" },
];

export default function CityCategoryGrid() {
    return (
        <section className="py-8 max-w-7xl px-4 mx-auto">

            <Title title="دسترسی سریع به هتل ها" icon={<FlashOnOutlined className="text-blue-500" />} />


            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={cat.link}
                        className="group bg-white border border-gray-200 p-4 rounded-2xl flex items-center gap-4 transition-all duration-300"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.color} transition-transform`}>
                            {cat.icon}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-blue-600 transition-colors">{cat.title}</h4>
                            <span className="text-xs text-gray-400 mt-1 block">{cat.count}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}