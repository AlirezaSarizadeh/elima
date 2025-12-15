"use client";

import React, { useState } from "react";
import CheckoutStepper from "./components/CheckoutStepper";
import StepPassengers from "./components/StepPassengers";
import StepReview from "./components/StepReview";
import StepPaymentResult from "./components/StepPaymentResult";

export default function CheckoutPage() {
    // مدیریت مراحل:
    // 1 & 2: در عکس‌ها نبود، فرض میکنیم رد شده‌اند و از 3 شروع میکنیم (اطلاعات مسافران)
    // طبق عکس استپر شما: 
    // 3: دریافت اطلاعات (Passengers)
    // 4: پرداخت (Review & Pay)
    // 5: دریافت بلیط (Result)
    const [currentStep, setCurrentStep] = useState(3);
    const [paymentStatus, setPaymentStatus] = useState<'success' | 'failure' | null>(null);

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    const handlePaymentResult = (isSuccess: boolean) => {
        setPaymentStatus(isSuccess ? 'success' : 'failure');
        setCurrentStep(5); // رفتن به مرحله آخر
    };

    const handleRetry = () => {
        setPaymentStatus(null);
        setCurrentStep(4); // بازگشت به مرحله پرداخت
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-10" dir="rtl">

            {/* 1. نوار پیشرفت */}
            <CheckoutStepper currentStep={currentStep} />

            <div className="container mx-auto px-0 max-w-7xl px-4">

                {/* 2. رندر شرطی مراحل */}

                {currentStep === 3 && (
                    <StepPassengers onNext={nextStep} />
                )}

                {currentStep === 4 && (
                    <StepReview
                        onPay={handlePaymentResult}
                        onBack={prevStep} // 👈 اتصال تابع بازگشت
                    />
                )}

                {currentStep === 5 && paymentStatus && (
                    <StepPaymentResult status={paymentStatus} onRetry={handleRetry} />
                )}

            </div>
        </div>
    );
}