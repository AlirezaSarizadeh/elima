"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";

const sortOptions = [
    { id: 'luxury', label: 'لوکس‌ترین' },
    { id: 'special', label: 'تورهای ویژه' },
    { id: 'date', label: 'نزدیک‌ترین تاریخ' },
    { id: 'cheap', label: 'ارزان‌ترین' },
];

export default function SortBar() {
    const [activeSort, setActiveSort] = useState('luxury');

    return (
        <div className="flex items-center gap-3 w-full overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            <span className="font-semibold text-gray-800 text-sm whitespace-nowrap hidden md:flex items-center gap-2 ml-2">
                <Image alt="sort-icon" src={'/images/sort-icon.svg'} width={24} height={24} />
                مرتب‌سازی بر اساس
            </span>

            <div className="flex gap-2 min-w-max">
                {sortOptions.map((item) => {
                    const isActive = activeSort === item.id;
                    return (
                        <Button
                            key={item.id}
                            onClick={() => setActiveSort(item.id)}
                            variant={isActive ? "contained" : "text"}
                            disableElevation
                            size="small"
                            sx={{
                                borderRadius: '10px',
                                padding: '10px 20px',
                                fontSize: '13px',
                                fontFamily: 'inherit',
                                backgroundColor: isActive ? '#eff6ff' : 'transparent',
                                color: isActive ? '#2563eb' : '#4b5563',
                                border: '1px solid',
                                borderColor: isActive ? 'transparent' : 'rgba(0,0,0,0.1)',
                                '&:hover': {
                                    backgroundColor: isActive ? '#dbeafe' : '#f9fafb',
                                }
                            }}
                        >
                            {item.label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
}