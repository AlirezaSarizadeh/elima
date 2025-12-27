"use client";

import React from "react";
import { Button, TextField, MenuItem, Divider } from "@mui/material";
import { SupportAgent, VerifiedUser } from "@mui/icons-material";
import PassengerSelection from "./PassengerSelection";

export default function VisaStickySidebar() {
    return (
        <div className="bg-white rounded-3xl p-6 sticky top-24 border border-gray-200">

            {/* عنوان کارت */}
            <div className="text-center mb-6">
                <span className="text-gray-500 text-sm">شروع قیمت از</span>
                <div className="flex items-center justify-center gap-1 mt-1 text-blue-700">
                    <span className="text-3xl font-black">۲۹۰</span>
                    <span className="text-sm font-bold">درهم</span>
                </div>
            </div>

            <div className="flex flex-col gap-5 mb-6">
                <TextField
                    select
                    label="انتخاب نوع ویزا"
                    variant="outlined"
                    size="medium"
                    defaultValue="14day"
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': { borderRadius: '12px', bgcolor: '#f8fafc' }
                    }}
                >
                    <MenuItem value="14day">۱۴ روزه عادی</MenuItem>
                    <MenuItem value="1month">۱ ماهه عادی</MenuItem>
                </TextField>
                <PassengerSelection />
            </div>

            <Button
                variant="contained"
                fullWidth
                sx={{
                    bgcolor: '#2563eb',
                    background: '#283e68',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '14px',
                    padding: '12px',
                    fontSize: '1rem',
                    boxShadow: '0 8px 16px rgba(37, 99, 235, 0.24)',
                    '&:hover': { boxShadow: '0 10px 20px rgba(37, 99, 235, 0.3)' }
                }}
            >
                ثبت درخواست آنلاین
            </Button>

            <div className="mt-4 flex items-center justify-center gap-1 text-xs text-gray-400">
                <VerifiedUser fontSize="inherit" />
                <span>تضمین بهترین قیمت</span>
            </div>

            <Divider sx={{ my: 3 }} />

            {/* بخش پشتیبانی */}
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                <div className="bg-white p-2 rounded-full shadow-sm text-blue-950">
                    <SupportAgent />
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-bold mb-0.5">نیاز به راهنمایی دارید؟</p>
                    <a href="tel:02142907" className="text-gray-800 font-black text-sm hover:text-blue-600 transition">
                        ۰۲۱-42907 (داخلی 4)
                    </a>
                </div>
            </div>

        </div>
    );
}