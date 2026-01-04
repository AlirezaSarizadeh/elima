import React from 'react';
import { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'درباره الیماگشت | مجری مستقیم تورهای لوکس و ویزا',
  description: 'با داستان الیماگشت پاسارگاد، تیمی خلاق و با تجربه در صنعت گردشگری آشنا شوید. ما خالق خاطرات سفر شما هستیم.',
  keywords: ['درباره الیماگشت', 'آژانس مسافرتی تهران', 'تورهای لوکس', 'اخذ ویزا'],
};

export default function AboutPage() {
  return <AboutContent />;
}