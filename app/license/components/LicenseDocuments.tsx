"use client";

import React from "react";
import {
  DriveEta,
  Badge,
  PhotoCamera,
  BorderColor,
} from "@mui/icons-material";

const docs = [
  {
    icon: <DriveEta />,
    title: "گواهینامه رانندگی معتبر",
    desc: "اسکن پشت و رو گواهینامه ایرانی",
    color: "bg-sky-100 text-sky-700",
  },
  {
    icon: <Badge />,
    title: "کارت ملی یا پاسپورت",
    desc: "برای احراز هویت متقاضی",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: <PhotoCamera />,
    title: "عکس پرسنلی",
    desc: "زمینه روشن، تمام رخ، جدید",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: <BorderColor />,
    title: "فرم درخواست",
    desc: "تکمیل‌شده و امضا شده",
    color: "bg-violet-100 text-violet-700",
  },
];

export default function LicenseDocuments() {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-1.5 h-8 bg-sky-950 rounded-full"></span>
        <h2 className="text-xl font-bold text-gray-800">مدارک مورد نیاز</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((doc, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl border border-gray-200 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${doc.color}`}
            >
              {doc.icon}
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">{doc.title}</h4>
              <span className="text-xs text-gray-500">{doc.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
