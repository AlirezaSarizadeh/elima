import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * مسیرهایی که فقط کاربر لاگین‌شده باید ببینه
 */
const PROTECTED_ROUTES = [
  '/account',
  '/dashboard',
  '/profile',
  '/wallet',
]

/**
 * مسیرهایی که اگر لاگین بود، نباید ببینه
 */
const GUEST_ONLY_ROUTES = [
  '/login',
  '/register',
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // گرفتن توکن از کوکی
  const token = req.cookies.get('auth_token')?.value

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  )

  const isGuestOnlyRoute = GUEST_ONLY_ROUTES.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  )

  /**
   * 🔒 اگر صفحه محافظت‌شده است و کاربر لاگین نیست
   */
  if (isProtectedRoute && !token) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'

    // برای UX بهتر: مسیر قبلی را نگه می‌داریم
    url.searchParams.set('redirect', pathname)

    return NextResponse.redirect(url)
  }

  /**
   * 👤 اگر کاربر لاگین است و رفت /login یا /register
   */
  if (isGuestOnlyRoute && token) {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

/**
 * روی چه مسیرهایی middleware اجرا شود
 */
export const config = {
  matcher: [
    /*
      همه صفحات به جز:
      - api
      - static files
      - images
      - favicon
    */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
