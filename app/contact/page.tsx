import React from 'react';
import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'تماس با ما | الیماگشت پاسارگاد',
  description: 'راه‌های ارتباطی با آژانس مسافرتی الیماگشت. تلفن، آدرس و پشتیبانی ۲۴ ساعته.',
  keywords: ['تماس با الیماگشت', 'آدرس الیماگشت', 'تلفن آژانس هواپیمایی'],
};

export default function ContactPage() {
  return <ContactContent />;
}