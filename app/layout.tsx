import './globals.css'
import { yekanBakh } from './fonts/yekanbakh'
import { Navbar } from '../components/ui/Navbar/Navbar'

export const metadata = {
  title: 'الیمامگشت پاسارگاد',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${yekanBakh.variable}`}>
      <body className="font-yekan text-right bg-white">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
