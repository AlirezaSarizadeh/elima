'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Button,
  Drawer,
  IconButton,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Skeleton,
  CircularProgress,
  useMediaQuery,
  MenuItem,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  PhoneCallback,
  Login,
  Menu as MenuIcon,
  Close as CloseIcon,
  AccountCircle,
  Logout,
  AccountBalanceWallet,
  AddCircleOutline,
} from '@mui/icons-material'

// Components
import { MegaMenu } from './MegaMenu'
import { MobileAccordionItem } from './MobileDrawer'
import { AuthDialog } from './AuthDialog'
import { menuData } from './megaMenuData'

// Auth store
import { useAuthStore } from '../../../../lib/authStore.ts'

const PRIVATE_ROUTES = ['/account', '/dashboard', '/profile', '/wallet']

const UserMenuLoading = () => (
  <Box sx={{ p: 2, minWidth: 260 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
      <CircularProgress size={18} />
      <Typography variant="body2" sx={{ fontWeight: 800 }}>
        در حال بارگذاری حساب…
      </Typography>
    </Box>

    <Skeleton variant="rounded" height={52} sx={{ mb: 1.2, borderRadius: 2 }} />
    <Skeleton variant="rounded" height={52} sx={{ mb: 1.2, borderRadius: 2 }} />
    <Divider sx={{ my: 1.2 }} />
    <Skeleton variant="rounded" height={44} sx={{ mb: 1.2, borderRadius: 2 }} />
    <Skeleton variant="rounded" height={44} sx={{ borderRadius: 2 }} />
  </Box>
)

export const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md')) // < md

  // Drawer & Dialog
  const [mobileOpen, setMobileOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)

  // Menus (mega menu)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [mobileOpenId, setMobileOpenId] = useState<number | null>(null)

  // Auth
  const user = useAuthStore((s) => s.user)
  const loading = useAuthStore((s) => s.loading)
  const logout = useAuthStore((s) => s.logout)

  const showLoading = loading && !user

  // ✅ Account sheet برای همه‌ی حالت‌ها (دسکتاپ هم مثل موبایل از پایین باز میشه)
  const [accountSheetOpen, setAccountSheetOpen] = useState(false)

  const mobileAccountBtnRef = useRef<HTMLButtonElement | null>(null)

  const handleDrawerToggle = () => setMobileOpen((p) => !p)

  const userPhone = useMemo(() => user?.mobile_number || 'حساب کاربری', [user])
  const userName = useMemo(() => user?.name || 'کاربر', [user])

  const noRippleBtnProps = {
    disableRipple: true,
    disableFocusRipple: true,
    disableTouchRipple: true,
  } as const

  const noFocusRingSx = {
    '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
    '&:focus': { outline: 'none' },
    '&:focus-visible': { outline: 'none', boxShadow: 'none' },
  } as const

  const closeAccountSheet = () => {
    setAccountSheetOpen(false)
    requestAnimationFrame(() => {
      mobileAccountBtnRef.current?.blur()
    })
  }

  const handleOpenAccount = () => {
    if (!user && !showLoading) return
    setAccountSheetOpen(true)
  }

  const handleLogout = async () => {
    closeAccountSheet()

    await logout()

    const isPrivate = PRIVATE_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
    if (isPrivate) router.replace('/')
  }

  // ✅ اگر user null شد، شیت بسته شود
  useEffect(() => {
    if (!user) setAccountSheetOpen(false)
  }, [user])

  // ✅ اگر user آمد، دیالوگ auth بسته شود
  useEffect(() => {
    if (user) setAuthOpen(false)
  }, [user])

  const AccountButton = ({
    variant,
    buttonRef,
  }: {
    variant: 'mobile' | 'desktop'
    buttonRef: React.RefObject<HTMLButtonElement | null>
  }) => {
    const commonSx = {
      borderRadius: '12px',
      fontFamily: 'inherit',
      fontWeight: 'bold',
      boxShadow: 'none',
      ...noFocusRingSx,
    }

    const mobileSx = {
      padding: '8px 10px',
      minWidth: 118,
      height: 40,
      fontSize: 13,
      borderRadius: '12px',
    }

    if (showLoading) {
      return (
        <Button
          ref={buttonRef}
          {...noRippleBtnProps}
          onClick={handleOpenAccount}
          variant="contained"
          startIcon={<AccountCircle className="ml-1" />}
          sx={{
            ...commonSx,
            ...(variant === 'mobile' ? mobileSx : { padding: '8px 16px', height: 42 }),
          }}
        >
          <Skeleton
            variant="text"
            width={variant === 'mobile' ? 70 : 90}
            sx={{ bgcolor: 'rgba(255,255,255,0.35)' }}
          />
        </Button>
      )
    }

    if (!user) {
      return (
        <Button
          ref={buttonRef}
          {...noRippleBtnProps}
          startIcon={<Login className="ml-1" />}
          variant="contained"
          onClick={(e) => {
            e.stopPropagation()
            setAuthOpen(true)
          }}
          sx={{
            ...commonSx,
            ...(variant === 'mobile' ? mobileSx : { padding: '8px 16px', height: 42 }),
            '&:hover': { boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' },
            whiteSpace: 'nowrap',
          }}
        >
          ورود / ثبت‌نام
        </Button>
      )
    }

    return (
      <Button
        ref={buttonRef}
        {...noRippleBtnProps}
        onClick={handleOpenAccount}
        variant="contained"
        startIcon={<AccountCircle className="ml-1" />}
        sx={{
          ...commonSx,
          ...(variant === 'mobile' ? mobileSx : { padding: '8px 16px', height: 42 }),
          '&:hover': { boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' },
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ direction: 'ltr' }}>
          {variant === 'mobile' ? 'حساب کاربری' : userPhone}
        </span>
      </Button>
    )
  }

  const AccountMenuContent = () => {
    if (showLoading) return <UserMenuLoading />

    if (!user) {
      return (
        <Box sx={{ p: 2, minWidth: 260 }}>
          <Typography variant="body2" sx={{ fontWeight: 800, mb: 1 }}>
            وارد حساب نشده‌اید
          </Typography>
          <Button
            {...noRippleBtnProps}
            fullWidth
            variant="contained"
            onClick={() => {
              closeAccountSheet()
              setAuthOpen(true)
            }}
            sx={{ ...noFocusRingSx }}
          >
            ورود / ثبت نام
          </Button>
        </Box>
      )
    }

    return (
      <>
        <Box sx={{ px: 2, py: 1.5, bgcolor: 'grey.50' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 900 }}>
            {userName}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', direction: 'ltr' }}>
            {userPhone}
          </Typography>
        </Box>

        <Divider />

        <MenuItem disableRipple onClick={() => closeAccountSheet()}>
          <ListItemIcon>
            <AccountBalanceWallet fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="کیف پول"
            secondary="موجودی: — تومان"
            primaryTypographyProps={{ fontWeight: 800 }}
          />
        </MenuItem>

        <MenuItem disableRipple onClick={() => closeAccountSheet()}>
          <ListItemIcon>
            <AddCircleOutline fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="افزایش موجودی" primaryTypographyProps={{ fontWeight: 800 }} />
        </MenuItem>

        <Divider />

        <MenuItem disableRipple onClick={() => closeAccountSheet()}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="اطلاعات حساب کاربری" primaryTypographyProps={{ fontWeight: 800 }} />
        </MenuItem>

        <MenuItem disableRipple onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="خروج" primaryTypographyProps={{ fontWeight: 800 }} />
        </MenuItem>
      </>
    )
  }

  // ✅ fixed header + spacer
  const headerRef = useRef<HTMLElement | null>(null)
  const [headerH, setHeaderH] = useState(0)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const update = () => setHeaderH(el.getBoundingClientRect().height)
    update()

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null
    ro?.observe(el)

    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('resize', update)
      ro?.disconnect()
    }
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className="w-full bg-white fixed top-0 left-0 right-0 z-50 shadow-sm border-b border-gray-100"
      >
        <div
          className="max-w-7xl px-4 mx-auto flex items-center justify-between py-3 md:py-4 md:gap-5"
          dir="rtl"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="lg:hidden">
              <IconButton
                onClick={handleDrawerToggle}
                className="bg-gray-50 text-gray-700"
                sx={{ ...noFocusRingSx }}
              >
                <MenuIcon />
              </IconButton>
            </div>

            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={200}
                height={54}
                className="object-contain w-[130px] sm:w-[160px] md:w-[190px] h-auto"
                priority
              />
            </Link>
          </div>

          <nav className="hidden lg:flex gap-1 items-center h-full me-auto">
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

          {/* Right side */}
          {!isMobile ? (
            <div className="flex items-center gap-3">
              <Button
                {...noRippleBtnProps}
                href="tel:+982145123456"
                startIcon={<PhoneCallback className="ml-1" />}
                variant="outlined"
                color="primary"
                className="hidden sm:flex"
                sx={{
                  borderRadius: '12px',
                  padding: '8px 16px',
                  height: 42,
                  fontFamily: 'inherit',
                  fontWeight: 'bold',
                  direction: 'ltr',
                  ...noFocusRingSx,
                }}
              >
                021-45123456
              </Button>

              <AccountButton variant="desktop" buttonRef={mobileAccountBtnRef} />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <AccountButton variant="mobile" buttonRef={mobileAccountBtnRef} />
            </div>
          )}
        </div>
      </header>

      <div style={{ height: headerH }} />

      {/* --- Account Bottom Sheet (Desktop + Mobile) --- */}
      <Drawer
        anchor="bottom"
        open={accountSheetOpen}
        onClose={closeAccountSheet}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            overflow: 'hidden',
            maxWidth: 560,
            mx: 'auto',
            width: '100%',
          },
        }}
      >
        <Box dir="rtl">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
            <Typography sx={{ fontWeight: 900 }}>حساب کاربری</Typography>
            <IconButton onClick={closeAccountSheet} className="bg-gray-50" sx={{ ...noFocusRingSx }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ pb: 1 }}>
            <AccountMenuContent />
          </Box>
        </Box>
      </Drawer>

      {/* --- Mobile Drawer (Main menu) --- */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        dir="rtl"
        PaperProps={{
          className: 'w-[85%] max-w-[320px] bg-white flex flex-col h-full',
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-bold text-gray-800 text-lg">منوی اصلی</span>
          <IconButton onClick={handleDrawerToggle} className="bg-gray-50 hover:bg-red-50 hover:text-red-500">
            <CloseIcon />
          </IconButton>
        </div>

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

        <div className="p-4 border-t border-gray-100 bg-gray-50 md:hidden">
          <Button
            {...noRippleBtnProps}
            fullWidth
            href="tel:+982145123456"
            variant="outlined"
            startIcon={<PhoneCallback />}
            className=" !bg-white"
            sx={{ borderRadius: '10px', height: '48px', marginBottom: user ? '10px' : 0, ...noFocusRingSx }}
          >
            021-45123456
          </Button>

          {user ? (
            <Button
              {...noRippleBtnProps}
              fullWidth
              variant="contained"
              onClick={async () => {
                await handleLogout()
                setMobileOpen(false)
              }}
              startIcon={<Logout />}
              sx={{ borderRadius: '10px', height: '48px', fontFamily: 'inherit', ...noFocusRingSx }}
            >
              خروج از حساب
            </Button>
          ) : null}
        </div>
      </Drawer>

      {/* Auth Dialog */}
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
