"use client";
import React from "react";
import { Checkbox, FormControlLabel, TextField, Rating, Switch } from "@mui/material";
import FilterCard from "../../../../../components/filters/FilterCard";

export default function HotelFilterSidebar() {
    return (
        <div className="flex flex-col gap-2">

            {/* 1. جستجوی نام هتل */}
            {/* <FilterCard title="نام هتل" defaultOpen>
                <TextField fullWidth placeholder="جستجو..." size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }} />
            </FilterCard> */}

            <div className="text-sm text-gray-500 bg-white p-4 rounded-xl mb-4 border border-gray-200">
                تعداد نتایج: <span className="font-semibold text-black">21</span> هتل
            </div>

            {/* 2. ستاره هتل */}
            <FilterCard title="تعداد ستاره" defaultOpen>
                <div className="flex flex-col gap-1">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <FormControlLabel
                            key={star}
                            control={<Checkbox size="small" />}
                            label={<div className="flex items-center pt-1"><Rating value={star} readOnly size="small" /></div>}
                        />
                    ))}
                </div>
            </FilterCard>

            {/* 3. امکانات هتل (مخصوص این صفحه) */}
            <FilterCard title="امکانات رفاهی">
                {['استخر', 'وای‌فای رایگان', 'باشگاه ورزشی', 'اسپا', 'ترانسفر فرودگاهی'].map((opt, i) => (
                    <FormControlLabel key={i} control={<Checkbox size="small" />} label={<span className="text-sm">{opt}</span>} />
                ))}
            </FilterCard>

        </div>
    );
}