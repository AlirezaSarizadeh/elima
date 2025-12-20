"use client";

import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, InputAdornment, FormControl, InputLabel } from "@mui/material";
import { Add, Remove, PhoneAndroid, CalendarMonth, ArrowBack, Shortcut, ShortcutOutlined } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import PassengerSelection from "../../../../visa/components/PassengerSelection";

export default function BookingForm() {
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(1);

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-1 text-center">اطلاعات خود را وارد کنید.</h3>
            <p className="text-gray-500 text-sm text-center mb-6">تور مثلث طلایی هند</p>

            <div className="flex flex-col gap-4">

                <FormControl>
                    <InputLabel id="demo-multiple-name-label"> تاریخ اجرای تور</InputLabel>
                    <Select
                        label="      s  تاریخ اجرای تور"
                        fullWidth
                        defaultValue="date1"
                        size="medium"
                        sx={{ borderRadius: "12px", fontSize: "14px" }}
                    >
                        <MenuItem value="date1" className="text-sm">۱۸ تا ۲۱ مهر</MenuItem>
                        <MenuItem value="date2" className="text-sm">۲۵ تا ۲۸ مهر</MenuItem>
                    </Select>
                </FormControl>

                <PassengerSelection />

                {/* شماره موبایل */}
                <div>
                    <TextField
                        fullWidth
                        label="  شماره موبایل"
                        // placeholder="شماره موبایل"
                        size="medium"
                        dir="ltr"
                        InputProps={{
                            startAdornment: <InputAdornment position="start" className="text-gray-400">+98</InputAdornment>,
                            style: { borderRadius: "12px", fontSize: "14px" }
                        }}
                    />
                </div>

                {/* جمع کل */}
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600 font-bold my-1">کل مبلغ پرداختی</span>
                    <div className="flex items-center text-blue-600 font-bold text-sm flex-col gap-1">
                        <span className="flex items-center gap-1">۳۰۰,۰۰۰,۰۰۰

                            <Image src={'/images/Price.svg'} width={18} height={18} alt="تومان" />

                        </span>
                        <span className="text-xs font-normal text-gray-500 flex items-center">
                            + ۳۰۰ دلار</span>
                    </div>
                </div>

                {/* دکمه رزرو */}
                <Link href={'#!'} className="block w-full">
                    <Button variant="contained" className="w-full" sx={{
                        padding: '10px',
                        borderRadius: '10px'
                    }}>رزرو تور</Button>
                </Link>

                <Link
                    href={`/tours/س/flights`}
                    className="text-gray-600 hover:text-black border border-gray-300 px-4 py-3 rounded-lg text-sm flex items-center justify-between gap-2 transition-colors"
                >
                    {/* <ArrowLeft size={16} className="rotate-180" /> */}
                    مرحله قبل (پرواز)
                    <ShortcutOutlined/>
                </Link>

            </div>
        </div>
    );
}