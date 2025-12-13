"use client";

import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import clsx from "classnames";

// داده‌های نمونه
const transactions = [
  {
    id: 1,
    type: "رزرو تور",
    amount: -100000000, // منفی برای برداشت
    trackId: "TW8790741",
    date: "۱۴۰۲/۰۹/۱۲ - ۱۹:۳۰",
    details: {
        refId: "۱۲۶۸۹۵۳",
        gateway: "درگاه بانک سامان",
        passenger: "علی بهرامی"
    }
  },
  {
    id: 2,
    type: "رزرو تور",
    amount: -100000000,
    trackId: "QW8325741",
    date: "۱۴۰۲/۰۹/۱۲ - ۱۹:۳۰",
    details: { refId: "---", gateway: "---", passenger: "---" }
  },
  {
    id: 3,
    type: "افزایش اعتبار",
    amount: 300000000, // مثبت برای واریز
    trackId: "AM8785741",
    date: "۱۴۰۲/۰۹/۱۲ - ۱۹:۳۰",
    details: { refId: "۹۹۸۸۷۷", gateway: "کارت به کارت", passenger: "-" }
  },
];

export default function TransactionsPage() {
  // مدیریت باز/بسته بودن ردیف‌ها
  const [expandedId, setExpandedId] = useState<number | null>(1); // پیش‌فرض اولی باز است

  const toggleExpand = (id: number) => {
      setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-8 text-right">تاریخچه تراکنش ها</h2>

      {/* Table Header (Desktop only) */}
      <div className="hidden md:grid grid-cols-5 text-gray-800 font-bold mb-4 px-4 text-center">
         <div className="text-right">نوع تراکنش</div>
         <div>مبلغ</div>
         <div>شناسه تراکنش</div>
         <div>زمان تراکنش</div>
         <div></div>
      </div>

      <div className="flex flex-col gap-2">
        {transactions.map((trx) => (
          <div key={trx.id} className="border border-gray-100 rounded-2xl overflow-hidden transition-all">
            
            {/* Row Summary */}
            <div 
                className="grid grid-cols-1 md:grid-cols-5 items-center p-4 gap-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(trx.id)}
            >
               {/* نوع تراکنش */}
               <div className="font-bold text-gray-800 text-right flex justify-between md:block">
                  <span className="md:hidden text-gray-500 font-normal ml-2">نوع:</span>
                  {trx.type}
               </div>

               {/* مبلغ */}
               <div className="flex items-center justify-end md:justify-center gap-1 dir-ltr">
                  <span className="text-gray-400 text-xs">تومان</span>
                  <span className={clsx("font-bold text-lg", trx.amount > 0 ? "text-green-500" : "text-blue-600")}>
                    {Math.abs(trx.amount).toLocaleString()} {trx.amount > 0 ? "+" : "-"}
                  </span>
               </div>

               {/* شناسه */}
               <div className="text-gray-600 font-medium text-center flex justify-between md:justify-center">
                 <span className="md:hidden text-gray-500 ml-2">شناسه:</span>
                 {trx.trackId}
               </div>

               {/* زمان */}
               <div className="text-gray-500 text-sm text-center dir-ltr flex justify-between md:justify-center">
                 <span className="md:hidden text-gray-500 ml-2">زمان:</span>
                 {trx.date}
               </div>

               {/* Icon */}
               <div className="flex justify-end text-gray-400">
                  {expandedId === trx.id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
               </div>
            </div>

            {/* Expanded Details */}
            {expandedId === trx.id && (
                <div className="bg-blue-50/50 p-4 border-t border-gray-100 flex flex-wrap gap-4 justify-center md:justify-start">
                    <DetailChip label="شماره ارجاع" value={trx.details.refId} />
                    <DetailChip label="درگاه بانک" value={trx.details.gateway} />
                    <DetailChip label="نام مسافر" value={trx.details.passenger} />
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// چیپ‌های جزئیات تراکنش
function DetailChip({ label, value }: { label: string, value: string }) {
    return (
        <div className="border border-blue-200 bg-white rounded-lg px-4 py-2 flex items-center gap-2 text-sm">
            <span className="text-gray-500">{label}:</span>
            <span className="text-gray-800 font-bold">{value}</span>
        </div>
    )
}