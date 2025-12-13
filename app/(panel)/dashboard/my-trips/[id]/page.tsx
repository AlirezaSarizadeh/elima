"use client";

import React from "react";
import { Button } from "@mui/material";
import { Download, EditOutlined, InfoOutlined } from "@mui/icons-material";

export default function TripDetailPage({ params }: { params: { id: string } }) {
  // اینجا می‌توانید بر اساس params.id اطلاعات را از API بگیرید
  // فعلاً دیتای استاتیک طبق عکس قرار می‌دهیم

  return (
    <div className="flex flex-col gap-6">
      
      {/* 1. کارت هدر و دانلود ووچر */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* اطلاعات کلی */}
        <div className="flex flex-col gap-2 text-right w-full md:w-auto">
           <h1 className="text-xl font-bold text-gray-900">تور تهران به مالزی</h1>
           <div className="flex gap-4 text-sm text-gray-500">
              <span>کد رهگیری: <span className="text-gray-800 font-bold">۸۷۵۶۳۱۰۹</span></span>
              <span>زمان خرید: <span className="text-gray-800 dir-ltr">۱۴۰۳/۰۴/۱۵ - ۱۵:۴۰</span></span>
           </div>
        </div>

        {/* دکمه دانلود */}
        <Button 
          variant="contained" 
          startIcon={<Download />}
          sx={{ 
            borderRadius: '12px', 
            bgcolor: '#0066ff', 
            padding: '10px 24px',
            fontFamily: 'inherit',
            fontWeight: 'bold',
            boxShadow: 'none',
            '&:hover': { bgcolor: '#0052cc' }
          }}
        >
          دانلود ووچر
        </Button>
      </div>

      {/* 2. کارت اطلاعات تور */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-800 mb-6 text-lg border-b border-gray-100 pb-4">اطلاعات تور</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 mb-8">
            <InfoItem label="زمان برگشت" value="۱۴۰۳/۰۴/۲۵ - جمعه" />
            <InfoItem label="زمان حرکت" value="۱۴۰۳/۰۴/۱۲ - چهارشنبه" />
            
            <div className="flex flex-col items-start gap-1">
               <span className="text-gray-500 text-sm">مبلغ پرداختی</span>
               <div className="flex items-center gap-1">
                  <span className="text-gray-800 font-bold text-lg">۳۵,۰۰۰,۰۰۰</span>
                  <span className="text-gray-400 text-xs">تومان</span>
               </div>
            </div>

            <div className="lg:col-span-2 flex justify-start items-center">
                 <span className="border border-green-500 text-green-500 bg-white px-4 py-1.5 rounded-xl text-sm font-medium">
                    پرداخت موفق
                 </span>
            </div>
        </div>

        {/* دکمه‌های عملیات */}
        <div className="flex flex-col md:flex-row gap-3">
           <Button 
              variant="outlined" 
              fullWidth
              sx={{ borderRadius: '12px', padding: '12px', borderColor: '#2563eb', color: '#2563eb', fontWeight: 'bold' }}
           >
              استعلام جریمه و استرداد
           </Button>
           <Button 
              variant="outlined" 
              fullWidth
              sx={{ borderRadius: '12px', padding: '12px', borderColor: '#9ca3af', color: '#6b7280' }}
           >
              درخواست ویرایش
           </Button>
        </div>
      </div>

      {/* 3. کارت مشخصات مسافران (جدول) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6">
         <h2 className="font-bold text-gray-800 mb-6 text-lg">مشخصات مسافران</h2>
         
         <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
               <thead className="bg-gray-50 text-gray-500 text-sm">
                  <tr>
                     <th className="py-4 px-4 text-right rounded-r-xl font-medium">نام مسافر</th>
                     <th className="py-4 px-4 text-center font-medium">نوع مسافر</th>
                     <th className="py-4 px-4 text-center font-medium">تاریخ تولد</th>
                     <th className="py-4 px-4 text-center rounded-l-xl font-medium">جنسیت</th>
                  </tr>
               </thead>
               <tbody className="text-gray-700 text-sm">
                  <tr className="border-b border-gray-50 last:border-0">
                     <td className="py-4 px-4 font-bold text-right">کوروش صفایی</td>
                     <td className="py-4 px-4 text-center text-gray-500">بزرگسال</td>
                     <td className="py-4 px-4 text-center dir-ltr text-gray-500">۱۳۶۲/۰۴/۲۳</td>
                     <td className="py-4 px-4 text-center text-gray-500">مذکر</td>
                  </tr>
                  <tr className="border-b border-gray-50 last:border-0">
                     <td className="py-4 px-4 font-bold text-right">علی بهرامی</td>
                     <td className="py-4 px-4 text-center text-gray-500">بزرگسال</td>
                     <td className="py-4 px-4 text-center dir-ltr text-gray-500">۱۳۶۲/۰۴/۲۳</td>
                     <td className="py-4 px-4 text-center text-gray-500">مذکر</td>
                  </tr>
                  <tr>
                     <td className="py-4 px-4 font-bold text-right">آریو بهرامی</td>
                     <td className="py-4 px-4 text-center text-gray-500">کودک</td>
                     <td className="py-4 px-4 text-center dir-ltr text-gray-500">۱۳۹۲/۰۴/۲۳</td>
                     <td className="py-4 px-4 text-center text-gray-500">مذکر</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

    </div>
  );
}

// کامپوننت کمکی برای نمایش آیتم‌های اطلاعات
function InfoItem({ label, value }: { label: string, value: string }) {
   return (
      <div className="flex flex-col items-start gap-1">
         <span className="text-gray-500 text-sm">{label}</span>
         <span className="text-gray-800 font-bold text-base dir-rtl">{value}</span>
      </div>
   )
}