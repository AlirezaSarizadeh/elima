// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { yekanBakh } from './fonts/yekanbakh'
import { Navbar } from '../components/ui/header/Navbar/Navbar'
import Footer from '../components/ui/footer/Footer'
import MuiRtlProvider from '../theme/RtlProvider'
import AuthBootstrap from '../components/ui/header/Navbar/AuthBootstrap'
import { LayoutProvider } from '../lib/layoutContext'
import { getLayoutData } from '../lib/getLayoutData'

const BASE_URL = 'https://elimagasht.net'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'الیماگشت پاسارگاد | آژانس مسافرتی تور و بلیط هواپیما',
    template: '%s | الیماگشت پاسارگاد',
  },
  description: 'الیماگشت پاسارگاد، مجری مستقیم تورهای داخلی و خارجی، بلیط هواپیما، هتل و اخذ ویزا. بهترین قیمت با پشتیبانی ۲۴ ساعته.',
  keywords: [
    'آژانس مسافرتی',
    'تور داخلی',
    'تور خارجی',
    'بلیط هواپیما',
    'رزرو هتل',
    'اخذ ویزا',
    'الیماگشت',
    'تور ارزان',
  ],
  authors: [{ name: 'الیماگشت پاسارگاد', url: BASE_URL }],
  creator: 'الیماگشت پاسارگاد',
  publisher: 'الیماگشت پاسارگاد',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'fa-IR': BASE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: BASE_URL,
    siteName: 'الیماگشت پاسارگاد',
    title: 'الیماگشت پاسارگاد | آژانس مسافرتی تور و بلیط هواپیما',
    description: 'مجری مستقیم تورهای داخلی و خارجی، بلیط هواپیما، هتل و اخذ ویزا با بهترین قیمت.',
    images: [
      {
        url: '/images/og-image.png', // یه تصویر 1200x630 بساز
        width: 1200,
        height: 630,
        alt: 'الیماگشت پاسارگاد',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الیماگشت پاسارگاد | آژانس مسافرتی',
    description: 'مجری مستقیم تورهای داخلی و خارجی، بلیط هواپیما و اخذ ویزا.',
    images: ['/images/og-image.png'],
  },
  verification: {
    // google: 'YOUR_GOOGLE_SEARCH_CONSOLE_CODE', // بعداً اضافه کن
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const layoutData = await getLayoutData()

  return (
    <html lang="fa" dir="rtl" data-season="autumn" className={`${yekanBakh.variable}`}>
      <body className="font-yekan text-right bg-white" style={{ overflow: 'clip' }} suppressHydrationWarning>
        <MuiRtlProvider>
          <LayoutProvider data={layoutData}>
            <Navbar />
            <AuthBootstrap>{children}</AuthBootstrap>
            <Footer />
          </LayoutProvider>
        </MuiRtlProvider>
      </body>
    </html>
  )
}