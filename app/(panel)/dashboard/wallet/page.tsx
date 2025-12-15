"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
    PersonOutline, 
    FlightTakeoff, 
    Autorenew, 
    FavoriteBorder, 
    CreditCard, 
    ExitToApp, 
    Edit, 
    Add, 
    AccountBalanceWallet,
    CheckCircleOutline,
    ErrorOutline
} from "@mui/icons-material";
import { TextField, Button, InputAdornment } from "@mui/material";

export default function WalletPage() {
  const [amount, setAmount] = useState("");

  // مبالغ پیشنهادی
  const quickAmounts = [1000000, 2000000, 5000000, 10000000];

  return (
            <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                    <h1 className="text-xl font-bold text-gray-800">افزایش اعتبار کیف پول</h1>
                    <div className="bg-blue-50 text-blue-600 p-2 rounded-xl">
                        <AccountBalanceWallet />
                    </div>
                </div>

                {/* Credit Card Visual (بخش نمایشی موجودی فعلی) */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-6 text-white mb-8 shadow-lg shadow-blue-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10 flex justify-between items-end">
                        <div>
                            <p className="text-blue-100 text-sm mb-1">موجودی فعلی شما</p>
                            <h2 className="text-3xl font-bold">۳۰,۴۰۰,۰۰۰ <span className="text-lg font-normal opacity-80">تومان</span></h2>
                        </div>
                        <div className="text-left">
                            <p className="text-blue-100 text-xs mb-1">شماره کیف پول</p>
                            <p className="font-mono text-lg tracking-widest">IR-8829-0012</p>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* ورودی مبلغ */}
                    <div className="flex flex-col gap-4">
                        <label className="font-bold text-gray-700">مبلغ افزایش اعتبار را وارد کنید:</label>
                        <TextField
                            fullWidth
                            placeholder="مثلا: ۵,۰۰۰,۰۰۰"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end" className="text-gray-500">تومان</InputAdornment>,
                                style: { borderRadius: '16px', backgroundColor: '#f9fafb', fontSize: '1.2rem', fontWeight: 'bold' }
                            }}
                            sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e5e7eb' } }}
                        />

                        {/* دکمه‌های انتخاب سریع */}
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            {quickAmounts.map((amt) => (
                                <button
                                    key={amt}
                                    onClick={() => setAmount(amt.toLocaleString())}
                                    className="border border-gray-200 hover:border-blue-500 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl py-2 text-sm font-medium transition-all"
                                >
                                    {amt.toLocaleString()} تومان
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* دکمه پرداخت و توضیحات */}
                    <div className="flex flex-col justify-between">
                         {/* باکس آبی توضیحات (مشابه عکس رفرنس) */}
                         <div className="bg-blue-50 rounded-2xl p-4 text-sm text-blue-800 leading-7 mb-4">
                            <div className="flex items-center gap-2 font-bold mb-2">
                                <ErrorOutline fontSize="small" />
                                قوانین کیف پول
                            </div>
                            <ul className="list-disc list-outside pr-4 space-y-1 text-blue-700/80">
                                <li>مبلغ کیف پول قابل برداشت و عودت نمی‌باشد.</li>
                                <li>اعتبار کیف پول برای تمامی تورها و پروازها قابل استفاده است.</li>
                                <li>در صورت لغو سفر، مبلغ به همین کیف پول بازگردانده می‌شود.</li>
                            </ul>
                        </div>

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                bgcolor: '#0066ff',
                                borderRadius: '16px',
                                padding: '14px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                boxShadow: '0 8px 20px rgba(0, 102, 255, 0.2)',
                                '&:hover': { bgcolor: '#0052cc', boxShadow: '0 10px 25px rgba(0, 102, 255, 0.3)' }
                            }}
                        >
                            پرداخت و افزایش اعتبار
                        </Button>
                    </div>

                </div>

            </div>
  );
}

// --- کامپوننت آیتم منو (برای تمیزی کد) ---
function MenuItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <Link href="#" className={`flex items-center gap-3 p-4 rounded-2xl transition-all ${active ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
            <div className={active ? "text-blue-600" : "text-gray-400"}>
                {icon}
            </div>
            <span>{label}</span>
        </Link>
    );
}