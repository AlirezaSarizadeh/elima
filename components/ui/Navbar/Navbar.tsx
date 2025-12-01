'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MegaMenu } from './MegaMenu'
import { MobileDrawer } from './MobileDrawer'
import { AuthDialog } from './AuthDialog'
import { useState } from 'react'
import { megaMenuData } from './megaMenuData'

export const Navbar = () => {
  const [authOpen, setAuthOpen] = useState(false)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-0 flex items-center justify-between py-3">

        {/* راست: لوگو */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="logo" width={160} height={48} />
        </Link>

        {/* وسط: منو دسکتاپ */}
        <nav className="hidden lg:flex gap-6 items-center">
          {megaMenuData.map((menu, index) => (
            <MegaMenu
              key={index}
              id={index}
              label={menu.sections[0]?.title || 'منو'}
              data={menu}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
            />
          ))}
        </nav>

        {/* چپ: آیکن‌ها */}
        <div className="flex items-center gap-2">
          <Link
            href="tel:+982145123456"
            className="btn border border-blue-500 text-blue-600 hover:bg-blue-50 hidden lg:flex items-center gap-1 px-3 py-1 rounded-2xl"
          >
            021-45123456
            <Image src='/images/call-header-icon.png' width={16} height={16} alt='icon' />
          </Link>

          <button
            className="btn bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 lg:flex items-center gap-1"
            onClick={() => setAuthOpen(true)}
          >
            <Image src='/images/login-header-icon.png' width={16} height={16} alt='icon' />
            ورود / ثبت‌نام
          </button>

          {/* Mobile Hamburger */}
          <div className="lg:hidden">
            <MobileDrawer />
          </div>
        </div>
      </div>

      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  )
}
