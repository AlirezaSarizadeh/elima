"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  PersonOutline,
  SettingsOutlined,
  FlightTakeoff,
  ConfirmationNumberOutlined,
  FavoriteBorder,
  CreditCardOutlined,
  ExitToApp,
  Add,
  EditOutlined
} from "@mui/icons-material";

const menuItems = [
  { title: "حساب کاربری", href: "/dashboard", icon: <PersonOutline /> },
  // { title: "تنظیمات حساب", href: "/dashboard/profile", icon: <SettingsOutlined /> },
  { title: "سفر های من", href: "/dashboard/my-trips", icon: <FlightTakeoff /> },
  { title: "مدیریت رزرو خودکار", href: "/dashboard/auto-reserve", icon: <ConfirmationNumberOutlined /> },
  { title: "علاقه مندی ها", href: "/dashboard/favorites", icon: <FavoriteBorder /> },
  { title: "تراکنش ها", href: "/dashboard/transactions", icon: <CreditCardOutlined /> },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full flex flex-col gap-6">
      
      {/* 1. کارت پروفایل و کیف پول */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center">
        
        {/* آواتار و نام */}
        <div className="flex flex-col items-center gap-2 mb-6 w-full">
          <div className="flex justify-between w-full items-start">
             <button className="text-blue-500 hover:bg-blue-50 p-1 rounded-lg transition-colors">
                <EditOutlined fontSize="small" />
             </button>
             <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                <Image src="/images/avatar-1.png" alt="User" fill className="object-cover" />
             </div>
             <div className="w-6"></div> {/* Spacer for centering */}
          </div>
          
          <h2 className="font-bold text-gray-800 text-lg">کوروش صفایی</h2>
          <span className="text-gray-400 text-sm dir-ltr">09961606078</span>
        </div>

        {/* کیف پول */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-2 text-sm font-bold text-gray-700">
            <span>کیف پول</span>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 flex justify-between items-center text-blue-600">
             <div className="flex items-center gap-1">
                 <span className="text-xs text-gray-500">تومان</span>
                 <span className="font-bold text-lg">30,400,000</span>
             </div>
             <Link href={'/dashboard/wallet'} className="bg-white p-1 rounded-lg shadow-sm hover:shadow-md transition-all text-blue-600">
                <Add fontSize="small" />
             </Link>
          </div>
        </div>
      </div>

      {/* 2. منوی ناوبری */}
      <div className="bg-white rounded-xl border border-gray-200 py-4 px-2">
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 font-medium ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 3. دکمه خروج */}
      <button className="bg-red-50 text-red-500 font-bold rounded-2xl py-4 flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
        <ExitToApp className="rotate-180" /> {/* آیکون روتیت شده برای RTL */}
        <span>خروج از حساب کاربری</span>
      </button>

    </aside>
  );
}