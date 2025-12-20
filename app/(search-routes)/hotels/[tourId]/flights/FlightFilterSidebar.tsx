"use client";
import React from "react";
import { Checkbox, FormControlLabel, Slider } from "@mui/material";
import FilterCard from "../../../../../components/filters/FilterCard";

export default function FlightFilterSidebar() {
    return (
        <div className="flex flex-col gap-2">

            <div className="text-sm text-gray-500 bg-white p-4 rounded-xl mb-4 border border-gray-200">
                تعداد نتایج: <span className="font-semibold text-black">12</span> پرواز
            </div>

            {/* 1. انتخاب ایرلاین */}
            <FilterCard title="شرکت‌های هواپیمایی" defaultOpen>
                {['ماهان', 'ایران‌ایر', 'امارات', 'ترکیش', 'قطر ایرویز'].map((airline, i) => (
                    <FormControlLabel key={i} control={<Checkbox size="small" />} label={<span className="text-sm">{airline}</span>} />
                ))}
            </FilterCard>

            {/* 2. ساعت حرکت */}
            <FilterCard title="ساعت حرکت" defaultOpen>
                <div className="px-2 pt-2">
                    <Slider defaultValue={[8, 22]} min={0} max={24} valueLabelDisplay="auto" size="small" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>۰۰:۰۰</span>
                        <span>۲۴:۰۰</span>
                    </div>
                </div>
            </FilterCard>

            {/* 3. کلاس پروازی */}
            <FilterCard title="کلاس پروازی">
                {['اکونومی', 'بیزنس', 'فرست کلاس'].map((cls, i) => (
                    <FormControlLabel key={i} control={<Checkbox size="small" />} label={<span className="text-sm">{cls}</span>} />
                ))}
            </FilterCard>

        </div>
    );
}