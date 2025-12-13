"use client";

import React, { useState } from "react";
import { Button, MenuItem, TextField, Modal, Box, Typography } from "@mui/material";
import { AirplaneTicketOutlined, PersonOutline, MonetizationOnOutlined, EditOutlined, ArrowForward } from "@mui/icons-material";
import StepHotelInfo from "./StepHotelInfo";
import Title from "../../../components/ui/Title/Title";

// 1. اضافه کردن onBack به تایپ پراپ‌ها
interface StepReviewProps {
    onPay: (success: boolean) => void;
    onBack: () => void;
}

export default function StepReview({ onPay, onBack }: StepReviewProps) {
    const [openCurrencyModal, setOpenCurrencyModal] = useState(false);

    const handlePaymentClick = () => {
        setOpenCurrencyModal(true);
    };

    const proceedToGateway = () => {
        setOpenCurrencyModal(false);
        const isSuccess = Math.random() > 0.5;
        onPay(isSuccess);
    };

    return (
        <div className="flex flex-col gap-6">

            <div className="flex justify-start items-center gap-2">
                <AirplaneTicketOutlined className="text-blue-600" />
                <h2 className="font-bold text-gray-800">اطلاعات بلیط</h2>
            </div>

            {/* کارت اطلاعات بلیط */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span>تاریخ رفت: ۱۴۰۳/۰۷/۱۸</span>
                        <span>شماره پرواز: ۵۷۶۷</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-50 pb-2">
                        <span>ساعت پرواز: ۲۰:۳۰</span>
                        <span>میزان بار مجاز: ۳۰ کیلوگرم</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-start items-center gap-2 mt-4">
                <Title icon={<img src='/images/people-icon.svg' />} title="مشخصات مسافران" />
            </div>

            {/* جدول مسافران */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6 overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm text-center">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="p-3 rounded-r-lg">ویرایش</th>
                            <th className="p-3">جنسیت</th>
                            <th className="p-3">تاریخ تولد</th>
                            <th className="p-3">نوع مسافر</th>
                            <th className="p-3 text-right rounded-l-lg">نام مسافر</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-50">
                            {/* اینجا هم میتوانید دکمه ادیت را به onBack متصل کنید یا لاجیک جداگانه داشته باشید */}
                            <td className="p-3 text-blue-500 cursor-pointer" onClick={onBack}>
                                <EditOutlined fontSize="small" />
                            </td>
                            <td className="p-3">مذکر</td>
                            <td className="p-3 dir-ltr">1362/04/23</td>
                            <td className="p-3 text-gray-500">بزرگسال</td>
                            <td className="p-3 text-right font-bold">کوروش صفایی</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <StepHotelInfo />

            {/* فوتر پرداخت */}
            <div className="bg-blue-50 p-6 rounded-2xl flex flex-col lg:flex-row justify-between items-center gap-4 mt-8">
                <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-start">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-bold">قیمت کل:</span>
                        <span className="text-blue-600 font-bold text-2xl">۳۰۰,۰۰۰,۰۰۰</span>
                        <span className="text-gray-500 text-sm">تومان + ۳۰۰ دلار</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-3 w-full lg:w-auto">
                    <TextField
                        select
                        label="درگاه پرداخت"
                        size="small"
                        defaultValue="saman"
                        sx={{ minWidth: 200, bgcolor: 'white', width: { xs: '100%', md: 'auto' } }}
                    >
                        <MenuItem value="saman">پرداخت از بانک های عضو شتاب</MenuItem>
                    </TextField>

                    {/* دکمه‌ها */}
                    <div className="flex gap-2 w-full md:w-auto">
                        {/* 2. دکمه بازگشت */}
                        <Button
                            variant="outlined"
                            onClick={onBack}
                            sx={{
                                borderRadius: '10px',
                                padding: '10px 20px',
                                fontWeight: 'bold',
                                borderColor: '#0066ff',
                                color: '#0066ff',
                                flex: 1,
                                whiteSpace: 'nowrap'
                            }}
                        >
                            بازگشت
                        </Button>

                        {/* دکمه پرداخت */}
                        <Button
                            variant="contained"
                            onClick={handlePaymentClick}
                            sx={{
                                bgcolor: '#0066ff',
                                borderRadius: '10px',
                                padding: '10px 30px',
                                fontWeight: 'bold',
                                flex: 2,
                                whiteSpace: 'nowrap'
                            }}
                        >
                            تایید و ادامه خرید
                        </Button>
                    </div>
                </div>
            </div>

            {/* مودال اخطار ارزی */}
            <Modal open={openCurrencyModal} onClose={() => setOpenCurrencyModal(false)}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 400, bgcolor: '#1e293b', color: 'white', borderRadius: 4, p: 4, textAlign: 'center'
                }}>
                    <div className="flex justify-center mb-4">
                        <div className="bg-blue-600 p-4 rounded-full">
                            <MonetizationOnOutlined fontSize="large" />
                        </div>
                    </div>
                    <Typography variant="body1" sx={{ mb: 3, lineHeight: 2 }}>
                        بخشی از مبلغ سفر شما به صورت ارزی است...
                    </Typography>
                    <div className="flex gap-2">
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => setOpenCurrencyModal(false)}
                            sx={{ color: 'white', borderColor: 'white' }}
                        >
                            انصراف
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={proceedToGateway}
                            sx={{ bgcolor: '#0066ff', fontWeight: 'bold' }}
                        >
                            تایید و پرداخت
                        </Button>
                    </div>
                </Box>
            </Modal>

        </div>
    );
}