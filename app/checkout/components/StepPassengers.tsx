"use client";

import React from "react";
import { TextField, Button, MenuItem, Select } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";
import Title from "../../../components/ui/Title/Title";
import Image from "next/image";

export default function StepPassengers({ onNext }: { onNext: () => void }) {
    return (
        <div className="flex flex-col gap-6">

            {/* هدر */}
            <div className="flex justify-between items-start flex-col">
                <Title icon={<img src='/images/people-icon.svg'/>} title="مشخصات مسافران" />
                <div className="flex gap-2 text-left text-sm text-gray-500">
                    <span>دو بزرگسال</span>
                    <span>یک کودک</span>
                </div>
            </div>

            {/* فرم سرپرست */}
            <PassengerFormSection
                title="بزرگسال - سرپرست"
                showPreviousBtn
            />

            {/* فرم بزرگسال دوم */}
            <PassengerFormSection
                title="بزرگسال"
                showPreviousBtn
            />

            {/* فرم کودک */}
            <PassengerFormSection
                title="کودک"
                showPreviousBtn
                isChild
            />

            {/* فوتر قیمت و دکمه ادامه */}
            <div className="bg-blue-50 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-bold">قیمت کل:</span>
                    <span className="text-blue-600 font-bold text-2xl">۳۰۰,۰۰۰,۰۰۰</span>
                    <span className="text-gray-500 text-sm flex gap-1">
                        <Image src={'/images/Price.svg'} width={18} height={18} alt="تومان" /> + ۳۰۰ دلار</span>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <span className="text-xs text-gray-500 hidden md:block">
                        با کلیک روی تایید و ادامه خرید با <span className="text-blue-500 cursor-pointer">قوانین سایت</span> موافقت کرده‌اید.
                    </span>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={onNext}
                        sx={{ bgcolor: '#0066ff', borderRadius: '10px', padding: '10px 30px', fontWeight: 'bold' }}
                    >
                        تایید و ادامه خرید
                    </Button>
                </div>
            </div>
        </div>
    );
}

// کامپوننت فرم تکی (Reusable)
function PassengerFormSection({ title, showPreviousBtn, isChild }: any) {
    return (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                {showPreviousBtn && (
                    <Button variant="outlined" sx={{ borderRadius: '10px' }}>
                        انتخاب مسافران سابق
                    </Button>
                )}
                <div className="bg-blue-50 text-blue-600 px-4 py-1 rounded-lg font-bold text-sm border border-blue-100">
                    {title}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* سطر اول */}
                <TextField label={isChild ? "نام و نام خانوادگی (انگلیسی)" : "نام و نام خانوادگی (فارسی)"} fullWidth size="small" />
                <TextField label="کد ملی" fullWidth size="small" />
                <TextField label="شماره موبایل" fullWidth size="small" />
                <TextField label="جنسیت" select fullWidth size="small" defaultValue="">
                    <MenuItem value="male">مذکر</MenuItem>
                    <MenuItem value="female">مونث</MenuItem>
                </TextField>

                {/* سطر دوم */}
                <TextField label="تاریخ تولد" placeholder="روز / ماه / سال" fullWidth size="small" />

                {/* فقط برای بزرگسالان پاسپورت نیاز است (طبق عکس) */}
                <TextField label="ملیت" select fullWidth size="small" defaultValue="iran">
                    <MenuItem value="iran">ایران</MenuItem>
                </TextField>

                <TextField label="شماره پاسپورت" fullWidth size="small" />
                <TextField label="تاریخ انقضای پاسپورت" placeholder="روز / ماه / سال" fullWidth size="small" />
            </div>
        </div>
    )
}