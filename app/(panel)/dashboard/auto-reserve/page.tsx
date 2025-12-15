"use client";

import React from "react";
import { InfoOutlined, AccountBalanceWallet } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

export default function AutoReservePage() {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
      
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-8 text-left border-b border-gray-100 pb-4">
        مدیریت رزرو خودکار
      </h2>

      {/* Wallet Banner */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
                <AccountBalanceWallet />
            </div>
            <div className="flex flex-col text-right">
                <span className="text-gray-500 text-sm">اعتبار کاربری</span>
                <div className="flex items-center gap-1">
                    <span className="font-bold text-gray-800 text-lg">۳۰,۴۰۰,۰۰۰</span>
                    <span className="text-gray-400 text-xs">تومان</span>
                </div>
            </div>
         </div>
         <Link href={'/dashboard/wallet'}>
         <Button 
            variant="contained" 
            sx={{ 
                bgcolor: '#0066ff', 
                borderRadius: '12px', 
                fontWeight: 'bold',
                padding: '8px 20px',
                '&:hover': { bgcolor: '#0052cc' }
            }}
         >
            افزایش و استرداد اعتبار
         </Button>
         </Link>
      </div>

      {/* Info Alerts List */}
      <div className="flex flex-col gap-4 bg-blue-50/50 p-6 rounded-3xl">
        <InfoItem text="رزرو خودکار تا یک ساعت پیش از حرکت سفرها ادامه خواهد داشت و در صورت موجود بودن ظرفیت، رزرو به طور خودکار انجام می‌شود. پس از این زمان، رزرو متوقف می‌گردد." />
        <InfoItem text="امکان لغو رزرو خودکار تا پیش از رزرو موفق وجود دارد و در صورت لغو، اعتبار به صورت کامل به حساب کاربری شما بازگردانده می‌شود." />
        <InfoItem text="رزرو خودکار تا یک ساعت پیش از حرکت سفرها ادامه خواهد داشت و در صورت موجود بودن ظرفیت، رزرو به طور خودکار انجام می‌شود. پس از این زمان در صورت موفقیت رزرو خودکار، اطلاع‌رسانی از طریق پیامک یا ایمیل انجام خواهد شد و نیازی به پیگیری دستی نخواهد بود." />
        <InfoItem text="به منظور انصراف از رزرو خودکار، کافیست گزینه 'حذف رزرو' را روی کارت پرواز مورد نظر انتخاب کنید تا رزرو شما به طور کامل لغو شود." />
      </div>

    </div>
  );
}

// کامپوننت کمکی برای آیتم‌های اطلاعاتی
function InfoItem({ text }: { text: string }) {
    return (
        <div className="flex gap-3 items-start text-right">
            <div className="text-blue-500 mt-1 shrink-0">
                <InfoOutlined fontSize="small" />
            </div>
            <p className="text-gray-600 text-sm leading-7 text-justify font-medium">
                {text}
            </p>
        </div>
    )
}