"use client";

import React, { useState } from "react";
import { EditOutlined } from "@mui/icons-material";
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        firstNameFa: "کوروش",
        lastNameFa: "صفایی",
        firstNameEn: "Kourosh",
        lastNameEn: "Safayi",
        gender: "male",
        nationalId: "0021300875",
        passport: "K23456850",
        birthDate: "1382/11/01",
        mobile: "09961606078",
        email: "",
        iban: "",
        cardNum: "",
    });

    const handleEditToggle = () => setIsEditing(!isEditing);

    // ⬅️ ۱. تابع مدیریت تغییرات اینپوت‌ها
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (isEditing) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-xl font-normal text-gray-800 mb-6">ویرایش اطلاعات کاربری</h2>

                <div className="flex flex-col gap-6">
                    {/* بخش اطلاعات کاربری */}
                    <section>
                        <h3 className="font-normal text-gray-700 mb-4 border-b pb-2">اطلاعات کاربری</h3>
                        <div className="mb-4">
                            <label className="text-sm text-gray-500 ml-4">جنسیت</label>
                            <RadioGroup
                                row
                                name="gender" // نام اضافه شد
                                value={formData.gender}
                                onChange={handleInputChange} // از همان تابع هندلر استفاده شد
                            >
                                <FormControlLabel value="male" control={<Radio />} label="مذکر" />
                                <FormControlLabel value="female" control={<Radio />} label="مونث" />
                            </RadioGroup>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* ⬅️ ۲. اضافه کردن name و onChange به تمام فیلدها */}
                            <TextField
                                label="نام به فارسی"
                                name="firstNameFa"
                                fullWidth
                                value={formData.firstNameFa}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="نام خانوادگی به فارسی"
                                name="lastNameFa"
                                fullWidth
                                value={formData.lastNameFa}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="نام به انگلیسی"
                                name="firstNameEn"
                                fullWidth
                                value={formData.firstNameEn}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="نام خانوادگی به انگلیسی"
                                name="lastNameEn"
                                fullWidth
                                value={formData.lastNameEn}
                                onChange={handleInputChange}
                            />
                        </div>
                    </section>

                    {/* بخش اطلاعات مسافرتی */}
                    <section>
                        <h3 className="font-normal text-gray-700 mb-4 border-b pb-2">اطلاعات مسافرتی</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField
                                label="شماره ملی"
                                name="nationalId"
                                fullWidth
                                value={formData.nationalId}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="تاریخ تولد"
                                name="birthDate"
                                fullWidth
                                value={formData.birthDate}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="شماره پاسپورت"
                                name="passport"
                                fullWidth
                                value={formData.passport}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="تاریخ انقضای پاسپورت"
                                name="passportExpiry" // یک نام جدید (باید در state هم باشد اگر می‌خواهید ذخیره شود)
                                fullWidth
                            // مقدار value و onChange را هم باید اضافه کنید اگر در state دارید
                            />
                        </div>
                    </section>

                    {/* بخش اطلاعات تماس */}
                    <section>
                        <h3 className="font-normal text-gray-700 mb-4 border-b pb-2">اطلاعات تماس</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField
                                label="شماره موبایل"
                                name="mobile"
                                fullWidth
                                value={formData.mobile}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="ایمیل (اختیاری)"
                                name="email"
                                fullWidth
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </section>

                    {/* دکمه‌ها */}
                    <div className="flex gap-3 mt-4 justify-end">
                        <Button variant="outlined" onClick={handleEditToggle} sx={{ borderRadius: '12px', padding: '10px 24px' }}>
                            انصراف
                        </Button>
                        <Button variant="contained" onClick={handleEditToggle} sx={{ borderRadius: '12px', padding: '10px 24px', bgcolor: '#2563eb' }}>
                            ذخیره تغییرات
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // حالت نمایش (View Mode) - بدون تغییر
    return (
        <div className="flex flex-col gap-6">
            <InfoCard
                title="اطلاعات کاربری"
                onEdit={handleEditToggle}
                items={[
                    { label: "نام و نام خانوادگی", value: `${formData.firstNameFa} ${formData.lastNameFa}` },
                    { label: "موجودی حساب کاربری", value: "30,400,000 تومان", isPrice: true },
                ]}
            />
            <InfoCard
                title="اطلاعات مسافرتی"
                onEdit={handleEditToggle}
                items={[
                    { label: "تاریخ تولد", value: formData.birthDate },
                    { label: "کد ملی", value: formData.nationalId },
                    { label: "شماره پاسپورت", value: formData.passport },
                    { label: "تاریخ انقضای پاسپورت", value: "-" },
                ]}
            />
            <InfoCard
                title="اطلاعات تماس"
                onEdit={handleEditToggle}
                items={[
                    { label: "شماره موبایل", value: formData.mobile },
                    { label: "تلفن ثابت", value: "-" },
                ]}
            />
            <InfoCard
                title="اطلاعات بانکی"
                onEdit={handleEditToggle}
                items={[
                    { label: "شماره کارت", value: formData.cardNum || "-" },
                    { label: "شماره شبا", value: formData.iban || "-" },
                ]}
            />
        </div>
    );
}

// --- کامپوننت کمکی (بدون تغییر) ---
interface InfoCardProps {
    title: string;
    onEdit: () => void;
    items: { label: string; value: string; isPrice?: boolean }[];
}

function InfoCard({ title, onEdit, items }: InfoCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 relative">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
                <button
                    onClick={onEdit}
                    className="flex items-center gap-1 text-blue-500 text-sm font-medium hover:bg-blue-50 px-0 py-1.5 rounded-lg transition-all"
                >
                    <span>ویرایش اطلاعات</span>
                    <EditOutlined fontSize="small" />
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-gray-50 pb-2 md:border-none md:pb-0">
                        <span className="text-gray-500 text-sm font-semibold">{item.label}</span>
                        <span className={`font-semibold text-gray-800 ${item.isPrice ? 'text-lg' : 'text-base'}`}>
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}