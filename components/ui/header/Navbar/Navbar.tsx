'use client'

import { useEffect, useMemo, useState } from 'react'
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
} from '@mui/material'
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

  // Dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const dropdownOpen = Boolean(anchorEl)

  const handleDrawerToggle = () => setMobileOpen((p) => !p)

  const userPhone = useMemo(() => user?.mobile_number || 'حساب کاربری', [user])
  const userName = useMemo(() => user?.name || 'کاربر', [user])

  const handleOpenDropdown = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseDropdown = () => setAnchorEl(null)

  const handleLogout = async () => {
    handleCloseDropdown()
    await logout()

    // ✅ اگر داخل روت‌های private بودیم بعد از خروج به خانه برگرد
    const isPrivate = PRIVATE_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
    if (isPrivate) {
      router.replace('/')
    }
  }

  // ✅ اگر user null شد (logout یا session از دست رفت) منو بسته شود
  useEffect(() => {
    if (!user) setAnchorEl(null)
  }, [user])

  return (
    <>
      <header className="w-full bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl px-4 mx-auto flex items-center justify-between py-4 md:gap-5" dir="rtl">
          {/* --- right: burger + logo --- */}
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <IconButton onClick={handleDrawerToggle} className="bg-gray-50 text-gray-700">
                <MenuIcon />
              </IconButton>
            </div>

            <Link href="/" className="flex items-center">
              <Image src="/images/logo.png" alt="logo" width={200} height={54} className="object-contain" />
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

          {/* --- left: buttons --- */}
          <div className="md:flex items-center gap-3 hidden">
            <Button
              href="tel:+982145123456"
              startIcon={<PhoneCallback className="ml-1" />}
              variant="outlined"
              color="primary"
              className="hidden sm:flex"
              sx={{
                borderRadius: '12px',
                padding: '8px 16px',
                fontFamily: 'inherit',
                fontWeight: 'bold',
                direction: 'ltr',
              }}
            >
              021-45123456
            </Button>

            {/* ✅ حالت loading: دکمه اکانت با Skeleton */}
            {loading ? (
              <Button
                onClick={handleOpenDropdown}
                variant="contained"
                startIcon={<AccountCircle className="ml-1" />}
                sx={{
                  borderRadius: '12px',
                  padding: '8px 16px',
                  fontFamily: 'inherit',
                  fontWeight: 'bold',
                  boxShadow: 'none',
                }}
              >
                <Skeleton variant="text" width={90} sx={{ bgcolor: 'rgba(255,255,255,0.35)' }} />
              </Button>
            ) : !user ? (
              // ✅ لاگین نیست
              <Button
                startIcon={<Login className="ml-1" />}
                variant="contained"
                onClick={() => setAuthOpen(true)}
                sx={{
                  borderRadius: '12px',
                  padding: '8px 16px',
                  fontFamily: 'inherit',
                  fontWeight: 'bold',
                  boxShadow: 'none',
                  '&:hover': { boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' },
                }}
              >
                <span className="hidden sm:inline">ورود / ثبت نام</span>
                <span className="sm:hidden">ورود</span>
              </Button>
            ) : (
              // ✅ لاگین هست
              <Button
                onClick={handleOpenDropdown}
                variant="contained"
                startIcon={<AccountCircle className="ml-1" />}
                sx={{
                  borderRadius: '12px',
                  padding: '8px 16px',
                  fontFamily: 'inherit',
                  fontWeight: 'bold',
                  boxShadow: 'none',
                  '&:hover': { boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)' },
                }}
              >
                <span style={{ direction: 'ltr' }}>{userPhone}</span>
              </Button>
            )}

            {/* ✅ Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={dropdownOpen}
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
              {loading ? (
                <UserMenuLoading />
              ) : user ? (
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
                    onClick={() => {
                      handleCloseDropdown()
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
                    onClick={() => {
                      handleCloseDropdown()
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
                    onClick={() => {
                      handleCloseDropdown()
                      // router.push('/account')
                    }}
                  >
                    <ListItemIcon>
                      <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="اطلاعات حساب کاربری" primaryTypographyProps={{ fontWeight: 800 }} />
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="خروج" primaryTypographyProps={{ fontWeight: 800 }} />
                  </MenuItem>
                </>
              ) : (
                <Box sx={{ p: 2, minWidth: 260 }}>
                  <Typography variant="body2" sx={{ fontWeight: 800, mb: 1 }}>
                    وارد حساب نشده‌اید
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => {
                      handleCloseDropdown()
                      setAuthOpen(true)
                    }}
                  >
                    ورود / ثبت نام
                  </Button>
                </Box>
              )}
            </Menu>
          </div>
        </div>
      </header>

      {/* --- Mobile Drawer --- */}
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
            fullWidth
            href="tel:+982145123456"
            variant="outlined"
            startIcon={<PhoneCallback />}
            className=" !bg-white"
            sx={{ borderRadius: '10px', height: '48px', marginBottom: '10px' }}
          >
            021-45123456
          </Button>

          {loading ? (
            <Button
              fullWidth
              variant="contained"
              startIcon={<AccountCircle />}
              disabled
              sx={{ borderRadius: '10px', height: '48px', fontFamily: 'inherit' }}
            >
              در حال بارگذاری...
            </Button>
          ) : !user ? (
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                setMobileOpen(false)
                setAuthOpen(true)
              }}
              startIcon={<Login />}
              sx={{ borderRadius: '10px', height: '48px', fontFamily: 'inherit' }}
            >
              ورود یا ثبت نام
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              onClick={async () => {
                await logout()
                const isPrivate = PRIVATE_ROUTES.some(
                  (route) => pathname === route || pathname.startsWith(`${route}/`)
                )
                if (isPrivate) router.replace('/')
                setMobileOpen(false)
              }}
              startIcon={<Logout />}
              sx={{ borderRadius: '10px', height: '48px', fontFamily: 'inherit' }}
            >
              خروج از حساب
            </Button>
          )}
        </div>
      </Drawer>

      {/* Auth Dialog */}
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
