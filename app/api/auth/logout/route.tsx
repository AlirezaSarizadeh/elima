import { NextResponse } from 'next/server'

export async function POST() {
  const isProd = process.env.NODE_ENV === 'production'
  const res = NextResponse.json({ ok: true })

  // ✅ باید دقیقاً همون flagها رو داشته باشه که موقع set استفاده شد
  // وگرنه browser کوکی رو پاک نمیکنه
  const clearCookie = {
    value: '',
    path: '/',
    maxAge: 0,
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax' as const,
  }

  res.cookies.set({ name: 'auth_token', ...clearCookie })
  res.cookies.set({ name: 'auth_user', ...clearCookie })

  return res
}