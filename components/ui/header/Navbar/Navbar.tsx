'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Drawer, IconButton } from '@mui/material'
import { PhoneCallback, Login, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'

// ایمپورت کامپوننت‌های ساخته شده
import { MegaMenu } from './MegaMenu' // کامپوننت دسکتاپ
import { MobileAccordionItem } from './MobileDrawer' // کامپوننت موبایل
import { AuthDialog } from './AuthDialog'
import { menuData } from './megaMenuData'

export const Navbar = () => {
  // استیت‌های مربوط به باز/بسته شدن منوها
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  
  // استیت برای مدیریت منوی باز شده در دسکتاپ و موبایل
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [mobileOpenId, setMobileOpenId] = useState<number | null>(null)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <>
      <header className="w-full bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4" dir="rtl">

          {/* --- بخش راست: دکمه همبرگری (موبایل) + لوگو --- */}
          <div className="flex items-center gap-3">
            {/* دکمه همبرگری فقط در موبایل */}
            <div className="lg:hidden">
              <IconButton onClick={handleDrawerToggle} className="bg-gray-50 text-gray-700">
                <MenuIcon />
              </IconButton>
            </div>

            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo.png" 
                alt="logo" 
                width={160} 
                height={54} 
                className="object-contain"
              />
            </Link>
          </div>

          {/* --- بخش وسط: منوی دسکتاپ (فقط در LG به بالا) --- */}
          <nav className="hidden lg:flex gap-1 items-center h-full">
            {menuData.map((menu) => (
              <MegaMenu
                key={menu.id}
                id={menu.id}
                label={menu.label}
                data={{ items: menu.items }}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
              />
            ))}
          </nav>

          {/* --- بخش چپ: دکمه‌ها (تماس و ورود) --- */}
          <div className="flex items-center gap-3">
            {/* دکمه تماس (در موبایل شاید بخواهید فقط آیکون باشد، اما فعلا کامل گذاشتم) */}
            <Button 
              href="tel:+982145123456" 
              startIcon={<PhoneCallback className="ml-1" />} 
              variant="outlined"
              color="primary"
              className="hidden sm:flex" // در موبایل‌های خیلی کوچک مخفی شود
              sx={{
                borderRadius: "12px",
                padding: "8px 16px",
                fontFamily: 'inherit',
                fontWeight: 'bold',
                direction: 'ltr' // شماره تلفن چپ‌چین
              }}
            >
              021-45123456
            </Button>

            <Button 
              startIcon={<Login className="ml-1" />} 
              variant="contained"
              onClick={() => setAuthOpen(true)}
              sx={{
                borderRadius: "12px",
                padding: "8px 16px",
                fontFamily: 'inherit',
                fontWeight: 'bold',
                boxShadow: 'none',
                '&:hover': { boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' }
              }}
            >
              <span className="hidden sm:inline">ورود / ثبت نام</span>
              <span className="sm:hidden">ورود</span>
            </Button>
          </div>

        </div>
      </header>

      {/* --- منوی کشویی موبایل (Drawer) --- */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        dir="rtl"
        PaperProps={{
          className: "w-[85%] max-w-[320px] bg-white flex flex-col h-full"
        }}
      >
        {/* ۱. هدر داخل دراور */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
           <span className="font-bold text-gray-800 text-lg">منوی اصلی</span>
           <IconButton onClick={handleDrawerToggle} className="bg-gray-50 hover:bg-red-50 hover:text-red-500">
             <CloseIcon />
           </IconButton>
        </div>

        {/* ۲. محتوای اسکرول‌خور (لیست منوها) */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col gap-1">
            {menuData.map((menu) => (
              <MobileAccordionItem
                key={menu.id}
                id={menu.id}
                label={menu.label}
                items={menu.items}
                isOpen={mobileOpenId === menu.id}
                onToggle={() => setMobileOpenId(mobileOpenId === menu.id ? null : menu.id)}
                onLinkClick={() => setMobileOpen(false)}
              />
            ))}
          </div>
        </div>

        {/* ۳. فوتر دراور (دکمه‌های پایین) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
           <Button 
             fullWidth 
             href="tel:+982145123456" 
             variant="outlined" 
             startIcon={<PhoneCallback />}
             className=" !bg-white"
             sx={{ borderRadius: '10px', height: '48px', marginBottom:'10px' }}
           >
             021-45123456
           </Button>
           
           <Button 
             fullWidth 
             variant="contained" 
             onClick={() => {
               setMobileOpen(false);
               setAuthOpen(true);
             }}
             startIcon={<Login />}
             sx={{ borderRadius: '10px', height: '48px', fontFamily: 'inherit' }}
           >
             ورود یا ثبت نام
           </Button>
        </div>
      </Drawer>

      {/* مودال ورود/ثبت نام */}
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}