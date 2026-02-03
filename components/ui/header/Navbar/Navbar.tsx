'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Button,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Skeleton,
  CircularProgress,
  useMediaQuery,
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

// ✅ همان مسیرهای خصوصی‌ای که در middleware گذاشتی
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

  // ✅ فقط وقتی user نداریم لودینگ نشون بده
  const showLoading = loading && !user

  // Desktop dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const dropdownOpen = Boolean(anchorEl)

  // Mobile bottom sheet (account)
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false)

  // ✅ برای blur فوکوس (رفع “شدو/هایلایت دور دکمه” بعد از بستن منو)
  const accountBtnRef = useRef<HTMLButtonElement | null>(null)

  const handleDrawerToggle = () => setMobileOpen((p) => !p)

  const userPhone = useMemo(() => user?.mobile_number || 'حساب کاربری', [user])
  const userName = useMemo(() => user?.name || 'کاربر', [user])

  const handleOpenDropdown = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseDropdown = () => {
    setAnchorEl(null)
    requestAnimationFrame(() => {
      accountBtnRef.current?.blur()
    })
  }

  const handleOpenAccount = (e?: React.MouseEvent<HTMLElement>) => {
    // ✅ در موبایل: bottom sheet
    if (isMobile) {
      setMobileAccountOpen(true)
      return
    }
    // ✅ در دسکتاپ: dropdown
    if (e) handleOpenDropdown(e)
  }

  const handleCloseMobileAccount = () => {
    setMobileAccountOpen(false)
    requestAnimationFrame(() => {
      accountBtnRef.current?.blur()
    })
  }

  const handleLogout = async () => {
    // هر دو حالت رو ببند
    handleCloseDropdown()
    handleCloseMobileAccount()

    await logout()

    const isPrivate = PRIVATE_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
    if (isPrivate) {
      router.replace('/')
    }
  }

  // ✅ اگر user null شد (logout یا session از دست رفت) منو بسته شود
  useEffect(() => {
    if (!user) {
      setAnchorEl(null)
      setMobileAccountOpen(false)
    }
  }, [user])

  // ✅ اگر user آمد (بعد از login/register) دیالوگ بسته شود
  useEffect(() => {
    if (user) setAuthOpen(false)
  }, [user])

  // ✅ props مشترک برای خاموش کردن ripple روی دکمه‌ها
  const noRippleBtnProps = {
    disableRipple: true,
    disableFocusRipple: true,
    disableTouchRipple: true,
  } as const

  // ✅ یک استایل مشترک برای حذف focus outline/shadow
  const noFocusRingSx = {
    '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
    '&:focus': { outline: 'none' },
    '&:focus-visible': { outline: 'none', boxShadow: 'none' },
  } as const

  const AccountButton = ({ variant }: { variant: 'mobile' | 'desktop' }) => {
    const commonSx = {
      borderRadius: '12px',
      fontFamily: 'inherit',
      fontWeight: 'bold',
      boxShadow: 'none',
      ...noFocusRingSx,
    }

    // ✅ سایز مخصوص موبایل برای UX بهتر (کوچک‌تر + حداقل ارتفاع لمس)
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
          ref={accountBtnRef}
          {...noRippleBtnProps}
          onClick={(e) => handleOpenAccount(e)}
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
          {...noRippleBtnProps}
          startIcon={<Login className="ml-1" />}
          variant="contained"
          onClick={() => setAuthOpen(true)}
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
        ref={accountBtnRef}
        {...noRippleBtnProps}
        onClick={(e) => handleOpenAccount(e)}
        variant="contained"
        startIcon={<AccountCircle className="ml-1" />}
        sx={{
          ...commonSx,
          ...(variant === 'mobile' ? mobileSx : { padding: '8px 16px', height: 42 }),
          '&:hover': { boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' },
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ direction: 'ltr' }}>{variant === 'mobile' ? 'حساب کاربری' : userPhone}</span>
      </Button>
    )
  }

  const AccountMenuContent = ({ mode }: { mode: 'desktop' | 'mobile' }) => {
    const onClose = mode === 'desktop' ? handleCloseDropdown : handleCloseMobileAccount

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
              onClose()
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

        <MenuItem
          disableRipple
          onClick={() => {
            onClose()
            // router.push('/wallet')
          }}
        >
          <ListItemIcon>
            <AccountBalanceWallet fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="کیف پول"
            secondary="موجودی: — تومان"
            primaryTypographyProps={{ fontWeight: 800 }}
          />
        </MenuItem>

        <MenuItem
          disableRipple
          onClick={() => {
            onClose()
            // router.push('/wallet/topup')
          }}
        >
          <ListItemIcon>
            <AddCircleOutline fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="افزایش موجودی" primaryTypographyProps={{ fontWeight: 800 }} />
        </MenuItem>

        <Divider />

        <MenuItem
          disableRipple
          onClick={() => {
            onClose()
            // router.push('/account')
          }}
        >
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

  return (
    <>
      <header className="w-full bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl px-4 mx-auto flex items-center justify-between py-3 md:py-4 md:gap-5" dir="rtl">
          {/* --- right: burger + logo --- */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="lg:hidden">
              <IconButton onClick={handleDrawerToggle} className="bg-gray-50 text-gray-700" sx={{ ...noFocusRingSx }}>
                <MenuIcon />
              </IconButton>
            </div>

            <Link href="/" className="flex items-center">
              {/* ✅ لوگو تو موبایل جمع‌تر تا هدر شلوغ نشه */}
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

          {/* --- center: desktop menu --- */}
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

          {/* --- left: actions (Desktop) --- */}
          <div className="hidden md:flex items-center gap-3">
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

            {/* ✅ دکمه ورود/حساب در دسکتاپ */}
            <Box onClick={(e) => !isMobile && handleOpenAccount(e as any)}>
              <AccountButton variant="desktop" />
            </Box>

            {/* ✅ Dropdown Menu (Desktop only) */}
            <Menu
              anchorEl={anchorEl}
              open={!isMobile && dropdownOpen}
              onClose={handleCloseDropdown}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 3,
                  minWidth: 260,
                  overflow: 'hidden',
                },
              }}
            >
              <AccountMenuContent mode="desktop" />
            </Menu>
          </div>

          {/* --- left: actions (Mobile) ✅ ورود/ثبت‌نام داخل هدر --- */}
          <div className="flex md:hidden items-center gap-2">
            <AccountButton variant="mobile" />
          </div>
        </div>
      </header>

      {/* --- Mobile Account Bottom Sheet ✅ دراپ‌داون از پایین --- */}
      <Drawer
        anchor="bottom"
        open={mobileAccountOpen}
        onClose={handleCloseMobileAccount}
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
            <IconButton onClick={handleCloseMobileAccount} className="bg-gray-50" sx={{ ...noFocusRingSx }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ pb: 1 }}>
            <AccountMenuContent mode="mobile" />
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

        {/* ✅ طبق درخواست: دکمه ورود/ثبت‌نام از Drawer حذف شد */}
        {/* ✅ فقط تماس (و در صورت لاگین، خروج سریع) */}
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
